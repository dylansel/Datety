import React, { useState, useEffect } from "react"
import AlertModal from "../components/AlertModal";
import Header from "../components/utils/Header";
import useHandleModalAlert from "../hooks/handleModalAlert";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
const isLoged = true;

export default function APP() {
  const [modalResponse, handleModal, alert, openModal]= useHandleModalAlert();
  return (

    <div className={alert ? "app_alerted" : "app"}>
      <Header isLoged={isLoged} />
      {alert && <AlertModal msg="desea crear un nuevo evento llamado comer con Celeste" handleModal={handleModal}/>}
        <div>
          <h2>APP</h2>
          <button onClick={openModal}>Crear</button>
          <FullCalendar
          
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          headerToolbar= {{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={[
            { title: 'event 1', date: '2023-06-07' },
            { title: 'event 2', date: '2023-06-08' }
          ]}
        />

        </div>
    </div>
     
    
  )
}