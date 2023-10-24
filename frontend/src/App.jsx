
import React, { useEffect, useState } from 'react';
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
import Loading from './components/misc/Loading';
import ConfirmEmail from './pages/ConfirmEmail';
import { useParams } from 'react-router-dom';
import { AlertProvider } from './contexts/AlertContext';
import ModalAlert from './components/ModalAlert';
import './App.css'

import GoogleLogin from "react-google-login"
import {gapi} from "gapi-script" 



function App() {
  const auth = useAuth();
  return (
    <>
     <BrowserRouter>
     <AlertProvider >
     <ModalAlert/>
     {auth.loaded && <Header  auth={auth} />}
     {auth.loaded?
      <Routes> 
        <Route path="/" element={auth.user?<APP auth={auth}/>:<About auth={auth}/>} />
        <Route path="/login" element={<Login auth={auth}/>} />
        <Route path="/register" element={<Register auth={auth}/>} />
        <Route path="/settings" element={<Settings auth={auth}/>} />
        <Route path="/app" element={<APP auth={auth}/>} />
        <Route path="/about" element={<About auth={auth}/>} />
        <Route path="/confirmEmail/:emailToken" element={<ConfirmEmail auth={auth}/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>   
      :<Loading/>}
      </AlertProvider>
     </BrowserRouter>
    </>
  );
}

export default App;
