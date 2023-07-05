import React, { useState, useEffect } from "react"
import ModalCreacion from "../components/ModalCreacion"
import useHandleModalCreacion from "../hooks/handleModalCreacion"

export default function NotFound() {


  return (
    <>
      <div>
        <h2>Esta pagina no existe, Volver a <a href="/">inicio</a> </h2>
        
      </div>
    </>
  )
}