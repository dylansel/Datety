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
  background: "#444444cc",
  height: "100vh",
  position: "absolute",
  width: "100vw",
  top: "0",
  bottom: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}

const modalCreacion = {
  display: "flex",
  borderRadius: "20px",
  alignItems: "center",
  flexDirection: "column",
  
  justifyContent: "space-evenly",
  background: "#6C63FF",
  width: "35%",
  height: "60%"
}

const cornerSectionStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#fafafa",
  height: "5rem",
  width: "90%",
  position: "relative"
}

const buttonClose= {
  border: "none",
  background: "transparent",
  position: "absolute",
  right: "-20px",
  top: "-20px"
}

const mainSection = {

}

const formSection = {
  display: "flex",
  flexDirection: "column",
  color: "#fafafa",
  justifyContent: "space-around",
  height: "40rem",
}

const textArea = {
  borderRadius: "0.6rem",
  border: "1.6px solid #ccc",
  color: "#222",
  background: "#eee",
  outline: "none",
  overflow: "hidden"
}

const selectStyle= {
  borderRadius: "5px",
  outline: "none"
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

const daysContainer = {
  display: "flex",
  justifyContent: "space-evenly"
}




export default function ModalCreacion({handleModalCreacion}) {
    
    const [form, setForm]= useState(initialForm);
    const [repDay, setRepDay]= useState(false)

    const handleChange= (e)=>{
        setForm({
          ...form,
          [e.target.name] : e.target.value
        })
      }


    const handleFrecuency= (e)=>{
      if(e.target.name == "selectOptions"){
        if(e.target.value == 2){
          setRepDay(true)
        }
      }
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
                            <select style={selectStyle} name="selectOptions" onChange={handleFrecuency}>
                              <option value="1">No se repite</option>
                              <option value="2">Todos los días</option>
                              <option value="3">Cada semana</option>
                              <option value="4">Cada mes</option>
                              <option value="5">Anualmente</option>
                            </select>

                            {repDay && <div style={daysContainer}>
                              <div>
                                <input type="radio" /><label>D</label>
                              </div>
                              <div>
                                <input type="radio" /><label>L</label>
                              </div>
                              <div>
                                <input type="radio" /><label>M</label>
                              </div>
                              <div>
                                <input type="radio" /><label>Mi</label>
                              </div>
                              <div>
                                <input type="radio" /><label>J</label>
                              </div>
                              <div>
                                <input type="radio" /><label>V</label>
                              </div>
                              <div>
                                <input type="radio" /><label>S</label>
                              </div>
                            </div>}

                            <label>Recordatorio</label>
                            <select style={selectStyle}>
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