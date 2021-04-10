
import React, { useEffect, useState } from 'react'
import { GetHabilidadUser } from '../services'
import Button from '@material-ui/core/Button';
import { GetAllUsers } from "../services"
import { TextField } from '@material-ui/core';
import("../../../assets/css/style.css")





export const Perfil = () => {

    const [users, setUsers] = useState([])
    const [habilidades, setHabilidades] = useState([])
    // useEffect(() => {
    //     GetAllUsers().then((request) => {
    //         setUsers(request.data)
    //         console.log(request.data[0])
    //     }).catch(error => alert(error))
    // }, [])


    return habilidades === null ? (
        <div className="contenedorPerfil">
        </div>

    ) : (
        <div className="contenedor-perfil">
            <div className="contenedor-header">
                {/* <div>
                    <h2><strong>Perfil</strong></h2>
                </div> */}
                <div className="contenedor-imagen">

                    <img src="https://i.pinimg.com/originals/97/1d/0f/971d0f350dc43032bb2d2fb73fc8f9cb.jpg" />

                </div>
            </div>
            <div className="contenedor-datos">

                <h2><strong>Datos personales</strong></h2>
                <h6>Ana Maria Rodriguez </h6>
                <h6>Ingenieria audiovisual</h6>
                <h6>Estudiante de ingenieria de sistemas</h6>
                <h6>Me gusta mucho compartir mis conocimientos y oferto clases por si les interesa
                contactarme
                </h6>
                <h6>
                    Telefono: 3205341231
                </h6>
                <h6>
                    Barrio actual: Barrio Valencia
                </h6>
            </div>
            <div className="contenedor-habilidades">
                <h2><strong>Habilidades</strong></h2>
                <h6>Programadora CSS</h6>
                <h6>Grandes Habilidades en JS</h6>
                <h6>Usos buenos de frameworks como REACT,ANGULAR,CAKEPHP,FIREBASE</h6>

            </div>
            <div className="contenedor-botones">

                <input type="submit" placeholder="Editar Perfil"></input>

            </div>

        </div>
    )
}

export default Perfil
