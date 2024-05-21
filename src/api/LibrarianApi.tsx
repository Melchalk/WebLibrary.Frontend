import { appApiIns } from "./AppApi";

export interface GetLibrarianResponse{
    id: string
    libraryNumber: number | null | string,
    fullName: string,
    phone: string
}

export interface UpdateLibrarianRequest{
    id: string | null,
    libraryNumber: number | null,
    fullName: string | null,
    phone: string | null,
}

export function updateLibrarian(request:UpdateLibrarianRequest){
    return appApiIns.put('librarian/update',{
        id: request.id,
        libraryNumber: request.libraryNumber,
        fullName: request.fullName,
        phone: request.phone
    });
}

export function getLibrarians(){
    return appApiIns.get('librarian/get/all');
}

export function getLibrarian(number:number){
    return appApiIns.get('librarian/get',{
        params: {
            number: number
        }
    });
}