import React, { useState, useEffect } from "react"
import AlertModal from "../components/AlertModal";
import Header from "../components/utils/Header";
import useHandleModalAlert from "../hooks/handleModalAlert";
import { addEvent , getAllEvents, getEventForWeek} from "../services/eventService";
import useHandleModalCreacion from "../hooks/handleModalCreacion";
import ModalCreacion from "../components/ModalCreacion";
const isLoged = true;

export default function APP() {
  const [modalResponse, handleModal, alert, openModal]= useHandleModalAlert();
  const [modalCreacionResponse, handleModalCreacion, creacion, openModalCreacion] = useHandleModalCreacion();

  
  // const event= { 
  //   tittle: "15 años Juana",
  //   description: "Ir fachero",
  //   startDate: "2023-04-18", 
  //   endDate: "2023-04-18", 
  //   startTime: "16:00:00", 
  //   endTime: "22:00:00", 
  //   isDinamic: 0, 
  //   isAccepted: 0 
  // }

  // const enviarEvento= ()=>{
  //   addEvent(event);
  // }

  const eventsForWeek= ()=>{
    getEventForWeek("2023-04-04");
  }

  const handleCreateEvent= ()=>{
    openModal();
  }

  useEffect(()=>{
    if(modalResponse){
      enviarEvento();
    }
  }, [modalResponse])
  
  return (
    <div className={alert ? "app_alerted" : "app"}>
      <Header isLoged={isLoged} />
      {alert && <AlertModal msg={`desea crear un nuevo evento llamado ${event.tittle}`} handleModal={handleModal}/>}
        <div>
        <button onClick={openModalCreacion}>Crear Evento</button>
        {creacion && <ModalCreacion handleModalCreacion={handleModalCreacion} isDinamic={false}/>}
          <h2>APP</h2>
          {<button onClick={handleCreateEvent}>Crear</button>}
          <button onClick={getAllEvents}>Ver todos Los Eventos</button>
          <button onClick={eventsForWeek}>Ver Eventos de Semana</button>
        </div>
    </div>
     
    
  )
}