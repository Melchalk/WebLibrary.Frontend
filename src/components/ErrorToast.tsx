import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

export default function ErrorToast(show: boolean, setShow: React.Dispatch<React.SetStateAction<boolean>>) {
  return (
    <Row>
      <Col md={6} className="mb-2">
        <Toast show={show} onClose={() => setShow(false)}>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>Something was incorrect</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}