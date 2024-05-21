import { appApiIns } from "./AppApi";

export interface CreateHallRequest{
    libraryNumber: number,
    number: number,
    title: string | null,
    thematic: string
}

export interface GetHallResponse{
    libraryNumber: number,
    number: number,
    title: string | null,
    thematic: string
}

export function createReader(request:CreateHallRequest){
    return appApiIns.post('hall/create',{
        libraryNumber: request.libraryNumber,
        number: request.number,
        title: request.title,
        thematic: request.thematic
    });
}

export function getHall(libraryNumber:number, number:number){
    return appApiIns.get('hall/get',{
        params: {
            libraryNumber: libraryNumber,
            number: number
        }
    });
}

export function getHalls(){
    return appApiIns.get('hall/get/all');
}

export function deleteHall(libraryNumber:number, number:number){
    return appApiIns.delete('hall/delete', {
        params: {
            libraryNumber: libraryNumber,
            number: number
        }
    });
}