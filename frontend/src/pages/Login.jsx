import React, { useState, useEffect } from "react"
import HeaderAbout from "../components/about_components/HeaderAbout"

export default function Login() {
  return (
    <>
    <HeaderAbout firstLink="About us" secondLink="Register" firstRout="/about" secondRoute="/register"/>
      <div>
        <h2>Login</h2>
      </div>
  </>
  )
}