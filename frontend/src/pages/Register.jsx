import React, {useState} from "react"
import Header from "../components/utils/Header"
import Input from "../components/utils/Input";
import image from "../imgs/login_img.svg";
import "../stylesheets/animations.css"
import { addUser } from "../services/userService";

let initialForm= {
  name: "",
  surname: "",
  email: "",
  userName: "",
  password: "",
  photo: null
}

const isLoged= false;
export default function Register(){

  let tittleStyle = { 
    textAlign: "center",
     margin: "1rem 0",
    fontSize: "3rem",
    fontWeight: "bold"
    }

  let containerStyle= {
    height: "calc(100vh - 8.25rem)",
    boxSizing: "border-box",
    overflow: "hidden",
    display: "flex",
    alignItems: "center"
  }

  let registerContainerStyle= {
    boxSizing: "border-box",
    padding: "1rem 4rem 0 3rem",
    maxWidth: "1970px",
    maxHeight: "800px" ,
    margin: "8.25rem auto 200px auto",

  }

  let registerStyle= {
    display: "flex",
    flexDirection: "row-reverse"
  }

  let formStyle={
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "70vh",
    justifyContent: "space-around",
    maxHeight: "700px" ,

  }

  let imgContainerStyle= {
    flexGrow: 1,
    maxWidth: "55%",
    margin: "0 50px 0 0",
    maxHeight: "700px" ,

  }

  let imgStyle={
    height: "85%",
    width: "100%"
  }

const [form, setForm]= useState(initialForm);
const [check, setCheck]= useState(false)

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
    alert("Complete los datos...")
    return;
  }else if(form.password != form.passConfirm){
    alert("Las contraseñas no coinciden...")
    return;
  }else if(!emailRegex.test(form.email)){
    alert("Correo invalido...")
    return;
  }else  if(form.password.length < 8){
    alert("La pass debe tener obtener almenos 8 caracteres...")
  }else if(form.password.length >= 8){
    passSecure= true
  }
  añadir(newUser)
}




const añadir = async (user) =>{
  try {
    const [result,status] = await addUser(user)
    if(status == 200){
     console.log("se creo correctamente")
     alert("Usuario Creado")
    }else if(result.message){
      console.warn(`API CODE Warn: "${result.message}"`)
    }else{
      console.error(`API CODE Error: "${result.error}"`)
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

const handleRegister= ()=>{
  addRegister(newUser);
}




  return(
    <>
      <Header isLoged={isLoged}/>
      <div style={containerStyle}>
        <div className="register_container" style={registerContainerStyle}>
          <h2 style={tittleStyle}>Date<span className="violet-text">Ty</span></h2>
          <div className="register" style={registerStyle}>
            <form className="form-login" action="" style={formStyle} onSubmit={handleSubmit} classTyle="input_register" >
              <Input placeholder="Nombre" name="name" type="text" value={form.name} onChange={handleChange} classTyle="input_register" />
              <Input placeholder="Apellido" name="surname" type="text" value={form.surname} onChange={handleChange} classTyle="input_register" />
              <Input placeholder="Nombre de usuario" name="userName" type="text" value={form.userName} onChange={handleChange} classTyle="input_register" />
              <Input placeholder="Correo" name="email" type="text" value={form.email} onChange={handleChange} classTyle="input_register" />
              <Input placeholder="Contraseña" name="password" type={check ? "text" : "password"} value={form.password} onChange={handleChange} classTyle={passSecure ? "input_register-pass" : "input_register"} />
              <Input placeholder="Confirmacion" name="passConfirm"  type={check ? "text" : "password"}  value={form.passConfirm} onChange={handleChange} classTyle="input_register" />
              <div className="show_pass">
                <label htmlFor="mostrar_pass">Mostrar Contraseña</label> <Input name="mostrar_pass" type="checkbox" onChange={handleCheck}/>
              </div>
              <Input widthInput={"40%"} type="submit"value="Registrarme" name="enviar" classTyle="submit_buttom-login input_register"/>
            </form>
            <div className="img_background_container" style={imgContainerStyle} >
              <img src={image} alt="img_login" className="img_login" style={imgStyle}/>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}