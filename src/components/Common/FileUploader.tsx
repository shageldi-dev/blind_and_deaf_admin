import React, {useState, useEffect} from 'react';
import {ItemRenderProps, SortableItemProps, SortableList} from "@thaddeusjiang/react-sortable-list";
import {Button, Grid, listClasses, Skeleton, Stack, Typography} from "@mui/material";
import styled from 'styled-components';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {colors, Fonts, ImageStyle} from "../../common/theme";
import ClearIcon from '@mui/icons-material/Clear';
import Image from "mui-image";
import {IFiles} from "../../common/Model/Model";
import {getImagePath, getOtherPath, getVideoPath} from "../../common/utils";
import {useTranslation} from "react-i18next";

export enum Types{
    video,
    image,
    other
}

interface IProps {
    defaultLabel: string
    placeholder: JSX.Element
    multiple: boolean
    mimeTypes: string[] // ['.jpg','.png']
    draggable: boolean
    list: FileList | undefined
    setList: React.Dispatch<React.SetStateAction<FileList | undefined>>
    id: string,
    title:string,
    type:Types,
    oldFiles?:IFiles[],
    setOldFiles?: (value: (((prevState: (IFiles[] | undefined)) => (IFiles[] | undefined)) | IFiles[] | undefined)) => void
}

const FileInput = styled.input`
  width: 100%;
  height: auto;
  text-align: center;
  padding: 16px;
  display: none;
`;


const FileUploader: React.FC<IProps> = (props: IProps) => {
    const [items, setItems] = useState<SortableItemProps[]>([
        {id: '1', name: 'Item 1'},
        {id: '2', name: 'Item 2'},
        {id: '3', name: 'Item 3'},
    ]);

    function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return;
        }
        props.setList(e.target.files);
    }

    function valueChecker<FileList>(value: any) {
        try {
            let it = value[0];
            console.log(value);
            return value;
        } catch (err) {
            return [];
        }
    }

    function valueChecker2(value: IFiles[]) {
        try {
            let temp:IFiles[]=[];
            if(value)
                temp=value.filter(item=>item.mime_type==props.type);
            return temp;
        } catch (err) {
            return [];
        }
    }

    const {t}=useTranslation();

    return (
        <div>

            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography
                    sx={{textTransform: 'none',
                        fontSize:'18px', fontFamily: Fonts.RalewayBold}}>
                    {props.title}
                </Typography>
                {
                    valueChecker(props.list).length <= 0 && valueChecker2(props.oldFiles?props.oldFiles:[]).length<=0 ? null :
                        <Button
                            onClick={() => {
                                props.setList(undefined)
                                if(props.setOldFiles && props.oldFiles){
                                    let temp=props.oldFiles.filter(item=>item.mime_type!=props.type);
                                    props.setOldFiles(temp)
                                }
                            }
                            }
                            sx={{textTransform: 'none', fontFamily: Fonts.RalewayMedium}}
                            startIcon={<ClearIcon/>} variant={'contained'}>
                            {t('Clear selections')}
                        </Button>
                }

            </Stack>
            <Stack
                justifyContent={'center'}
                sx={{
                    mt: 2,
                    mb: 2,
                    p: 3,
                    borderRadius: '12px',
                    height: valueChecker(props.list).length <= 0 && valueChecker2(props.oldFiles?props.oldFiles:[]).length<=0 ? '200px' : 'auto',
                    borderStyle: 'solid',
                    borderColor: colors.primary,
                    borderWidth: '1px'
                }}>
                {
                    valueChecker(props.list).length <= 0 && valueChecker2(props.oldFiles?props.oldFiles:[]).length<=0 ?
                        <label htmlFor={props.id}>
                            <FileInput
                                multiple={props.multiple}
                                accept={props.mimeTypes.join(',')}
                                type={'file'} id={props.id} onChange={e => handleSelect(e)}/>
                            <Stack sx={{width: '100%'}} alignItems={'center'}>
                                <CloudUploadIcon/>
                                <Typography sx={{fontFamily: Fonts.RalewayBold, fontSize: '18px'}}>{t('Upload')}</Typography>
                                <Typography sx={{
                                    fontFamily: Fonts.RalewayLight,
                                    fontSize: '12px'
                                }}>{props.mimeTypes.join(',')}</Typography>
                            </Stack>
                        </label>
                        :
                        <div>

                            <Grid container spacing={2}>
                                {
                                    props.oldFiles && props.oldFiles.length>0?props.oldFiles.map((item:IFiles,i:number)=>{
                                        return(
                                            item.mime_type==props.type?
                                            <Grid item xs={6} md={3} key={`image-${i}`}>
                                                {
                                                    props.type===Types.image?
                                                        <Image src={getImagePath(item.url)}
                                                               showLoading={<Skeleton sx={{width:'200px',height:'200px'}}/>}
                                                               wrapperStyle={{width:'100%',height:'200px'}}
                                                        />
                                                        :
                                                        props.type===Types.video?
                                                            <video src={getVideoPath(item.url)}
                                                                   style={{width:'100%',height:'200px'}}
                                                                   controls={true}
                                                                   autoPlay={false}
                                                            />
                                                            :
                                                            <a
                                                                target={'_blank'}
                                                                href={getOtherPath(item.url)}>{item.url}</a>
                                                }
                                            </Grid>:null
                                        )
                                    }):null

                                }
                                {
                                    [...valueChecker(props.list)].map((item:File,i:number)=>{
                                        return(
                                            <Grid item xs={6} md={3} key={`image-${i}`}>
                                                {
                                                    props.type===Types.image?
                                                        <Image src={URL.createObjectURL(item)}
                                                               showLoading={<Skeleton sx={{width:'200px',height:'200px'}}/>}
                                                               wrapperStyle={{width:'100%',height:'200px'}}
                                                        />
                                                        :
                                                        props.type===Types.video?
                                                            <video src={URL.createObjectURL(item)}
                                                                   style={{width:'100%',height:'200px'}}
                                                                   controls={true}
                                                                   autoPlay={false}
                                                            />
                                                            :
                                                            <a
                                                                target={'_blank'}
                                                                href={URL.createObjectURL(item)}>{item.name}</a>
                                                }
                                            </Grid>
                                        )
                                    })

                                }
                            </Grid>
                        </div>
                }


            </Stack>
        </div>
    )
}

export default FileUploader;