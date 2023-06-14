import { useEffect, useState } from 'react';

const useHandleModalAlert= ()=>{

  const [modalResponse, setModalResponse]= useState(false);
  const [alert, setAlert]= useState(false);

  const handleModal= (e)=>{
    if(e.target.value == "Cancelar" || e.target.value == "X"){
      console.log("Operacion Cancelada")
      setModalResponse(false)
      setAlert(false)
      setLoading(false)
    }else if(e.target.value == "Aceptar" ){
      console.log("Operacion Realizada")
      setModalResponse(true)
      setAlert(false)
    }
  }

  const openModal=  ()  =>{
    setAlert(true)
    setLoading(true)
  }

  return [modalResponse, handleModal, alert,openModal]
}


// , openModal
export default useHandleModalAlert;