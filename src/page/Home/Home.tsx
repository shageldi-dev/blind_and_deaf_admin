import React, {useContext, useEffect, useState} from "react";
import {colors, Fonts} from "../../common/theme";
import {Box, Grid, Stack, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {AppContext} from "../../App";
import HomeCard from "../../components/Home/HomeCard";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {GBody, IHome, IInbox} from "../../common/Model/Model";
import {AxiosInstance} from "../../common/AxiosInstance";
import Loading from "../../components/Common/Loading";
import {convertDateAndTime, valueChecker} from "../../common/utils";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const Home = () => {
    const {t} = useTranslation();
    const {isMobile} = useContext(AppContext);
    const [data,setData]=useState<GBody<IHome> | undefined>();

    const [loading, setLoading] = useState(false);

    function getData() {
        setLoading(true);
        AxiosInstance.get(`/get-stat`)
            .then(response => {
                if (!response.data.error) {
                    try {
                        // if (response.data.body.pageCount > 0 && response.data.body.data.length > 0) {
                        setData(response.data);
                        // }
                    } catch (err) {

                    }
                }
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            })
    }

    useEffect(() => {
        getData();
    }, []);



    return (
        <Box sx={{width: '100%'}}>
            <Typography sx={{
                ml: isMobile ? 1 : 3,
                fontFamily: Fonts.OpenSansBold,
                fontSize: '30px'
            }}>{t('dashboard')}</Typography>
            <Stack>
                <Grid container sx={{p: isMobile ? 1 : 3}} spacing={2}>
                    <Grid item xs={12} sm={12} md={4}>
                        <HomeCard title={t("news")} desc={`${t('News count:')} ${data?.body.news_count}`} animation={'/images/lottie/news.json'}
                                  background={'linear-gradient(90deg, rgba(236,94,225,1) 0%, rgba(73,72,225,1) 77%)'}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <HomeCard title={t('projects')} desc={`${t('Project count:')} ${data?.body.project_count}`}
                                  animation={'/images/lottie/project.json'}
                                  background={'linear-gradient(90deg, rgba(100,183,240,1) 0%, rgba(96,138,226,1) 77%)'}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <HomeCard title={t("Visit")} desc={`${t('Visit count:')} ${data?.body.visits}`} animation={'/images/lottie/visit.json'}
                                  background={'linear-gradient(90deg, rgba(91,110,237,1) 0%, rgba(159,163,253,1) 77%)'}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <HomeCard title={t("Notification")} desc={`${t('Notification count:')} ${data?.body.notif_count}`}
                                  animation={'/images/lottie/notification.json'}
                                  background={'linear-gradient(90deg, rgba(66,213,181,1) 0%, rgba(102,144,235,1) 77%)'}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <HomeCard title={t("News view")} desc={`${t('News view count:')} ${data?.body.news_view}`}
                                  animation={'/images/lottie/view.json'}
                                  background={'linear-gradient(90deg, rgba(230,102,151,1) 0%, rgba(251,189,147,1) 77%)'}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <HomeCard title={t("Projects view")} desc={`${t('Projects view count:')} ${data?.body.project_view}`}
                                  animation={'/images/lottie/view.json'}
                                  background={'linear-gradient(90deg, #314755 0%, #26a0da 77%)'}/>
                    </Grid>
                </Grid>
            </Stack>

            <Typography sx={{
                ml: isMobile ? 1 : 3,
                fontFamily: Fonts.OpenSansBold,
                fontSize: '30px'
            }}>{t('latest_notif')}</Typography>

            <Stack sx={{p: isMobile ? 1 : 3}}>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('fullname')}</TableCell>
                                <TableCell align="right">{t('email')}</TableCell>
                                <TableCell align="right">{t('phone')}</TableCell>
                                <TableCell align="right">{t('date')}</TableCell>
                                <TableCell align="right">{t('message')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.body.inbox.map((row:IInbox) => (
                                <TableRow
                                    key={row.id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.fullname}
                                    </TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.phone_number}</TableCell>
                                    <TableCell align="right">{convertDateAndTime(row.created_at)}</TableCell>
                                    <TableCell align="right">{row.message}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Loading open={loading}/>
            </Stack>
        </Box>
    )
}

export default Home