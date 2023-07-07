
import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import APP from './pages/APP';
import Settings from './pages/Settings';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Header from "./components/utils/Header"
import Input from './components/utils/Input';
import useAuth from './hooks/useAuth';


function App() {

  const auth = useAuth();
  return (
    <>
     <BrowserRouter>
     
      <Routes> 
        <Route path="/" element={<About/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/app" element={<APP/>} />
        <Route path="/about" element={<About/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>   
     </BrowserRouter>
    </>
  );
}

export default App;
