import React from 'react'
import Button from '@material-ui/core/Button'
import './../../../assets/scss/style.css'
import avatar from './../../../assets/images/avatar.png'
import avatar1 from './../../../assets/images/avatar1.png'

const ListarSolicitudes = () => {
    return (
        <>
            Listar Solicitudes
            <div className="cards">
                <div className="grid-container">
                    <div className="perfil">
                        <img src={avatar} width="100px"/>
                        <a href="" id="btn-perfil">Ver Perfil</a>
                    </div>
                    <div className="desc">
                        <p id="nombre">Arthur Chochingo</p>
                        {/* <hr style="border: 0.1% solid #07090A"/> */}
                        <p id="habilidades">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, quis! Voluptatum sit, a tempora optio deleniti quam perferendis, officia ullam vero et sapiente magni nobis?
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, quis! Voluptatum sit, a tempora optio deleniti quam perferendis, officia ullam vero et sapiente magni nobis?
                        </p>
                        <div className="buttons">
                            <a href="" id="btn-aceptar">Aceptar</a>
                            <a href="" id="btn-rechazar">Rechazar</a>
                        </div> 
                    </div>
                </div>
            </div>
            <div className="cards">
                <div className="grid-container">
                    <div className="perfil">
                        <img src={avatar1} width="100px"/>
                        <a href="" id="btn-perfil">Ver Perfil</a>
                    </div>
                    <div className="desc">
                        <p id="nombre">Arthur Chochingo</p>
                        {/* <hr style="border: 0.1% solid #07090A"/> */}
                        <p id="habilidades">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, quis! Voluptatum sit, a tempora optio deleniti quam perferendis, officia ullam vero et sapiente magni nobis?
                        </p>
                        <div className="buttons">
                            <a href="" id="btn-aceptar">Aceptar</a>
                            <a href="" id="btn-rechazar">Rechazar</a>
                        </div> 
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListarSolicitudes;