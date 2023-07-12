import React from "react";


export default function Input({value="", type="", placeholder="", name="", onChange= null, classStyle}){


  const inputStyle= {
    borderRadius: "0.6rem",
    border: "1.6px solid #ccc",
    padding: ".5rem .6rem",
    color: "#222",
    background: "#eee",
    outline: "none",
    width: "100%"
  }


  return(
    <>

      <input value={value} type={type} placeholder={placeholder} name={name} onChange={onChange} style={inputStyle} className={classStyle} />

    </>
  )
}