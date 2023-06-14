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
  const [msg, setMsg]= useState("");
  const [modalResponse, handleModal, alert, openModal, loading]= useHandleModalAlert();


  const [events, setEvents] = useState([
    { id:1 ,title: 'Pijamada en lo del diego', start: "2023-06-07T10:00:00", end: "2023-06-07T12:00:00" },
    { id:2 ,title: 'event 2', date: '2023-06-08'}
  ])

  const eventDrop = (info) => {
 
    const newEvents = events.map((e) => {
      if (e.id == info.event.id) {
        const data = {
          ...info.event,
          id: info.event.id,
          title: info.event.title,
          start: info.event.start,
          end: info.event.end
        };
        
        setMsg(info.event.title + " fue movia " + info.event.start + " Are you sure about this change?")
        openModal();

        console.log("RESPUESTA:",modalResponse)
        
        if(!modalResponse){
          info.revert();
        }else{
          return data
        }

       


      }
      return e;
    });

    setEvents(newEvents);
  };
  


  return (

    <div className={alert ? "app_alerted" : "app"}>
      <Header isLoged={isLoged} />
      {alert && <AlertModal msg={msg} handleModal={handleModal}/>}
        <div>
          <h2>APP</h2>
          <button onClick={openModal}>Crear</button>
          <button onClick={()=>console.log(events)}>EVENTOS</button>


          <FullCalendar
          timeZone="local"
        
          eventChange={function (e){
            console.log(e.event._def.title)
            e.title= e.event._def.title
            console.log("TITTLE: ",e.title)
          }}
          
          dateClick={function(info){
            console.log('Clicked on: ' + info.dateStr);
            console.log('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
            console.log('Current view: ' + info.view.type);
            console.log('EVENTO: ' + info.date.toString());
          }}
          locale= 'es'
          plugins={[dayGridPlugin, timeGridPlugin,interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar= {{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          
          // eventChange={(e)=>{
          //   console.log("CAMBIO: ", e._def.title)
          // }}
          eventDrop={eventDrop}
          editable={true}
          selectable={false}
          events={events}
          allDaySlot={false}

        />

        </div>
    </div>
     
    
  )
}