import React, {useState} from "react"




const topSectionStyle= {
  display: "flex",
  justifyContent: "end",
  padding: "0 .6rem",
  color: "#888"
}
  
const mainSectionStyle= {
  padding: "0 1rem",
  display: "flex",
  justifyContent: "center"
}

const buttonClose= {
  border: "none",
  background: "transparent",
  color: "#fafafa"
}

export default function ModalAviso({msg, handleModalAviso,modalStyle}) {

  return(
    <div style={modalStyle} className="modal_aviso">
      <div className="top_section" style={topSectionStyle}>
        <button onClick={handleModalAviso} style={buttonClose} value={"X"}>x</button>
      </div>
      <div className="main_section" style={mainSectionStyle}>
        <p>{msg}</p>
      </div>
    </div>
  )
}

   
