import {
  Box,
  Button,
  Hidden,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
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



export const CrearSolicitud = () => {

  const [open, setOpen] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [barrio, setBarrio] = useState("")
  const [categoria, setCategoria] = useState()
  const [habilidad, setHabilidad] = useState()
  const [propina, setpropina] = useState("")
  const [fechaInicio, setFechaInicio] = useState(" ")
  const [fechaFin, setFechaFin] = useState(" ")
  const [Imagen, setImagen] = useState("")
  const [imagenSeleccionada, setImagenSeleccionada] = useState("Seleccione una imagen")
  const [imagenPrev, setImagenPrev] = useState('')

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
      if (fechaFin === " " || fechaInicio === " ") {
        setOpen(true)
        setTypeAlert('error')
        setMessage('Debes seleccionar unas fechas validas!')
      } else {
        if (fechaInicio > fechaFin) {
          setOpen(true)
          setTypeAlert('error')
          setMessage('Debes seleccionar unas fechas validas!')

        } else {
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
          })
        }

      }



    }
    event.preventDefault();
  }
  const onChangeInputFile = async (e) => {
    setImagen(e.target.files)
    setImagenSeleccionada("Imagen Seleccionada")
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      setImagenPrev(reader.result)
      alert(reader.result)
    };
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
            <div className="Datos">
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
              <div className='Datos_Fechayhora'>
                <h6>Fecha y hora de la solicitud</h6>

                <h6>Fecha y hora inicio</h6>
                <TextField
                  fullWidth
                  name="fechaInicio"
                  type="datetime-local"
                  defaultValue=""
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
                <h6>Fecha y hora Fin</h6>
                <TextField
                  fullWidth
                  name="fechaFin"
                  type="datetime-local"
                  required
                  variant="standard"
                  onChange={
                    e => {
                      handleChange(e);
                      handleChangeInput(e);
                    }
                  }
                />

              </div>
              <div className='Datos_categoriaYhabilidad'>
                <h6>Categoría de la solicitud</h6>
                <BoxCategoria callback={setCategoria}></BoxCategoria>
                <Habilidades idCategoria={categoria} callback={setHabilidad}></Habilidades>
              </div>
            </div>

            <div class="IMAGEN">
              <h6>Imagen descriptiva</h6>

              <div className="imagenPrev">


              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="img-file"
                  onChange={(e) => onChangeInputFile(e)}
                  required
                />
                <label className="custom-file-label">
                  {imagenSeleccionada}
                </label>
                {/* TODO IMG */}
              </div>

              <h6>Propina</h6>
              <TextField
                fullWidth
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


            <div className="Botones">
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
