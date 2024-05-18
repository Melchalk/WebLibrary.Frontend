import { FloatingLabel, Form, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { CreateBookRequest, createBook } from '../../api/BookApi';

export default function CreateBookModal(
    stateRequest: CreateBookRequest, setStateRequest: any,
    show:boolean, setShowModal: any,
    setShowToast: any, setError: React.Dispatch<any>) {

    const navigate = useNavigate();
    
    const onCreateBook = () => {
        createBook(stateRequest)
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

    return (
        <Modal show={show} onClose={() => setShowModal(false)}>
            <Modal.Header closeButton onClick={() => setShowModal(false)}>
                <Modal.Title>Добавление книги</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <Stack gap={3} className="mx-auto">
                    <FloatingLabel label="Название">
                        <Form.Control defaultValue={stateRequest.title ? stateRequest.title : "Не задано"}
                            isInvalid={stateRequest.title == null || stateRequest.title?.length == 0}
                            placeholder="Название" onChange={(t) => 
                                setStateRequest({...stateRequest, title: t.target.value})}/>
                        <Form.Control.Feedback type="invalid"> Добавьте название </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel label="Автор">
                        <Form.Control defaultValue={stateRequest.author? stateRequest.author : "Не задано"}
                            placeholder="Автор" onChange={(t) => 
                                setStateRequest({...stateRequest, author: t.target.value})}/>    
                    </FloatingLabel>
                    <FloatingLabel label="Количество страниц">
                        <Form.Control defaultValue={stateRequest.numberPages? stateRequest.numberPages : "Не задано"} 
                            isInvalid={stateRequest.numberPages <= 0}
                            type="number" placeholder="Количество страниц" onChange={(t) => 
                                setStateRequest({...stateRequest, numberPages:
                                    Number(t.target.value) >= 0  ? Number(t.target.value) : stateRequest.numberPages})}/>
                        <Form.Control.Feedback type="invalid"> Количество страниц должно быть больше 0 </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel label="Год">
                        <Form.Control  defaultValue={stateRequest.yearPublishing? stateRequest.yearPublishing : "Не задано"} 
                            isInvalid={stateRequest.yearPublishing <= 0}
                            type="number" placeholder="Год" onChange={(t) => 
                                setStateRequest({...stateRequest, yearPublishing:
                                    Number(t.target.value) >= 0 ? Number(t.target.value) : stateRequest.yearPublishing})}/>
                        <Form.Control.Feedback type="invalid"> год должен быть больше 0 </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel label="Город">
                        <Form.Control defaultValue={stateRequest.cityPublishing? stateRequest.cityPublishing : "Не задано"}
                            placeholder="Город" onChange={(t) => 
                                setStateRequest({...stateRequest, cityPublishing: t.target.value})}/>    
                    </FloatingLabel>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => onCreateBook()}> Создать </Button>
                <Button variant="secondary" onClick={() => setShowModal(false)}> Закрыть </Button>
            </Modal.Footer>
        </Modal>
  );
}