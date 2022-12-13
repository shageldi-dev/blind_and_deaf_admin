import React, {useState, useEffect, useContext} from 'react';
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {IconButton, Pagination, Skeleton, Stack} from "@mui/material";
import NewsFilter from "../../components/News/NewsFilter";
import AddNew from "../News/AddNew";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {getImagePath, valueChecker} from "../../common/utils";
import {GBody, INews, IPagination} from "../../common/Model/Model";
import Image from "mui-image";
import {ImageStyle} from "../../common/theme";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNews from "../News/EditNews";
import Loading from "../../components/Common/Loading";
import {AppContext} from "../../App";
import {AxiosInstance} from "../../common/AxiosInstance";

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

const Constants = () => {
    const {isMobile} = useContext(AppContext);
    const [data, setData] = useState<GBody<IPagination<INews[]>> | undefined>();
    const [loading, setLoading] = useState(false);

    function getData() {
        setLoading(true);
        AxiosInstance.get(`/`)
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
        // getData();
    }, []);
    return (
        <div>
            <Stack sx={{m: isMobile ? 1 : 3}} alignItems={'center'}>
                <Stack direction={'row'} sx={{width: '100%', mb: 2}} alignItems={'center'} justifyContent={'space-between'}>

                </Stack>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell>Type</StyledTableCell>
                                <StyledTableCell>Title</StyledTableCell>
                                <StyledTableCell>Date</StyledTableCell>
                                <StyledTableCell align="right">Edit</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {typeof data?.body.data !== 'undefined' && data?.body.data != null ?
                                valueChecker(data?.body.data).map((row: INews) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell>
                                            {row.id}
                                        </StyledTableCell>
                                        <StyledTableCell></StyledTableCell>
                                        <StyledTableCell>{row.title_tm}</StyledTableCell>
                                        <StyledTableCell>{row.created_at}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <EditNews getData={getData} item={row}/>
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

export default Constants;