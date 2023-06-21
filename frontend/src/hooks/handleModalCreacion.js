import { useState } from "react"

const useHandleModalCreacion = () => {
  const [modalCreacionResponse, setModalCreacionResponse] = useState(false);
  const [creacion, setCreacion] = useState(false);

  const handleModalCreacion = (e) => {
    if(e.target.value == "X"){
        console.log("Operación cancelada")
        setModalCreacionResponse(false)
        setCreacion(false)
    }
  }

  const openModalCreacion = () => {
    setCreacion(true)
  }

  const modalCreacionCalled = {
    background: "red",
  }

  return[modalCreacionResponse, handleModalCreacion, creacion, openModalCreacion, modalCreacionCalled]
}

export default useHandleModalCreacion;