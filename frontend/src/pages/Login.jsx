import React, { useState, useEffect } from "react"
import Header from "../components/utils/Header"
import Input from "../components/utils/Input"
import SVG from "../assets/imgs/img_welcome.svg"
import "../stylesheets/animations.css"
import ModalAviso from "../components/ModalAviso";
import useHandleModalAviso from "../hooks/handleModalAviso";
import { login } from "../services/userService"
import { useNavigate } from 'react-router-dom';
import { useAlert } from "../contexts/AlertContext";
import GoogleLogin from "react-google-login"

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
const styleLink = {
  textDecoration: "none",
  color: "rgba(20, 20, 20, 0.827)"
}

export default function Login({auth}) {
  
  const [form, setForm] = useState(initialForm);
  const [check, setCheck] = useState(false);
  const [mensaje, setMensaje]= useState("")
  const [modalAvisoResponse, handleModalAviso, aviso, openModalAviso, modalAvisoCalled]= useHandleModalAviso();
  const navigate = useNavigate();
  const { alertConfig,setAlertConfig } = useAlert(); // Usa el contexto alert


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


  const redirec = ()=>{
    const previousUrl = document.referrer;
    console.log(window.location.origin)
    if (previousUrl === window.location.href || !previousUrl || previousUrl == `${window.location.origin}/register`) {
      navigate('/app');
    } else {
      navigate(-1);
    }
}

  const handleSubmit= async (e)=>{
    e.preventDefault();
    if(!form.user || !form.pass){
      setAlertConfig({
        show: true,
        status: 'warning',
        title: '',
        message: 'Complete los datos',
        timeOff:3000
      })
      return
    }
    const [data, status]= await login(logUser)
    if(status == 401){
      setAlertConfig({
        show: true,
        status: 'warning',
        title: '',
        message: 'Contraseña Incorrecta',
        timeOff:3000
      })

    }else if(status == 404){
      setAlertConfig({
        show: true,
        status: 'warning',
        title: '',
        message: 'Usuario incorrecto',
        timeOff:3000
      })

    }else if(status ==200){
      redirec()
      auth.reloaded()
    }
    
  }
  
  const reloaded = async () =>{
    const authe = await auth.reloaded();
    if(authe){
      redirec();
    }
  }
  useEffect(()=>{
    reloaded()
  },[])



  return (
    <>
        <h2 style={styleTittle}>Date<span className="violet-text">Ty</span></h2>

       <div className="contenedor-principal" style={contenedorPrincipal}>
          <div className="login-style" style={styleLogin}>
            <img src={SVG} alt="Imagen Login" style={imgStyle} className="img_login"/>
            <form className="form-login" style={formStyle}  onSubmit={handleSubmit} >
              <Input value={form.user} type="text" onChange={handleChange} placeholder="Ingrese su nombre" name="user" classStyle={"input_register"} />
              <Input value={form.pass} type={(check) ? "text" : "password" } onChange={handleChange} placeholder="Contraseña" name="pass" classStyle={"input_register"}/>
              <div>
                <label htmlFor="">Mostrar contraseña</label> <input value={form.check} type="checkbox" onChange={handleCheck}></input>
              </div>
              <a href="" style={styleLink}>¿Olvidaste tu contraseña?</a>
              <div style={buttonLogin}>
                <a href="/register" style={{...styleLink, color: "rgba(69, 38, 206, 1)"}}>Registrarme</a>
                <Input type="submit" value="Iniciar Sesión" name="confirm" classStyle={form.pass && form.user ? "check-login_able" : "check-login_desable"}></Input>
              </div>
            </form>
            <GoogleLogin
              clientId={auth.clientID}
              onSuccess={auth.onSuccess}
              onFailure={auth.onFailure}
              buttonText="Continuar con Google"
              cookiePolicy={"single_host_origin"}
            />
          </div>
       </div>
       {aviso && <ModalAviso msg={mensaje} handleModalAviso={handleModalAviso} modalStyle={aviso ? modalAvisoCalled : "aviso-hidden"}/>}

  </>
  )
}