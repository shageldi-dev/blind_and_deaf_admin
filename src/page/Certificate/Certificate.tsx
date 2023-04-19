import AddCertificate from "./AddCertificate";
import AddNew from "../News/AddNew";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNews from "../News/EditNews";
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
import { IconButton, Pagination, Skeleton, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../App";
import { AxiosInstance } from "../../common/AxiosInstance";
import { GBody, ICertificate, INews, IPagination } from "../../common/Model/Model";
import { ImageStyle } from "../../common/theme";
import { convertDateAndTime, getImagePath, getOtherPath, valueChecker } from "../../common/utils";
import { showError, showSuccess } from "../../components/Common/Alert";

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

const Certificate = () => {
    const {isMobile} = useContext(AppContext);
    const [data, setData] = useState<GBody<ICertificate[]> | undefined>();
    const [loading, setLoading] = useState(false);

    const {t}=useTranslation();

    function getData() {
        setLoading(true);
        AxiosInstance.get(`/get-certificate`)
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

    function deleteCertificate(id:number){
        if(window.confirm(t('want_delete'))){
            setLoading(true);
            AxiosInstance.patch('/delete-certificate/'+id)
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
        <div>
            <Stack sx={{m: isMobile ? 1 : 3}} alignItems={'center'}>
                <Stack direction={'row'} sx={{width: '100%', mb: 2}} alignItems={'center'} justifyContent={'space-between'}>
                    <label></label>
                    <AddCertificate getData={getData}/>
                </Stack>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>{t('ID')}</StyledTableCell>
                                <StyledTableCell>{t('Image')}</StyledTableCell>
                                <StyledTableCell>{t('Name')}</StyledTableCell>
                                <StyledTableCell>{('Date')}</StyledTableCell>
                                <StyledTableCell>{t('certificate')}</StyledTableCell>
                                <StyledTableCell align="right">{t('Delete')}</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {typeof data?.body !== 'undefined' && data?.body != null ?
                                valueChecker(data?.body).map((row: ICertificate) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell>
                                            {row.id}
                                        </StyledTableCell>
                                        <StyledTableCell> <Image
                                            showLoading={<Skeleton sx={{...ImageStyle}}/>}
                                            wrapperStyle={{...ImageStyle}}
                                            src={getImagePath(row.image)}/></StyledTableCell>
                                        <StyledTableCell>{row.name}</StyledTableCell>
                                        <StyledTableCell>{convertDateAndTime(row.created_at)}</StyledTableCell>
                                        <StyledTableCell><a href={getOtherPath(row.file_path)}>{t('Open certificate')}</a></StyledTableCell>
                                        <StyledTableCell align="right">
                                            <IconButton color={'error'} onClick={()=>deleteCertificate(row.id)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Loading open={loading}/>
            </Stack>
        </div>
    )
}

export default Certificate;