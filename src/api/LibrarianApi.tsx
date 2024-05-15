import { appApiIns } from "./AppApi";

export interface GetLibrarianResponse{
    id: string
    libraryNumber: number | null | string,
    fullName: string,
    phone: string
}

export function getLibrarian(number:number){
    return appApiIns.get('librarian/get',{
        params: {
            number: number
        }
    });
}

export function getLibrarians(){
    return appApiIns.get('librarian/get/all');
}