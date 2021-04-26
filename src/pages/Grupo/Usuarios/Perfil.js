import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import EditIcon from '@material-ui/icons/Edit';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { EditarUsuarioService, ObtenerDetalleUsuario } from '../services';
import  Habilidades  from '../Usuarios/components/Habilidades'
import {
    Box,
    Button,
    Container,
    TextField,
    Typography
  } from '@material-ui/core';


import("../../../assets/css/style.css")




export const Perfil = () => {
    
    const [usuarioLogeado, setUsuarioLogeado] = useState({

    })

    const [stateNombre, setStateNombre] = useState(usuarioLogeado.nombres)
    const [stateApellidos, setStateApellidos] = useState(usuarioLogeado.apellidos)
    const [stateDireccion, setStateDireccion] = useState(usuarioLogeado.direccion)
    const [stateTelefono, setStateTelefono] = useState(usuarioLogeado.contacto)
    const [stateCorreo, setStateCorreo] = useState(usuarioLogeado.correo)
    const [openState, setOpenState] = useState(false)
    const [StateId, setSetStateId] = useState(usuarioLogeado.id_usuario)
    useEffect(() => {
        ObtenerDetalleUsuario(JSON.parse(localStorage.getItem("usuario")).id_usuario).then(
            (request) => {
                setUsuarioLogeado({
                    id_usuario: request.data.id_usuario,
                    nombres: request.data.nombres,
                    apellidos: request.data.apellidos,
                    documento: "FALTA DOCUMENTO",
                    genero: request.data.genero,
                    mail: request.data.correo,
                    telefono: request.data.contacto,
                    direccion: request.data.direccion,
                    descripcion: request.data.presentacion,
                    imagen: request.data.url_imagen
                })

            }
        )
    }, [])
    useEffect(() => {
        setSetStateId(usuarioLogeado.id_usuario)
        setStateNombre(usuarioLogeado.nombres)
        setStateApellidos(usuarioLogeado.apellidos)
        setStateDireccion(usuarioLogeado.direccion)
        setStateTelefono(usuarioLogeado.contacto)
        setStateCorreo(usuarioLogeado.correo)
        
    }, [usuarioLogeado])
    const handleEdit = (e) => {
        e.preventDefault()
        EditarUsuarioService ({
          "id_usuario": usuarioLogeado.id,
          "correo": stateCorreo,
          "nombres": stateNombre,
          "apellidos": stateApellidos,
          "direccion": stateDireccion,
          "genero": usuarioLogeado.genero,
          "activoComoPrestador": usuarioLogeado.ativoComoPrestador,
          "contacto": stateTelefono,
          "presentacion": usuarioLogeado.presentacion,
          "url_imagen": usuarioLogeado.url_imagen,
        }).then(
          () => {
            setUsuarioLogeado({
              "id_usuario": usuarioLogeado.id,
              "correo": stateCorreo,
              "nombres": stateNombre,
              "apellidos": stateApellidos,
              "direccion": stateDireccion,
              "genero": usuarioLogeado.genero,
              "activoComoPrestador": usuarioLogeado.ativoComoPrestador,
              "contacto": stateTelefono,
              "presentacion": usuarioLogeado.presentacion,
              "url_imagen": usuarioLogeado.url_imagen
            })
            setOpenState(false)
          }

        ).catch(
          console.log("sinEditar")
        )
        
      
        
    };
    const handleClose = () => {
        setOpenState(false);
    };
    const handleEditarPerfil = () => {
        setOpenState(true)
    }
    return (


        <div className="contenedor-perfil">
            <div className="Titulo">
                <h2><strong>Mi Perfil</strong></h2>
            </div>
            <div className="contenedor-header">

                <div className="contenedor-imagen">

                    {(localStorage.getItem("usuario")) ? (<img src={JSON.parse(localStorage.getItem("usuario")).url_imagen} />)
                    : 
                    (<img src={usuarioLogeado.imagen} />)
                    } 
                    
                    <div className="contenedor-cambiarFoto">
                        <input type="file" id="cambiarImagen" className="input-file-input" value="" />
                        <label for="cambiarImagen" className="input-file__btn">Cambiar Foto</label>
                    </div>
                </div>
            </div>

            <div className="contenedor-datos">

                <div className="contenedor-datos__titulo">
                    <h3><strong>Datos personales</strong></h3>
                    <button onClick={(e) => handleEditarPerfil(e)} type="button"><EditIcon color="primary"></EditIcon></button>


                </div>
                <div className="contenedor-datos-datos">

                    <div className="contenedor-datos-datos-1">
                        <h5><strong>Nombre(s) y apellido(s):   </strong> </h5>
                        <h5><strong>Documento: </strong> </h5>
                        <h5><strong>Genero: </strong> </h5>
                        <h5><strong>E-mail: </strong></h5>
                        <h5><strong>Teléfono: </strong> </h5>
                        <h5><strong>Dirección: </strong> </h5>
                    </div>

                    <div className="contenedor-datos-datos-2">
                        <h5>{usuarioLogeado.nombres} {usuarioLogeado.apellidos}</h5>

                        <h5>{usuarioLogeado.documento}</h5>
                        <h5>{usuarioLogeado.genero}</h5>
                        <h5> {usuarioLogeado.mail} </h5>
                        <h5>{usuarioLogeado.telefono}</h5>
                        <h5>{usuarioLogeado.direccion}</h5>
                    </div>
                </div>

            </div>

            <div className="contenedor-descripcion">
                <div className="contenedor-descripcion__titulo">
                    <h3><strong>¿Quien soy?</strong></h3>
                    <button type="button"><EditIcon color="primary"></EditIcon></button>
                    <label for="EditarDescrion" />

                </div>
                <div className="contenedor-descripcion__descripcion">
                    <h5>{usuarioLogeado.descripcion}</h5>
                </div>

            </div>
            <div className="contenedor-habilidades">
              <Habilidades id_prestador={1}/>  
            </div>


            <div className="contenedor-botones">

                <input type="submit" placeholder="Editar Perfil"></input>

            </div>


            <Container maxWidth="sm">
        <Formik
          initialValues={{
            name: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(255).required('name is required')
          })}
          onSubmit={() => {
            return 1;
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
            touched,
            values
          }) => (
            <>
              <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
                
              >

                  <Box mb={3}>              
                      <Dialog open={openState} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <form >
                              <DialogTitle id="form-dialog-title">Editar Pefil</DialogTitle>
                                  <DialogContent>
                                      <DialogContentText>
                                          Edite los campos necesarios.
                                      </DialogContentText>                                    
                                    <TextField
                                          fullWidth
                                          label="Nombre"
                                          margin="normal"
                                          name="Nombre"
                                          value={stateNombre}
                                          onChange={e => {
                                          setStateNombre(e.target.value);
                                          }}
                                          type="text"
                                          variant="outlined"
                                      />
                                    <TextField
                                          fullWidth
                                          label="Apellidos"
                                          margin="normal"
                                          name="Apellidos"
                                          value={stateApellidos}
                                          onChange={e => {
                                          setStateApellidos(e.target.value);
                                          }}
                                          type="text"
                                          variant="outlined"
                                      />
                                    <TextField
                                          fullWidth
                                          label="Dirección"
                                          margin="normal"
                                          name="Dirección"
                                          value={stateDireccion}
                                          onChange={e => {
                                          setStateDireccion(e.target.value);
                                          }}
                                          type="text"
                                          variant="outlined"
                                    />
                                  <TextField
                                    fullWidth
                                    label="Correo"
                                    margin="normal"
                                    name= "Correo"
                                    value={stateCorreo}
                                    onChange={e => {
                                    setStateCorreo(e.target.value);
                                    }}
                                    type="text"
                                    variant="outlined"
                                />
                                  <TextField
                                    fullWidth
                                    label="Telefóno"
                                    margin="normal"
                                    name= "telefono"
                                    value={stateTelefono}
                                    onChange={e => {
                                    setStateTelefono(e.target.value);
                                    }}
                                    type="number"
                                    variant="outlined"
                                />
                                     
                                  </DialogContent>
                                  <DialogActions>
                                  <Button onClick={handleClose} color="primary">
                                      Cancelar
                                  </Button>
                                  <Button onClick={handleEdit} color="primary" type="submit" disabled={isSubmitting}>
                                      Editar
                                  </Button>
                                  </DialogActions>
                            </form>
                                  
                          </Dialog>
                  </Box>
              </Box>
            </>
          )}
        </Formik>

      
      </Container>
    
    </div>
    )
}

export default Perfil
