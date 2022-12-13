import React, {useContext, useEffect, useState} from "react";
import Sidebar, {sideitems} from "../../components/Sidebar/Sidebar";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Badge, Box, Button, IconButton, Menu, MenuItem, Paper, Stack, Typography} from "@mui/material";
import {AppContext} from "../../App";
import MobileSidbar from "../../components/Sidebar/MobileSidbar";
import MDrawer from "../../components/Sidebar/MDrawer";
import {useTranslation} from "react-i18next";
import {Fonts} from "../../common/theme";
import NotificationsIcon from '@mui/icons-material/Notifications';
import {AccountCircle} from "@mui/icons-material";
import Inbox from "../Inbox/Inbox";
import LogoutIcon from '@mui/icons-material/Logout';

const style={
    p:3,
    backdropFilter:'blur(10px)',
    backgroundColor:'rgba(255,255,255,0.65)',
    position:'fixed',
    top:0,
    width:'78%',
    zIndex:2
}

const Index = () => {
    const {isMobile} = useContext(AppContext);

    const [title,setTitle]=useState('');

    const location=useLocation();
    const {t} = useTranslation();

    useEffect(()=>{
        if(location.pathname!=='/login'){
            let token=sessionStorage.getItem('token');
            if(typeof token==='undefined' || token===null || token===''){
                window.location.href='/login';
            }
        }
        sideitems.forEach(item=>{
            if(item.link===location.pathname){
                setTitle(item.title)
            }
        })
    },[location]);

    const navigator=useNavigate()



    const AppBar=()=>{
        return(
            <Stack sx={style} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography sx={{fontFamily:Fonts.RobotoMedium,fontSize:'18px'}}>
                    {t(title)}
                </Typography>
                <Stack direction={'row'} alignItems={'center'} >
                   <Inbox/>
                    <IconButton
                        onClick={()=>{
                            sessionStorage.setItem('token','');
                            localStorage.setItem('my_token','');
                            navigator('/login')
                        }}
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar2"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <LogoutIcon />
                    </IconButton>
                </Stack>

            </Stack>
        )
    }


    return (
        <Paper elevation={0} sx={{borderRadius: 0}}>
            <Stack direction={isMobile?'column':'row'}>
                {
                    isMobile?
                        <MDrawer/>
                        :
                        <Sidebar/>
                }
                <Box sx={{width:isMobile?'100%':'80%',marginLeft:isMobile?'0':'20%'}}>
                    {
                        isMobile?null:<AppBar/>
                    }
                    <div style={{width:'100%',height:isMobile?'80px':'90px'}}></div>
                    <Outlet/>
                </Box>
            </Stack>
        </Paper>
    )
}

export default Index