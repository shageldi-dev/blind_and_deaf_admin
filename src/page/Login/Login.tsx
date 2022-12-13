import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {colors, Fonts} from "../../common/theme";
import {Player} from "@lottiefiles/react-lottie-player";
import {Button, Grid, Stack, TextField, Typography} from "@mui/material";
import {AppContext} from "../../App";
import LoginIcon from '@mui/icons-material/Login';
import {showError, showSuccess, showWarning} from "../../components/Common/Alert";
import {LoadingButton} from "@mui/lab";
import {AxiosInstance} from "../../common/AxiosInstance";
import {useTranslation} from "react-i18next";

const Background = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  background-color: ${colors.dark};
`;

const Input=styled.input`
  width: 95%;
  padding: 16px;
  background-color: white;
  color: black;
  font-family: ${Fonts.RalewayMedium};
  font-size: 16px;
  border-radius: 14px;
  border: none;
  outline: none;
`;

const Login = () => {
    const {isMobile} = useContext(AppContext);
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [isLoading,setIsLoading]=useState(false);

    const {t}=useTranslation();

    function login(){
        if (username.trim().length<=0 || password.trim().length<=0){
            showWarning(t('Please enter required informations!'));
        } else {
            setIsLoading(true);
            AxiosInstance.post('/sign-in',{
                username:username,
                password:password
            })
                .then(response=>{
                    if(!response.data.error){
                        showSuccess(t('Success'));
                        setIsLoading(false);
                        localStorage.setItem('fullname',response.data.body['fullname']);
                        localStorage.setItem('id',response.data.body['id']);
                        localStorage.setItem('username',response.data.body['username']);
                        localStorage.setItem('phone_number',response.data.body['phone_number']);
                        localStorage.setItem('my_token',response.data.body['token']);
                        sessionStorage.setItem('token',response.data.body['token']);
                        window.location.href='/';
                    }
                })
                .catch(err=>{
                    showError(err.toString());
                    setIsLoading(false);
                })
        }
    }

    return (
        <Background>
            <Grid container>
                <Grid item xs={12} md={6}>
                    {
                        isMobile ? null :
                            <Stack
                                alignItems={'center'}
                                justifyContent={'center'}
                                sx={{width: '100%', height: '100vh', background: 'white'}}>
                                <Player
                                    autoplay
                                    loop
                                    src={'/images/lottie/work.json'}
                                    style={{height: '60vh', width: '100%', objectFit: 'cover'}}
                                >
                                </Player>
                            </Stack>
                    }
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack sx={{mt: 4,p:4}} spacing={4}>
                        <Typography
                            sx={{fontFamily: Fonts.RalewayBlack, fontSize: '34px',color:'white'}}
                        >{t('WELCOME')}</Typography>

                        <Typography
                            sx={{fontFamily: Fonts.RalewayMedium, fontSize: '22px',color:'white'}}
                        >{t('Enter your username and password')}</Typography>

                        <Input
                            value={username}
                            onChange={e=>setUsername(e.target.value)}
                            placeholder={t('Username...')} type={'text'}/>
                        <Input
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            placeholder={t('Password...')} type={'password'}/>
                        <LoadingButton
                            loading={isLoading}
                            loadingPosition="start"
                            startIcon={<LoginIcon />}
                            variant="contained"
                            color="primary"
                            fullWidth={true}
                            onClick={login}
                        >
                            {isLoading ? <Typography>{t('Please wait...')}</Typography> : <Typography>{t('Login')}</Typography>}
                        </LoadingButton>
                    </Stack>
                </Grid>
            </Grid>

        </Background>
    )
}

export default Login;