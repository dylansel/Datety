import React,{useState, useEffect} from "react"
import Header from "../components/utils/Header"

export default function Setting(){

  let loged = true
  return(
    <>

      {loged ? <Header isLoged={loged} firstLink="Logout" secondLink="Settings" thirdLink="My Agenda" firstRout="/login" secondRoute="/settings" thirdRoute="/app" /> :
        < Header isLoged={loged} firstLink="Login" secondLink="Register" firstRout="/login" secondRoute="/register" />} 
      <div>
        <h2>Setting</h2>
      </div>
    </>
  )
}