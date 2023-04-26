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
import EditIcon from "@mui/icons-material/Edit";
import {IFiles, INews} from "../../common/Model/Model";
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
    getData(): void,
    item:INews
}

const EditNews:React.FC<IProps>=(props:IProps)=> {
    const [open, setOpen] = React.useState(false);

    const [selectedImages,setImages]=useState<FileList|undefined>();
    const [selectedVideos,setVideos]=useState<FileList|undefined>();
    const [selectedOther,setOther]=useState<FileList|undefined>();
    const [oldFiles,setOldFiles]=useState<IFiles[] | undefined>(props.item.files);
    const [titleTm,setTitleTm]=useState(props.item.title_tm);
    const [titleRu,setTitleRu]=useState(props.item.title_ru);
    const [titleEn,setTitleEn]=useState(props.item.title_en);
    const [contentTm,setContentTm]=useState(props.item.content_tm);
    const [contentRu,setContentRu]=useState(props.item.content_ru);
    const [contentEn,setContentEn]=useState(props.item.content_en);
    const [id,setId]=useState(props.item.id);

    const {t}=useTranslation();

    const handleClickOpen = () => {
        setOpen(true);
        setImages(undefined);
        setVideos(undefined);
        setOther(undefined);
        setOldFiles(props.item.files);
        setTitleTm(props.item.title_tm);
        setTitleRu(props.item.title_ru);
        setTitleEn(props.item.title_en);
        setContentTm(props.item.content_tm);
        setContentRu(props.item.content_ru);
        setContentEn(props.item.content_en);
        setId(props.item.id);
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







    const [loading,setLoading]=useState(false);


    function addNews() {
        let formData = new FormData();
        formData.append('title_tm',titleTm);
        formData.append('title_ru',titleRu);
        formData.append('title_en',titleEn);
        formData.append('content_tm',contentTm);
        formData.append('content_ru',contentRu);
        formData.append('content_en',contentEn);
        formData.append('id',id.toString());
        if(selectedVideos?.length && selectedVideos.length>0){
            formData.append('video',selectedVideos[0]);
        }
        if(selectedImages?.length && selectedImages.length>0){
            for (let k = 0; k < selectedImages.length; k++) {
                formData.append('images', selectedImages[k]);
            }
        }
        if(selectedOther?.length && selectedOther.length>0){
            for (let k = 0; k < selectedOther.length; k++) {
                formData.append('other', selectedOther[k]);
            }
        }
        setLoading(true)
        AxiosInstanceFormData.put('/edit-news',formData)
            .then(response => {
                if (!response.data.error) {
                    showSuccess(t("Successfully updated!"));
                    setLoading(false);
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
            <IconButton color={'warning'} onClick={handleClickOpen}>
                <EditIcon/>
            </IconButton>
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
                            {t('Edit')}
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
                            <FileUploader defaultLabel={"Hello"}
                                          placeholder={<Image src={'/'}/>}
                                          multiple={true}
                                          mimeTypes={['image/*']}
                                          draggable={true}
                                          id={'image-selector'}
                                          setList={setImages}
                                          oldFiles={oldFiles}
                                          setOldFiles={setOldFiles}
                                          title={t('Images*')}
                                          type={Types.image}
                                          list={selectedImages}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FileUploader defaultLabel={"Hello"}
                                          placeholder={<Image src={'/'}/>}
                                          multiple={false}
                                          mimeTypes={['video/*']}
                                          draggable={true}
                                          id={'video-selector'}
                                          setList={setVideos}
                                          oldFiles={oldFiles}
                                          setOldFiles={setOldFiles}
                                          title={t('Single video (optional)')}
                                          type={Types.video}
                                          list={selectedVideos}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FileUploader defaultLabel={"Hello"}
                                          placeholder={<Image src={'/'}/>}
                                          multiple={true}
                                          mimeTypes={['*']}
                                          draggable={true}
                                          id={'other-selector'}
                                          setList={setOther}
                                          oldFiles={oldFiles}
                                          setOldFiles={setOldFiles}
                                          title={t('Additional files (optional)')}
                                          type={Types.other}
                                          list={selectedOther}/>
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

export default EditNews;