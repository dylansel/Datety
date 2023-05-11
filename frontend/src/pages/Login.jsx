import React, { useState, useEffect } from "react"
import Header from "../components/utils/Header"
import { addUser,editUser,getUser,deleteUser } from "../services/UserService";

const isLoged= false;

export default function Login() {
  const user = {
      name: "Gonzalo",
      surname: "Sanchez",
      email: "Gonzalo.sanchezz.et32@gmail.com",
      userName: "GonzaloS",
      password: "GonzaloS",
      photo: "GonzaloS.jpg"
  }

  const userEdit = {
    name: "diego",
    photo: "diegooo.jpg"
}
  const añadir = async () =>{
    try {
      const [result,status] = await addUser(user)
      if(status == 200){
       console.log("se creo correctamente")
      }else if(result.message){
        console.warn(`API CODE Warn: "${result.message}"`)
      }else{
        console.error(`API CODE Warn: "${result.error}"`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const modificar = async () => {
    try {
      const [result,status] = await editUser(userEdit)
      if(status == 200){
       console.log("se modifico correctamente")
      }else{
        console.error(`API CODE ERR: "${result.message}"`)
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const leer = async () => {
    try {
      const [result,status] = await getUser()
      if(status == 200){
        console.log("------------- LEER --------------")
       console.log(result[9])
      }else{
        console.error(`API CODE ERR: "${result.message}"`)
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const eliminar = async () => {
    try {
      const [result,status] = await deleteUser()
      if(status == 200){
       console.log("se elimino correctamente")
      }else{
        console.error(`API CODE ERR: "${result.message}"`)
      }
    } catch (error) {
      console.log(error);
    }
  }
  



  return (
    <>
    <Header isLoged={isLoged} />
      <div>
        <button onClick={añadir}>Agregar</button>
        <button onClick={modificar}>Modificar</button>
        <button onClick={leer}>Leer</button>
        <button onClick={eliminar}>Eliminar</button>
        {/*ACA VA A MOSTRAR CUANDO TOQUE LEER*/}
      </div>
  </>
  )
}