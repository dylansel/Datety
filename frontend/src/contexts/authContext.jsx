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
      reloaded()
    } catch (error) {
      console.error(error)
    }finally{
      setLoading(false)

    }
   
  }

  const logout = () => {
    setUser(null);
    deleteAuthToken()
  }

  const reloaded = async ()=>{
    try {
      setUser(null)
      setLoading(true)
      if(getAuthToken()){
          const u = await getUser()
          console.log(u)
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
