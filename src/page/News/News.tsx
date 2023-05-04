import AddIcon from "@mui/icons-material/Add";
import AddNew from "./AddNew";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditNews from "./EditNews";
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
import { GBody, INews, IPagination } from "../../common/Model/Model";
import { ImageStyle } from "../../common/theme";
import { convertDateAndTime, getImagePath, valueChecker } from "../../common/utils";
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

interface IProps{
    isProject:boolean
}


const News:React.FC<IProps> = (props:IProps) => {
    const {isMobile} = useContext(AppContext);
    const [data, setData] = useState<GBody<IPagination<INews[]>> | undefined>();
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const {t}=useTranslation();

    function getData() {
        setLoading(true);
        AxiosInstance.get(`/get-news?page=${page}&limit=20&is_project=${props.isProject}&is_product=false`)
            .then(response => {
                if (!response.data.error) {
                    try {
                        // if (response.data.body.pageCount > 0 && response.data.body.data.length > 0) {
                            setData(response.data);
                            setPageCount(response.data.body.pageCount);
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
    }, [page]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    function deleteNews(id:number){
        if(window.confirm(t('want_delete'))){
            setLoading(true);
            AxiosInstance.patch('/delete-news/'+id)
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
                <AddNew getData={getData} isProject={props.isProject} isProduct={false}/>
            </Stack>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>{t('ID')}</StyledTableCell>
                            <StyledTableCell>{t('Image')}</StyledTableCell>
                            <StyledTableCell>{t('Title')}</StyledTableCell>
                            <StyledTableCell>{t('Views')}</StyledTableCell>
                            <StyledTableCell>{t('Date')}</StyledTableCell>
                            <StyledTableCell align="right">{t('Delete')}</StyledTableCell>
                            <StyledTableCell align="right">{t('Edit')}</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {typeof data?.body.data !== 'undefined' && data?.body.data != null ?
                            valueChecker(data?.body.data).map((row: INews) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell>
                                        {row.id}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Image
                                        showLoading={<Skeleton sx={{...ImageStyle}}/>}
                                        wrapperStyle={{...ImageStyle}}
                                        src={getImagePath(row.first_image)}/></StyledTableCell>
                                    <StyledTableCell>{row.title_tm}</StyledTableCell>
                                    <StyledTableCell>{row.views}</StyledTableCell>
                                    <StyledTableCell>{convertDateAndTime(row.created_at)}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <IconButton color={'error'} onClick={()=>deleteNews(row.id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                      <EditNews getData={getData} item={row}/>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
            <Loading open={loading}/>
            <Pagination count={pageCount} onChange={handleChange} color="primary" page={page} sx={{mt: 3}}/>
        </Stack>
    )
}

export default News;