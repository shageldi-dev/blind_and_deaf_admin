import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import MenuIcon from "@mui/icons-material/Menu";
import {Badge, Box, Menu, MenuItem, Stack} from "@mui/material";
import Logo from "../Common/Logo";
import Sidebar, {sideitems} from "./Sidebar";
import {AccountCircle} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Fonts} from "../../common/theme";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Inbox from "../../page/Inbox/Inbox";
import LogoutIcon from "@mui/icons-material/Logout";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="right" ref={ref} {...props} />;
});

export default function MDrawer() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const style={
        p:2,
        backdropFilter:'blur(10px)',
        backgroundColor:'rgba(255,255,255,0.65)',
        zIndex:2
    };

    const [title,setTitle]=useState('');

    const location=useLocation();

    useEffect(()=>{
        sideitems.forEach(item=>{
            if(item.link===location.pathname){
                setTitle(item.title)
            }
        })
    },[location]);

    const {t} = useTranslation();
    const navigator=useNavigate()

    return (
        <div>
            <Box sx={{width:'100%',position:'fixed',zIndex:2}}>
                <Stack direction={'row'} sx={style} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton edge="start" onClick={handleClickOpen} color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
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
            </Box>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <Box sx={{ position: 'relative',zIndex:1,backgroundColor:"#ffffff" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Logo/>
                    </Toolbar>
                </Box>
                <Sidebar close={handleClose}/>
            </Dialog>
        </div>
    );
}
