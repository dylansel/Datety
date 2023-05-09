import React from "react";

export default function AlertModal({msg, closeModal, isCalled}) {
    
  const modalContainerStyle= {
    width: "20%",
    minHeight: "12rem",
    left:"0",
    right: "0",
    margin: "0 auto",
    background: "#212737", //#f4f4f8 PARA DARKMODE  //8797af otra opcion
    borderRadius: "20px",
    color: "#f4f4f8",
    display: "none",
    flexDirection: "column",
    justifyContent: "space-between",
    
  }

  const modalCalled= {
    width: "20%",
    minHeight: "12rem",
    position: "absolute",
    left:"0",
    right: "0",
    margin: "0 auto",
    background: "#212737", //#f4f4f8 PARA DARKMODE  //8797af otra opcion
    borderRadius: "20px",
    color: "#f4f4f8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "1s"
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

  const buttonSectionStyle= {
    display: "flex",
    justifyContent: "space-evenly",
    padding: ".6rem 0"
  }

  const buttonStyle= {
    borderRadius: "10px",
    border: "none",
    padding: ".3rem",
    color: "#fafafa"

  }

  const buttonClose= {
    border: "none",
    background: "transparent",
    color: "#fafafa"
  }



  return(
    <div style={isCalled ? modalCalled : modalContainerStyle } className="modal_alert">
      <div className="top_section" style={topSectionStyle}>
        <button onClick={closeModal} style={buttonClose}>x</button>
      </div>
      <div className="main_section" style={mainSectionStyle}>
        <p>¿Seguro que {msg}?</p>
      </div>
      <div className="buttons-section" style={buttonSectionStyle}>
        <button style={buttonStyle} className="cancel_button" onClick={closeModal}>Cancelar</button>
        <button style={buttonStyle} className="accept_button"  onClick={closeModal}>Aceptar</button>
      </div>
    </div>
  )
}