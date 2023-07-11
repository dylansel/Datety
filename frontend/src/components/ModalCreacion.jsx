import { React, useEffect, useState } from "react";
import Input from "./utils/Input";
import "../stylesheets/animations.css"
import logo from "../assets/imgs/exit_logo.png"
import { addEvent } from "../services/eventService";

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
  zIndex: "500",
  justifyContent: "center",
  alignItems: "center"
}

const modalCreacion = {
  display: "flex",
  borderRadius: "20px",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "space-evenly",
  background: "#415a77",
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
  width: "30px",
  height: "30px",
  background: "transparent",
  position: "absolute",
  right: "-20px",
  top: "-20px",
  zIndex: "100"
}

const imgClose= {
  width: "100%",
  zIndex: "5"
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
  borderRadius: "8px",
  outline: "none",
  padding: "4px"
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

const daysContainer = {
  display: "flex",
  justifyContent: "space-evenly"
}

const inputStyle= {
  borderRadius: "8px",
  border: "none",
  outline: "none",
  padding: "5px",
}

const buttonStyle= {
  background: "transparent",
  color: "#f2f2f2",
  borderRadius: "10px",
  border: "2px solid #d2d2d2",
  padding: "8px",
  fontWeight: "500"
}

export default function ModalCreacion({handleModalCreacion, isDinamic}) {
  
  let initialForm= {
    tittle: "",
    description: "",
    startDate: "",
    endDate: "", 
    repeat: {
      until: ""
    },
    startTime: "",
    endTime: "",
    participants: "",
    isDinamic
  }

  const [form, setForm]= useState(initialForm);
  const [repDay, setRepDay]= useState(false)
  const [frecuency, setFrecuency]= useState(0)
  const [activeDays, setActiveDays]= useState([0,0,0,0,0,0,0])
  const [modalOpen, setModalOpen]= useState(true)

  
  const handleSubmit= ( )=>{
    if(form.tittle && form.startDate && form.startDate && form.endTime){
      const event = {...form,endDate:form.startDate}
      addEvent(event)
    }
    setForm({...initialForm})
  }

    const handleChange= (e)=>{
        setForm({
          ...form,
          [e.target.name] : e.target.value
        })

        if(e.target.name == "until"){
          setForm({
            ...form,
            repeat:{
              ...form.repeat,
              until: e.target.value
            }
          })
        }
      }

    const handleFrecuency= (e)=>{
      console.log(e.target.value)
        if(e.target.value == 2){
          setRepDay(false)
          setFrecuency(2)
          setForm({...form, repeat: { ...form.repeat, rep: activeDays }})
        }else if(e.target.value == 3){
          setRepDay(true)
          setFrecuency(3)
          setForm({...form, repeat: { ...form.repeat, rep: activeDays }})
        }else if(e.target.value == 4){
          setRepDay(false)
          setFrecuency(4)
          setForm({...form, repeat: { ...form.repeat, for: "month" }})
        }else if(e.target.value == 5){
          setRepDay(false)
          setFrecuency(5)
          setForm({...form, repeat: { ...form.repeat, for: "year"  }})
        }else if(e.target.value == 1){
          setRepDay(false)
          setFrecuency(1)
        }
    }

    const handleDayModal= (e)=>{
      let daysCounter = [...activeDays];
      let daySelected= e.target.textContent;
      if(daySelected == "D") daysCounter[0] = daysCounter[0] ? 0 : 1
      else if(daySelected == "L") daysCounter[1] = daysCounter[1] ? 0 : 1
      else if(daySelected == "M") daysCounter[2] = daysCounter[2] ? 0 : 1
      else if(daySelected == "Mi") daysCounter[3] = daysCounter[3] ? 0 : 1
      else if(daySelected == "J") daysCounter[4] = daysCounter[4] ? 0 : 1
      else if(daySelected == "V") daysCounter[5] = daysCounter[5] ? 0 : 1
      else if(daySelected == "S") daysCounter[6] = daysCounter[6] ? 0 : 1
      setActiveDays(daysCounter)
      
    } 

    useEffect(()=>{
      if(frecuency == 2){
        setActiveDays([1,1,1,1,1,1,1])
      }else if(frecuency != 2){
        setActiveDays([0,0,0,0,0,0,0])
      }
    
      console.log(activeDays)
    }, [frecuency])
    
    useEffect(()=>{
    if(frecuency >= 2){
      setForm({...form, repeat: { ...form.repeat, rep: activeDays }})  
    }}, [activeDays])


    return(
        <>{modalOpen &&
            <div style={backgroundModalCreacion}>
                <div style={modalCreacion} className="modal_creacion">
                    <div style={cornerSectionStyle} className="corner_section">
                        <h2>Crea tu Evento</h2>
                        <button onClick={handleModalCreacion} style={buttonClose} value="X"><img className="buttonClosed" style={imgClose} src={logo}></img></button>
                    </div>
                    <div className="main_section_creation" style={mainSection}>
                        <form style={formSection} onSubmit={handleSubmit}>
                            <input type="text" name="tittle" value={form.tittle} onChange={handleChange} placeholder="Añade un título" style={inputStyle} className="input_modal_creacion"></input>
                            <textarea style={textArea} name="description" value={form.description} onChange={handleChange} placeholder="Descripción"/>
                            <div style={timeStyle}>
                            <input type="date" name="startDate" value={form.date} onChange={handleChange} style={{...inputStyle, margin: "0 .5rem 0 0"}} className="input_modal_creacion"></input>
                            <input style={inputStyle} type="time" name="startTime" value={form.timeIni} onChange={handleChange} className="input_modal_creacion"/> <label>_</label> 
                            <input style={inputStyle} type="time" name="endTime" value={form.timeFin} onChange={handleChange} className="input_modal_creacion"></input>
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
                              <div className={activeDays[0] ? "day_election_modal_active" : "day_election_modal"} onClick={handleDayModal}><p>D</p></div>
                              <div className={activeDays[1] ? "day_election_modal_active" : "day_election_modal"} onClick={handleDayModal}><p>L</p></div>
                              <div className={activeDays[2] ? "day_election_modal_active" : "day_election_modal"} onClick={handleDayModal}><p>M</p></div>
                              <div className={activeDays[3] ? "day_election_modal_active" : "day_election_modal"} onClick={handleDayModal}><p>Mi</p></div>
                              <div className={activeDays[4] ? "day_election_modal_active" : "day_election_modal"} onClick={handleDayModal}><p>J</p></div>
                              <div className={activeDays[5] ? "day_election_modal_active" : "day_election_modal"} onClick={handleDayModal}><p>V</p></div>
                              <div className={activeDays[6] ? "day_election_modal_active" : "day_election_modal"} onClick={handleDayModal}><p>S</p></div>
                            </div>}

                            {frecuency >= 2 && <input type="date" style={inputStyle} name="until" onChange={handleChange} value={form.repeat.until}/>}

                            <label>Recordatorio</label>
                            <select style={selectStyle}>
                              <option value="1">5 minutos antes</option>
                              <option value="2">10 minutos antes</option>
                              <option value="3">30 minutos antes</option>
                              <option value="4">1 hora antes</option>
                              <option value="5">1 día antes</option>
                            </select>
                            <input type="text" name="participants" value={form.participants} onChange={handleChange} placeholder="Añadir participantes" style={inputStyle} className="input_modal_creacion"></input>
                            <div style={confirmStyle}>
                            <input type="submit" value="Confirmar" name="confirm" style={buttonStyle} className="button_modal_creation" ></input>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        }
        </>
    )
} 