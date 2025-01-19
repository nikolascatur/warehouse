export interface WebResponse<T> {
    data: T,
    status: boolean,
    message?:string,
    error?:string
}