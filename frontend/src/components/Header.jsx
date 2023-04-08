import React, { useState, useEffect } from "react"
import { BrowserRouter,Link } from "react-router-dom";



const styleheader = {
  
}

export default function Header() {
  return (
    <>
      <header>
        <nav>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/app">APP</Link></li>
        </nav>
      </header>
    </>
  )
}