import React, {useState} from "react"

const WindowAvisoStyle = {
  postion: "relative",
  background: "red",
  borderRadius: "5",
  padding: "15",
  boxShadow: "2px 2px 10px rgba(0,0,0,0,3)",
  zIndex: "10",
  minWidth: "320",
}

const CloseBtnStyle = {
  position: "absolute",
  top: "0",
  right: "0",
}


export default function ModalAviso() {
      
  const [showModalAviso, setShowModalAviso] = useState(false);
  
  const openModal = () => {
    setShowModalAviso(true);
  };

  const closeModal = () => {
    setShowModalAviso(false);
  };

  return (
    <>
      <div>
        <ModalAviso style={WindowAvisoStyle} onClick={openModal}>
          < h1>¡Aviso!</h1>
        </ModalAviso>

        {showModalAviso && (
          <div>
            <div>
              <p>Este es un mensaje de aviso</p>
              <ModalAviso style={CloseBtnStyle} onClick={closeModal}>X</ModalAviso>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

   
