import { appApiIns } from "./AppApi";

export interface CreateIssueRequest{
    readerId: string,
    period: number,
    booksId: string[],
}

export interface UpdateIssueRequest{
    id : string,
    addPeriod: number | null,
    booksId: string[] | null,
}

export interface GetIssueResponse{
    id: string,
    readerId: string,
    returnDate: string,
    booksId: string[],
}

export function createIssue(request:CreateIssueRequest){
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

export function getIssuesInLibrary(libraryNumber:number){
    return appApiIns.get('issue/get/library',{
        params: {
            libraryNumber: libraryNumber
        }
    });
}

export function deleteIssue(id:string){
    return appApiIns.delete('issue/delete', {
        params: {
            id: id
        }
    });
}

export function updateIssue(request:UpdateIssueRequest){
    return appApiIns.put('issue/update',{
        id: request.id,
        addPeriod: request.addPeriod,
        booksId: request.booksId,
    });
}
