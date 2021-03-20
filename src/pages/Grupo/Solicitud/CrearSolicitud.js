import {
  Box,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CrearSolicitudService } from "../services"
import InputAdornment from '@material-ui/core/InputAdornment';
import { BoxCategoria } from './BoxCategoria';
import { Habilidades } from './BoxHabilidad';
// ICONOS

import TitleOutlinedIcon from '@material-ui/icons/TitleOutlined';



const useStyles = makeStyles({
  root: {

    background: 'white',
    border: 1,
    borderRadius: 3,
    paddingTop: '30px',
    paddingLeft: '50px',
  },
  title: {
    marginTop: '10px',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  form_section: {
    margin: '10px',
    maxWidth: '500px'
  },
  container: {
    marginTop: '30px',
    width: '120vh'
  },
  button: {
    display: 'block',
    width: '400px'
  },
  imgContainer: {}
});


export const CrearSolicitud = () => {

  const classes = useStyles();
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [barrio, setBarrio] = useState("")
  const [categoria, setCategoria] = useState()
  const [habilidad, setHabilidad] = useState()
  const [img, setImg] = useState("")
  const [propina, setpropina] = useState("")
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")
  const [Imagen, setImagen] = useState("")
  useEffect(() => {
    setTitulo("")
    setDescripcion("")
    setBarrio("")
    setCategoria("")
    setHabilidad(1)
    setImg("")
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
        setImg(e.target.value)
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
      }).catch(() => {

        console.log("no funca")
      })

    }

    event.preventDefault();
  }


  return (
    <div className={classes.root}>
      <Typography color="textPrimary" variant="h6" className={classes.title}>
        Crear Solicitud
        </Typography>

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
          propina: Yup.string()
            .max(255)
            .required('Debes proporcionar una propina'),
        })}
        onSubmit={() => { }}
      >
        {({ errors, handleBlur, touched, handleChange, values }) => (

          <form onSubmit={handleCreate} className={classes.form}>
            <Box className={classes.form_section}>

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
              >
              </TextField>
            </Box>
            <Box className={classes.form_section}>
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
              />

            </Box>
            <Box className={classes.form_section}>

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
              >
              </TextField>

            </Box>
            <Box className={classes.form_section}>

              <BoxCategoria callback={setCategoria}></BoxCategoria>

            </Box>
            <Box className={classes.form_section}>
              <Habilidades idCategoria={categoria} callback={setHabilidad}></Habilidades>
            </Box>


            <Box className={classes.form_section}>
              <TextField
                fullWidth
                label="Propina"
                name="propina"
                variant="standard"
                error={Boolean(touched.propina && errors.propina)}
                helperText={touched.propina && errors.propina}
                onBlur={handleBlur}
                required
                onChange={
                  e => {
                    handleChange(e);
                    handleChangeInput(e);
                  }
                }
              >
              </TextField>

            </Box>

            <Box className={classes.form_section}>
              <TextField
                fullWidth
                label="Fecha inicio"
                name="fechaInicio"
                type="datetime-local"
                defaultValue="2020-01-24T10:30"
                required
                onChange={
                  e => {
                    handleChange(e);
                    handleChangeInput(e);
                  }
                }
              >

              </TextField>
            </Box>

            <Box className={classes.form_section}>
              <TextField
                fullWidth
                label="Fecha inicio"
                name="fechaFin"
                type="datetime-local"
                defaultValue="2020-01-24T10:30"
                required
                onChange={
                  e => {
                    handleChange(e);
                    handleChangeInput(e);
                  }
                }
              >

              </TextField>
            </Box>



            <Box my={2} className={classes.form_section}>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="img-file"
                  onChange={async (e) => setImagen(e.target.files)}
                  required
                />
                <label className="custom-file-label">
                  Elije una imagen
                  </label>
                {/* TODO IMG */}
              </div>
            </Box>
            <Box my={2} className={classes.form_section}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Crear
                    </Button>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default CrearSolicitud
