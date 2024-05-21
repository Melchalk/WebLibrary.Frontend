import { Button, FloatingLabel, Form, Nav, Stack, Toast, ToastContainer } from "react-bootstrap";
import { useAppDispatch } from "../redux/hooks";
import { addAuthToken, addRefreshToken, logout } from "../redux/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterRequest, loginUser, registerUser } from "./AuthService";
import ErrorToast from "../components/ErrorToast";

export function LogoutPage() {
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(true);

  const onLogout = () =>{
    dispatch(logout());
  };

  return (
    <>
      <ToastContainer className = "p-3" position='top-end'>
        <Toast show={show} onClose={() => setShow(false)}>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>Successful account logout</Toast.Body>
        </Toast>
      </ToastContainer>
      {onLogout()}
    </>
  );
}

export function LoginPage() {
    const [statePhone, setStatePhone] = useState<string>("");
    const [statePassword, setStatePassword] = useState<string>("");   
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [show, setShow] = useState(false);
    const [errorMessage, setError] = useState<any>();

    const onLoginUser = () => {
      loginUser(statePhone, statePassword)
        .then((res) =>{
            dispatch(addAuthToken(res.data?.accessToken));
            dispatch(addRefreshToken(res.data?.refreshToken));

            navigate('/account');
        })
        .catch((error) => {
          setShow(true);
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
        <Stack gap={3} className="col-md-2 mx-auto mb-3 mt-5">
          <FloatingLabel controlId="floatingInput" label="Номер телефона" >
            <Form.Control type="phone" placeholder="Номер телефона" onChange={(t) => setStatePhone(t.target.value)}/>
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Пароль">
            <Form.Control type="password" placeholder="Пароль" onChange={(t) => setStatePassword(t.target.value)}/>
          </FloatingLabel>

          <Button variant="warning" className="mx-auto" onClick={() => onLoginUser()}>Ok</Button>
          
          <Nav.Item className="mx-auto">
            <Nav.Link href="/register">Регистрация</Nav.Link>
          </Nav.Item>
        </Stack>
      
        {ErrorToast(show, setShow, errorMessage)}
      </>
    );
}

export function RegisterPage() {
  const [stateRequest, setStateRequest] = useState<RegisterRequest>({
    libraryNumber: null,
    fullName: '',
    phone: '',
    password: ''
  });

  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  
  const [show, setShow] = useState(false);
  const [errorMessage, setError] = useState<any>();

  const onRegisterUser = () => {
    registerUser(stateRequest)
      .then((res) =>{
          dispatch(addAuthToken(res.data?.accessToken));
          dispatch(addRefreshToken(res.data?.refreshToken));

          navigate('/account');
      })
      .catch((error) => {
        setShow(true);
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
      <Stack gap={3} className="col-md-2 mx-auto mb-3 mt-5">
        <FloatingLabel label="ФИО">
          <Form.Control placeholder="ФИО" onChange={(t) => 
            setStateRequest({...stateRequest, fullName: t.target.value})}/>
        </FloatingLabel>
        <FloatingLabel label="Номер телефона">
          <Form.Control type="phone" placeholder="Номер телефона" onChange={(t) => 
            setStateRequest({...stateRequest, phone: t.target.value})}/>
        </FloatingLabel>
        <FloatingLabel label="Пароль">
          <Form.Control type="password" placeholder="Пароль" onChange={(t) => 
            setStateRequest({...stateRequest, password: t.target.value})}/>
        </FloatingLabel>

        <Button variant="warning" className="mx-auto"  onClick={() => onRegisterUser()}>Ok</Button>
        
        <Nav.Item className="mx-auto">
          <Nav.Link href="/auth">Вход</Nav.Link>
        </Nav.Item>
      </Stack>

      {ErrorToast(show, setShow, errorMessage)}
    </>
  );
}