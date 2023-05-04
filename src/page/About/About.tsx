import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Image from "mui-image";
import Loading from "../../components/Common/Loading";
import NewsFilter from "../../components/News/NewsFilter";
import Paper from "@mui/material/Paper";
import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, IconButton, Pagination, Skeleton, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../App";
import { AxiosInstance } from "../../common/AxiosInstance";
import {AboutType, GBody, IAbout, INews, IPagination} from "../../common/Model/Model";
import { ImageStyle } from "../../common/theme";
import { convertDateAndTime, getImagePath, valueChecker } from "../../common/utils";
import { showError, showSuccess } from "../../components/Common/Alert";
import AddAbout from "./AddAbout";
import EditAbout from "./EditAbout";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface IProps{
    is_partner: boolean;
    type: AboutType;
}


const About:React.FC<IProps> = (props:IProps) => {
    const {isMobile} = useContext(AppContext);
    const [data, setData] = useState<IAbout[] | undefined>();
    const [loading, setLoading] = useState(false);
    const {t}=useTranslation();

    function getData() {
        setLoading(true);
        AxiosInstance.get(`/about/get-about-items`)
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



    function deleteNews(id:number){
        if(window.confirm(t('want_delete'))){
            setLoading(true);
            AxiosInstance.patch('/about/delete-about/'+id)
                .then(response=>{
                    showSuccess(t('Deleted!'));
                    setLoading(false);
                    getData();
                })
                .catch(err=>{
                    setLoading(false);
                    showError(err.toString());
                })
        }
    }

    return (
        <Stack sx={{m: isMobile ? 1 : 3}} alignItems={'center'}>
            <Stack direction={'row'} sx={{width: '100%', mb: 2}} alignItems={'center'} justifyContent={'space-between'}>
                <NewsFilter/>
                <AddAbout getData={getData} is_partner={props.is_partner} type={props.type}/>
            </Stack>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>{t('ID')}</StyledTableCell>
                            <StyledTableCell>{t('Image')}</StyledTableCell>
                            <StyledTableCell>{t('Title')}</StyledTableCell>
                            <StyledTableCell>{t('Date')}</StyledTableCell>
                            <StyledTableCell align="right">{t('Delete')}</StyledTableCell>
                            <StyledTableCell align="right">{t('Edit')}</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {typeof data !== 'undefined' && data != null ?
                            valueChecker(data).filter((it:IAbout)=>it.type==props.type).map((row: IAbout) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell>
                                        {row.id}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Image
                                        showLoading={<Skeleton sx={{...ImageStyle}}/>}
                                        wrapperStyle={{...ImageStyle}}
                                        src={getImagePath(row.image)}/></StyledTableCell>
                                    <StyledTableCell>{row.title_tm}</StyledTableCell>
                                    <StyledTableCell>{convertDateAndTime(row.created_at.toString())}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <IconButton color={'error'} onClick={()=>deleteNews(row.id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                      <EditAbout getData={getData} item={row}/>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
            <Loading open={loading}/>
        </Stack>
    )
}

export default About;