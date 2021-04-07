
import React, { useEffect, useState } from 'react'
import{ GetHabilidadUser} from '../services'
import Button from '@material-ui/core/Button';
import { GetAllUsers } from "../services"
import { TextField } from '@material-ui/core';
import ("../../../assets/css/style.css")





export const Perfil = () => {

    const [users, setUsers] = useState([])
    const [habilidades, setHabilidades] = useState([])
    // useEffect(() => {
    //     GetAllUsers().then((request) => {
    //         setUsers(request.data)
    //         console.log(request.data[0])
    //     }).catch(error => alert(error))
    // }, [])

    useEffect(() => {
        GetHabilidadUser().then((request) => setHabilidades(request.data.habilidades))
    },[])

    return habilidades === null ? (
        <div className="contenedorPerfil">
        </div>

    ):(
        <div className="contenedorPerfil">
            <div className="contenedor_Titulo">
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
                    <div className="separador"></div>
                    <h3> <strong>Habilidades </strong></h3>
 
                    <div className="contenedor_Habilidades">
                        <TextField className="contenedor_Habilidades_input" variant="outlined" placeholder="Agregar habilidad"></TextField>
                        <Button  className="contenedor_Habilidades_button" variant="contained" color="primary">+</Button>
                    </div>
                    <h5> 1.  Habilidad </h5>
                    <h5> 2.  Habilidad</h5>
                    <h5> 3.  Habilidad </h5> 
                        {habilidades.map( (habilidad,index) => {
                            {console.log(habilidad.nombreHabilidad)}
                            <p key={index}> {habilidad.nombreHabilidad} </p>
                        })}
                        
                    
                    

                </div>

            </div>
        </div>
    )
}

export default Perfil
