import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useAppDispatch } from "../redux/hooks";
import { addAuthToken, addRefreshToken, login } from "../redux/authSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterRequest, loginUser, registerUser } from "./authService";

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
    
    let status: number;

    const onLoginUser = () => {
      loginUser(statePhone, statePassword)
        .then((res) =>{
            console.log('sdf')
            dispatch(addAuthToken(res.data?.accessToken));
            dispatch(addRefreshToken(res.data?.refreshToken));
            dispatch(login(true));
            navigate('/home');
            status = res.status;
        })
        .catch(() => navigate('/error/' + status))
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
      </>
    );
}

export function RegisterPage() {
  const [stateRequest, setStateRequest] = useState<RegisterRequest>({
    userName: '',
    userPosition: 0,
    faculty: null,
    userPhone: '',
    userPassword:''
  });

  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  
  let status: number;

  const onRegisterUser = () => {
    registerUser(stateRequest)
      .then((res) =>{
          console.log('sdf')
          dispatch(addAuthToken(res.data?.accessToken));
          dispatch(addRefreshToken(res.data?.refreshToken));
          navigate('/home');
          status = res.status;
      })
      .catch(() => navigate('/error/' + status))
  };

  return (
    <>
      <FloatingLabel label="Name" className="mb-3">
        <Form.Control placeholder="Name" onChange={(t) => 
          setStateRequest({...stateRequest, userName: t.target.value})}/>
      </FloatingLabel>
      <FloatingLabel label="Position" className="mb-3">
        <Form.Control placeholder="Position" onChange={(t) => 
          setStateRequest({...stateRequest, userPosition: Number(t.target.value)})}/>
      </FloatingLabel>
      <FloatingLabel label="Phone" className="mb-3">
        <Form.Control placeholder="name@example.com" onChange={(t) => 
          setStateRequest({...stateRequest, userPhone: t.target.value})}/>
      </FloatingLabel>
      <FloatingLabel label="FacultyNumber" className="mb-3">
        <Form.Control placeholder="FacultyNumber" onChange={(t) => 
          setStateRequest({...stateRequest, faculty: Number(t.target.value)})}/>
      </FloatingLabel>
      <FloatingLabel label="Password">
        <Form.Control type="password" placeholder="Password" onChange={(t) => 
          setStateRequest({...stateRequest, userPhone: t.target.value})}/>
      </FloatingLabel>
      <br />
      <Button variant="warning" onClick={() => onRegisterUser()}>Ok</Button>
    </>
  );
}