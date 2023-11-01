import React, { useState, useEffect } from "react"
import { BrowserRouter, Link } from "react-router-dom";
import '../../stylesheets/animations.css';
import defaultProfilePicture from '../../assets/imgs/defaultProfilePicture.png'
import { useAuth } from "../../contexts/authContext";

const styleNav = {
    fontFamily: "'Comfortaa', cursive",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "8.25rem",
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

const imgStyle = {
  width: "4rem",
  height: "4rem",
  borderRadius: "50%",
}

const iconLogOutStyle = {
  fontSize:"2.4rem",
  margin:"1rem",
}

export default function Header({auth}) {
  const { user, login, logout } = useAuth();

  const [userPhoto, setUserPhoto] = useState(user?.photo || defaultProfilePicture);
  useEffect(()=>{setUserPhoto(user?.photo)},[user?.photo])
  
    return (
        <>
          <header >
            <nav style={styleNav}>
              <h2 style={{ color: "#ffd", flexGrow: "2" }}>DateTy</h2>
                {(user)? 
                <div className="links-container" style={linksContainer}>
                  <li className="link-item" style={linkItem}><Link style={item} className="item" to="/settings">Settings</Link></li>
                  <li className="link-item" style={linkItem}><Link style={item} className="item" to="/app">My agenda</Link></li>
                  <li className="link-item" style={linkItem}><Link style={item} className="item" to="/about">About Us</Link></li>
                  
                  <li className="" style={linkItem}><Link style={item} className="item" >{`${user?.name} ${user?.surname}`}</Link></li>
                  <img src={userPhoto} style={imgStyle} alt="icono de perfil" onError={()=>setUserPhoto(defaultProfilePicture)}/>
                  <i className="fa-solid fa-right-from-bracket link_pointed" style={iconLogOutStyle} onClick={logout}></i>
                   
                </div>
                  :
                <div className="links-container" style={linksContainer}>
                    <li className="link-item" style={linkItem}><Link style={item} className="item" to="/login">Login</Link></li>
                    <li className="link-item" style={linkItem}><Link style={item} className="item" to="/register">Register</Link></li>
                    <li className="link-item" style={linkItem}><Link style={item} className="item" to="/about">About Us</Link></li>
                </div>                
              }
              </nav>
            </header>
        </>
    )
}
