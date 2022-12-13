import React, {useContext} from "react";
import {Box, Button, Divider, IconButton, Stack, Typography} from "@mui/material";
import styled from "styled-components";
import {colors, Fonts} from "../../common/theme";
import Logo, {WhiteLogo} from "../Common/Logo";
import NavItem from "./NavItem";
import {HomeFilled, SettingFilled, ReadFilled, FolderOpenFilled, ChromeFilled} from "@ant-design/icons";
import it from "node:test";
import {AppContext} from "../../App";
import ArticleIcon from '@mui/icons-material/Article';
import {useNavigate} from "react-router-dom";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import i18n from "i18next";


export const sideitems = [
    {
        link: "/",
        icon: <HomeFilled/>,
        title: 'home_page',
        endIcon: <KeyboardArrowRightIcon/>,
        endLink: '/'
    },
    {
        link: "/news",
        icon: <ReadFilled/>,
        title: 'news',
        endIcon: <KeyboardArrowRightIcon/>,
        endLink: '/news'
    },
    {
        link: "/project",
        icon: <FolderOpenFilled/>,
        title: 'projects',
        endIcon: <KeyboardArrowRightIcon/>,
        endLink: '/project'
    },
    {
        link: "/certificate",
        icon: <ArticleIcon/>,
        title: 'certificate',
        endIcon: <KeyboardArrowRightIcon/>,
        endLink: '/certificate'
    }
]

interface Props {
    width: string;
}

const SideBackground = styled.div<Props>`
  background-color: ${colors.dark};
  background-image: url("/images/nav_nachos.png");
  background-repeat: no-repeat;
  background-position: 100% 200%;
  background-size: cover;
  height: 100vh;
  top: 0;
  bottom: 0;
  position: fixed;
  width: ${props => props.width ? props.width : '20%'};
  overflow: hidden;
`;


interface IProps {
    close?: () => void
}


const Sidebar: React.FC<IProps> = (props: IProps) => {
    const {isMobile} = useContext(AppContext);
    const navigation = useNavigate();
    return (
        <SideBackground width={isMobile ? '100%' : '20%'}>
            <Stack>
                {
                    isMobile ? <Box sx={{width: '100%', mt: 10}}></Box> :
                        <Box sx={{p: 2, width: '100%'}}>
                            <WhiteLogo/>
                        </Box>
                }

                <Divider color={'#31455e'}/>

                {
                    sideitems.map((item, i) => {
                        return (
                            <div key={`side-item-${i}`}
                                 onClick={() => {
                                     if (props.close) {
                                         props.close()
                                     }
                                     navigation(item.link);
                                 }}>
                                <NavItem icon={item.icon} title={item.title} endIcon={item.endIcon} link={item.link}
                                         endLink={item.endLink}/>
                                <Divider color={'#31455e'}/>
                            </div>
                        )
                    })
                }


                <Box sx={{bottom: 0, position: 'fixed', width: isMobile ? '100%' : '20%'}}>
                    <Divider color={'#31455e'}/>
                    <Stack direction={'row'} spacing={2} sx={{width: '100%', mt: 1, mb: 1}} alignItems={'center'}
                           justifyContent={'center'}>
                        <Button variant={'outlined'} onClick={()=>{
                            i18n.changeLanguage('tm');
                            localStorage.setItem('lng','tm')
                        }}>TM</Button>
                        <Button variant={'outlined'} onClick={()=>{
                            i18n.changeLanguage('ru');
                            localStorage.setItem('lng','ru')
                        }}>RU</Button>
                    </Stack>
                    <Divider color={'#31455e'}/>
                    <Typography sx={{
                        color: 'white',
                        fontFamily: Fonts.RalewayMedium,
                        p: 2,
                        textAlign: 'center',
                        fontSize: '12px'
                    }}>Developed by: @Sh.Alyyev</Typography>
                </Box>

            </Stack>
        </SideBackground>
    )
}

export default Sidebar