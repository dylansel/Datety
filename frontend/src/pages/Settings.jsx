import React,{useState, useEffect} from "react"
import Header from "../components/utils/Header"

const isLoged = true;

export default function Setting(){

  return(
    <>
      <div>
        <Header isLoged={isLoged} />
        <div>
          <h2>SETTINGS </h2>
        </div>
      </div>
    </>
  )
}