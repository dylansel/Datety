import React, { useState, useEffect } from "react"
import AlertModal from "../components/AlertModal";
import Header from "../components/utils/Header";

const isLoged = true;


export default function APP() {
  
  // const [create, setCreate] = useState(true);
  const [isPending, setIsPending]= useState(false)

  const closeModal= ()=>{
    setIsPending(false)
  }

  const openModal= ()=>{
    setIsPending(true)

  }

  const temporalStyle= {}
  const alertStyle= {
    opacity: "0.5",
    background: "rgba(0, 0, 0, 0.5)"
  }



  return (
    <div>
      <Header isLoged={isLoged} />
      {isPending && <AlertModal msg="desea crear un nuevo evento" closeModal={closeModal} isCalled={isPending}/>}
        <div style={isPending ? alertStyle : temporalStyle}>
          <h2>APP</h2>
          <button onClick={openModal}>Crear</button>
        </div>
    </div>
     
    
  )
}