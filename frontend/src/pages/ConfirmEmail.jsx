import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/misc/Loading";
import { confirmEmailByToken } from "../services/userService";


export default function ConfirmEmail(){
  const { emailToken } = useParams();
  const [isConfirm,setIsConfirm] = useState(false);

  const fetch = async()=>{
    const confirmedRes = await confirmEmailByToken(emailToken);
    if( confirmedRes.status == 200)setIsConfirm(true)
  }
  useEffect(() => {
    fetch()
  },[])

  return ( 
    <>
    
    <h2>{isConfirm?"EL email ya se confirmo, ya tienes acceso":""}</h2>
    {!isConfirm && <Loading msg="Confirmando EMAIL"/>}

    </>
  )
}