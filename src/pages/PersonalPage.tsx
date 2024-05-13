import { useEffect, useState } from "react";
import { GetLibrarianResponse, getLibrarian } from "../api/LibrarianApi";
import { useAppSelector } from "../redux/hooks";
import { Stack } from "react-bootstrap";

export default function PersonalPage(){
    const [stateResponse, setStateResponse] = useState<GetLibrarianResponse>({
        libraryId: null,
        fullName: '',
        phone: '',
        id: ''
      });
    
    const id = useAppSelector((state) => state.auth.id)

    useEffect(() => {
        getLibrarian(id)
            .then((res) =>{
                setStateResponse({...stateResponse, libraryId: res.data?.libraryId});
                setStateResponse({...stateResponse, fullName: res.data?.fullName});
                setStateResponse({...stateResponse, phone: res.data?.phone});
                setStateResponse({...stateResponse, id: res.data?.id});               
            })
    });  

    return(
        <>
        <Stack gap={3} className="col-md-1 mx-auto mb-3">
            <h1> Информация о пользователе</h1>
            <h3> ФИО: {stateResponse.fullName}</h3>
            <h3> Номер телефона: {stateResponse.phone}</h3>
            <h3> Id библиотеки: {stateResponse.libraryId}</h3>
        </Stack>
        </>
    );
}