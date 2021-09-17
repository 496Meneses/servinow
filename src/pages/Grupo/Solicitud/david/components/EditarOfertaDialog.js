import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Input } from 'reactstrap'

export const EditarOfertaDialog = ({openEditar,setOpenEditar,oferta,editarOferta}) => {



    const [state, setState] = useState(openEditar)

    //OFERTA

    const [titulo, setTitulo] = useState(oferta.titulo)
    const [descripcion, setDescripcion] = useState(oferta.descripcion)
    const [valor, setValor] = useState(oferta.valor)

    const handleClose = () => {
        setState(!state)
        setOpenEditar(s => !s)

    }
    

    useEffect(() => {
        setState(openEditar)
    }, [openEditar])

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
                    
                </form>
            </DialogContent>
            












            
        </Dialog>


    )
}
