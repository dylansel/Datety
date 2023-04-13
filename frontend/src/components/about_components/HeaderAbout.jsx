import React, { useState, useEffect } from "react"
import { BrowserRouter, Link } from "react-router-dom";
import '../../stylesheets/animations.css';

const styleNav = {
    fontFamily: "'Comfortaa', cursive",
    display: "flex",
  
    alignItems: "center",
    width: "100%",
    height: "100px",
    background: "#6C63FF",
    padding: "50px",
    boxSizing: "border-box"
}

const linksContainer= {
    width: "12%",
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    flexGrow: "1"
}

const linkItem= {
    listStyle: "none",
    fontWeight: "bold",
    transition: ".4s",
    position: "relative",
    margin: "0 15px"
    // border: "3px solid #ffe",
    // padding: "8px",
    // borderRadius: "8px",
}

const item= {
    color: "#ffe",
    textDecoration: "none",
}

export default function HeaderAbout({firstLink, secondLink, firstRout, secondRoute}) {
    return (
        <>
            <header >
                <nav style={styleNav}>
                    <h2 style={{color: "#ffd", flexGrow: "2"}}>DateTy</h2>
                    <div className="links-container" style={linksContainer}>
                        <li className="link-item" style={linkItem}><Link style={item} className="item" to={firstRout}>{firstLink}</Link></li>
                        <li className="link-item" style={linkItem}><Link style={item} className="item" to={secondRoute}>{secondLink}</Link></li>
                    </div>    
                </nav>
            </header>
        </>
    )
}
//"/login"
///"register"