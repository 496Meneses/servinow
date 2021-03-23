import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
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
  const [solicitante, setSolicitante] = useState([])
  const [imagen, setImagen] = useState("1")
  const [objHabilidad, setHabilidad] = useState([])
  const [oferta, setOferta] = useState([])
  const obtenerDetalleOferta = async () => {
      //http://52.7.252.110:8082/ofertaService/getDetalleOferta?id_oferta=1
      const respuesta = await axios.get("http://52.7.252.110:8082/ofertaService/getDetalleOferta?id_oferta=19");
      const ofertaObtenida = await respuesta.data;
      setOferta(ofertaObtenida)
      console.log(oferta)
      setSolicitante(ofertaObtenida.solicitante)
      setHabilidad(ofertaObtenida.habilidad)
     
      
      if (ofertaObtenida.imagen != null) {
        setImagen(ofertaObtenida.imagen)
        console.log("Image: "+oferta.imagen)
        
      } else {
        setImagen("https://source.unsplash.com/random")  
      }

      console.log(ofertaObtenida)
  }

  const convertTimeStamp = (timestamp) =>{
      //1616015430000
      //var timestamp = 1616015430000
      var date = new Date(timestamp);
      //console.log(date.getTime())
      //console.log(date)
      return date
  }
  useEffect(() => {
      obtenerDetalleOferta();
      
            
  }, [])
  return (
    <div className={classes.root}>
        
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" align="center" color="primary">
            { oferta.titulo!=null ? oferta.titulo : "Title" }
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
              <Button size="small" color="primary">
                Postularme
              </Button>
              <Button  size="small" color="secondary">
                No es de mi interes
              </Button>
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
            { oferta.descripcion!=null ? oferta.descripcion : "The description would be here" }
            </Typography>
            <br></br>
            <div >
              <Alert severity="info" icon={<DateRangeIcon />}>
                Fecha Inicio: { String(convertTimeStamp(parseInt(oferta.fecha_inicio)))}
              </Alert>
              <br></br>
              <Alert severity="warning" icon={<DateRangeIcon />}>
                Fecha Fin: { String(convertTimeStamp(parseInt(oferta.fecha_fin)))}
              </Alert>
            </div>
            <br></br>
            <Divider />
            <br></br>
            <Chip
              className={classes.hastags}
              icon={<LabelImportantIcon />}
              color="primary"
              label={"# "+objHabilidad.nombreCategoria}
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
            {solicitante.nombres+ " " +solicitante.apellidos}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} sm={6} align="center">
          <Button variant="contained" color="primary">
            Postularme
          </Button>
        </Grid>
        <Grid item xs={12} sm={3}></Grid>
      </Grid>
    </div>
  );
}
