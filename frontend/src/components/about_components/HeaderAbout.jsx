import React, { useState, useEffect } from "react"
import { BrowserRouter, Link } from "react-router-dom";
import '../../stylesheets/animations.css';

const styleNav = {
    fontFamily: "'Comfortaa', cursive",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "6.25rem",
    background: "#6C63FF",
    padding: "3.125rem",
    boxSizing: "border-box"
}

const linksContainer= {
    // width: "300px",
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    flexGrow: "1",
}

const linkItem= {
    listStyle: "none",
    fontWeight: "bold",
    transition: ".4s",
    position: "relative",
    margin: "0 0.93rem"
    // border: "3px solid #ffe",
    // padding: "8px",
    // borderRadius: "8px",
}

const item= {
    color: "#ffe",
    textDecoration: "none",
}



export default function HeaderAbout({firstLink, secondLink, firstRout, secondRoute, isLoged, thirdLink, thirdRoute}) {
    return (
        <>
            <header >
                <nav style={styleNav}>
                    <h2 style={{color: "#ffd", flexGrow: "2"}}>DateTy</h2>
                    <div className="links-container" style={linksContainer}>
                        <li className="link-item" style={linkItem}><Link style={item} className="item" to={firstRout}>{firstLink}</Link></li>
                        <li className="link-item" style={linkItem}><Link style={item} className="item" to={secondRoute}>{secondLink}</Link></li>
                        {isLoged ? <li className="link-item" style={linkItem}><Link style={item} className="item" to={thirdRoute}>{thirdLink}</Link></li> : ""}
                    </div>    
                </nav>
            </header>
        </>
    )
}
//"/login"
///"register"