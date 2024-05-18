import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CreateReaderRequest, GetReaderResponse, UpdateReaderRequest, getReaders } from "../api/ReaderApi";
import ReadersTable from "../components/Reader/ReadersTable";
import ErrorToast from "../components/ErrorToast";
import CreateReaderModal from "../components/Reader/CreateReaderModal";
import UpdateReaderModal from "../components/Reader/UpdateReaderModal";

export default function PeaderPage(){
    const [stateResponse, setStateResponse] = useState<GetReaderResponse[]>();    

    const [stateCreateRequest, setStateCreateRequest] = useState<CreateReaderRequest>({
        fullName: '',
        phone: '',
        registrationAddress: null,
        age: 14,
    });    

    const [stateUpdateRequest, setStateUpdateRequest] = useState<UpdateReaderRequest>({
        id: '',
        fullName: null,
        phone: null,
        registrationAddress: null,
        age: null,
    });      

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setError] = useState<any>();

    useEffect(() => {
            getReaders()
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
            <Button variant="warning" className="col-md-1.5 mb-3" onClick={() => setShowCreateModal(true)}>Добавить читателя</Button>

            {stateResponse?.length == 0 ? <h4>Читатели не найдены</h4> :
                ReadersTable(stateResponse!, setShowUpdateModal, setStateUpdateRequest)}

            {CreateReaderModal(stateCreateRequest, setStateCreateRequest,
                showCreateModal, setShowCreateModal, setShowToast, setError)}
            {UpdateReaderModal(stateUpdateRequest, setStateUpdateRequest,
                showUpdateModal, setShowUpdateModal, setShowToast, setError)}

            {ErrorToast(showToast, setShowToast, errorMessage)}
        </>
    )
}