import { appApiIns } from "./AppApi";

export interface CreateLibraryRequest{
    title: string,
    address: string,
    phone: string
}

export interface UpdateLibraryRequest{
    number: number,
    title: string | null,
    address: string | null,
    phone: string | null
}

export interface GetLibraryResponse{
    number: number,
    title: string,
    address: string,
    phone: string
    librariansCount: number,
    booksCount: number,
    issuesCount: number,
    ownerPhone: string,
    ownerName: string
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

export function updateLibrary(request:UpdateLibraryRequest){
    return appApiIns.put('library/update',{
        number: request.number,
        title: request.title,
        address: request.address,
        phone: request.phone,
    });
}