import { React, useState } from "react";
import Input from "./utils/Input";

/*
INPUTS:
- Titulo
- Descripcion input area
- Fecha de Inicio date
- Fecha de Fin date 
- Hora de inicio time 
- Hora de Fin time 
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
  height: "35rem"
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

const labelStyle = {
  display: "flex",
  justifyContent: "space-between"
}

let initialForm= {
  tittle: "",
  description: "",
  date: "",
  timeIni: "",
  timeFin: ""
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
                            <Input type="date" name="date" value={form.date} onChange={handleChange}/>
                            <label style={labelStyle}>Hora de Inicio <Input type="time" name="timeIni" value={form.timeIni} onChange={handleChange}/> </label>
                            <label style={labelStyle}>Hora de Finalización <Input type="time" name="timeFin" value={form.timeFin} onChange={handleChange}/> </label>
                            <label>Repeticion del Evento</label>
                            <select>
                              <option value="1">Dia</option>
                              <option value="2">Mes</option>
                              <option value="3">Semana</option>
                              <option value="4">Año</option>
                            </select>
                        </form>
                    </div>
                </div>
            </div>
            
        </>
    )
} 