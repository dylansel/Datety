import React,{useState, useEffect} from "react"
import Header from "../components/utils/Header"


const isLoged = true;

export default function Setting(){

  return(
    <>
      <Header isLoged={isLoged}/>
      <div>
        <h2>Setting</h2>
      </div>
    </>
  )
}