import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/authSlice';
import { deleteLibrary } from '../../api/LibraryApi';

export default function DeleteLibraryModal(
    number: number,
    show:boolean, setShowModal: any,
    setShowToast: any, setError: React.Dispatch<any>) {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const onDeleteLibrary = () => {
        deleteLibrary(number)
            .then(() => {
                dispatch(logout());
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
                <Modal.Title>Удаление библиотеки</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>Вы уверены, что хотите удалить библиотеку?</h6>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => onDeleteLibrary()}> Удалить </Button>
                <Button variant="secondary" onClick={() => setShowModal(false)}> Закрыть </Button>
            </Modal.Footer>
        </Modal>
  );
}