import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CreateBookRequest, GetBookResponse, UpdateBookRequest, getBooks } from "../api/BookApi";
import BooksTable from "../components/Book/BooksTable";
import ErrorToast from "../components/ErrorToast";
import CreateBookModal from "../components/Book/CreateBookModal";
import UpdateBookModal from "../components/Book/UpdateBookModal";

export default function BookPage(){
    const [stateResponse, setStateResponse] = useState<GetBookResponse[]>();    

    const [stateCreateRequest, setStateCreateRequest] = useState<CreateBookRequest>({
        title: '',
        author: null,
        numberPages: 0,
        yearPublishing: 0,
        cityPublishing: null,
        hallNo: null
    });    

    const [stateUpdateRequest, setStateUpdateRequest] = useState<UpdateBookRequest>({
        id: '',
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

    useEffect(() => {
        getBooks()
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
    }, []);  

    return(
        <>
            <Button variant="warning" className="col-md-1.5 mb-3" onClick={() => setShowCreateModal(true)}>Создать книгу</Button>

            {stateResponse?.length == 0 ? <h2>Книги не найдены</h2> :
                BooksTable(stateResponse!, setShowUpdateModal, setStateUpdateRequest)}

            {CreateBookModal(
                stateCreateRequest, setStateCreateRequest,
                showCreateModal, setShowCreateModal, setShowToast, setError)}
            {UpdateBookModal(
                stateUpdateRequest!, setStateUpdateRequest,
                showUpdateModal, setShowUpdateModal, setShowToast, setError)}

            {ErrorToast(showToast, setShowToast, errorMessage)}
        </>
    )
}