import { FloatingLabel, Form, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UpdateLibrarianRequest, updateLibrarian } from '../api/LibrarianApi';
import { useNavigate } from 'react-router-dom';

export default function UpdatePersonModal(
    stateUpdateRequest: UpdateLibrarianRequest, setStateUpdateRequest: React.Dispatch<React.SetStateAction<UpdateLibrarianRequest>>,
    show:boolean, setShowModal: any,
    setShowToast: any, setError: React.Dispatch<any>) {

    const navigate = useNavigate();
    
    const onUpdateUser = () => {
        updateLibrarian(stateUpdateRequest)
            .then(() =>{
                setShowModal(false);
                navigate('/account');
            })
            .catch((error) => {
                navigate('/account');
                setShowModal(false);
                setShowToast(true);

                setStateUpdateRequest(stateUpdateRequest =>
                    ({...stateUpdateRequest, libraryNumber: null}))
                setStateUpdateRequest(stateUpdateRequest =>
                    ({...stateUpdateRequest, phone: null}))
                setStateUpdateRequest(stateUpdateRequest =>
                    ({...stateUpdateRequest, fullName: null}))

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
        <>
        <Modal show={show} onClose={() => setShowModal(false)}>
            <Modal.Header closeButton onClick={() => setShowModal(false)}>
            <Modal.Title>Изменение аккаунта</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack gap={3} className="mx-auto">
                    <FloatingLabel label="FullName">
                        <Form.Control placeholder="FullName" onChange={(t) => 
                            setStateUpdateRequest({...stateUpdateRequest, fullName: t.target.value})}/>
                    </FloatingLabel>
                    <FloatingLabel label="Phone">
                        <Form.Control placeholder="Number" onChange={(t) => 
                            setStateUpdateRequest({...stateUpdateRequest, phone: t.target.value})}/>
                    </FloatingLabel>
                    <FloatingLabel label="LibraryId">
                        <Form.Control type="id" placeholder="LibraryId" onChange={(t) => 
                            setStateUpdateRequest({...stateUpdateRequest, libraryNumber:
                                t.target.value != null ? Number(t.target.value) : null})}/>
                    </FloatingLabel>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
            </Button>
            <Button variant="primary" onClick={() => onUpdateUser()}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </>
  );
}