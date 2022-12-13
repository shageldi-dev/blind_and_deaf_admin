import React, {useState, useEffect, useContext} from 'react';
import {GBody, IInbox} from "../../common/Model/Model";
import {Card, CardActionArea, CardContent, Typography, Button, Drawer, IconButton, Badge, Stack} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {AppContext} from "../../App";
import {colors, Fonts} from "../../common/theme";
import {AxiosInstance} from "../../common/AxiosInstance";
import {convertDateAndTime, valueChecker} from "../../common/utils";
import {useTranslation} from "react-i18next";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Inbox = () => {
    const [data,setData]=useState<GBody<IInbox[]>>();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const {isMobile}=useContext(AppContext);

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    function getData(){
        AxiosInstance.get('/get-inbox')
            .then(response=>{
                setData(response.data);
            })
            .catch(err=>{
            })
    }

    useEffect(()=>{
        if(state.right){
            getData();
        }
    },[state]);
    const {t}=useTranslation();
    return (
        <React.Fragment key={'right'}>
            <IconButton color={'primary'} onClick={toggleDrawer('right', true)}>
                <Badge color="error" variant="dot">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Drawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
            >
               <Stack sx={{width:'300px',p:2}} spacing={2}>
                   <Typography sx={{fontFamily:Fonts.RalewayBold,mb:2,fontSize:'22px'}}>{t('Inbox')}</Typography>
                   {
                       valueChecker(data?.body).map((item:IInbox,i:number)=>{
                           let textColor=item.is_read?'':colors.white;
                           return(
                               <Card
                                   onClick={()=>{
                                       window.location.href=`mailto:${item.email}`
                                   }}
                                   sx={{backgroundColor:item.is_read?'':colors.primary}}>
                                   <CardActionArea>
                                       <CardContent>
                                           <Stack spacing={0}>
                                               <Typography sx={{fontFamily:Fonts.RalewayBold,fontSize:'16px',color:textColor}}>{item.fullname}</Typography>
                                               <Typography sx={{fontFamily:Fonts.RalewayLight,fontSize:'12px',color:textColor}}>{convertDateAndTime(item.created_at)}</Typography>
                                               <Typography sx={{fontFamily:Fonts.RalewayMedium,mt:1,fontSize:'14px',color:textColor,width:'100%'}}>{item.message}</Typography>
                                               <Typography sx={{fontFamily:Fonts.RalewaySemiBold,mt:1,fontSize:'12px',color:textColor}}>{item.email}</Typography>
                                           </Stack>
                                       </CardContent>
                                   </CardActionArea>
                               </Card>
                           )
                       })
                   }
               </Stack>
            </Drawer>
        </React.Fragment>
    )
}

export default Inbox;