import React, { useState, useEffect } from "react"
import Header from "../components/utils/Header";
import ModalAviso from "../components/ModalAviso"

const isLoged = true;

const ContenedorBotones = {
  display: "flex",
  justifyContent: "center",
  padding: "40px",
}

const StyleButtonAviso = {
  display: "flex",
  padding: "10px 30px",
  borderRadius: "100px",
  color: "#fff",
  border: "none",
  background: "#0197F6",
  cursor: "pointer",
}

export default function APP() {
  return (
    <>
      <Header isLoged={isLoged} />
      <div>
        <h2>APP</h2>
      </div>
      <div style={ContenedorBotones}>
      <button style={StyleButtonAviso}>Aviso 1</button>
      </div>
      <div>
      <ModalAviso msg="Gonza es un capo, crack de la vida"></ModalAviso>
      </div>
    </>
  )
}