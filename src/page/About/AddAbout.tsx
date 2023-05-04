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
import {AboutType} from "../../common/Model/Model";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps{
    getData(): void,
    is_partner:boolean,
    type: AboutType
}

const AddAbout:React.FC<IProps>=(props:IProps)=> {
    const [open, setOpen] = React.useState(false);
    const {t}=useTranslation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Editor
    const config = {
        readonly: false,
        placeholder: t('Start typings...'),
        height: 400,
        enableDragAndDropFileToEditor: true
    };

    const editor = useRef(null)

    const [selectedImages,setImages]=useState<FileList|undefined>();
    const [titleTm,setTitleTm]=useState('');
    const [titleRu,setTitleRu]=useState('');
    const [titleEn,setTitleEn]=useState('');
    const [contentTm,setContentTm]=useState('');
    const [contentRu,setContentRu]=useState('');
    const [contentEn,setContentEn]=useState('');
    const [link,setLink] = useState('https://');

    const [loading,setLoading]=useState(false);

    const clearInput = () => {
        setTitleEn('');
        setTitleTm('');
        setTitleRu('');
        setContentTm('');
        setContentRu('');
        setContentEn('');
        setImages(undefined);
    }

    function addNews() {
        let formData = new FormData();
        formData.append('title_tm',titleTm);
        formData.append('title_ru',titleRu);
        formData.append('title_en',titleEn);
        formData.append('desc_tm',contentTm);
        formData.append('desc_ru',contentRu);
        formData.append('desc_en',contentEn);
        formData.append('is_partner',props.is_partner.toString());
        formData.append('type',props.type.toString());
        formData.append('link_url',link);

        if(selectedImages?.length && selectedImages.length>0){
            for (let k = 0; k < selectedImages.length; k++) {
                formData.append('image', selectedImages[k]);
            }
        }
        setLoading(true);
        AxiosInstanceFormData.post('/about/add-about-item',formData)
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
                {t('Add')}
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
                            onClick={addNews}
                        >
                            {loading ? <Typography>{t('Please wait...')}</Typography> : <Typography>{t('Save')}</Typography>}
                        </LoadingButton>
                    </Toolbar>
                </AppBar>
                <Container fixed sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={4}>
                            <TextField
                                label={t('Title tm')}
                                fullWidth={true}
                                type={'text'}
                                value={titleTm}
                                onChange={e=>setTitleTm(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <TextField
                                label={t('Title ru')}
                                fullWidth={true}
                                type={'text'}
                                value={titleRu}
                                onChange={e=>setTitleRu(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <TextField
                                label={t('Title en')}
                                fullWidth={true}
                                type={'text'}
                                value={titleEn}
                                onChange={e=>setTitleEn(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={t('Link Url')}
                                fullWidth={true}
                                type={'text'}
                                value={link}
                                onChange={e=>setLink(e.target.value)}
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
                                          title={t('Images*')}
                                          type={Types.image}
                                          list={selectedImages}/>
                        </Grid>


                        <Grid item xs={12}>
                            <Typography>{t('Content TM')}</Typography>
                            <JoditEditor
                                ref={editor}
                                config={{
                                    ...config
                                }}
                                onBlur={newContent => setContentTm(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => {
                                }}
                                value={contentTm}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>{t('Content RU')}</Typography>
                            <JoditEditor
                                ref={editor}
                                config={{
                                    ...config
                                }}
                                onBlur={newContent => setContentRu(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => {
                                }}
                                value={contentRu}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>{t('Content EN')}</Typography>
                            <JoditEditor
                                ref={editor}
                                config={{
                                    ...config
                                }}
                                onBlur={newContent => setContentEn(newContent)} // preferred to use only this option to update the content for performance reasons
                                onChange={newContent => {
                                }}
                                value={contentEn}/>
                        </Grid>

                    </Grid>
                </Container>
            </Dialog>
        </div>
    );
}

export default AddAbout;