import React, { useState, useEffect } from "react"
import ModalCreacion from "../components/ModalCreacion"
import useHandleModalCreacion from "../hooks/handleModalCreacion"

export default function NotFound() {

  const [modalCreacionResponse, handleModalCreacion, creacion, openModalCreacion] = useHandleModalCreacion();

  return (
    <>
      <div>
        <h2>Esta pagina no existe, Volver a <a href="/">inicio</a> </h2>
        <button onClick={openModalCreacion}>Crear Evento</button>
        {creacion && <ModalCreacion handleModalCreacion={handleModalCreacion} isDinamic={false}/>}
      </div>
    </>
  )
}