import { appApiIns } from "./AppApi";

export interface GetLibrarianResponse{
    id: string
    libraryId: string | null,
    fullName: string,
    phone: string
}

export function getLibrarian(id:string){
    return appApiIns.get('librarian/get',{
        params: {
            id: id
        }
    });
}

export function getLibrarians(){
    return appApiIns.get('librarian/get/all');
}