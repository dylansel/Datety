import { React, useState } from "react";
import Input from "./utils/Input";
import "../stylesheets/animations.css"

/*
INPUTS:
- Titulo X
- Descripcion input area X
- Fecha de Inicio date X
- Fecha de Fin date X
- Hora de inicio time X
- Hora de Fin time X
- Repeticion del Evento multi check 
    Repeat:{
        rep: [1,1,1,1,1,0,0,1] | [16]
        evenWhen: "16/10/2023" (input type date)
    }
- Recordatorio Input(tiempo (number)) Input(Medida de tiempo (select) )
- Invitar participantes input con options dinamicos
*/ 

const backgroundModalCreacion = {
  background: "#000000cc",
  height: "100vh",
}

const modalCreacion = {
  display: "flex",
  padding: "10rem",
  alignItems: "center",
  flexDirection: "column",
  position: "abstract",
  justifyContent: "center"
}

const cornerSectionStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  color: "#fafafa",
  background: "#6C63FF",
  width: "30%",
  height: "5rem",
}

const buttonClose= {
  border: "none",
  background: "transparent",
}

const mainSection = {
  width: "30%",
}

const formSection = {
  padding: "1rem",
  display: "flex",
  background: "#6C63FF",
  flexDirection: "column",
  color: "#fafafa",
  justifyContent: "space-around",
  height: "35rem",
}

const textArea = {
  borderRadius: "0.6rem",
  border: "1.6px solid #ccc",
  padding: ".5rem .6rem",
  color: "#222",
  background: "#eee",
  outline: "none",
  overflow: "hidden"
}

const timeStyle = {
  display: "flex",
  justifyContent: "space-between"
}

const confirmStyle = {
  display: "flex",
  justifyContent: "center",
  margin: "1rem 0rem 0rem"
}

let initialForm= {
  tittle: "",
  description: "",
  date: "",
  timeIni: "",
  timeFin: "",
  participants: ""
}


export default function ModalCreacion({handleModalCreacion}) {
    
    const [form, setForm]= useState(initialForm);

    const handleChange= (e)=>{
        setForm({
          ...form,
          [e.target.name] : e.target.value
        })
      }

    return(
        <>
            <div style={backgroundModalCreacion}>
                <div style={modalCreacion} className="modal_creacion">
                    <div style={cornerSectionStyle} className="corner_section">
                        <h2>Crea tu Evento</h2>
                        <button onClick={handleModalCreacion} style={buttonClose} value={"X"}>x</button>
                    </div>
                    <div className="main_section_creation" style={mainSection}>
                        <form style={formSection}>
                            <Input type="text" name="tittle" value={form.tittle} onChange={handleChange} placeholder="Añade un título" />
                            <textarea style={textArea} name="description" value={form.description} onChange={handleChange} placeholder="Descripción"/>
                            <div style={timeStyle}>
                            <Input type="date" name="date" value={form.date} onChange={handleChange}/> <Input type="time" name="timeIni" value={form.timeIni} onChange={handleChange}/> <label>_</label> <Input type="time" name="timeFin" value={form.timeFin} onChange={handleChange}/>
                            </div>
                            <label>Repeticion del Evento</label>
                            <select>
                              <option value="1">No se repite</option>
                              <option value="2">Todos los días</option>
                              <option value="3">Cada semana</option>
                              <option value="4">Cada mes</option>
                              <option value="5">Anualmente</option>
                            </select>
                            <label>Recordatorio</label>
                            <select>
                              <option value="1">5 minutos antes</option>
                              <option value="2">10 minutos antes</option>
                              <option value="3">30 minutos antes</option>
                              <option value="4">1 hora antes</option>
                              <option value="5">1 día antes</option>
                            </select>
                            <Input type="text" name="participants" value={form.participants} onChange={handleChange} placeholder="Añadir participantes"/>
                            <div style={confirmStyle}>
                            <Input type="submit" value="Confirmar" name="confirm" classStyle={"input_submit_create"}/>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
            
        </>
    )
} 