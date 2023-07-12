import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


const loadingContainerStyle ={
    display: "flex",
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  }
  
 const spinnerStyle ={
    color:"#FEA920",
  }

export default function Loading({msg="Cargando..."}) {
  return (
    <div style={loadingContainerStyle}>
        <h1>{msg}</h1>
      <FontAwesomeIcon icon={faSpinner} spin size="3x" style={spinnerStyle} />
    </div>
  );
}

