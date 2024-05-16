import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CreateBookRequest, GetBookResponse, getBooks } from "../api/BookApi";
import BooksTable from "../components/BooksTable";
import ErrorToast from "../components/ErrorToast";
import CreateBookModal from "../components/CreateBookModal";

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

    const [showModal, setShowModal] = useState(false);

    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setError] = useState<any>();

    useEffect(() => {
        getBooks()
            .then((res) =>{
                setStateResponse(res.data);
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
            <Button variant="warning" className="col-md-1.5 mb-3" onClick={() => setShowModal(true)}>Создать книгу</Button>

            {stateResponse?.length == 0 ? <h2>Книги не найдены</h2> : BooksTable(stateResponse!)}

            {CreateBookModal(
                stateCreateRequest, setStateCreateRequest,
                showModal, setShowModal, setShowToast, setError)}
            {ErrorToast(showToast, setShowToast, errorMessage)}
        </>
    )
}