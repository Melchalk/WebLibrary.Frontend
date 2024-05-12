import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavigationBar } from "./pages/NavigationBar";
import { LoginPage, LogoutPage, RegisterPage } from "./auth/AuthPage";

export default function App() {
  return (
      <BrowserRouter>
        <NavigationBar />
      
        <Routes>
          <Route path='*' element={<Navigate to='/'/>}/>
          <Route path='/auth' element={<LoginPage />}/>
          <Route path='/logout' element={<LogoutPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
        </Routes>
      </BrowserRouter>
  );
}