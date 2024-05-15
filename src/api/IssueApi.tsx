import { appApiIns } from "./AppApi";
import { GetBookResponse } from "./BookApi";

export interface CreateIssueRequest{
    readerId: string,
    period: number,
    booksId: string[],
}

export interface GetIssueResponse{
    id: string,
    readerId: string,
    returnDate: string,
    books: GetBookResponse[],
}

export function createReader(request:CreateIssueRequest){
    return appApiIns.post('issue/create',{
        readerId: request.readerId,
        period: request.period,
        booksId: request.booksId,
    });
}

export function getIssue(id:string){
    return appApiIns.get('issue/get',{
        params: {
            id: id
        }
    });
}

export function getIssues(){
    return appApiIns.get('issue/get/all');
}

export function deleteIssue(id:string){
    return appApiIns.delete('issue/delete', {
        params: {
            id: id
        }
    });
}