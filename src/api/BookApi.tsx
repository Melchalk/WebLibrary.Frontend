import { appApiIns } from "./AppApi";

export interface CreateBookRequest{
    libraryNumber: number,
    hallNo: number | null,
    title: string,
    author: string | null,
    numberPages: number,
    yearPublishing: number,
    cityPublishing: string | null
}

export interface UpdateBookRequest{
    id: string,
    libraryNumber: number | null,
    hallNo: number | null,
    title: string | null,
    author: string | null,
    numberPages: number | null,
    yearPublishing: number | null,
    cityPublishing: string | null
}

export interface GetBookResponse{
    id: string,
    libraryNumber: number,
    hallNo: number | null,
    title: string,
    author: string | null,
    numberPages: number,
    yearPublishing: number,
    cityPublishing: string | null,
    issueId: string | null,
}

export function createBook(request:CreateBookRequest){
    return appApiIns.post('book/create',{
        hallNo: request.hallNo,
        libraryNumber: request.libraryNumber,
        title: request.title,
        author: request.author,
        numberPages: request.numberPages,
        yearPublishing: request.yearPublishing,
        cityPublishing: request.cityPublishing
    });
}

export function getBook(id:string){
    return appApiIns.get('book/get',{
        params: {
            id: id
        }
    });
}

export function getBooks(libraryNumber:number){
    return appApiIns.get('book/get/all',{
        params: {
            libraryNumber: libraryNumber
        }
    });
}

export function getFreeBooks(libraryNumber:number){
    return appApiIns.get('book/get/all',{
        params: {
            libraryNumber: libraryNumber
        }
    });
}

export function deleteBook(id:string){
    return appApiIns.delete('book/delete', {
        params: {
            id: id
        }
    });
}

export function updateBook(request:UpdateBookRequest){
    return appApiIns.put('book/update',{
        id: request.id,
        libraryNumber: request.libraryNumber,
        hallNo: request.hallNo,
        title: request.title,
        author: request.author,
        numberPages: request.numberPages,
        yearPublishing: request.yearPublishing,
        cityPublishing: request.cityPublishing
    });
}
