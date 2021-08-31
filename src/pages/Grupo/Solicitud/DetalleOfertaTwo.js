import React, { useState, useEffect } from "react";
import { postularseOferta, retirarseOferta, finalizarOfertaService } from '../../../pages/Grupo/services';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { toast } from "react-toastify";
import DialogComponent from "./DialogComponent";
import { useParams, useHistory } from "react-router-dom"
import CircularIndeterminate from "./CircularIndeterminate";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useAuth} from '../../../components/UserContext'
import {
  Typography,
  Chip,
  Button,
  Card,
  Avatar,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Divider,
  Container
} from "@material-ui/core";
import { ContactSupportOutlined, Title } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  cardGrid: {
    padding: "20px 0"
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  div: {
    marginTop: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" //16:9
  },
  cardContent: {
    flexGrow: 1
  },
  hastags: {
    margin: 2
  }
}));

export default function DetalleOfertaTwo() {
  const auth = useAuth();
  const { id } = useParams();
  let history = useHistory();

  
  const classes = useStyles();
  const [idOferta, setIdOferta] = useState(id)
  const [idPrestador, setIdPrestador] = useState(auth.user.id_usuario)
  const [solicitante, setSolicitante] = useState([])
  const [postulados, setPostulados] = useState([])
  const [imagen, setImagen] = useState("1")
  const [objHabilidad, setHabilidad] = useState([])
  const [oferta, setOferta] = useState([])
  const [estoyPostulado, setEstoyPostulado] = useState(false)
  const [estoyAceptado, setEstoyAceptado] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")

  useEffect(() => {
    obtenerDetalleOferta();
    console.log("oferta: ", oferta)
    /* setIdPrestador(JSON.parse(localStorage.getItem("usuario")).id_usuario) */
  }, [])

  const postularmeOferta = async () => {
    setCargando(true)
    const request = {
      "id_prestador": idPrestador,
      "id_oferta": idOferta
    }

    
    postularseOferta(request)    
      .then((response) => {
        setCargando(false)
        // Success 🎉
        console.log("Response");
        //Validar si ya se ha postulado 2 veces
        if (response.data.error == null) {
          console.log("Si se pudo postular")
          toast("Se ha postulado exitosamente!", {
            type: 'success',
            draggable: true
          })

        } else {
          console.log("Ya está postulado")
        }

        obtenerDetalleOferta()

      })
      .catch((error) => {
        // Error 😨
        setCargando(false)
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log("Error.Response: " + error.response.data);
          console.log("Error.Response: " + error.response.status);
          console.log("Error.Response: " + error.response.headers);
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log("Error.Request: " + error.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log("General Error: " + error.message);
        }
        console.log("Error.config: " + error.config);
        obtenerDetalleOferta()
      });

  }


  const retirarmeOferta = async () => {
    
    setCargando(true)
    const request = {
      "id_prestador": idPrestador,
      "id_oferta": idOferta
    }
//    axios.post(`http://54.234.20.23:8082/ofertaService/revocarPostulacion`, request)
    retirarseOferta(request)
      .then((response) => {
        setCargando(false)
        // Success 🎉
        console.log(response);
        toast("Ya no te encuentras postulado 😥", {
          type: 'success',
          draggable: true
        })
        obtenerDetalleOferta()
      })
      .catch((error) => {
        // Error 😨
        setCargando(false)
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log("Error.Response: " + error.response.data);
          console.log("Error.Response: " + error.response.status);
          console.log("Error.Response: " + error.response.headers);
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log("Error.Request: " + error.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log("General Error: " + error.message);
        }
        console.log("Error.config: " + error.config);

        obtenerDetalleOferta()
      });
  }
  const finalizarOferta = async () => {
    setCargando(true)
    const request = {
      "id_prestador": idPrestador,
      "id_oferta": idOferta
    }
    
    finalizarOfertaService(request)
      .then((response) => {
        console.log("finalizar oferta: ", response);
        setCargando(false)
        toast("¡La oferta ha finalizado con éxito!", {
          type: 'success',
          draggable: true
        })
        retirarmeOferta()
        history.push("/ofertas");
      })
      .catch((error) => {
        setCargando(false)
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          console.log("Error.Response: " + error.response.data);
          console.log("Error.Response: " + error.response.status);
          console.log("Error.Response: " + error.response.headers);
          if (error.response.status == 500) {
            toast("Todavía no se ha aceptado tu postulación a esta oferta", {
              type: 'error',
              draggable: true
            })
          }
        } else if (error.request) {
          /*
           * The request was made but no response was received, `error.request`
           * is an instance of XMLHttpRequest in the browser and an instance
           * of http.ClientRequest in Node.js
           */
          console.log("Error.Request: " + error.request);
        } else {
          // Something happened in setting up the request and triggered an Error
          console.log("General Error: " + error.message);
        }
        console.log("Error.config: " + error.config);
        obtenerDetalleOferta()
      });
  }


  const obtenerDetalleOferta = async () => {
    setCargando(true)
    const respuesta = await axios.get(`http://54.234.20.23:8082/ofertaService/getDetalleOferta?id_oferta=${id}`);
    const ofertaObtenida = await respuesta.data;
    setCargando(false)
    setOferta(ofertaObtenida)


    
    var date = new Date(ofertaObtenida.fecha_inicio);
    setFechaInicio(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())
    var date = new Date(ofertaObtenida.fecha_fin);
    setFechaFin(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())




    
    setPostulados(ofertaObtenida.postulados)
    setEstoyPostulado(false)
    setSolicitante(ofertaObtenida.solicitante)
    ofertaObtenida.postulados.map((postulado, index) => {
      if (postulado.usuarioYHabilidades.prestador.id_usuario == idPrestador) {
        //Ya está postulado
        console.log("Si está en la lista de postulados")

        setEstoyPostulado(true)

      }
    })
    if(ofertaObtenida.solicitante.id_usuario != idPrestador) {
      if(estoyPostulado && ofertaObtenida.prestador.prestador.id_usuario == idPrestador) {
        setEstoyAceptado(true);
      }
    }


    
    console.log("Estoy postulado State: " + estoyPostulado)


    setSolicitante(ofertaObtenida.solicitante)
    setHabilidad(ofertaObtenida.habilidad)


    if (ofertaObtenida.imagen != null) {
      setImagen(ofertaObtenida.imagen)
      console.log("Image: " + oferta.imagen)

    } else {
      setImagen("https://source.unsplash.com/random")
    }

    console.log(ofertaObtenida)
  }

  const convertTimeStamp = (timestamp) => {
    //1616015430000
    //var timestamp = 1616015430000
    var date = new Date(timestamp);
    //console.log(date.getTime())
    //console.log(date)
    return date
  }


  var formatter = new Intl.NumberFormat('en-ES', {
    style: 'currency',
    currency: 'COP',
  });
  return (




    <div className={classes.root}>

      <ToastContainer />
      {
        cargando ? <CircularIndeterminate /> :

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography id="title" variant="h3" align="center" color="primary">
                {oferta.titulo != null ? oferta.titulo : "Title"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={imagen}
                  title="Image Title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5">
                    {oferta.titulo}
                  </Typography>
                  <Typography>
                    {oferta.descripcion}
                  </Typography>
                  <br></br>
                  <Typography gutterBottom variant="h4" color="secondary">
                    {formatter.format(oferta.valor)}
                  </Typography>
                  <Typography variant="h6">Estado: {oferta.estado}</Typography>
                </CardContent>
                <CardActions>
                  
              {
                oferta.estado == 'DISPONIBLE' && oferta.solicitante.id_usuario != idPrestador?
                  estoyPostulado ?
                    <DialogComponent
                      titulo={"ServiNow"}
                      descripcion={"¿Quieres retirar tu postulación de esta oferta?"}
                      textoBoton={"Ya no quiero postularme"}
                      colorBoton={"secondary"}
                      variant={"text"}
                      metodoAEjecutar={retirarmeOferta}></DialogComponent>
                    :
                    <DialogComponent
                      titulo={"ServiNow"}
                      descripcion={"¿Quieres postularte a esta oferta?"}
                      textoBoton={"Postúlate!"}
                      colorBoton={"primary"}
                      variant={"text"}
                      metodoAEjecutar={postularmeOferta}></DialogComponent>
                  : null
              }
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Paper className={classes.paper}>
                <Typography variant="h4" align="left">
                  Descripción
            </Typography>
                <Divider />
                <br></br>
                <Typography align="justify">
                  {oferta.descripcion != null ? oferta.descripcion : "The description would be here"}
                </Typography>
                <br></br>
                <div >
                  <Alert severity="info" icon={<DateRangeIcon />}>
                    Fecha Inicio: {fechaInicio}
                   
                  </Alert>
                  <br></br>
                  <Alert severity="warning" icon={<DateRangeIcon />}>
                    Fecha Fin: {fechaFin}
                  </Alert>
                </div>
                <br></br>
                <Typography variant="body1">Postulantes Activos</Typography>
                <br></br>
                <div className={classes.div}>

                  <AvatarGroup max={4}>
                    {
                      postulados.map((postulado, index) => (
                        //console.log(postulado.usuarioYHabilidades.prestador.url_imagen)
                        /* console.log("Postulado # "+index)
                        console.log(postulado) */
                        <Avatar alt="Remy Sharp" title={postulado.usuarioYHabilidades.prestador.nombres} src={postulado.usuarioYHabilidades.prestador.url_imagen} />
                      ))
                    }


                  </AvatarGroup>
                </div>
                <br></br>
                <Divider />
                <br></br>
                <Chip
                  className={classes.hastags}
                  icon={<LabelImportantIcon />}
                  color="primary"
                  label={"# " + objHabilidad.nombreCategoria}
                />

                <br></br>
                <br></br>
                <Divider />
                <br></br>
                <Typography variant="subtitle1">Información del Soliciante </Typography>
                {
                  console.log(solicitante)
                }
                <div className={classes.div}>
                  <Avatar
                    className={classes.large}
                    src={solicitante.url_imagen}
                  //src={solicitante.url_imagen}&& oferta.estado != 'EN PROCESO'
                  ></Avatar>
                </div>

                <br></br>
                <Typography variant="body1" align="center">
                  {solicitante.nombres + " " + solicitante.apellidos}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
            <Grid item xs={12} sm={6} align="center" mb="6">
              {
                oferta.estado == 'DISPONIBLE' && oferta.solicitante.id_usuario != idPrestador?
                  estoyPostulado ?
                    <DialogComponent
                      titulo={"ServiNow"}
                      descripcion={"¿Quieres retirar tu postulación de esta oferta?"}
                      textoBoton={"Ya no quiero postularme"}
                      colorBoton={"secondary"}
                      variant={"contained"}
                      metodoAEjecutar={retirarmeOferta}></DialogComponent>
                    :
                    <DialogComponent
                      titulo={"ServiNow"}
                      descripcion={"¿Quieres postularte a esta oferta?"}
                      textoBoton={"Postúlate!"}
                      colorBoton={"primary"}
                      variant={"contained"}
                      metodoAEjecutar={postularmeOferta}></DialogComponent>
                  : null
              }
              {
                estoyPostulado && estoyAceptado ?
                  <DialogComponent
                    titulo={"ServiNow"}
                    descripcion={"¿Quieres cambiar el estado de esta oferta a Finalizada?"}
                    textoBoton={"Finalizar"}
                    colorBoton={"primary"}
                    variant={"outlined"}
                    metodoAEjecutar={finalizarOferta}></DialogComponent>
                  :
                  null
              }
            </Grid>
          </Grid>
      }
    </div>


  );
}
