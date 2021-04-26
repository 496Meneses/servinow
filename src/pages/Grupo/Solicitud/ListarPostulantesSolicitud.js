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
import ReactPaginate from 'react-paginate'
import './../../../assets/css/style.css'

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

  const classes = useStyles();
  const [ofertas, setOfertas] = useState({})
  const [postulados, setPostulados] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const postuladosPerPage = 3
  const pagesVisited = pageNumber * postuladosPerPage
  const pageCount = Math.ceil(postulados.length / postuladosPerPage)
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios("http://52.7.252.110:8082/ofertaService/getDetalleOferta?id_oferta=1");
      setOfertas(response.data);
      setPostulados(response.data.postulados)
      setIsLoading(false);
    };
    fetchData();
  }, [])

  const changePage = ({selected}) => {
    setPageNumber(selected)
  }
  {/* <CardPostulante postulado={postulado} habilidades={postulados.usuarioYHabilidades.habilidades} key={index} /> */}
    

  const displayPostulados = postulados.slice(pagesVisited, pagesVisited + postuladosPerPage).map((postulado, index) => {
    {console.log(postulado)}
    return (
      <Paper className={classes.paper}>
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
            {postulado.usuarioYHabilidades.habilidades.map((habilidad, index)=>(
              <List aria-label="secondary mailbox folders">
                <ListItem style={{margin: "-20px 0"}}>
                  <ListItemText primary={habilidad.nombreHabilidad} />
                </ListItem>
              </List>
/*               <Typography key={index} variant="p" align="center">
                {habilidad.nombreCategoria}
              </Typography> */
            ))}
            <Divider/>
            <Box className={classes.box}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "10px" }}
              >
                Aceptar
              </Button>
              <Button variant="contained" color="secondary">
                Rechazar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
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
    </div>
  )
}

export default ListarPostulantesSolicitud
