import { appApiIns } from "./AppApi";
import { GetIssueResponse } from "./IssueApi";

export interface CreateReaderRequest{
    fullName: string,
    phone: string,
    registrationAddress: string | null,
    age: number,
}

export interface UpdateReaderRequest{
    id: string,
    fullName: string | null,
    phone: string | null,
    registrationAddress: string | null,
    age: number | null,
}

export interface GetReaderResponse{
    id: string,
    fullName: string,
    phone: string,
    registrationAddress: string | null,
    age: number,
    canTakeBooks: boolean,
    issueId: string | null
}

export function createReader(request:CreateReaderRequest){
    return appApiIns.post('reader/create',{
        fullName: request.fullName,
        phone: request.phone,
        registrationAddress: request.registrationAddress,
        age: request.age,
    });
}

export function getReader(id:string){
    return appApiIns.get('reader/get',{
        params: {
            id: id
        }
    });
}

export function getReaders(){
    return appApiIns.get('reader/get/all');
}

export function deleteReader(id:string){
    return appApiIns.delete('reader/delete', {
        params: {
            id: id
        }
    });
}

export function updateReader(request:UpdateReaderRequest){
    return appApiIns.put('reader/update',{
        id: request.id,
        fullName: request.fullName,
        phone: request.phone,
        registrationAddress: request.registrationAddress,
        age: request.age,
    });
}
