import { useEffect, useState } from "react";
import { getUser } from "../services/userService";
import { getAuthToken } from "../services/authService";


const useAuth= ()=>{
    const [user,setUser] = useState(null);
    const [authenticated,setAuthenticated] = useState(false);

    const reloaded = async ()=>{
        setAuthenticated(false)
        setUser(null)
        if(getAuthToken() ){
            const u = await getUser()
            if(u.name){
               setUser(u) 
                setAuthenticated(true)
                return true
            }
            
        }
        setAuthenticated(false)
    }
    
    useEffect(()=>{
        reloaded()
    },[])

    return{authenticated,user,reloaded}

}
export default useAuth;