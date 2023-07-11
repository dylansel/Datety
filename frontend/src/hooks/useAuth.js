import { useEffect, useState } from "react";
import { getUser } from "../services/userService";
import { deleteAuthToken, getAuthToken } from "../services/authService";

 
const useAuth= ()=>{
    const [user,setUser] = useState(null);
    const [loaded,setLoaded] = useState(false);
    const logOut = ()=>{
        deleteAuthToken()
        
        reloaded()
    }
    const reloaded = async ()=>{
        setLoaded(false)
        setUser(null)
        if(getAuthToken() ){
            const u = await getUser()
            console.log(u)
            if(u.status != 200){
              setLoaded(true)
              return false
            }

            if(u.data.name){
               setUser(u.data) 
               setLoaded(true)
                return true
            }
            
        }
        setLoaded(true)
    }
    
    useEffect(()=>{
        reloaded()
    },[])

    return{loaded,user,reloaded,logOut}

}
export default useAuth;



