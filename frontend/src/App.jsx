
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Login from './pages/Login';
import Register from './pages/Register';
import APP from './pages/APP';
import Setting from './pages/Settings';
import About from './pages/About';
import Notfond from './pages/Notfond';
import Header from './components/Header';


function App({ routes }) {

  return (
    <>
      <Router>
         <Routes>
          <Route exact path="/" element={<h1>Home Page</h1>} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="registrer" element={<Register />} />
          <Route exact path="app" element={<APP />} />
          <Route exact path="settings" element={<Setting />} />
          <Route exact path="about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
