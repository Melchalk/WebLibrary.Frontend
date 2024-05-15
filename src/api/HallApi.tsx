import { appApiIns } from "./AppApi";

export interface CreateHallRequest{
    libraryId: string,
    number: number,
    title: string | null,
    thematic: string
}

export interface GetHallResponse{
    libraryId: string,
    number: number,
    title: string | null,
    thematic: string
}

export function createReader(request:CreateHallRequest){
    return appApiIns.post('hall/create',{
        libraryId: request.libraryId,
        number: request.number,
        title: request.title,
        thematic: request.thematic
    });
}

export function getHall(libraryId:string, number:number){
    return appApiIns.get('hall/get',{
        params: {
            libraryId: libraryId,
            number: number
        }
    });
}

export function getHalls(){
    return appApiIns.get('hall/get/all');
}

export function deleteHall(libraryId:string, number:number){
    return appApiIns.delete('hall/delete', {
        params: {
            libraryId: libraryId,
            number: number
        }
    });
}