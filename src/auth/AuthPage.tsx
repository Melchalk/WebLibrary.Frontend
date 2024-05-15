import { Button, FloatingLabel, Form, Stack } from "react-bootstrap";
import { useAppDispatch } from "../redux/hooks";
import { addAuthToken, addRefreshToken, login, logout } from "../redux/authSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterRequest, loginUser, registerUser } from "./AuthService";
import ErrorToast from "../components/ErrorToast";

export function LogoutPage() {
  const dispatch = useAppDispatch();

  useEffect(() => { 
      dispatch(logout());
  });

  return (
    <h1>Successful account logout</h1>
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
            dispatch(login(true));
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
      <Stack gap={3} className="col-md-2 mx-auto mb-3">
        <FloatingLabel controlId="floatingInput" label="Phone" >
          <Form.Control type="phone" placeholder="name@example.com" onChange={(t) => setStatePhone(t.target.value)}/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control type="password" placeholder="Password" onChange={(t) => setStatePassword(t.target.value)}/>
        </FloatingLabel>
        <Button variant="warning" className="mx-auto" onClick={() => onLoginUser()}>Ok</Button>
      </Stack>
      <br />
        {ErrorToast(show, setShow, errorMessage)}
      </>
    );
}

export function RegisterPage() {
  const [stateRequest, setStateRequest] = useState<RegisterRequest>({
    libraryId: null,
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
          dispatch(login(true));
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
      <Stack gap={3} className="col-md-2 mx-auto mb-3">
        <FloatingLabel label="FullName">
          <Form.Control placeholder="FullName" onChange={(t) => 
            setStateRequest({...stateRequest, fullName: t.target.value})}/>
        </FloatingLabel>
        <FloatingLabel label="Phone">
          <Form.Control placeholder="Number" onChange={(t) => 
            setStateRequest({...stateRequest, phone: t.target.value})}/>
        </FloatingLabel>
        <FloatingLabel label="Password">
          <Form.Control type="password" placeholder="Password" onChange={(t) => 
            setStateRequest({...stateRequest, password: t.target.value})}/>
        </FloatingLabel>
        <Button variant="warning" className="mx-auto"  onClick={() => onRegisterUser()}>Ok</Button>
      </Stack>
      <br />
      {ErrorToast(show, setShow, errorMessage)}
    </>
  );
}