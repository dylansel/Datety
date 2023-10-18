import React,{useState, useEffect} from "react"
import Header from "../components/utils/Header"
import { useNavigate } from "react-router-dom";
import Input from "../components/utils/Input";

const isLoged = true;

const mainContainerStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  height: "100vh",
  // background: "blue"
}

const userSection = {
  margin: "5rem",
  display: "flex",
  flexDirection: "column",
  width: "35%",
  // background: "red"
}

const accountSection = {
  margin: "5rem",
  flexDirection: "column",
  width: "35%",
  // background: "red"
  
}

const formSectionOne = {
  display: "flex",
  flexDirection: "column",
  marginTop: "10px",
  height: "30%",
  // background: "green",
  justifyContent: "space-between"
}

const formSectionTwo = {
  display: "flex",
  flexDirection: "column",
  marginTop: "10px",
  // background: "yellow",
  height: "20%",
  justifyContent: "space-evenly"

}

export default function Setting({auth}){
  //-----------------AUTHENTHICATION------------
  const navigate = useNavigate();
  const reloaded = async () =>{
    const authe = await auth.reloaded();
    if(!authe){
        navigate('/login'); //redireciona al login en caso de no estar authenticado
    }
  }
  useEffect(()=>{
    if(!auth.user){
      reloaded()
    }
  },[auth.user])
  //-----------------FIN AUTHENTHICATION------------

  return(
    <>
      <div style={mainContainerStyle}>
        <div style={userSection}>
          <h2>User Settings</h2>
          <form style={formSectionOne}>
            <label>Cambiar nombre de usuario</label>
            <Input/>
            <label>Cambiar contraseña</label>
            <Input/>
            <input type="submit" value="Guardar cambios"/>
            <input type="submit" value="Eliminar cuenta"/>

          </form>
        </div>
        <div style={accountSection}>
          <h2>Account Preferences Setting</h2>
          <form style={formSectionTwo}>
            <label>Comienzo de semana</label>
            <Input/>
            <label>Sleep time <input/> <span>to</span> <input/></label>
          </form>
        </div>
      </div>
    </>
  )
}