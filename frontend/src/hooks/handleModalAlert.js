import { useEffect, useState } from 'react';

const useHandleModalAlert = () => {
  const [modalResponse, setModalResponse] = useState(null);
  const [alert, setAlert] = useState(false);

  const handleModal = (e) => {
    if (e.target.value === "Cancelar" || e.target.value === "X") {
      console.log("Operación Cancelada");
      setModalResponse(false);
      setAlert(false);
    } else if (e.target.value === "Aceptar") {
      console.log("Operación Realizada");
      setModalResponse(true);
      setAlert(false);
    }
  };

  const openModal = () => {
    setModalResponse(null);
    setAlert(true);
  
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        const currentModalResponse = modalResponse;
        if (currentModalResponse !== null) {
          clearInterval(intervalId);
          resolve(currentModalResponse);
        }
      }, 100);
    });
  };
  

  return [modalResponse, handleModal, alert, openModal];
};


// , openModal
export default useHandleModalAlert;