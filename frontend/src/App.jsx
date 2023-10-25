
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

import Loading from './components/misc/Loading';
import ConfirmEmail from './pages/ConfirmEmail';
import { useParams } from 'react-router-dom';
import { AlertProvider } from './contexts/AlertContext';
import ModalAlert from './components/ModalAlert';
import './App.css'

import GoogleLogin from "react-google-login"
import {gapi} from "gapi-script" 
import { AuthProvider, useAuth } from './contexts/authContext';



function App() {
  const { user, login, logout,loading } = useAuth();


  return (
    <>
     <BrowserRouter>
     <ModalAlert/>
     <Header/>
     {!loading?
      <Routes> 
        <Route path="/" element={user?<APP/>:<About/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/app" element={<APP />} />
        <Route path="/about" element={<About />} />
        <Route path="/confirmEmail/:emailToken" element={<ConfirmEmail/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>   
      :<Loading/>}
     </BrowserRouter>
    </>
  );
}

export default App;
