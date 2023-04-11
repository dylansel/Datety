import React, { useState, useEffect } from "react"
import { BrowserRouter, Link } from "react-router-dom";

const styleNav = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100px",
    background: "#6B7FD7",
    padding: "50px",
    boxSizing: "border-box"
}

const linksContainer= {
    width: "15%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
}

const linkItem= {
    listStyle: "none",
    fontWeight: "bold",
    border: "3px solid #ffe",
    padding: "8px",
    borderRadius: "6px",
    animation: "linkHover 0.3s easy-in"
}

const item= {
    color: "#ffe",
    textDecoration: "none",
}

// const linkHover={
//     @keyframes linkHover {
//         0 % {
//             transform: translateY(0);
//         }100% {
//             transform: translateY(-15px);
//         }
//     }
// }

export default function HeaderAbout() {
    return (
        <>
            <header >
                <nav style={styleNav}>
                    <h2>DateTy</h2>
                    <div className="links-container" style={linksContainer}>
                        <li className="link-item" style={linkItem}><Link style={item} to="/login">Login</Link></li>
                        <li className="link-item" style={linkItem}><Link style={item} to="/register">Register</Link></li>
                    </div>    
                </nav>
            </header>
        </>
    )
}