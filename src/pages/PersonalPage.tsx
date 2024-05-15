import { useEffect, useState } from "react";
import { GetLibrarianResponse } from "../api/LibrarianApi";
import { useAppDispatch } from "../redux/hooks";
import { Button, Stack } from "react-bootstrap";
import { getCurrentUser, deleteCurrentUser } from "../auth/AuthService";
import { addId, logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function PersonalPage(){
    const [stateResponse, setStateResponse] = useState<GetLibrarianResponse>({
        libraryNumber: null,
        fullName: '',
        phone: '',
        id: ''
      });
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser()
            .then((res) =>{
                setStateResponse(res.data);
                
                if (stateResponse.libraryNumber == null){
                    setStateResponse(stateResponse => ({...stateResponse, libraryNumber: 'Не задан'}));
                }

                dispatch(addId(res.data?.id))
            })
            .catch(() => console.log('hss'))
    }, []);  

    const onDelete = () => {
        deleteCurrentUser()
            .then(() => {
                dispatch(logout());
                navigate('/home');
            })
    };

    return(
        <>
        <Stack gap={3} className="mx-auto">
            <h1> Информация о пользователе</h1>
            <h4> ФИО: {stateResponse.fullName}</h4>
            <h4> Номер телефона: {stateResponse.phone}</h4>
            <h4 className="mb-5"> Номер библиотеки: {stateResponse.libraryNumber}</h4>
        <Button variant="danger" className="col-md-2" onClick={() => onDelete()}>Удалить аккаунт</Button>
        </Stack>
        <br />
        </>
    );
}