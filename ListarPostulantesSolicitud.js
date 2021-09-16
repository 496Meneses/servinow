import {
  Card,
  Button,
  Typography,
   Grid, Paper, Container, Link, Divider, Box, Avatar, List, ListItem, ListItemText
} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { ConsultarPostuladosPorOfertaService } from "../services"
import CardPostulante from './Juancho/CardPostulante'
import ReactPaginate from 'react-paginate'
import './../../../assets/css/style.css'
import { useAuth } from "../../../components/UserContext"
import { AlertView } from '../../../components/Alert';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "20px 5%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginTop: "10px",
  },
  cardGrid: {
    padding: "20px 0"
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12)
  },
  div: {
    marginTop: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  box: {
    marginTop: 10,
    marginLeft: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  }
}));




export const ListarPostulantesSolicitud = () => {


  const [open, setOpen] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')


  const classes = useStyles();
  const [ofertas, setOfertas] = useState({})
  const [postulados, setPostulados] = useState([{
    "usuarioYHabilidades": {
        "prestador": {
            "id_usuario": 2,
            "nombres": "Nombre2",
            "apellidos": "",
            "genero": "M",
            "activoComoPrestador": false,
            "url_imagen": null
        },
        "habilidades": [
            {
                "id_habilidad": 2,
                "nombreHabilidad": "corte de pelo",
                "nombreCategoria": "Belleza"
            }
        ]
    }
}])

  const [isLoading, setIsLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const postuladosPerPage = 3
  const pagesVisited = pageNumber * postuladosPerPage
  const pageCount = Math.ceil(postulados.length / postuladosPerPage)
  const [solicitudes, setSolicitudes] = useState([])
  const auth = useAuth();

  useEffect(() => {
    //obtenerMisSolicitudes()
    // obtenerDetalleMisSolicitudes();
  }, [])
  useEffect(() => {
    console.log("efecto solicitud,", solicitudes)
  },[solicitudes])

  const AceptarSolicitud = (e,solicitud) => {
    setOpen(false)
    e.preventDefault();
    const fetchData = () => {
      setIsLoading(true);
      axios.post(`http://54.234.20.23:8082/ofertaService/aceptarPostulacion`,solicitud, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion'))
          }
      } ).then( () => {
        setOpen(true)
        setTypeAlert('success')
        setMessage('Postulante Aceptado')
      }).catch ( ()=> {
        setOpen(true)
        setTypeAlert('error')
        setMessage('Postulante no fue aceptado')
      });
    }
    fetchData();
  }
  const RechazarSolicitud = (e,solicitud) => {
    setOpen(false)
    e.preventDefault();
    const fetchData = () => {
      setIsLoading(true);
      axios.post(`http://54.234.20.23:8082/ofertaService/revocarPostulacion`,solicitud, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion'))
          }
      } ).then( () => {
        setOpen(true)
        setTypeAlert('success')
        setMessage('Postulante Rechazado')
      }).catch ( ()=> {
        setOpen(true)
        setTypeAlert('error')
        setMessage('Postulante no fue rechazado')
      });
    }
    fetchData();
  }

  const obtenerMisSolicitudes = () => {
      const fetchData = async () =>{
        setIsLoading(true);
        const response = await axios (`http://54.234.20.23:8082/ofertaService/getOfertasSolicitadas?id_usuario=${auth.user.id_usuario}`)
        if(response !=null){
          // obtenerDetalleMisSolicitudes(response.data) 
          setSolicitudes(response.data)
        }
        
        setIsLoading(false);


      }
      fetchData();
  }
  const obtenerDetalleMisSolicitudes = (ofertas) =>{

    const fetchData = async () =>{
      setIsLoading(true);
      if (ofertas == null){

      }
      else {
         let sol = []
         ofertas.map( async (oferta) =>{
           if (oferta!=null){
             console.log("ID OFERTA ", oferta.id_oferta)
             const response = await axios (`http://54.234.20.23:8082/ofertaService/getDetalleOferta?id_oferta=${oferta.id_oferta}`)
             if (response != null){
              if (response.data.postulados.length > 0){
                  sol.push(response.data)
                  console.log(sol)
                  setSolicitudes([response.data,...solicitudes])
                  console.log("ENTRO")
               }
            }
           }



         })
      }

     setIsLoading(false);
    }
    fetchData();
  }
  const changePage = ({selected}) => {
    setPageNumber(selected)
  }
  {/* <CardPostulante postulado={postulado} habilidades={postulados.usuarioYHabilidades.habilidades} key={index} /> */}
    

  const displayPostulados = solicitudes.slice(pagesVisited, pagesVisited + postuladosPerPage).map((solicitud, index) => {
    

    return (

      console.log("SOLICITUD DEL RENDERIZADO ",solicitudes),
      solicitud.postulados.map( (postulado)=> {

        return (
        <Paper className={classes.paper} key={solicitud.id_oferta + postulado.usuarioYHabilidades.prestador.id_prestador}>
        <Grid container spacing={4} style={{width:'100%', margin: '0 auto'}}>
          
          <Grid item xs={12} sm={3} md={3} >
            <Box className={classes.div}>
              <Avatar
                className={classes.large}
                src={postulado.usuarioYHabilidades.prestador.url_imagen}
                />
            </Box>
            <Link 
              component="button"
              variant="body2"
              onClick={() => {
                console.info("var perfil.");
              }}
            >
              Ver Perfil
            </Link>
          </Grid>
          <Grid item xs={12} sm={9} md={9} >
            <Typography variant="h5" align="left" color="primary">
              {postulado.usuarioYHabilidades.prestador.nombres} {postulado.usuarioYHabilidades.prestador.apellidos} 
            </Typography>
            <Divider/>
            <Typography variant="h6" align="left">
              Habilidades:
            </Typography>
            {//postulado.usuarioYHabilidades.habilidades.map((habilidad, index)=>(
             // (habilidad!=null) ? (
             //   <List aria-label="secondary mailbox folders" key={parseInt(postulado.usuarioYHabilidades.prestador.id_usuario) + parseInt(solicitud.id_oferta)}>
             //   <ListItem style={{margin: "-20px 0"}}>
             //     <ListItemText primary={habilidad.nombreHabilidad} />
             //   </ListItem>
             // </List>
             // ): (
             //   <p>No tiene habilidades registradas</p>
             // )

/*               <Typography key={index} variant="p" align="center">
                {habilidad.nombreCategoria}
              </Typography> */
            //))
          }
            <Divider/>
            <Box className={classes.box}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
                onClick = { (e) => AceptarSolicitud(e,
                {    "id_oferta": solicitud.id_oferta,
                "id_solicitante": solicitud.solicitante.id_usuario,
                "id_prestador":   postulado.usuarioYHabilidades.prestador.id_usuario})}
                
              >
                Aceptar
              </Button>
              <Button variant="contained" color="secondary"
                onClick = { (e) => RechazarSolicitud(e,
                  {    "id_oferta": solicitud.id_oferta,
                  "id_solicitante": solicitud.solicitante.id_usuario,
                  "id_prestador":   postulado.usuarioYHabilidades.prestador.id_usuario})}
              
              >
                Rechazar
              </Button>
            </Box>
          </Grid>
        </Grid> 
      </Paper>
        )
        })
      

    )
  })

  return (
    <div className={classes.root} key={postulados.id_oferta}>
      <Typography color="textPrimary" variant="h5" align="center" color="primary" className={classes.title}>
        Prestadores postulados a tu oferta {ofertas.descripcion}
      </Typography>
      {displayPostulados}
      <ReactPaginate
        nextLabel={"Siguiente"}
        previousLabel={"Anterior"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginacionBtns"}
        previousLinkClassName={"antBtn"}
        nextLinkClassName={"sigBtn"}
        disabledClassName={"pagDisabled"}
        activeClassName={"pagActiva"}
      />

    <AlertView open={open} typeAlert={typeAlert} message={message} />
    </div>
  )
}

export default ListarPostulantesSolicitud

