import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { toast } from "react-toastify";
import DialogComponent from "./DialogComponent";
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
import { ContactSupportOutlined } from "@material-ui/icons";

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

  const classes = useStyles();
  const [idPrestador, setIdPrestador] = useState(2)
  const [solicitante, setSolicitante] = useState([])
  const [postulados, setPostulados] = useState([])
  const [imagen, setImagen] = useState("1")
  const [objHabilidad, setHabilidad] = useState([])
  const [oferta, setOferta] = useState([])
  const [estoyPostulado, setEstoyPostulado] = useState(false)



  const postularmeOferta = async () => {
    const request = {
      "id_prestador": 2,
      "id_oferta": 1
    }

    axios.post(`http://52.7.252.110:8082/ofertaService/postularAOferta`, request)
      .then((response) => {
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
    const request = {
      "id_prestador": 2,
      "id_oferta": 1
    }

    axios.post(`http://52.7.252.110:8082/ofertaService/revocarPostulacion`, request)
      .then((response) => {
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

  const obtenerDetalleOferta = async () => {

    const respuesta = await axios.get("http://52.7.252.110:8082/ofertaService/getDetalleOferta?id_oferta=1");
    const ofertaObtenida = await respuesta.data;
    setOferta(ofertaObtenida)
    setPostulados(ofertaObtenida.postulados)
    setEstoyPostulado(false)
    ofertaObtenida.postulados.map((postulado, index) => {
      if (postulado.usuarioYHabilidades.prestador.id_usuario == idPrestador) {
        //Ya está postulado
        console.log("Si está en la lista de postulados")

        setEstoyPostulado(true)

      }
    })

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

  useEffect(() => {
    //obtenerDetalleOferta();


  }, [])
  return (
    <div className={classes.root}>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" align="center" color="primary">
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
                $48.000
              </Typography>
            </CardContent>
            <CardActions>
              {
                estoyPostulado ?

                  <Button size="small" color="secondary" onClick={() => retirarmeOferta()}>
                    No es de mi interes
                  </Button>
                  :
                  <Button size="small" color="primary" onClick={() => postularmeOferta()}>
                    Postularme
                  </Button>

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
                Fecha Inicio: {String(convertTimeStamp(parseInt(oferta.fecha_inicio)))}
              </Alert>
              <br></br>
              <Alert severity="warning" icon={<DateRangeIcon />}>
                Fecha Fin: {String(convertTimeStamp(parseInt(oferta.fecha_fin)))}
              </Alert>
            </div>
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
            <Typography variant="subtitle1">Info del contacto </Typography>

            <div className={classes.div}>
              <Avatar
                className={classes.large}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Chloris_chloris_%28profile%29.jpg/1280px-Chloris_chloris_%28profile%29.jpg"
              ></Avatar>
            </div>

            <br></br>
            <Typography variant="body1" align="center">
              {solicitante.nombres + " " + solicitante.apellidos}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} sm={6} align="center">

          {
            estoyPostulado ?

            <DialogComponent
            titulo={"ServiNow"}
            descripcion={"¿Quieres retirar tu postulación de esta oferta?"}
            textoBoton={"Ya no quiero postularme"}
            colorBoton={"secondary"}
            metodoAEjecutar={retirarmeOferta}></DialogComponent>
              :
              <DialogComponent
                titulo={"ServiNow"}
                descripcion={"¿Quieres postularte a esta oferta?"}
                textoBoton={"Postúlate!"}
                colorBoton={"primary"}
                metodoAEjecutar={postularmeOferta}></DialogComponent>
          }
         {/*  <Typography variant="h1" align="center" color="primary">
            Space
          </Typography> */}
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </Grid>
        <Grid item xs={12} sm={3}></Grid>
      </Grid>


    </div>


  );
}
