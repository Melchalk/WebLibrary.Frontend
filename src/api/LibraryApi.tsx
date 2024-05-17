import { appApiIns } from "./AppApi";

export interface CreateLibraryRequest{
    title: string,
    address: string,
    phone: string
}

export interface GetLibraryResponse{
    number: number,
    title: string,
    address: string,
    phone: string
    librariansCount: number,
    booksCount: number,
    issuesCount: number,
    owner: string,
}

export function createLibrary(request:CreateLibraryRequest){
    return appApiIns.post('library/create',{
        title: request.title,
        address: request.address,
        phone: request.phone,
    });
}

export function getLibrary(number:number){
    return appApiIns.get('library/get',{
        params: {
            number: number
        }
    });
}

export function getLibraries(){
    return appApiIns.get('library/get/all');
}

export function deleteLibrary(number:number){
    return appApiIns.delete('library/delete', {
        params: {
            number: number
        }
    });
}