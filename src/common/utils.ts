import {BASE_URL_2} from "./AxiosInstance";

export function valueChecker(value: any) {
    try {
        let it = value[0];
        console.log(value);
        return value;
    } catch (err) {
        return [];
    }
}

export function getImagePath(name:string){
    return `${BASE_URL_2}/${name}`;
}

export function getVideoPath(name:string){
    return `${BASE_URL_2}/${name}`;
}

export function getOtherPath(name:string){
    return `${BASE_URL_2}/${name}`;
}

export const convertTimeStampToDate=(s:string)=>{
    let d=new Date(s);
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

export const convertTimeStampToTime=(s:string)=>{
    let d=new Date(s);
    return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}

export const convertDateAndTime=(s:string)=>{
    return `${convertTimeStampToDate(s)} ${convertTimeStampToTime(s)}`
}
