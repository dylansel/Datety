import React from "react";


const modalCalled= {
  width: "30%",
  minWidth: "14rem",
  minHeight: "12rem",
  position: "absolute",
  left:"0",
  right: "0",
  margin: "0 auto",
  background: "#f4f4f8", //#f4f4f8 PARA DARKMODE  //8797af otra opcion //#212737
  borderRadius: "20px",
  color: "#212737",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "1s"
}

const topSectionStyle= {
  display: "flex",
  justifyContent: "end",
  padding: "0 .6rem .5rem 0",
  color: "#212737",
  borderBottom: ".1px solid #999"
}
  
const mainSectionStyle= {
  padding: "1rem",
  display: "flex",
  justifyContent: "center"
}

const buttonSectionStyle= {
  display: "flex",
  justifyContent: "space-evenly",
  padding: ".6rem 0"
}

const buttonStyle= {
  borderRadius: "10px",
  border: "none",
  padding: ".4rem",
  color: "#111",
  width: "100%"
}

const buttonClose= {
  border: "none",
  background: "transparent",
  color: "#555"
}


export default function AlertModal({msg, handleModal}) {

  return(
    <div style={modalCalled} className="modal_alert">
      <div className="top_section" style={topSectionStyle}>
        <button onClick={handleModal} style={buttonClose} value={"X"}>x</button>
      </div>
      <div className="main_section" style={mainSectionStyle}>
        <p>¿Seguro que {msg}?</p>
      </div>
      <div className="buttons-section" style={buttonSectionStyle}>
        <button style={buttonStyle} className="modal_button cancel_button" onClick={handleModal} value={"Cancelar"}>Cancelar</button>
        <button style={buttonStyle} className="modal_button accept_button"  onClick={handleModal} value={"Aceptar"}>Aceptar</button>
      </div>
    </div>
  )
}