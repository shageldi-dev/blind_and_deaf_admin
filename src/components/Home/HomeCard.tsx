import React from 'react';
import {Button, Card, CardActionArea, Stack, Typography} from "@mui/material";
import {Fonts} from "../../common/theme";
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import {useTranslation} from "react-i18next";

interface IProps{
    title:string,
    desc:string,
    animation:string,
    background:string
}

const HomeCard:React.FC<IProps> = ({title,desc,animation,background}) =>{
    const {t}=useTranslation();
    return(
        <Card sx={{background:background}}>
            <CardActionArea sx={{p:3}}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Stack spacing={1}>
                        <Typography sx={{fontFamily:Fonts.RalewayBold,fontSize:'22px',color:'white'}}>{title}</Typography>
                        <Typography sx={{fontFamily:Fonts.RalewayLight,fontSize:'14px',color:'white'}}>{desc}</Typography>
                        <Button variant={'contained'} sx={{fontFamily:Fonts.RalewayMedium,
                            textTransform:'none',
                            fontSize:'12px',color:'white'}}>{t('Know more')}</Button>
                    </Stack>
                    <Player
                        autoplay
                        loop
                        src={animation}
                        style={{ height: '100px', width: '100px',objectFit:'cover' }}
                    >
                    </Player>
                </Stack>
            </CardActionArea>
        </Card>
    )
}

export default HomeCard;