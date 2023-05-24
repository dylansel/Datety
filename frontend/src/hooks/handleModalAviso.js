import { useState } from 'react';

const useHandleModalAviso= ()=>{
  const [modalAvisoResponse, setModalAvisoResponse]= useState(false);
  const [aviso, setAviso]= useState(false);

  const handleModalAviso= (e)=>{
    if(e.target.value == "Cancelar" || e.target.value == "X"){
      console.log("Operacion Cancelada")
      setModalAvisoResponse(false)
      setAviso(false)
    }else if(e.target.value == "Aceptar" ){
      console.log("Operacion Realizada")
      setModalAvisoResponse(true)
      setAviso(false)
    }
  }

  const openModalAviso= ()=>{
    setAviso(true)   
  }

  return [modalAvisoResponse, handleModalAviso, aviso,openModalAviso]
}

export default useHandleModalAviso;