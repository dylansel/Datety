import React from "react"
import Header from "../components/utils/Header"

const isLoged= false;
export default function Register(){
  return(
    <>

      <Header isLoged={isLoged}/>
      <div>
        <h2>Register</h2>
      </div>
    </>
  )
}