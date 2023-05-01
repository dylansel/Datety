import React, { useState, useEffect } from "react"
import Header from "../components/utils/Header";

const isLoged = true;


export default function APP() {
  return (
    <>
      <Header isLoged={isLoged} />
      <div>
        <h2>APP</h2>
      </div>
    </>
  )
}