import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CreateBookRequest, GetBookResponse, UpdateBookRequest, getBooks } from "../api/BookApi";
import BooksTable from "../components/Book/BooksTable";
import ErrorToast from "../components/ErrorToast";
import CreateBookModal from "../components/Book/CreateBookModal";
import UpdateBookModal from "../components/Book/UpdateBookModal";
import { useAppSelector } from "../redux/hooks";

export default function BookPage(){
    const [stateResponse, setStateResponse] = useState<GetBookResponse[]>();    

    const [stateCreateRequest, setStateCreateRequest] = useState<CreateBookRequest>({
        title: '',
        libraryNumber: 0,
        author: null,
        numberPages: 0,
        yearPublishing: 0,
        cityPublishing: null,
        hallNo: null
    });    

    const [stateUpdateRequest, setStateUpdateRequest] = useState<UpdateBookRequest>({
        id: '',
        libraryNumber: null,
        title: null,
        author: null,
        numberPages: null,
        yearPublishing: null,
        cityPublishing: null,
        hallNo: null
    });      

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setError] = useState<any>();

    const libraryNumber = useAppSelector((state) => state.auth.libraryNumber)

    useEffect(() => {
        if (libraryNumber != null){
            setStateCreateRequest(stateCreateRequest => ({...stateCreateRequest, libraryNumber: libraryNumber}));

            getBooks(libraryNumber!)
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
                }
            })
        }
    }, []);  

    return(
        <>
            {libraryNumber != null
                ? <Button variant="warning" className="col-md-1.5 mb-3" onClick={() => setShowCreateModal(true)}>Создать книгу</Button>
                : <h2>Чтобы добавить книгу - создайте библиотеку</h2>}

            {libraryNumber == null || stateResponse?.length == 0 ? <h4>Книги не найдены</h4> :
                BooksTable(stateResponse!, setShowUpdateModal, setStateUpdateRequest)}

            {CreateBookModal(stateCreateRequest, setStateCreateRequest,
                showCreateModal, setShowCreateModal, setShowToast, setError)}
            {UpdateBookModal(stateUpdateRequest, setStateUpdateRequest,
                showUpdateModal, setShowUpdateModal, setShowToast, setError)}

            {ErrorToast(showToast, setShowToast, errorMessage)}
        </>
    )
}