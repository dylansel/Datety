import React from "react"
import Header from "../components/utils/Header";
import ModalAviso from "../components/ModalAviso"

const isLoged = true;

const ModalAvisoStyle = {
  position: "absolute",
  background: "#E7E6F7",
  top: "0",
  left: "0",
  width: "25%",
  height: "3rem",
  borderRadius: "0.7rem",
  margin: "0 auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

export default function APP() {

  return (
    <>
      <Header isLoged={isLoged} />
      <div>
        <h2>APP</h2>
      </div>
      <div>
        <ModalAviso style={ModalAvisoStyle}></ModalAviso>
      </div>
    </>
  )
}