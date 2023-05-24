import React, {useState} from "react"

const modalAvisoCalled= {
  width: "20%",
  minHeight: "4rem",
  position: "absolute",
  left:"0",
  right: "0",
  margin: "0 auto",
  background: "#21273785", //#f4f4f8 PARA DARKMODE  //8797af otra opcion
  borderRadius: "20px",
  color: "#f4f4f8",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "2s"
}

const topSectionStyle= {
  display: "flex",
  justifyContent: "end",
  padding: "0 .6rem",
  color: "#888"
}
  
const mainSectionStyle= {
  padding: "0 1rem"
}

const buttonClose= {
  border: "none",
  background: "transparent",
  color: "#fafafa"
}


export default function ModalAviso({msg, handleModalAviso}) {

  return(
    <div style={modalAvisoCalled} className="modal_aviso">
      <div className="top_section" style={topSectionStyle}>
        <button onClick={handleModalAviso} style={buttonClose} value={"X"}>X</button>
      </div>
      <div className="main_section" style={mainSectionStyle}>
        <p>{msg}</p>
      </div>
    </div>
  )
}

   
