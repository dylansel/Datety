import React, { useState, useEffect } from "react"
import Header from "../components/utils/Header"
import { addUser } from "../services/userService";

const isLoged= false;

export default function Login() {
  const user = {
      name: "Dylan",
      surname: "Seltzer",
      email: "dylana.seltzer.et32@gmail.com",
      userName: "dylansel32a",
      password: "dylan32",
      photo: "dylan32.jpg"
  }
  const añadir = async () =>{
    const result = await addUser(user)
    console.log(result)
  }
  return (
    <>
    <Header isLoged={isLoged} />
      <div>
        <button onClick={añadir}>ENVIAR</button>
      </div>
  </>
  )
}