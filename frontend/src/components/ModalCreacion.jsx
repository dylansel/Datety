import React from "react";

/*
INPUTS:
- Titulo
- Descripcion input area
- Fecha de Inicio date
- Fecha de Fin date 
- Hora de inicio time 
- Hora de Fin time 
- Repeticion del Evento multi check 
    Repeat:{
        rep: [1,1,1,1,1,0,0,1] | [16]
        evenWhen: "16/10/2023" (input type date)
    }
- Recordatorio Input(tiempo (number)) Input(Medida de tiempo (select) )
- Invitar participantes input con options dinamicos
*/ 

const cornerSectionStyle = {
  display: "flex",
  justifyContent: "end",
  padding: "0 .6rem",
  color: "#888",
  background: "#202020"
}

const buttonClose= {
  border: "none",
  background: "transparent",
  color: "#fafafa"
}

const mainSection = {
  padding: "0 1rem",
  display: "flex",
  justifyContent: "center",
  background: "#222222"
}


export default function ModalCreacion({handleModalCreacion, modalCreacion}) {
    return(
        <>
            <div style={modalCreacion} className="modal_creacion">
                <div style={cornerSectionStyle} className="corner_section">
                    <button onClick={handleModalCreacion} style={buttonClose} value={"X"}>x</button>
                </div>
                <div className="main_section_creation" style={mainSection}>
                    <input type="text" placeholder="Añade un título" />
                    <input type="area" placeholder="Descripción"/>
                    <input type="date" />
                    <input type="time" />
                    <input type="time" />
                    <input type="checkbox" />
                </div>
            </div>
        </>
    )
} 