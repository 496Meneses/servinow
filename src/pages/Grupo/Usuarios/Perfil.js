
import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import { GetAllUsers } from "../services"
import ("../../../assets/css/style.css")





export const Perfil = () => {

    const [users, setUsers] = useState([])
    
    // useEffect(() => {
    //     GetAllUsers().then((request) => {
    //         setUsers(request.data)
    //         console.log(request.data[0])
    //     }).catch(error => alert(error))
    // }, [])

    return users === undefined ? (
        <div className="contenedorPerfil">

            <h1>Mi perfil</h1>

        </div>

    ):(
        <div className="contenedorPerfil">
            <div className="contenedorTitulo">
                <h1 >Mi Perfil</h1>
            </div>
            

            <br></br>

            <div className="contenedorPerfil_Datos">
                <div className="contenedorPerfil_Imagen">
                        
                        <img src="https://www.clara.es/medio/2020/07/27/corte-pelo-bob_b7cfa415_1280x1830.jpg"/>
                    
                        
                </div>
                
                <div className="contenedorPerfil_Contacto">
                    
                    <h3> <strong> Nombres</strong>  Andres Camilo</h3>
                    <h3> <strong>Apellidos </strong> Meneses Ortega</h3>
                    <h3> <strong>Telefono</strong> 32035603421</h3>
                    <h3> <strong>Domicilio</strong> Carrera 65A 23BN 32</h3>
                    <h3> <strong>Correo </strong> acmeneses@unicauca.edu.co</h3>
                    
                    <h3> <strong>Descipción</strong> Estudiante universitario  </h3>

                    <div className="contenedor_Habilidades">
                         
                        <h3> <strong>Habilidades </strong></h3>
                        <h6> Habilidad 1</h6>
                        <h6> Habilidad 2</h6>
                        <h6> Habilidad 3</h6>
                        <h6> Habilidad 4</h6>
                        
                    </div>
                    

                </div>

            </div>
        </div>
    )
}

export default Perfil
