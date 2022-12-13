import React, {useContext} from 'react';
import {IconButton, Stack, Typography} from "@mui/material";
import {Fonts} from "../../common/theme";
import {AppContext} from "../../App";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

interface IProps{
    icon:JSX.Element,
    title:string,
    endIcon?:JSX.Element,
    endLink?:string|undefined,
    link:string
}

const navItemStyle={
    p:2,
    color:'white',
    cursor:'pointer',
    fontFamily:Fonts.RobotoMedium,
    fontSize:'18px',
    '&:hover':{
        backgroundColor:'secondary.light'
    }
}

const NavItem:React.FC<IProps> = ({icon,title,endIcon,link,endLink}) =>{
    const {t} = useTranslation();
    const navigation=useNavigate();

    return(
        <Stack direction={'row'} spacing={3} sx={navItemStyle} alignItems={'center'} justifyContent={'space-between'}>
            <Stack direction={'row'} spacing={3} alignItems={'center'} onClick={()=>navigation(link)}>
                {icon}
                <Typography sx={{fontFamily:Fonts.RobotoMedium}}>{t(title)}</Typography>
            </Stack>
            {
                typeof endIcon!=='undefined' && endIcon!=null?
                    <IconButton sx={{color:'white',fontSize:'18px'}} onClick={()=>navigation(endLink?endLink:'/')}>
                        {endIcon}
                    </IconButton>
                    :
                    null
            }
        </Stack>
    )
}

export default NavItem;