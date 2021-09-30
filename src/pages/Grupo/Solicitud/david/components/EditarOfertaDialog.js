import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Button, Input } from 'reactstrap'
import { EditarOfertaService } from '../../../services'

export const EditarOfertaDialog = ({openEditar,setOpenEditar,oferta,editarOferta}) => {



    const [state, setState] = useState(openEditar)

    //OFERTA

    const [titulo, setTitulo] = useState(oferta.titulo)
    const [descripcion, setDescripcion] = useState(oferta.descripcion)
    const [valor, setValor] = useState(oferta.valor)

    const [estado, setEstado] = useState(oferta.estado)
    const [direccion, setDireccion] = useState(oferta.direccion)
    const [fechaInicio, setFechaInicio] = useState(oferta.fecha_inicio)
    const [fechaFin, setFechaFin] = useState(oferta.fecha_fin)
    const [id, setId] = useState(oferta.id_oferta)
    const [imagen, setImagen] = useState(oferta.imagen)
    const handleClose = () => {
        setState(!state)
        setOpenEditar(s => !s)

    }
    

    useEffect(() => {
        setState(openEditar)
        console.log(oferta, 'oferta efecto')
    }, [openEditar])

    const EditarOfertaFuncion = (e) => {
        e.preventDefault();

        EditarOfertaService({
            "id_oferta":id,
            "titulo":titulo,
            "descripcion":descripcion,
            "valor":valor,    
            "direccion":'holis', // TODO DIRECCION
            "estado":estado,
            "fecha_inicio":"17/03/2021 21:10:30",
            "fecha_fin":"17/03/2021 21:10:30",
            "url_imagen":imagen
        }
        ).then( (res) =>  console.log(res, 'RESPUESTA SATISFACTORIA '))



    }
    return (
        

        <Dialog
            open={state}
            onClose={handleClose}
            fullWidth={true}
            maxWidth="md"

        
        >
            <DialogTitle>Editar Oferta</DialogTitle>
            <DialogContent>
                <form>
                    <label>Titulo</label>
                    <Input type="text" placeholder="nombre" value={titulo} onChange={ e => setTitulo(e.target.value)}></Input>
                    <br/>
                    <label>Descripcion</label>
                    <textarea className='textAreaSolicitud' value={descripcion} onChange={e => setDescripcion(e.target.value)}></textarea>
                    <br/>
                    <label>Valor</label>
                    <Input 
                    type="text" 
                    placeholder="valor" 
                    value={valor} 
                    onChange={ e => setValor(e.target.value)}></Input>

                    <label>Direccion</label>
                    <Input 
                    type="text" 
                    placeholder="direccion" 
                    value={direccion} 
                    onChange={ e => setDireccion(e.target.value)}></Input>

                    


                    <Button onClick={EditarOfertaFuncion}  >Aceptar</Button>

                </form>
            </DialogContent>
            












            
        </Dialog>


    )
}
