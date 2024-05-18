import { FloatingLabel, Form, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { UpdateBookRequest, deleteBook, updateBook } from '../../api/BookApi';

export default function UpdateBookModal(
    stateRequest: UpdateBookRequest, setStateRequest: any,
    show:boolean, setShowModal: any,
    setShowToast: any, setError: React.Dispatch<any>) {

    const navigate = useNavigate();
    
    const onUpdateBook = () => {
        updateBook(stateRequest)
            .then(() =>{
                setShowModal(false);
                navigate('/books');
            })
            .catch((error) => {
                navigate('/books');
                setShowModal(false);
                setShowToast(true);

                if (error.response) {
                    setError(error.response.data);
                } else if (error.request) {
                    setError(error.request);
                } else {
                    setError(error.message);
                }
            })
    };

    const onDeleteBook = () => {
        deleteBook(stateRequest.id)
            .then(() => {
                setShowModal(false);
                navigate('/books');
            })
            .catch((error) => {
                navigate('/books');
                setShowModal(false);
                setShowToast(true);

                if (error.response) {
                    setError(error.response.data);
                } else if (error.request) {
                    setError(error.request);
                } else {
                    setError(error.message);
                }
            })
    };

    return (
        <Modal show={show} onClose={() => setShowModal(false)}>
            <Modal.Header closeButton onClick={() => setShowModal(false)}>
                <Modal.Title>Обновление книги</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <Stack gap={3} className="mx-auto">
                    <FloatingLabel label="Название">
                        <Form.Control defaultValue={stateRequest.title ? stateRequest.title : "Не задано"}
                            isInvalid={stateRequest.title == null || stateRequest.title?.length == 0}
                            placeholder="Название" onChange={(t) => 
                                setStateRequest({...stateRequest, title: t.target.value})}/>
                    </FloatingLabel>
                    <FloatingLabel label="Автор">
                        <Form.Control defaultValue={stateRequest.author? stateRequest.author : "Не задано"}
                            placeholder="Автор" onChange={(t) => 
                                setStateRequest({...stateRequest, author: t.target.value})}/>    
                    </FloatingLabel>
                    <FloatingLabel label="Количество страниц">
                        <Form.Control defaultValue={stateRequest.numberPages? stateRequest.numberPages : "Не задано"} 
                            type="number" placeholder="Количество страниц" onChange={(t) => 
                                setStateRequest({...stateRequest, numberPages:
                                (!isNaN(Number(t.target.value)) && Number(t.target.value) != 0)  ? Number(t.target.value) : null})}/>
                    </FloatingLabel>
                    <FloatingLabel label="Год публикации">
                        <Form.Control  defaultValue={stateRequest.yearPublishing? stateRequest.yearPublishing : "Не задано"} 
                            type="number" placeholder="Год публикации" onChange={(t) => 
                                setStateRequest({...stateRequest, yearPublishing:
                                (!isNaN(Number(t.target.value)) && Number(t.target.value) != 0)  ? Number(t.target.value) : null})}/>
                    </FloatingLabel>
                    <FloatingLabel label="Город публикации">
                        <Form.Control defaultValue={stateRequest.cityPublishing? stateRequest.cityPublishing : "Не задано"}
                            placeholder="Город публикации" onChange={(t) => 
                                setStateRequest({...stateRequest, cityPublishing: t.target.value})}/>    
                    </FloatingLabel>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => onUpdateBook()}> Обновить </Button>
                <Button variant="secondary" onClick={() => setShowModal(false)}> Закрыть </Button>
                <Button variant="danger" onClick={() => onDeleteBook()}> Удалить </Button>    
            </Modal.Footer>
        </Modal>
  );
}