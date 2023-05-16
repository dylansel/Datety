import React, { useState, useEffect } from "react"
import Header from "../components/utils/Header"
import { addUser,editUser,getUser,deleteUser } from "../services/UserService";

const isLoged= false;

export default function Login() {
 

  return (
    <>
    <Header isLoged={isLoged} />
    
  </>
  )
}