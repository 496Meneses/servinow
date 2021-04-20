import React, { useEffect, useState, Fragment, lazy, Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel } from '@material-ui/core';
import { GetOfertasDisponibles, GetAllOferts, GetAllOfertsByRequestor, ConsultarPostuladosPorOfertaService } from '../../../services';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '../components/OfertList';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import Pagination from '../components/OfertPagination';
import { Card, CardMedia, CardContent, Typography, Button, Tooltip } from '@material-ui/core';
//import OfertCard from '../components/OfertCard';
import "../../../../../assets/css/style.css";
import { Box, Grid, Paper } from '@material-ui/core';
import CircularIndeterminate from "../../CircularIndeterminate";
import { ToastContainer } from "react-toastify";

const OfertCard = lazy(() => import('../components/OfertCard'));



const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1
  },

  control: {
    padding: theme.spacing(1),
    bottom: '5px',
    width: '97%',

  },

  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },

  contenedor_paginacion: {
    flexDirection: 'row'
  },

  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  }, button: {
    margin: theme.spacing(1),
  },

  div: {
    bottom: '20px',
    position: 'absolute',
  },

}));
export const OfertListContainer = (props) => {


  console.log("Obtuve " + props.estado)
  const [listaOferta, setListaOferta] = useState([])
  const [listaOfertaFromApi, setListaOfertaFromApi] = useState([])
  const [cargando, setCargando] = useState(false)
  const classes = useStyles();
  //let aux=false;
  const [pageNumber, setPageNumber] = useState(0)
  const postuladosPerPage = 6
  const pagesVisited = pageNumber * postuladosPerPage
  const pageCount = Math.ceil(listaOferta.length / postuladosPerPage)
  const displayOferts = listaOferta.slice(pagesVisited, pagesVisited + postuladosPerPage).map((oferta, index) => (


    <Grid item xs={12} sm={6} md={4}>

      <OfertCard key={index} oferta={oferta} />

    </Grid>

  ))

  useEffect(() => {
   
    if (props.idRequestor == 0) {
      GetAllOferts().then((respuesta) => {
        setListaOferta(respuesta.data)
        setListaOfertaFromApi(respuesta.data)
        console.log(respuesta)

      })

    } else {
      GetAllOfertsByRequestor(props.idRequestor).then((respuesta) => {
        setListaOferta(respuesta.data)
        setListaOfertaFromApi(respuesta.data)
        console.log(respuesta)
      })

    }

  }, [])

  // Inicio Lino
  useEffect(() => {
    setCargando(true)

    let nuevaListaOfertas = []
    listaOfertaFromApi.map((data) => {
      if (data.descripcion.includes(props.msg)) {
        nuevaListaOfertas.push(data)
      }
    })
    console.log(nuevaListaOfertas)
    setCargando(false)
    setListaOferta(nuevaListaOfertas)
  }, [props.msg])

  // fin Lino

  //Inicio David
  useEffect(() => {
    setCargando(true)

    let nuevaListaOfertas = []
    listaOfertaFromApi.map((data) => {
      if (data.estado.includes(props.msg2)) {
        nuevaListaOfertas.push(data)
      }
    })
    console.log(nuevaListaOfertas)
    setCargando(false)
    setListaOferta(nuevaListaOfertas)
  }, [props.msg2])
  //fin david 


  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
  return (
    <div className={classes.root}>
      {/* <paper className={classes.paper}> */}
      <Suspense fallback={<CircularIndeterminate />}>
        <br></br>
        <Paper className={classes.paper}>
          <div>
            {/* {aux = props.aux} */}
            {(() => {

              switch (props.auxiliar) {

                case true:
                  return ""
                  break;
                default:
                  return <Typography color="textPrimary" variant="h5" align="center" color="primary">
                    OFERTAS
                             </Typography>
                  break;
              }
            })()}
          </div>
          {/*  <Typography color="textPrimary" variant="h5" align="center" color="primary">
                  OFERTAS
                </Typography> */}

          <div className={classes.root}>

            <paper className={classes.paper}>
              <Grid container spacing={3}>
                {displayOferts}
                <div className={classes.control}>
                  <ReactPaginate className="algo"
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

              </Grid>
            </paper>


          </div>
        </Paper>
        <br></br>
        <br></br>
        <br></br>
      </Suspense>
    </div>

  )
}
export default OfertListContainer;