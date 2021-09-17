import React, { useEffect, useState } from 'react'
import { DialogTitle,Dialog, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { Button } from 'reactstrap';
import axios from 'axios';

export const VerPerfil = ({idUsuario}) => {



    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [correo, setCorreo] = useState('')
    const [presentacion, setPresentacion] = useState('')
    const [datosPerfil, setDatosPerfil] = useState()
    const [contacto, setContacto] = useState()
    const [direccion, setDireccion] = useState()
    const [Img, setImg] = useState()

    const [stateDialog, setStateDialog] = useState(false)
    const handleClose = (e)=> {
        e.preventDefault();
        setStateDialog(false)
    }

    const changeState = (e) => {
        e.preventDefault();
        setStateDialog(!stateDialog)
    }
    useEffect(() => {
        axios.get(`http://54.234.20.23:8082/usuarioService/getUsuarioDetalle/${idUsuario}`,{
                    headers:{
                        'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion'))
                    }
        }).then((res) =>  {

            setNombres(res.data.nombres)
            setApellidos(res.data.apellidos)
            setPresentacion(res.data.presentacion)
            setCorreo(res.data.correo)
            setContacto(res.data.contacto)
            setDireccion(res.data.direccion)
            setImg(res.data.url_imagen)
            
        })

    

    }, [nombres])
    return (

        <>
            <Button className='botonVerPerfil' onClick={changeState}>Abrir</Button>





            <Dialog
                onClose={handleClose}
                aria-labelledby="simple-dialog-title"
                open={stateDialog}
                fullWidth={true}
                maxWidth='md'
            >              
                <DialogContent className='contenedor-dialog_perfil'>
                    
                    
                    <div className='contenedor-imagen_perfil'>
                        
                        <img className='imagen-perfil' src={Img} 
                            alt={nombres}>
                        </img>
                    </div>
                    
                    <div className='dialog-perfil_datos'>
                        <h2>{nombres}</h2>
                        <hr/>
                        <DialogContentText>{presentacion}</DialogContentText>
                        <DialogContentText>Contacto</DialogContentText>
                        <DialogContentText>Correo: {correo}</DialogContentText>
                        <DialogContentText>Teléfono: {contacto}</DialogContentText>
                        <DialogContentText>Teléfono: {direccion}</DialogContentText>
                        <DialogContentText>
                            Habilidades
                        </DialogContentText>

                    </div>

                </DialogContent>
                
                <DialogActions>

                    <Button className='btn btn-danger' onClick={handleClose}>Cerrar</Button>

                </DialogActions>
                
                



            </Dialog>
        </>
    )
}

export default VerPerfil;
