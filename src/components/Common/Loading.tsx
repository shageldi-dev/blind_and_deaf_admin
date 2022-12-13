import React, {useState, useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface IProps{
    open:boolean
}

const Loading:React.FC<IProps> = (props:IProps) => {
    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Loading;