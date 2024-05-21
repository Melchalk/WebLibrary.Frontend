import { appApiIns } from "../api/AppApi";

export interface LoginResult{
    accessToken : string;
    refreshToken : string;
}

export interface RegisterRequest{
    libraryNumber: number | null,
    fullName: string,
    phone: string,
    password: string
}

export function loginUser(userPhone:string, userPassword:string){
    return appApiIns.post('auth/login',{
        phone: userPhone,
        password: userPassword
    });
}

export function registerUser(request:RegisterRequest){
    return appApiIns.post('auth/register',{
        libraryNumber: request.libraryNumber,
        fullName: request.fullName,
        phone: request.phone,
        password: request.password
    });
}

export function getCurrentUser(){
    return appApiIns.get('auth/get/current');
}

export function deleteCurrentUser(){
    return appApiIns.delete('auth/delete/current');
}