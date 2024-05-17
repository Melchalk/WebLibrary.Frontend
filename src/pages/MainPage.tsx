import { Button, Stack } from "react-bootstrap";
import { CreateLibraryRequest, GetLibraryResponse, getLibrary } from "../api/LibraryApi";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import ErrorToast from "../components/ErrorToast";
import CreateLibraryModal from "../components/Library/CreateLibraryModal";
import DeleteLibraryModal from "../components/Library/DeleteLibraryModal";

export default function MainPage(){
    const [stateResponse, setStateResponse] = useState<GetLibraryResponse | null>();    
    const libraryNumber = useAppSelector((state) => state.auth.libraryNumber)

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setError] = useState<any>();

    const [stateCreateRequest, setStateCreateRequest] = useState<CreateLibraryRequest>({
        title: '',
        address: '',
        phone: ''
    });    

    useEffect(() => {
        if (libraryNumber != null){
            getLibrary(libraryNumber!)
            .then((res) =>{
                if (stateResponse != res.data){
                    setStateResponse(res.data);
                }
            })
            .catch((error) => {
                setShowToast(true);
                if (error.response) {
                    setError(error.response.data);
                } else if (error.request) {
                    setError(error.request);
                } else {
                    setError(error.message);
            }})
        }
    }, []);  

    return(
        <>
        {stateResponse != null
        ? 
        <>
        <Stack gap={3} className="mx-auto">
            <h1> Информация о библиотеке</h1>
            <h4> Название: {stateResponse?.title ? "Не задано" : stateResponse.title}</h4>
            <h4> Адрес: {stateResponse?.address}</h4>
            <h4 className="mb-5"> Номер телефона: {}</h4>

            <h2> Статистика</h2>
            <h4> Сотрудники: {}</h4>
            <h4> Книги: {}</h4>
            <h4> Выдачи: {}</h4>

            <h6> Создана </h6>
        </Stack>
        <Stack gap={3} direction= "horizontal" >
            <Button variant="warning" className="col-md-1.5" onClick={() =>  setShowUpdateModal(true)}>Обновить аккаунт</Button>
            <Button variant="danger" className="col-md-1.5" onClick={() => setShowDeleteModal(true)}>Удалить аккаунт</Button>
        </Stack>

        {DeleteLibraryModal(libraryNumber!, showDeleteModal, setShowDeleteModal, setShowToast, setError)}

        {ErrorToast(showToast, setShowToast, errorMessage)}
        </>
        : <>
            <Button variant="warning" className="col-md-1.5" onClick={() =>  setShowCreateModal(true)}>Создать библиотеку</Button>
            <h2>Библиотека не найдены</h2>
            
            {CreateLibraryModal(stateCreateRequest, setStateCreateRequest,
                showCreateModal, setShowCreateModal, setShowToast, setError)}
            </> 
            }
        </>
    )
}