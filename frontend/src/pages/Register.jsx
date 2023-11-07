import React, {useEffect, useState} from "react"
import Header from "../components/utils/Header"
import Input from "../components/utils/Input";
import image from "../assets/imgs/login_img.svg";
import { addUser } from "../services/userService";
import ModalAviso from "../components/ModalAviso";
import useHandleModalAviso from "../hooks/handleModalAviso";
import { errorMessageConverter } from "../components/utils/errorHandling";
import "../stylesheets/animations.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useAlert } from "../contexts/AlertContext";

let initialForm= {
  name: "",
  surname: "",
  email: "",
  userName: "",
  password: "",
  photo: null,
  passConfirm: ""
}

const isLoged= false;
const tittleStyle = { 
    textAlign: "center",
     margin: "1rem 0",
    fontSize: "3rem",
    fontWeight: "bold"
    }

const  containerStyle= {
    height: "calc(100vh - 8.25rem)",
    boxSizing: "border-box",
    overflow: "hidden",
    display: "flex",
    alignItems: "center"
  }

const  registerContainerStyle= {
    boxSizing: "border-box",
    padding: "1rem 4rem 0 3rem",
    maxWidth: "1970px",
    maxHeight: "800px" ,
    margin: "8.25rem auto 200px auto",

  }

const  registerStyle= {
    display: "flex",
    flexDirection: "row-reverse"
  }

const  formStyle={
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "70vh",
    justifyContent: "space-around",
    maxHeight: "700px" ,

  }

const  imgContainerStyle= {
    flexGrow: 1,
    maxWidth: "55%",
    margin: "0 50px 0 0",
    maxHeight: "700px" ,

  }

const  imgStyle={
    height: "85%",
    width: "100%"
  }




export default function Register(){

const [form, setForm]= useState(initialForm);
const [check, setCheck]= useState(false)
const [mensaje, setMensaje]= useState("")
const [modalAvisoResponse, handleModalAviso, aviso, openModalAviso, modalAvisoCalled]= useHandleModalAviso();
const { alertConfig,setAlertConfig } = useAlert(); // Usa el contexto alert
const navigate = useNavigate();


const handleChange= (e)=>{
  setForm({
    ...form,
    [e.target.name] : e.target.value
  })
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let passSecure= false;

const handleSubmit= (e)=>{
  e.preventDefault();
  if(!form.name || !form.surname || !form.email || !form.userName || !form.password || !form.passConfirm ){
    setAlertConfig({
      show: true,
      status: 'warning',
      title: '',
      message: 'Rellena todos los campos',
      timeOff:3000
    })
    return ;
  }else if(form.password != form.passConfirm){
    setAlertConfig({
      show: true,
      status: 'warning',
      title: '',
      message: 'Las contraseñas no coinciden',
      timeOff:3000
    })
    return ;
  }else if(!emailRegex.test(form.email)){
    setAlertConfig({
      show: true,
      status: 'warning',
      title: '',
      message: 'Correo invalido',
      timeOff:3000
    })
    return ;
  }else  if(form.password.length < 8){
    setAlertConfig({
      show: true,
      status: 'warning',
      title: '',
      message: 'La contraseña debe tener un minimo de 8 caracteres',
      timeOff:3000
    })
    return ;
  }else if(form.password.length >= 8){
    passSecure= true
  }
  añadir(newUser)
}

const añadir = async (user) =>{
  try {
    const {data,status} = await addUser(user)
    console.log(data)
    if(status == 200){
        navigate('/app'); 
      return;
    }else if(data.message){
      console.warn(`API CODE Warn: "${data.message}"`)
      setAlertConfig({
        show: true,
        status: 'warning',
        title: '',
        message: errorMessageConverter(data.message),
        timeOff:3000
      })
      return;
    }else{
      console.error(`API CODE Error: "${data.error}"`)
      setAlertConfig({
        show: true,
        status: 'danger',
        title: 'Error al crear',
        message: errorMessageConverter(data.error),
        timeOff:3000
      })
      return;
    }
  } catch (error) {
    console.log(error)
  }
}

const handleCheck= (e)=>{
  setCheck(!check);
}

const newUser= {
  name: form.name,
  surname: form.surname,
  email: form.email,
  userName: form.userName,
  password: form.password,
  photo: null
}
  return(
    <>
      <div style={containerStyle}>
        <div className="register_container" style={registerContainerStyle}>
          <h2 style={tittleStyle}>Date<span className="violet-text">Ty</span></h2>
          <div className="register" style={registerStyle}>
            <form className="form-register" action="" style={formStyle} onSubmit={handleSubmit}  >
              <Input placeholder="Nombre" name="name" type="text" value={form.name} onChange={handleChange} classStyle="input_register" />
              <Input placeholder="Apellido" name="surname" type="text" value={form.surname} onChange={handleChange} classStyle="input_register" />
              <Input placeholder="Nombre de usuario" name="userName" type="text" value={form.userName} onChange={handleChange} classStyle="input_register" />
              <Input placeholder="Correo" name="email" type="text" value={form.email} onChange={handleChange} classStyle="input_register" />
              <Input placeholder="Contraseña" name="password" autoComplete="off" type={check ? "text" : "password"}  value={form.password} onChange={handleChange} classStyle={passSecure ? "input_register-pass" : "input_register"} />
              <Input placeholder="Confirmacion" name="passConfirm" autoComplete="off" type={check ? "text" : "password"}  value={form.passConfirm} onChange={handleChange} classStyle="input_register" />
              <div className="show_pass">
                <label htmlFor="mostrar_pass">Mostrar Contraseña</label> <input name="mostrar_pass" type="checkbox" onChange={handleCheck}/>
              </div>
              <Input type="submit" value="Iniciar Sesión" name="confirm" classStyle={
                                                                                    form.name && form.email && form.password && form.surname && form.userName && form.passConfirm? 
                                                                                    "check-register_able" :
                                                                                     "check-register_desable"}></Input>
            </form>
            <div className="img_background_container" style={imgContainerStyle} >
              <img src={image} alt="img_login" className="img_login" style={imgStyle}/>
            </div>
          </div>
        </div>
      </div>
      {aviso && <ModalAviso msg={mensaje} handleModalAviso={handleModalAviso} modalStyle={aviso ? modalAvisoCalled : "aviso-hidden"}/>}
    </>
  )
}