import React,{useState, useEffect} from "react"
import Header from "../components/utils/Header"
import ModalAviso from "../components/ModalAviso";
import useHandleModalAviso from "../hooks/handleModalAviso";


const isLoged = true;

export default function Setting(){
  const [modalAvisoResponse, handleModalAviso, aviso, openModalAviso]= useHandleModalAviso();

  return(
    <>
      <div className={aviso ? "app_aviso" : "app"}>
        <Header isLoged={isLoged} />
        {aviso && <ModalAviso msg="El evento ha sido creado!" handleModalAviso={handleModalAviso}/>}
        <div>
          <h2>SETTINGS </h2>
          <button onClick={openModalAviso}>Aviso!</button>
        </div>
      </div>
    </>
  )
}