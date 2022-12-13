export type GBody<T>={
    error:boolean,
    message:string,
    body:T
}

export type IPagination<T>={
    data:T,
    pageCount:number
}

export type INews={
    id:number,
    title_tm:string,
    title_ru:string,
    title_en:string,
    content_tm:string,
    content_ru:string,
    content_en:string,
    views:string,
    created_at:string,
    updated_at:string,
    is_project:boolean,
    files:IFiles[],
    first_image:string
}

export type IFiles={
    id:number,
    url:string,
    parent_id:number,
    mime_type:number,
    created_at:string,
    updated_at:string
}

export type ICertificate={
    id:number,
    name:string,
    image:string,
    file_path:string,
    status:boolean,
    created_at:string,
    updated_at:string
}

export type IHome={
    visits:number,
    news_count:number,
    project_count:number,
    notif_count:number,
    news_view:number,
    project_view:number,
    inbox:IInbox[]
}

export type IInbox={
    id:number,
    fullname:string,
    phone_number:string,
    email:string,
    message:string,
    is_read:boolean,
    created_at:string,
    updated_at:string
}