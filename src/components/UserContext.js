import React, { createContext, useContext, useEffect, useState } from 'react'
import {LoginService} from "../pages/Grupo/services" 
import { Redirect, Link } from 'react-router-dom'

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
    const [autenticationBasic, setAutenticationBasic] = useState(null)

    useEffect(() => {
        if (localStorage.getItem("usuario")){
            setisAuthenticated(true)
            setUser(JSON.parse(localStorage.getItem("usuario")))
            setAutenticationBasic(localStorage.getItem("autenticacion"))
            
        }
    }, [])

    const cerrarSesion = () => {
        if (localStorage.getItem("usuario")){
            localStorage.removeItem("usuario")
            setisAuthenticated(false)
            setUser(null)
        }
    }

    const login = (username, password) => {

        if (localStorage.getItem("usuario")){
            setisAuthenticated(true)
            setUser(JSON.parse(localStorage.getItem("usuario")))
            setAutenticationBasic(`${username}:${password}`)
        }else{

            LoginService(`${username}:${password}`).then(
                (request) =>{
                    
                    setisAuthenticated(true)
                    setUser(JSON.parse(JSON.stringify(request.data)))
                    setAutenticationBasic(`${username}:${password}`)
                    localStorage.setItem("autenticacion",`${username}:${password}`) // TODO SEGURIDAD!!!
                    localStorage.setItem("usuario", JSON.stringify(request.data) );
                    return <Redirect to='/ofertas' />

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
        autenticationBasic,
    };
}