import { FloatingLabel, Form, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { deleteIssue, } from '../../api/IssueApi';

export default function DeleteIssueModal(
    issueId: string,
    show:boolean, setShowModal: any,
    setShowToast: any, setError: React.Dispatch<any>) {

    const navigate = useNavigate();

    const onDeleteIssue = () => {
        deleteIssue(issueId)
            .then(() => {
                setShowModal(false);
                navigate('/issues');
            })
            .catch((error) => {
                navigate('/issues');
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
                <Modal.Title>Информация о выдаче</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <Stack gap={3} className="mx-auto">

                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}> Закрыть </Button>
                <Button variant="danger" onClick={() => onDeleteIssue()}> Удалить </Button>    
            </Modal.Footer>
        </Modal>
  );
}