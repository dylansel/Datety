import React,{useState, useEffect} from "react"
import Header from "../components/utils/Header"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const isLoged = true;

export default function Setting(){
 //-----------------AUTHENTHICATION------------
 const { user, login, logout } = useAuth()
 const navigate = useNavigate();
 useEffect(()=>{
   if(!user){
     navigate('/login');
   }
 },[user])
 //-----------------FIN AUTHENTHICATION------------

  return(
    <>
      <div>
        <div>
          <h2>SETTINGS </h2>
        </div>
      </div>
    </>
  )
}