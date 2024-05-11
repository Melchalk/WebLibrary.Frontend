import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavigationBar } from "./pages/NavigationBar";

export default function App() {
  return (
      <BrowserRouter>
        <NavigationBar />

        <Routes>
          <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
      </BrowserRouter>
  );
}