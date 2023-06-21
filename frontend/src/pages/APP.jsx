import React, { useState, useEffect } from "react"
import AlertModal from "../components/AlertModal";
import Header from "../components/utils/Header";
import useHandleModalAlert from "../hooks/handleModalAlert";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid' //plugin de show semanal
import interactionPlugin from "@fullcalendar/interaction"; //plugin de funcionalidad
import { addEvent, getAllEvents } from "../services/eventServices";


const isLoged = true;

export default  function APP() {
  const [msg, setMsg]= useState("");
  const [modalResponse, handleModal, alert, openModal]= useHandleModalAlert();
  const [events, setEvents] = useState([])
  const [loading, setLoading]= useState(false);

    const eventDrop = (info) => {
    setMsg(info.event.title + " fue movida " + info.event.start + " Are you sure about this change?")
    const res = window.confirm(msg);
    if(!res){
      info.revert();
    }else{

      const newEvents = events.map((e) => {
        if (e.id == info.event.id) {
          const data = {
            ...info.event,
            id: info.event.id,
            title: info.event.title,
            start: info.event.start,
            end: info.event.end
          };
          return data
        }
        return e;
      });
      setEvents(newEvents);
      }
    };

    const newEvent= { 
      tittle: "16 años Juana",
      description: "Ir fachero",
      startDate: "2023-06-21", 
      endDate: "2023-06-21", 
      startTime: "10:00:00", 
      endTime: "15:00:00", 
      isDinamic: 0, 
      isAccepted: 0 
    }

    const enviarEvento= ()=>{
      addEvent(newEvent);
    }


    const fetchData= async ()=>{

      let arr= []
      const req= await getAllEvents();
      const results= req[0];
      console.log(results)

      results.forEach(event =>{
        console.log(event)
        const e = {id: event.idEvent, title:event.tittle,  start: `${event.startDate.split("T")[0]}T${event.startTime}`, end: `${event.endDate.split("T")[0]}T${event.endTime}`}
        arr.push(e)
      } )
      setEvents(arr)
    }
   
    useEffect(()=>{
      fetchData();
      
    },[])


  return (

    <div className={alert ? "app_alerted" : "app"}>
      <Header isLoged={isLoged} />
      {alert && <AlertModal msg={msg} handleModal={handleModal}/>}
        <div>
          <h2>APP</h2>
          {/* <button onClick={openModal}>Crear</button> */}
          <button onClick={enviarEvento}>Crear</button>
          <button onClick={getAllEvents}>Ver todos Los Eventos</button>
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