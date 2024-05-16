import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavigationBar } from "./pages/NavigationBar";
import { LoginPage, LogoutPage, RegisterPage } from "./auth/AuthPage";
import PersonalPage from './pages/PersonalPage';
import BookPage from './pages/BookPage';
import { useAppSelector } from './redux/hooks';

export default function App() {
  const isLogin = useAppSelector(state => state.auth.isLogin);
  return (
      <BrowserRouter>
      {isLogin ? <NavigationBar /> : <><br/></>}
        <Routes>
          <Route path='/register' element={!isLogin ? <RegisterPage /> : <Navigate to='/account'/>}/>
          <Route path='/auth' element={!isLogin ? <LoginPage /> : <Navigate to='/account'/>}/>

          <Route path='*' element={isLogin ? <Navigate to='/account'/> : <Navigate to='/auth'/>}/>
          <Route path='/account' element={isLogin ? <PersonalPage /> : <Navigate to='/auth'/>}/>
          <Route path='/logout' element={isLogin ? <LogoutPage /> : <Navigate to='/auth'/>}/>
          <Route path='/books' element={isLogin ? <BookPage />: <Navigate to='/auth'/>}/>
        </Routes>
      </BrowserRouter>
  );
}