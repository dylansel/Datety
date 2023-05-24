import React, { useState, useEffect } from "react"
import AlertModal from "../components/AlertModal";
import Header from "../components/utils/Header";
import useHandleModalAlert from "../hooks/handleModalAlert";
const isLoged = true;

export default function APP() {
  

  const [modalResponse, handleModal, alert, openModal]= useHandleModalAlert();




  return (

    <div className={alert ? "app_alerted" : "app"}>
      <Header isLoged={isLoged} />
      {alert && <AlertModal msg="desea crear un nuevo evento" handleModal={handleModal}/>}
        <div>
          <h2>APP</h2>
          <button onClick={openModal}>Crear</button>
        </div>
    </div>
     
    
  )
}