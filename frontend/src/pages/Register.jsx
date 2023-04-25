import React from "react"
import HeaderAbout from "../components/about_components/HeaderAbout"

export default function Register(){
  return(
    <>
    <HeaderAbout firstLink="About us" secondLink="Login" firstRout="/about" secondRoute="/login" />
      <div>
        <h2>Register</h2>
      </div>
    </>
  )
}