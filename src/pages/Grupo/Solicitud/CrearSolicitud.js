import {
  Box,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CrearSolicitudService } from "../services"
import InputAdornment from '@material-ui/core/InputAdornment';
import { BoxCategoria } from './BoxCategoria';
import { Habilidades } from './BoxHabilidad';
import '../../../../src/assets/css/style.css'
// ICONOS
import TitleOutlinedIcon from '@material-ui/icons/TitleOutlined';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import HomeIcon from '@material-ui/icons/Home';
import { AlertView } from '../../../components/Alert'
import PaymentIcon from '@material-ui/icons/Payment';

const useStyles = makeStyles({
  form_section_boton: {
    margin: "20px auto",
    width: '20%'
  },

});


export const CrearSolicitud = () => {

  const [open, setOpen] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')


  const classes = useStyles();
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [barrio, setBarrio] = useState("")
  const [categoria, setCategoria] = useState()
  const [habilidad, setHabilidad] = useState()
  const [propina, setpropina] = useState("")
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")
  const [Imagen, setImagen] = useState("")
  const [imagenSeleccionada, setImagenSeleccionada] = useState("Seleccione una imagen")

  useEffect(() => {
    setTitulo("")
    setDescripcion("")
    setBarrio("")
    setCategoria("")
    setHabilidad(1)
    setpropina("")
    setFechaInicio("")
    setFechaFin("")
  }, [])



  const handleChangeInput = (e) => {
    switch (e.target.name) {
      case "titulo":
        setTitulo(e.target.value)
        break;
      case "descripcion":
        setDescripcion(e.target.value)
        break;
      case "barrio":
        setBarrio(e.target.value)
        break;
      case "categoria":
        setCategoria(e.target.value)
        break;
      case "habilidad":
        setHabilidad(e.target.value)
        break;
      case "imagen":
        setImagen(e.target.value)
        break;
      case "propina":
        setpropina(e.target.value)
        break;
      case "fechaInicio":
        setFechaInicio(parseDate(e.target.value))
        break;
      case "fechaFin":
        setFechaFin(parseDate(e.target.value))
        break;
      default:
        break;
    }
  }


  const parseDate = (fecha) => {
    return fecha.split("-")[0] + "/" + fecha.split("-")[1] + "/" + fecha.split("-")[2].split("T")[0] + " " + fecha.split("-")[2].split("T")[1] + ":01"
  }
  const handleCreate = async (event) => {

    setOpen(false)
    let render = new FileReader();
    render.readAsDataURL(Imagen[0])
    render.onload = (e) => {
      CrearSolicitudService({
        "id_solicitante": 1, // TODO SOLICITANTE
        "descripcion": descripcion,
        "direccion": barrio,
        "fecha_inicio": fechaInicio,    // "17/03/2021 21:10:30",
        "fecha_fin": fechaFin, //"17/03/2021 22:10:30",
        "titulo": titulo,
        "id_habilidad": habilidad, // TODO HABILIDAD
        "valor": propina,
        "imagen": e.target.result

      }).then(() => {

        console.log("RUN")
        setOpen(true)
        setTypeAlert('success')
        setMessage('Oferta creada correctamente')

      }).catch(() => {
        setOpen(true)
        setTypeAlert('error')
        setMessage('Error, Verifica los datos!')
        console.log("no funca")
      })

    }

    event.preventDefault();
  }


  return (
    <div className="contenedorFormulario">
      <Formik
        initialValues={{
          descripcion: '',
          barrio: '',
          fechaInicio: '',
          fechaFin: '',
          titulo: '',
          habilidad: '',
          propina: '',

        }}
        validationSchema={Yup.object().shape({
          descripcion: Yup.string()
            .max(255)
            .required('Debes proporcionar una descripción'),
          barrio: Yup.string()
            .max(255)
            .required('Debes proporcionar una dirección'),
          titulo: Yup.string()
            .max(255)
            .required('Debes proporcionar un titulo'),
          propina: Yup.number().positive()
            .required('Debes proporcionar una propina'),
        })}
        onSubmit={() => { }}
      >
        {({ errors, handleBlur, touched, handleChange, values }) => (
              <form onSubmit={handleCreate} className="formulario">
                <div className="form_section">
                  <TextField
                    fullWidth
                    label="Titulo"
                    name="titulo"
                    variant="standard"
                    error={Boolean(touched.titulo && errors.titulo)}
                    helperText={touched.titulo && errors.titulo}
                    onBlur={handleBlur}
                    required
                    onChange={
                      e => {
                        handleChange(e);
                        handleChangeInput(e);
                      }
                    }

                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TitleOutlinedIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </div>

                <div className="form_section">

                  <TextField
                    label="Descripcion"
                    name="descripcion"
                    fullWidth
                    multiline
                    rows={6}
                    error={Boolean(touched.descripcion && errors.descripcion)}
                    helperText={touched.descripcion && errors.descripcion}
                    onBlur={handleBlur}
                    required
                    onChange={
                      e => {
                        handleChange(e);
                        handleChangeInput(e);
                      }
                    }
                    variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <TextFieldsIcon />
                        </InputAdornment>
                      )
                    }}


                  />

                </div>
                <div className="form_section">

                  <TextField
                    fullWidth
                    label="Barrio"
                    name="barrio"
                    variant="standard"
                    error={Boolean(touched.barrio && errors.barrio)}
                    helperText={touched.barrio && errors.barrio}
                    onBlur={handleBlur}
                    required
                    onChange={
                      e => {
                        handleChange(e);
                        handleChangeInput(e);
                      }
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeIcon />
                        </InputAdornment>
                      )
                    }}
                  />

                </div>
                <div className="form_section">
                  <BoxCategoria callback={setCategoria}></BoxCategoria>
                </div>
                <div className="form_section">
                  <Habilidades idCategoria={categoria} callback={setHabilidad}></Habilidades>
                </div>
                <div className="form_section">
                  <TextField
                    fullWidth
                    label="Propina"
                    name="propina"
                    variant="standard"
                    error={Boolean(touched.propina && errors.propina)}
                    helperText={touched.propina && errors.propina}
                    onBlur={handleBlur}
                    required
                    type="number"
                    onChange={
                      e => {
                        handleChange(e);
                        handleChangeInput(e);
                      }
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PaymentIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </div>

                <div className="form_section">
                  <TextField
                    fullWidth
                    label="Fecha inicio"
                    name="fechaInicio"
                    type="datetime-local"
                    defaultValue="2021-04-10T08:24"
                    required
                    variant="standard"
                    onChange={
                      e => {
                        handleChange(e);
                        handleChangeInput(e);
                      }
                    }
                  >

                  </TextField>
                </div>

                <div className="form_section">
                  <TextField
                    fullWidth
                    label="Fecha fin"
                    name="fechaFin"
                    type="datetime-local"
                    required
                    defaultValue="2021-04-10T10:24"
                    variant="standard"
                    onChange={
                      e => {
                        handleChange(e);
                        handleChangeInput(e);
                      }
                    }
                  />
                </div>
                <div className="form_section">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="img-file"
                      onChange={async (e) => {
                        setImagen(e.target.files)
                        setImagenSeleccionada("Imagen Seleccionada")
                      }}
                      required
                    />
                    <label className="custom-file-label">
                      {imagenSeleccionada}
                        </label>
                    {/* TODO IMG */}
                  </div>
                </div>
                <div className={classes.form_section_boton}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Crear
                    </Button>
                </div>
              </form>


        )}
      </Formik>
      <AlertView open={open} typeAlert={typeAlert} message={message} />

    </div>
  )
}

export default CrearSolicitud
