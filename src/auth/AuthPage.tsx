import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useAppDispatch } from "../redux/hooks";
import { addAuthToken, addRefreshToken, login } from "../redux/authSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterRequest, loginUser, registerUser } from "./AuthService";
import ErrorToast from "../components/ErrorToast";

export function LogoutPage() {
  const dispatch = useAppDispatch();

  useEffect(() => { 
      dispatch(addAuthToken(null));
      dispatch(addRefreshToken(null));
      dispatch(login(false));
  });

  return (
    <h1>Successful account logout</h1>
  );
}

export function LoginPage() {
    const [statePhone, setStatePhone] = useState<string>("");
    const [statePassword, setStatePassword] = useState<string>("");   
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const [show, setShow] = useState(false);

    const onLoginUser = () => {
      loginUser(statePhone, statePassword)
        .then((res) =>{
            dispatch(addAuthToken(res.data?.accessToken));
            dispatch(addRefreshToken(res.data?.refreshToken));
            dispatch(login(true));
            navigate('/home');
        })
        .catch(() => setShow(true))
    };

    return (
      <>
        <FloatingLabel controlId="floatingInput" label="Phone" className="mb-3">
          <Form.Control type="phone" placeholder="name@example.com" onChange={(t) => setStatePhone(t.target.value)}/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control type="password" placeholder="Password" onChange={(t) => setStatePassword(t.target.value)}/>
        </FloatingLabel>
        <br />
        <Button variant="warning" onClick={() => onLoginUser()}>Ok</Button>
        <br />
        {ErrorToast(show, setShow)}
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

  const onRegisterUser = () => {
    registerUser(stateRequest)
      .then((res) =>{
          dispatch(addAuthToken(res.data?.accessToken));
          dispatch(addRefreshToken(res.data?.refreshToken));
          navigate('/home');
      })
      .catch(() => setShow(true))
  };

  return (
    <>
      <FloatingLabel label="FullName" className="mb-3">
        <Form.Control placeholder="FullName" onChange={(t) => 
          setStateRequest({...stateRequest, fullName: t.target.value})}/>
      </FloatingLabel>
      <FloatingLabel label="Phone" className="mb-3">
        <Form.Control placeholder="Number" onChange={(t) => 
          setStateRequest({...stateRequest, phone: t.target.value})}/>
      </FloatingLabel>
      <FloatingLabel label="Password">
        <Form.Control type="password" placeholder="Password" onChange={(t) => 
          setStateRequest({...stateRequest, password: t.target.value})}/>
      </FloatingLabel>
      <br />
      <Button variant="warning" onClick={() => onRegisterUser()}>Ok</Button>
      <br />
      {ErrorToast(show, setShow)}
    </>
  );
}