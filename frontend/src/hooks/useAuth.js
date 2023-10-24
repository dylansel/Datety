import { useEffect, useState } from "react";
import { getUser } from "../services/userService";
import { deleteAuthToken, getAuthToken } from "../services/authService";

 
const useAuth= ()=>{
    const clientID =  import.meta.env.VITE_Auth2ClienteId;
    const [user, setUser] = useState(null);
  
    const onSuccess = (response) => {
      console.log(response)
      setUser(response.profileObj);
      document.getElementsByClassName("btn").hidden = true;
    }
    const onFailure = (response) => {
      console.log("Something went wrong");
    }
    const handleLogout  = () => {
      setUser({}); 
    }
    useEffect(() => {
      function start() {
        gapi.client.init({
          clientId: clientID,
        });
      }
      gapi.load("client:auth2", start);
    });



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

    return{loaded,user,reloaded,logOut,auth2:{onSuccess,handleLogout,onFailure,clientID}}

}
export default useAuth;



