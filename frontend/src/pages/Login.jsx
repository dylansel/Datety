import React, { useState, useEffect } from "react"
import Header from "../components/utils/Header"
import Input from "../components/utils/Input"
import SVG from "../imgs/img_welcome.svg"
import "../stylesheets/animations.css"
import ModalAviso from "../components/ModalAviso";
import useHandleModalAviso from "../hooks/handleModalAviso";
import { login } from "../services/userService"

let initialForm= {
  user: "",
  pass: ""
}

const contenedorPrincipal = {
  display: "flex",
  height: "calc(100vh - 14.25rem)",
  boxSizing: "border-box",
  overflow: "hidden"
}

const styleTittle = {
  textAlign: "center",
  fontWeight: "bord",
  fontSize: "3rem",
  margin: "1rem",
}

const styleLogin = {
  display: "flex",
  flexDirection: "row-reverse",
  width: "100vw"
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
  flexGrow: "1",
  height: "45vh",
  justifyContent: "space-around",
  maxWidth: "35%"
}

const imgStyle={
  flexGrow: "1",
  maxWidth: "60%",
  height: "70vh"
}

const buttonLogin = {
  display: "flex",
  width: "100%",
  justifyContent: "space-between"
}


export default function Login() {
  
  const [form, setForm] = useState(initialForm);
  const [check, setCheck] = useState(false);
  const [mensaje, setMensaje]= useState("")
  const [modalAvisoResponse, handleModalAviso, aviso, openModalAviso, modalAvisoCalled]= useHandleModalAviso();
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }
  const handleCheck = ()=>{
    setCheck(!check)
  }

  const logUser= {
    user: form.user,
    password: form.pass
  }

  const handleSubmit= async (e)=>{
    e.preventDefault();
    if(!form.user || !form.pass){
      openModalAviso();
      setMensaje("Complete los datos...")
    }else{
      const [data, status]= await login(logUser)
      if(status == 401){
        openModalAviso();
        setMensaje("pass Incorrecta")
      }else if(status == 404){
        openModalAviso();
        setMensaje("user no encontrado")
      }
    }
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }
  
  const styleLink = {
    textDecoration: "none",
    color: "rgba(20, 20, 20, 0.827)"
  }

  return (
    <>
        <Header />
        <h2 style={styleTittle}>Date<span className="violet-text">Ty</span></h2>

       <div className="contenedor-principal" style={contenedorPrincipal}>
          <div className="login-style" style={styleLogin}>
            <img src={SVG} alt="Imagen Login" style={imgStyle}/>
            <form className="form-login" style={formStyle}  onSubmit={handleSubmit} >
              <Input value={form.user} type="text" onChange={handleChange} placeholder="Ingrese su nombre" name="user" />
              <Input value={form.pass} type={(check) ? "text" : "password" } onChange={handleChange} placeholder="Contraseña" name="pass"/>
              <div>
                <label htmlFor="">Mostrar contraseña</label> <Input value={form.check} type="checkbox" onChange={handleCheck}/>
              </div>
              <a href="" style={styleLink}>¿Olvidaste tu contraseña?</a>
              <div style={buttonLogin}>
                <a href="" style={{...styleLink, color: "rgba(69, 38, 206, 1)"}}>Registrarme</a>
                <Input type="submit" value="Iniciar Sesión" name="confirm" classStyle="check-login"></Input>
              </div>
            </form>
          </div>
       </div>
       {aviso && <ModalAviso msg={mensaje} handleModalAviso={handleModalAviso} modalStyle={aviso ? modalAvisoCalled : "aviso-hidden"}/>}

  </>
  )
}