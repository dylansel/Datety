import React, { useState, useEffect } from "react"
import Header from "../components/utils/Header"
import Input from "../components/utils/Input"
import SVG from "../imgs/img_welcome.svg"

let initialForm= {
  user: "",
  pass: ""
}

export default function Login() {
  
  let tittleStyle = {
    textAlign: "center",
    margin: "1rem 0",
    fontSize: "3rem",
    fontWeight: "bold",
  }

  let loginContainerStyle= {
    height: "calc(100vh - 6.25rem)",
    boxSizing: "border-box",
    padding: "1rem 4rem 0 3rem"

  }

  let loginStyle= {
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

  const [form, setForm] = useState(initialForm);
  const [check, setCheck] = useState(false);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }

  const handleCheck = ()=>{
    setCheck(!check)
  }

  const handleSubmit= (e)=>{
    e.preventDefault();
    if(!form.user || !form.pass){
      alert("Complete los datos...")
    }
  }

  const styleLinks = {
    textDecoration: "none",
    color: "rgba(20, 20, 20, 0.827)"
  }

  return (
    <>
        <Header />
        <div className="login-container-style" style={loginContainerStyle}>
          <h2 style={tittleStyle}>Date<span className="violet-text">Ty</span></h2>
          <h3 style={styleLinks}>Utiliza tu cuenta DateTy</h3>
          <div className="login-style" style={loginStyle}>
            <img src={SVG} alt="" />
            <form className="form-login" action="" style={formStyle} onSubmit={handleSubmit} classTyle="input_register" >
             <Input type="text" name="user" value={form.user} onChange={handleChange} placeholder="Ingrese su nombre" />
             <Input type={(check) ? "text" : "password"} name="pass" value={form.pass} onChange={handleChange} placeholder="Contraseña"  />
             <div>
             <label htmlFor="">Mostrar Contraseña </label> <Input type="checkbox" name="check" value={form.check} onChange={handleCheck} /> 
             </div>
             <a href="" style={styleLinks}>¿Olvidaste tu contraseña?</a>
             <a href="" style={{ ...styleLinks, color: "rgba(69, 38, 206, 1)" }}>Registrarme</a>
             <Input type="submit" name="confirm" value="Confirmar" style={{background: "rgba(69, 38, 206, 0.5)"}} />
            </form>
            </div>
        </div>


  </>
  )
}