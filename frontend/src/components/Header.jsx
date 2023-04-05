import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div>
        <nav>
          <ul>
            <a href="/app">APP</a>
          </ul>
        </nav>
      </div>
    </>
  )
}