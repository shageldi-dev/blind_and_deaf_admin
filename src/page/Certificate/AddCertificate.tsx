import * as React from 'react';
import {useRef, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import AddIcon from "@mui/icons-material/Add";
import {Container, Grid, TextField} from "@mui/material";
import JoditEditor from "jodit-react";
import FileUploader, {Types} from "../../components/Common/FileUploader";
import Image from "mui-image";
import {AxiosInstanceFormData} from "../../common/AxiosInstance";
import {showError, showSuccess} from "../../components/Common/Alert";
import {LoadingButton} from "@mui/lab";
import LoginIcon from "@mui/icons-material/Login";
import {useTranslation} from "react-i18next";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps{
    getData(): void
}

const AddCertificate:React.FC<IProps>=(props:IProps)=> {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const {t}=useTranslation();


    const [selectedImages,setImages]=useState<FileList|undefined>();
    const [selectedOther,setOther]=useState<FileList|undefined>();
    const [titleTm,setTitleTm]=useState('');

    const [loading,setLoading]=useState(false);

    const clearInput = () => {
        setTitleTm('');
        setImages(undefined);
        setOther(undefined);
    }

    function add() {
        let formData = new FormData();
        formData.append('name',titleTm);
        if(selectedImages?.length && selectedImages.length>0){
            for (let k = 0; k < selectedImages.length; k++) {
                formData.append('image', selectedImages[k]);
            }
        }
        if(selectedOther?.length && selectedOther.length>0){
            for (let k = 0; k < selectedOther.length; k++) {
                formData.append('certificate', selectedOther[k]);
            }
        }
        AxiosInstanceFormData.post('/add-certificate',formData)
            .then(response => {
                if (!response.data.error) {
                    showSuccess(t("Successfully added!"));
                    setLoading(false);
                    clearInput();
                    handleClose();
                    props.getData();
                } else {
                    showError(t("Something went wrong!"));
                    setLoading(false);
                }
            })
            .catch(error => {
                showError(error + "");
                setLoading(false);
            })
    }

    return (
        <div>
            <Button startIcon={<AddIcon/>} variant={'contained'} onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                disableEnforceFocus
            >
                <AppBar sx={{position: 'relative'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            {t('Add')}
                        </Typography>
                        <LoadingButton
                            loading={loading}
                            loadingPosition="start"
                            variant="text"
                            sx={{color:'white'}}
                            fullWidth={false}
                            onClick={add}
                        >
                            {loading ? <Typography>{t('Please wait...')}</Typography> : <Typography>{t('Save')}</Typography>}
                        </LoadingButton>
                    </Toolbar>
                </AppBar>
                <Container fixed sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label={t('Name')}
                                fullWidth={true}
                                type={'text'}
                                value={titleTm}
                                onChange={e=>setTitleTm(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FileUploader defaultLabel={"Hello"}
                                          placeholder={<Image src={'/'}/>}
                                          multiple={false}
                                          mimeTypes={['image/*']}
                                          draggable={true}
                                          id={'image-selector'}
                                          setList={setImages}
                                          title={t('Certificate Image*')}
                                          type={Types.image}
                                          list={selectedImages}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FileUploader defaultLabel={"Hello"}
                                          placeholder={<Image src={'/'}/>}
                                          multiple={false}
                                          mimeTypes={['*']}
                                          draggable={true}
                                          id={'other-selector'}
                                          setList={setOther}
                                          title={t('Certificate file*')}
                                          type={Types.other}
                                          list={selectedOther}/>
                        </Grid>

                    </Grid>
                </Container>
            </Dialog>
        </div>
    );
}

export default AddCertificate;