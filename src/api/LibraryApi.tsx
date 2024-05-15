import { appApiIns } from "./AppApi";

export interface CreateLibraryRequest{
    title: string,
    address: string,
    phone: string
}

export interface GetLibraryResponse{
    id: string,
    title: string,
    address: string,
    phone: string
}

export function createReader(request:CreateLibraryRequest){
    return appApiIns.post('library/create',{
        title: request.title,
        address: request.address,
        phone: request.phone,
    });
}

export function getLibrary(id:string){
    return appApiIns.get('library/get',{
        params: {
            id: id
        }
    });
}

export function getLibraries(){
    return appApiIns.get('library/get/all');
}

export function deleteLibrary(id:string){
    return appApiIns.delete('library/delete', {
        params: {
            id: id
        }
    });
}