import React, { useEffect, useState } from 'react';
import { Modal, Button, Row } from 'react-bootstrap';
import { addEvent } from '../services/eventServices';
import { useAlert } from '../contexts/AlertContext';


const formSection = {
  display: "flex",
  flexDirection: "column",
  color: "#fafafa",
  justifyContent: "space-around",
  height: "40rem",
}

const textArea = {
  borderRadius: "0.6rem",
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





export default function ModalCreacion({ refresh, show, setShow, isDinamic }) {

  const handleClose = () =>{
    setShow(false)
    setForm({...initialForm})
    setErrorMsg("")
  } ;
  let initialForm= {
    tittle: "",
    description: "",
    startDateTime: "",
    endDateTime: "", 
    repeat: {
      until: ""
    },
    participants: "",
    isDinamic
  }

  const [form, setForm]= useState(initialForm);
  const [repDay, setRepDay]= useState(false)
  const [errorMsg, setErrorMsg]= useState(false)
  const [frecuency, setFrecuency]= useState(0)
  const [activeDays, setActiveDays]= useState([0,0,0,0,0,0,0])
  const { alertConfig,setAlertConfig } = useAlert(); // Usa el contexto alert

  const handleSubmit= async( )=>{

    try {
      if(!form.tittle && !form.startDate && !form.startTime && !form.endTime){
        setErrorMsg("Completa todos los campos")
        return
      }
      
      const startDateTime = new Date(`${form.startDate}T${form.startTime}`);
      const endDateTime = new Date(`${form.startDate}T${form.endTime}`);
    
      if (startDateTime >= endDateTime) {
        setErrorMsg("La hora de fin debe ser posterior a la hora de inicio");
        return;
      }
  
      
      if(form.tittle && form.startDate && form.startTime && form.endTime){
        const event = {...form,startDateTime: `${form.startDate}T${form.startTime}`,endDateTime:`${form.startDate}T${form.endTime}`}
        event.startDate = null
        event.startTime = null
        event.endTime = null
        const res = await addEvent(event)
        
        if(res.status == 200){
          setAlertConfig({
            show: true,
            status: 'success',
            title: 'Creado',
            message: 'Se creo el evento exitosamente',
            timeOff:3000
          })
        }else{
          setAlertConfig({
            show: true,
            status: 'danger',
            title: 'Error',
            message: 'Error al crear el evento',
            timeOff:3000
          })
        }
      }
      refresh()
      handleClose()
      
    } catch (error) {
      setErrorMsg(`Error! ${error.message}`)
    }
    
  }

    const handleChange= (e)=>{
        setErrorMsg("")
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
    
    }, [frecuency])
    
    useEffect(()=>{
    if(frecuency >= 2){
      setForm({...form, repeat: { ...form.repeat, rep: activeDays }})  
    }}, [activeDays])

  return (
    <>
      <Modal show={show} onHide={handleClose} centered data-bs-theme="dark" >
        <Modal.Header  closeButton  className='bg-dark text-white'>
          <Modal.Title>Crea evento Fijo</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark text-white p-4'>
          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              <span className="fw-bold"></span>
              {errorMsg}
            </div>
          )}
          <form style={formSection}> 
            <input type="text" name="tittle" value={form.tittle} onChange={handleChange} placeholder="Añade un título" style={inputStyle} className="input_modal_creacion"></input>
            <textarea style={textArea} name="description" value={form.description} onChange={handleChange} placeholder="Descripción"/>
            <div style={timeStyle}>
              <div className='d-flex justify-content-between col-12'>
                <input type="date" name="startDate" value={form.date} onChange={handleChange} style={{...inputStyle, margin: "0 .5rem 0 0"}} className="input_modal_creacion col-6"/>
                
                <div className='d-flex justify-content-end align-items-center col-6'>
                  <input style={inputStyle} type="time" name="startTime" value={form.timeIni} onChange={handleChange} className="input_modal_creacion"/> <label className='mx-2'>-</label> 
                  <input style={inputStyle} type="time" name="endTime" value={form.timeFin} onChange={handleChange} className="input_modal_creacion"></input>
                </div>
              </div>
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
              <div className={activeDays[0] ? "day_election_modal_active" : "day_election_modal"} onClick={handleDayModal}>D</div>
              <div className={activeDays[1] ? "day_election_modal_active" : "day_election_modal"} onClick={handleDayModal}>L</div>
              <div className={activeDays[2] ? "day_election_modal_active" : "day_election_modal"} onClick={handleDayModal}>M</div>
              <div className={activeDays[3] ? "day_election_modal_active" : "day_election_modal"} onClick={handleDayModal}>Mi</div>
              <div className={activeDays[4] ? "day_election_modal_active" : "day_election_modal"} onClick={handleDayModal}>J</div>
              <div className={activeDays[5] ? "day_election_modal_active" : "day_election_modal"} onClick={handleDayModal}>V</div>
              <div className={activeDays[6] ? "day_election_modal_active" : "day_election_modal"} onClick={handleDayModal}>S</div>
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
        </form>
        </Modal.Body>
        <Modal.Footer className='bg-dark'>
          <Button variant="secondary" className='fs-4 px-4' onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="success" className='fs-4 px-4' onClick={handleSubmit}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}