import { useEffect, useState } from "react";
import { GetLibrarianResponse, UpdateLibrarianRequest } from "../api/LibrarianApi";
import { useAppDispatch } from "../redux/hooks";
import { Button, Stack } from "react-bootstrap";
import { getCurrentUser } from "../auth/AuthService";
import { addId, addLibraryNumber } from "../redux/authSlice";
import UpdatePersonModal from "../components/User/UpdatePersonModal";
import ErrorToast from "../components/ErrorToast";
import DeletePersonModal from "../components/User/DeletePersonModal";

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

    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setError] = useState<any>();

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        getCurrentUser()
            .then((res) =>{
                setStateResponse(res.data);
                setStateUpdateRequest(res.data);            
                
                if (res.data?.libraryNumber == null){
                    setStateResponse(stateResponse => ({...stateResponse, libraryNumber: 'Не задан'}));
                }

                dispatch(addId(res.data?.id));
                dispatch(addLibraryNumber(res.data?.libraryNumber))
            })
            .catch((error) => {
                setShowToast(true);
                if (error.response) {
                    setError(error.response.data);
                } else if (error.request) {
                    setError(error.request);
                } else {
                    setError(error.message);
                }
            })
    }, []);  

    return(
        <>
            <Stack gap={3} className="mx-auto">
                <h1> Личный кабинет</h1>
                <h4> ФИО: {stateResponse.fullName}</h4>
                <h4> Номер телефона: {stateResponse.phone}</h4>
                <h4> Номер библиотеки: {stateResponse.libraryNumber}</h4>

                <Stack gap={3} direction= "horizontal" >
                    <Button variant="warning" className="col-md-1.5" onClick={() =>  setShowUpdateModal(true)}>Обновить аккаунт</Button>
                    <Button variant="danger" className="col-md-1.5" onClick={() => setShowDeleteModal(true)}>Удалить аккаунт</Button>
                </Stack>
            </Stack>

            {DeletePersonModal(showDeleteModal, setShowDeleteModal, setShowToast, setError)}
            
            {UpdatePersonModal(stateUpdateRequest, setStateUpdateRequest,
                showUpdateModal, setShowUpdateModal, setShowToast, setError)}
                
            {ErrorToast(showToast, setShowToast, errorMessage)}
        </>
    );
}
