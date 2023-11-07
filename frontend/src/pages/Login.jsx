import React, { useState, useEffect } from "react"
import Header from "../components/utils/Header"
import Input from "../components/utils/Input"
import SVG from "../assets/imgs/img_welcome.svg"
import "../stylesheets/animations.css"
import ModalAviso from "../components/ModalAviso";
import useHandleModalAviso from "../hooks/handleModalAviso";
import { addUser, login, loginByGoogleId } from "../services/userService"
import { useNavigate } from 'react-router-dom';
import { useAlert } from "../contexts/AlertContext";
import GoogleLogin from "react-google-login"
import { useAuth } from "../contexts/authContext"

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

export default function Login() {
  
  const [form, setForm] = useState(initialForm);
  const [check, setCheck] = useState(false);
  const [mensaje, setMensaje]= useState("")
  const [modalAvisoResponse, handleModalAviso, aviso, openModalAviso, modalAvisoCalled]= useHandleModalAviso();
  const navigate = useNavigate();
  const { alertConfig,setAlertConfig } = useAlert(); // Usa el contexto alert
  const auth = useAuth();

   //-----------------AUTHENTHICATION------------
   useEffect(()=>{
     if(auth.user){ //redireciono al home si ya esta logueado
      navigate('/');
     }
   },[])
   //-----------------FIN AUTHENTHICATION------------

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
    if (previousUrl === window.location.href || !previousUrl || previousUrl == `${window.location.origin}/register`) {
      navigate('/');
    } else {
      navigate(-1);
    }
}

  const handleSubmit= async (e)=>{ 
    e.preventDefault();
    try {
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
      const {data, status}= await login(logUser)
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
          message: 'El usuario se encuentra INACTIVO, revise su casilla de correo para activar la cuenta',
          timeOff:5000
        })
  
      }else if(status == 403){
        setAlertConfig({
          show: true,
          status: 'warning',
          title: '',
          message: 'Usuario incorrecto',
          timeOff:5000,
        })
  
      }else if(status ==200){
        console.log("DATA:",data)
        auth.login(data?.token)
        redirec()
      }
    } catch (error) {
      console.error(error)
    }
   
   
    
  }
  
  // const reloaded = async () =>{
  //   const authe = await auth.reloaded();
  //   if(authe){
  //     redirec();
  //   }
  // }
  // useEffect(()=>{
  //   reloaded()
  // },[])

    const clientID =  import.meta.env.VITE_Auth2ClienteId;

    const onSuccess = async (response) => {
      console.log(response)
      const userG = response.profileObj
    
      const newUser= {
        name: userG.givenName,
        surname: userG.familyName,
        email: userG.email,
        userName:`${userG.name}-${userG.googleId}`,
        password: userG.googleId,
        photo: userG.imageUrl,
        googleId:userG.googleId,
        is_active:1
      }
      console.log(newUser.googleId)

      const google = await loginByGoogleId(newUser.googleId)
      console.log("TOKEN GOOGE:",google)
      if(google.status == 200){
        auth.login(google.data?.token)
        redirec()
      }else if(google.status == 404){
        const token = await addUser(newUser)
        if(token.status == 200){
          auth.login(token.data.token)
          redirec()
        }
        
      }else{
        setAlertConfig({
          show: true,
          status: 'danger',
          title: '',
          message: 'Error al iniciar sesion con Google',
          timeOff:3000
        })
      }
      
    }
    const onFailure = (response) => {
      console.error("Error al Iniciar sesion con google");
    }
    
    useEffect(() => {
      function start() {
        gapi.client.init({
          clientId: clientID,
        });
      }
      gapi.load("client:auth2", start);
    });


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
            <GoogleLogin
              clientId={clientID}
              onSuccess={onSuccess}
              onFailure={onFailure}
              buttonText="Continuar con Google"
            />
            </form>
          </div>
       </div>
       {aviso && <ModalAviso msg={mensaje} handleModalAviso={handleModalAviso} modalStyle={aviso ? modalAvisoCalled : "aviso-hidden"}/>}

  </>
  )
}