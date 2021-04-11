import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'



const authContext = createContext();

export const useAuth = () => {
    return useContext(authContext);
  };

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setisAuthenticated] = useState()


    useEffect(() => {
        if (localStorage.getItem("usuario")){
            alert("logeado")
            setisAuthenticated(true)
        }
    }, [])
    const login = (username, password) => {
        if (localStorage.getItem("usuario")){
            alert("logeado")
            setisAuthenticated(true)
        }else{
            setisAuthenticated(false)
            if (username!=null){
                localStorage.setItem("usuario", username );
                setUser(username)
                setisAuthenticated(true)
            }else{
                setisAuthenticated(false)
            }
        }
        
        
        
    }

    return {
        user,
        setUser,
        login,
        isAuthenticated,
    };
}