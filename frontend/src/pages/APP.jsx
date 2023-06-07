import React, { useState, useEffect } from "react"
import AlertModal from "../components/AlertModal";
import Header from "../components/utils/Header";
import useHandleModalAlert from "../hooks/handleModalAlert";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid' //plugin de show semanal
import interactionPlugin from "@fullcalendar/interaction"; //plugin de funcionalidad


const isLoged = true;

export default function APP() {
  const [modalResponse, handleModal, alert, openModal]= useHandleModalAlert();
  const [events, setEvents] = useState([
    { id:1 ,title: 'Pijamada en lo del diego', start: "2023-06-07T10:00:00", end: "2023-06-07T12:00:00" },
    { id:2 ,title: 'event 2', date: '2023-06-08'}
  ])


  const handleEventDrop = (eventDropInfo)=>{
    // Accede al evento y a su nueva fecha y hora
    const event = eventDropInfo.event;
    const newStart = eventDropInfo.start;
    const newEnd = eventDropInfo.end;
    console.log(eventDropInfo.event.start.toISOString())
    // Actualiza el horario del evento con las nuevas fechas y horas
    event.setStart(newStart);
    event.setEnd(newEnd);
    
   

    // Realiza cualquier otra lógica que desees después del cambio de horario
    console.log("Evento arrastrado y soltado:", events);
  }
  const eventDrop = (info) => {
 
    const newEvents = events.map((e) => {
      if (e.id == info.event.id) {
        const data = {
          ...info.event,
          id: info.event.id,
          start: info.event.start,
          end: info.event.end
        };
        return data
      }
      return e;
    });
    console.log("newEvents", newEvents);

    setEvents(newEvents);
  };
  


  return (

    <div className={alert ? "app_alerted" : "app"}>
      <Header isLoged={isLoged} />
      {alert && <AlertModal msg="desea crear un nuevo evento llamado comer con Celeste" handleModal={handleModal}/>}
        <div>
          <h2>APP</h2>
          <button onClick={openModal}>Crear</button>
          <button onClick={()=>console.log(events)}>EVENTOS</button>
          <FullCalendar
          
          plugins={[dayGridPlugin, timeGridPlugin,interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar= {{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          eventDrop={eventDrop}
          editable={true}
          selectable={true}
          events={events}
        />

        </div>
    </div>
     
    
  )
}