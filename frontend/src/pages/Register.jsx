import React, {useState} from "react"
import Header from "../components/utils/Header"
import Input from "../components/utils/Input";
import image from "../imgs/login_img.svg";
import "../stylesheets/animations.css"

let initialForm= {
  name: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  passConfirm: "",
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
    height: "100vh",
    boxSizing: "border-box",
    overflow: "hidden",

  }

  let registerContainerStyle= {
    height: "calc(100vh - 6.25rem)",
    boxSizing: "border-box",
    padding: "1rem 4rem 0 3rem"

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
  }

  let imgContainerStyle= {
    flexGrow: 1,
    maxWidth: "55%",
  }

  let imgStyle={
    height: "85%",
    width: "100%"
  }

const [form, setForm]= useState(initialForm);

const handleChange= (e)=>{
  setForm({
    ...form,
    [e.target.name] : e.target.value
  })
}

const handleSubmit= (e)=>{
  e.preventDefault();
  if(!form.nombre || !form.apellido || !form.correo || !form.user_name || !form.contraseña){
    alert("Complete los datos...")
  }
}

  return(
    <>
      <div style={containerStyle}>
        <Header isLoged={isLoged}/>
        <div className="register_container" style={registerContainerStyle}>
          <h2 style={tittleStyle}>Date<span className="violet-text">Ty</span></h2>
          <div className="register" style={registerStyle}>
            <form className="form-login" action="" style={formStyle} onSubmit={handleSubmit} classTyle="input_register" >
              <Input placeholder="Nombre" name="name" type="text" value={form.name} onChange={handleChange} classTyle="input_register" />
              <Input placeholder="Apellido" name="lastname" type="text" value={form.lastname} onChange={handleChange} classTyle="input_register" />
              <Input placeholder="Nombre de usuario" name="username" type="text" value={form.username} onChange={handleChange} classTyle="input_register" />
              <Input placeholder="Correo" name="email" type="text" value={form.email} onChange={handleChange} classTyle="input_register" />
              <Input placeholder="Contraseña" name="password" type="text" value={form.password} onChange={handleChange} classTyle="input_register" />
              <Input placeholder="Confirmacion" name="passConfirm" type="text" value={form.passConfirm} onChange={handleChange} classTyle="input_register" />
               <div className="div">
                <label htmlFor="mostrar_pass">Mostrar Contraseña</label> <Input name="mostrar_pass" type="checkbox"/>
                </div>
              <Input widthInput={"40%"} type="submit"  value="Registrarme" name="enviar" classTyle="submit_buttom-login"/>
            </form>
            <div className="img_background_container" style={imgContainerStyle} >
              <img src={image} alt="img_login" style={imgStyle}/>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}