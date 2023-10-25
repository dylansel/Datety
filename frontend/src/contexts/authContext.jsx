import React, { createContext, useContext, useEffect, useState } from 'react';
import { deleteAuthToken, getAuthToken, setAuthToken } from '../services/authService';
import { getUser } from '../services/userService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (userData) => {
    try {
      setLoading(true)
    setAuthToken(userData)
    const u = await getUser()
    setUser(u.data);
    } catch (error) {
      console.error(error)
    }finally{
      setLoading(false)

    }
   
  }

  const logout = () => {
    setUser(null);
    deleteAuthToken()
    const auth2 = window.gapi.auth2.getAuthInstance();
    if (auth2) {
      auth2.signOut().then(() => {
        console.log('Se cerro sesion de google');
      });
    }
  }

  const reloaded = async ()=>{
    try {
      setUser(null)
      setLoading(true)
      if(getAuthToken()){
          const u = await getUser()
          if(u.status != 200){
            return false
          }
          if(u.data.name){
             setUser(u.data) 
              return true
          }
          
      }
    } catch (error) {
      console.error(error)
    }finally{
      setLoading(false)

    }
   
}

useEffect(()=>{
    reloaded()
},[])

  return (
    <AuthContext.Provider value={{ user, login, logout,loading }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
