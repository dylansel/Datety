import React,{useState, useEffect} from "react"
import Header from "../components/utils/Header"
import { useNavigate } from "react-router-dom";

const isLoged = true;

export default function Setting({auth}){
  //-----------------AUTHENTHICATION------------
  const navigate = useNavigate();
  const reloaded = async () =>{
    const authe = await auth.reloaded();
    if(!authe){
        navigate('/login'); //redireciona al login en caso de no estar authenticado
    }
  }
  useEffect(()=>{
    if(!auth.user){
      reloaded()
    }
  },[auth.user])
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