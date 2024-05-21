import { FloatingLabel, Form, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { UpdateLibraryRequest, updateLibrary } from '../../api/LibraryApi';

export default function UpdateLibraryModal(
    stateRequest: UpdateLibraryRequest, setStateRequest: any,
    show:boolean, setShowModal: any,
    setShowToast: any, setError: React.Dispatch<any>) {

    const navigate = useNavigate();
    
    const onUpdateLibrary = () => {
        updateLibrary(stateRequest)
            .then((res) =>{
                setShowModal(false);
                navigate('/libraries');
            })
            .catch((error) => {
                navigate('/libraries');
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
                <Modal.Title>Создание библиотеки</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <Stack gap={3} className="mx-auto">
                    <FloatingLabel label="Название">
                        <Form.Control defaultValue={stateRequest.title ? stateRequest.title : "Не задано"}
                            isInvalid={stateRequest.title?.length == 0}
                            placeholder="Название" onChange={(t) => 
                                setStateRequest({...stateRequest, title: t.target.value})}/>
                        <Form.Control.Feedback type="invalid"> Добавьте Название </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel label="Адрес">
                        <Form.Control defaultValue={stateRequest.address? stateRequest.address : "Не задано"}
                            isInvalid={stateRequest.title?.length == 0}
                            placeholder="Адрес" onChange={(t) => 
                                setStateRequest({...stateRequest, address: t.target.value})}/>    
                        <Form.Control.Feedback type="invalid"> Добавьте адрес </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel label="Номер телефона">
                        <Form.Control defaultValue={stateRequest.phone? stateRequest.phone : "Не задано"}
                            isInvalid={stateRequest.title?.length == 0}
                            placeholder="Номер телефона" onChange={(t) => 
                                setStateRequest({...stateRequest, phone: t.target.value})}/>    
                        <Form.Control.Feedback type="invalid"> Добавьте номер телефона </Form.Control.Feedback>
                    </FloatingLabel>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => onUpdateLibrary()}> Обновить </Button>
                <Button variant="secondary" onClick={() => setShowModal(false)}> Закрыть </Button>   
            </Modal.Footer>
        </Modal>
  );
}