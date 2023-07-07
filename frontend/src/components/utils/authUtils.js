import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function redirectTo(to){
  const navigate = useNavigate();
  navigate(to)
}
export function restrict(auth){
  //-----------------AUTHENTHICATION------------
  const reloaded = async () =>{
    const authe = await auth.reloaded();
    console.log("RELODEANDO",authe)
    if(!authe){
      redirectTo('/login'); //redireciona al login en caso de no estar authenticado
    }
  }

  useEffect(()=>{
    console.log("AUTENTICANDO")
    if(!auth.user){
      console.log("NO ESTA AUTENTICADO")
      navigate('/login');
      //reloaded()
    }
  },[])
  //-----------------FIN AUTHENTHICATION------------
}