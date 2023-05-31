import { useState } from 'react';

const useHandleModalAviso= ()=>{
  const [modalAvisoResponse, setModalAvisoResponse]= useState(false);
  const [aviso, setAviso]= useState(false);

  const handleModalAviso= (e)=>{
    if(e.target.value == "X"){
      console.log("Operacion Cancelada")
      setModalAvisoResponse(false)
      setAviso(false)
    }
  }
  const modalAvisoCalled= {
    width: "20%",
    minHeight: "4rem",
    position: "absolute",
    left:"0",
    right: "0",
    bottom: "0",
    margin: "0 auto",
    background: "#6C63FF", //#f4f4f8 PARA DARKMODE  //8797af otra opcion
    borderRadius: "20px",
    color: "#f4f4f8",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "2s"
  }

  const openModalAviso= ()=>{
    setAviso(true)   
    setTimeout(()=>{
      setAviso(false)   
    },3899)
  }

  return [modalAvisoResponse, handleModalAviso, aviso,openModalAviso, modalAvisoCalled]
}
export default useHandleModalAviso;