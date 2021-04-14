import React, { createContext, useContext, useEffect, useState } from 'react'
import {LoginService} from "../pages/Grupo/services" 


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
    const [isAuthenticated, setisAuthenticated] = useState(false)


    useEffect(() => {
        if (localStorage.getItem("usuario")){
            setisAuthenticated(true)
        }
    }, [])

    const cerrarSesion = () => {
        if (localStorage.getItem("usuario")){
            localStorage.removeItem("usuario")
        }
    }

    const login = (username, password) => {

        if (localStorage.getItem("usuario")){
            setisAuthenticated(true)
        }else{

            LoginService(`${username}:${password}`).then(
                (request) =>{
                    alert("entro")
                    setisAuthenticated(true)
                    localStorage.setItem("usuario", request );

                }).catch(setisAuthenticated(false))

            // setisAuthenticated(false)
            // if (username!=null){
            //     localStorage.setItem("usuario", username );
            //     setUser(username)
            //     setisAuthenticated(true)
            // }else{
            //     setisAuthenticated(false)
            // }
        }
        
        
        
    }

    return {
        user,
        setUser,
        login,
        isAuthenticated,
        cerrarSesion,
    };
}