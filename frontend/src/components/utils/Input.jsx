import React from "react";

export default function Input({value="", type="", placeholder="", name="", onChange= null, classStyle}){

  const inputStyle= {
    borderRadius: "0.6rem",
    border: "1.5px solid #ccc",
    padding: ".1rem .6rem",
    color: "#222",
    background: "#eee",
    outline: "none",
  }


  return(
    <>
      <input value={value} type={type} placeholder={placeholder} name={name} onChange={onChange} style={inputStyle} className={classStyle} />
    </>
  )
}