import React from 'react'
import test from './../../../assets/images/test.png'
/* import './../../../assets/scss/estilos.css'*/
<meta name="viewport" content="width=device-whidth, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"></meta>

export const ListarOfertas = () => {
    return (
        
        <section id="blog">
            <div class="contenedor">
                 <div className="cards"> 
                        <div className="grid-container">
                            <article>
                                <img src={test} width="300px"/>
                                <h3>Cortar pasto</h3>
                                <h4>$250.000</h4>
                                <h4>Villa mercedes</h4>
                            </article>
                        </div>
                 </div> 
            </div>
        </section>
    )
}

export default ListarOfertas;
