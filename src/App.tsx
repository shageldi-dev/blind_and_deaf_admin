import "./App.css";
import Home from "./page/Home/Home";
import Index from "./page/Index/Index";
import React, {createContext, useEffect, useState} from "react";
import logo from "./logo.svg";
import theme from "./common/theme";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ThemeProvider, useMediaQuery, useTheme} from "@mui/material";
import {useTranslation} from "react-i18next";
import News from "./page/News/News";
import Project from "./page/Project/Project";
import Constants from "./page/Constant/Constants";
import Settings from "./page/Settings/Settings";
import Login from "./page/Login/Login";
import {ToastContainer} from "react-toastify";
import Loading from "./components/Common/Loading";
import Certificate from "./page/Certificate/Certificate";
import About from "./page/About/About";

export interface ContextProps{
    t?:any,
    changeLanguage?:any,
    isMobile?:boolean
}

export const AppContext = createContext<ContextProps>({});

export function useWidth() {
    const theme = useTheme();
    const keys = [...theme.breakpoints.keys].reverse();
    return (
        keys.reduce((output:any, key) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const matches = useMediaQuery(theme.breakpoints.up(key));
            return !output && matches ? key : output;
        }, null) || 'xs'
    );
}



function App() {


    const {t, i18n} = useTranslation();

    const wwidth = useWidth();

    const checker = (w:string) => {
        return ["xs","sm"].includes(w);
    }
    const [isMobile, setIsMobile] = useState(checker(wwidth));

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    useEffect(()=>{
        setIsMobile(checker(wwidth))
    },[wwidth])


    useEffect(()=>{
        let lng=localStorage.getItem('lng');
        if(typeof lng!=='undefined' && lng!==null && lng!=''){
            changeLanguage(lng);
        }
    },[])




    return (
        <AppContext.Provider value={{
            t: t,
            changeLanguage: changeLanguage,
            isMobile:isMobile
        }}>
            <ThemeProvider theme={theme}>
                {/*<Loading open={loading}/>*/}
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index/>}>
                            <Route index element={<Home/>}/>
                            <Route path={'/news'} element={<News isProject={false}/>}/>
                            <Route path={'/project'} element={<Project isProject={true} isProduct={false}/>}/>
                            <Route path={'/product'} element={<Project isProject={false} isProduct={true}/>}/>
                            <Route path={'/certificate'} element={<Certificate/>}/>
                            <Route path={'/settings'} element={<Settings/>}/>
                            <Route path={'/about'} element={<About is_partner={false} type={0}/>}/>
                            <Route path={'/links'} element={<About is_partner={false} type={1}/>}/>
                            <Route path={'/partners'} element={<About is_partner={true} type={2}/>}/>
                            <Route path={'/parts'} element={<About is_partner={false} type={3}/>}/>
                            <Route path={'/other_about'} element={<About is_partner={false} type={4}/>}/>
                        </Route>
                        <Route path={'/login'} element={<Login/>}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>

            <ToastContainer/>
        </AppContext.Provider>
    );
}

export default App;
