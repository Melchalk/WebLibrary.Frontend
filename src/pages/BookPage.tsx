import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CreateBookRequest, GetBookResponse, getBooks } from "../api/BookApi";
import BooksTable from "../components/BooksTable";

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
        <Button variant="warning" className="col-md-1.5 mb-3">Создать книгу</Button>

        {BooksTable(stateResponse!)}
        </>
    )
}