import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavigationBar } from "./pages/NavigationBar";
import { LoginPage, LogoutPage, RegisterPage } from "./auth/AuthPage";
import PersonalPage from './pages/PersonalPage';
import BookPage from './pages/BookPage';

export default function App() {
  return (
      <BrowserRouter>
        <NavigationBar />
        <br />
        <Routes>
          <Route path='*' element={<Navigate to='/'/>}/>
          <Route path='/auth' element={<LoginPage />}/>
          <Route path='/account' element={<PersonalPage />}/>
          <Route path='/logout' element={<LogoutPage />}/>
          <Route path='/register' element={<RegisterPage />}/>

          <Route path='/books' element={<BookPage />}/>
        </Routes>
      </BrowserRouter>
  );
}