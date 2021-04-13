
import React, { useEffect, useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import("../../../assets/css/style.css")


export const Perfil = () => {

    const [usuarioLogeado, setUsuarioLogeado] = useState({
        nombres: "Andres Camilo",
        apellidos: "Meneses Ortega",
        documento: "1234131231",
        genero: "Masculino",
        mail: "acmeneses@unicauca.edu.co",
        telefono: "32323123231",
        telefono_alternativo: "32323123231",
        direccion: "carrera 6a 29bn32",
        descripcion: "Soy estudiante de ingenieria de sistemas y puedo aportar en clases de todo tipo para programar"
    })


    return (
        <div className="contenedor-perfil">
            <div className="Titulo">
                <h2><strong>Mi Perfil</strong></h2>
            </div>
            <div className="contenedor-header">

                <div className="contenedor-imagen">

                    <img src="https://i.pinimg.com/originals/97/1d/0f/971d0f350dc43032bb2d2fb73fc8f9cb.jpg" />
                    <div className="contenedor-cambiarFoto">
                        <input type="file" id="cambiarImagen" className="input-file-input" value="" />
                        <label for="cambiarImagen" className="input-file__btn">Cambiar Foto</label>
                    </div>
                </div>
            </div>

            <div className="contenedor-datos">

                <div className="contenedor-datos__titulo">
                    <h3><strong>Datos personales</strong></h3>
                    <button type="button"><EditIcon color="primary"></EditIcon></button>
                    
                
                </div>
                <div className="contenedor-datos-datos">

                    <div>
                        <h5><strong>Nombre(s) y apellido(s):   </strong> {usuarioLogeado.nombres} {usuarioLogeado.apellidos}</h5>

                    <div>
                        <h5><strong>Documento: </strong> {usuarioLogeado.documento}</h5>
                    </div>
                    <div>
                        <h5><strong>Genero: </strong> {usuarioLogeado.genero}</h5>
                    </div>
                    <div>
                        <h5><strong>E-mail: </strong> {usuarioLogeado.mail} </h5>
                    </div>
                    <div>
                        <h5><strong>Teléfono: </strong> {usuarioLogeado.telefono}</h5>
                    </div>
                    <div>
                        <h5><strong>Teléfono alternativo: </strong> {usuarioLogeado.telefono_alternativo}</h5>
                    </div>
                    <div>
                        <h5><strong>Dirección: </strong> {usuarioLogeado.direccion}</h5>
                    </div>


 
                </div>

            </div>

            <div className="contenedor-descripcion">
                <div className="contenedor-descripcion__titulo">
                    <h3><strong>¿Quien soy?</strong></h3>
                    <button type="button"><EditIcon color="primary"></EditIcon></button>
                    <label for="EditarDescrion"/>
                
                </div>
                <div className="contenedor-descripcion__descripcion">
                    <h5>{usuarioLogeado.descripcion}</h5>
                </div>
                
            </div>
            <div className="contenedor-habilidades">
                <h3><strong>Habilidades</strong></h3>
                <div >
                    <h5>Programadora CSS</h5>
                    <h5>Grandes Habilidades en JS</h5>
                    <h5>Usos buenos de frameworks como REACT, ANGULAR, CAKEPHP, FIREBASE</h5>
                </div>
            </div>


            <div className="contenedor-botones">

                <input type="submit" placeholder="Editar Perfil"></input>

            </div>

        </div>
    )
}

export default Perfil
