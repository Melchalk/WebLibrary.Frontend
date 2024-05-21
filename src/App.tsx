import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavigationBar } from "./components/NavigationBar";
import { LoginPage, LogoutPage, RegisterPage } from "./auth/AuthPage";
import PersonalPage from './pages/PersonalPage';
import BookPage from './pages/BookPage';
import { useAppSelector } from './redux/hooks';
import MainPage from './pages/MainPage';
import ReaderPage from './pages/ReaderPage';
import LibrarianPage from './pages/LibrarianPage';
import IssuePage from './pages/IssuePage';

export default function App() {
  const isLogin = useAppSelector(state => state.auth.isLogin);
  return (
      <BrowserRouter>
        {isLogin ? <NavigationBar /> : <><br/></>}
        <Routes>
          <Route path='/register' element={!isLogin ? <RegisterPage /> : <Navigate to='/account'/>}/>
          <Route path='/auth' element={!isLogin ? <LoginPage /> : <Navigate to='/account'/>}/>

          <Route path='*' element={<Navigate to= {isLogin ? '/libraries': '/auth'} />}/>
          <Route path='/libraries' element={isLogin ? <MainPage /> : <Navigate to='/auth'/>}/>
          <Route path='/account' element={isLogin ? <PersonalPage /> : <Navigate to='/auth'/>}/>
          <Route path='/logout' element={isLogin ? <LogoutPage /> : <Navigate to='/auth'/>}/>
          <Route path='/books' element={isLogin ? <BookPage />: <Navigate to='/auth'/>}/>
          <Route path='/readers' element={isLogin ? <ReaderPage />: <Navigate to='/auth'/>}/>
          <Route path='/issues' element={isLogin ? <IssuePage />: <Navigate to='/auth'/>}/>
          <Route path='/librarians' element={isLogin ? <LibrarianPage /> : <Navigate to='/auth'/>}/>
        </Routes>
      </BrowserRouter>
  );
}