import { appApiIns } from "./AppApi";

export interface CreateBookRequest{
    hallNo: number | null,
    title: string,
    author: string | null,
    numberPages: number,
    yearPublishing: number,
    cityPublishing: string | null
}

export interface UpdateBookRequest{
    id: string,
    hallNo: number | null,
    title: string | null,
    author: string | null,
    numberPages: number | null,
    yearPublishing: number | null,
    cityPublishing: string | null
}

export interface GetBookResponse{
    id: string,
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

export function getBooks(){
    return appApiIns.get('book/get/all');
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
        hallNo: request.hallNo,
        title: request.title,
        author: request.author,
        numberPages: request.numberPages,
        yearPublishing: request.yearPublishing,
        cityPublishing: request.cityPublishing
    });
}
