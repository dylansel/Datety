import React from "react";

export default function Input({ value = "", type = "", placeholder = "", name = "", onChange = null, widthInput, classTyle }){

  const inputStyle= {
    borderRadius: "0.6rem",
    border: "1.6px solid #ccc",
    padding: ".5rem .6rem",
    color: "#222",
    background: "#eee",
    outline: "none",
    width: widthInput
  }


  return(
    <>
      <input value={value} type={type} placeholder={placeholder} name={name} onChange={onChange} style={inputStyle} className={classTyle}/>
    </>
  )
}