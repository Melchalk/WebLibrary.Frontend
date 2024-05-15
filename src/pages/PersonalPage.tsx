import { useEffect, useState } from "react";
import { GetLibrarianResponse, UpdateLibrarianRequest } from "../api/LibrarianApi";
import { useAppDispatch } from "../redux/hooks";
import { Button, Stack } from "react-bootstrap";
import { getCurrentUser, deleteCurrentUser } from "../auth/AuthService";
import { addId, logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import UpdatePersonModal from "../components/UpdatePersonModal";

export default function PersonalPage(){
    const [stateResponse, setStateResponse] = useState<GetLibrarianResponse>({
        libraryNumber: null,
        fullName: '',
        phone: '',
        id: ''
      });
    
    const [stateUpdateRequest, setStateUpdateRequest] = useState<UpdateLibrarianRequest>({
        id: null,
        libraryNumber: null,
        fullName: null,
        phone: null,
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        getCurrentUser()
            .then((res) =>{
                setStateResponse(res.data);
                
                if (stateResponse.libraryNumber == null){
                    setStateResponse(stateResponse => ({...stateResponse, libraryNumber: 'Не задан'}));
                }

                dispatch(addId(res.data?.id));
                setStateUpdateRequest(stateUpdateRequest => ({...stateUpdateRequest, id: res.data?.id}))
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
            <h1> Личный кабинет</h1>
            <h4> ФИО: {stateResponse.fullName}</h4>
            <h4> Номер телефона: {stateResponse.phone}</h4>
            <h4 className="mb-5"> Номер библиотеки: {stateResponse.libraryNumber}</h4>
            <Button variant="warning" className="col-md-2" onClick={() =>  setShow(true)}>Обновить аккаунт</Button>
            <Button variant="danger" className="col-md-2" onClick={() => onDelete()}>Удалить аккаунт</Button>
        </Stack>
        <br />
        {UpdatePersonModal(stateUpdateRequest, setStateUpdateRequest, show, handleClose)}
        </>
    );
}
