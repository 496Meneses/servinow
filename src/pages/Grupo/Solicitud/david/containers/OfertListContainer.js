import React,{ useEffect,useState,Fragment,lazy,Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel } from '@material-ui/core';
import {GetOfertasDisponibles, GetAllOferts, ConsultarPostuladosPorOfertaService} from '../../../services';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '../components/OfertList';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import Pagination from '../components/OfertPagination';
import { Card, CardMedia, CardContent, Typography, Button, Tooltip } from '@material-ui/core';
//import OfertCard from '../components/OfertCard';
import "../../../../../assets/css/style.css";
import {Box,Grid,Paper} from '@material-ui/core';
import CircularIndeterminate from "../../CircularIndeterminate";
import { ToastContainer } from "react-toastify";

const OfertCard = lazy(()=>import('../components/OfertCard'));



 const useStyles = makeStyles((theme) => ({

  root: {
      flexGrow: 1
    },
    
  control: {
    padding: theme.spacing(2),
    bottom: '5px',
    position: 'absolute',
    width: '81%',
 
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
    padding: theme.spacing(154),
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

  console.log("Obtuve " +props.estado)
  const [listaOferta, setListaOferta] = useState([])
  const [listaOfertaFromApi, setListaOfertaFromApi] = useState([])
  const [cargando, setCargando] = useState(false)
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState(0)
  const postuladosPerPage = 6
  const pagesVisited = pageNumber * postuladosPerPage
  const pageCount = Math.ceil(listaOferta.length / postuladosPerPage)
  const displayOferts = listaOferta.slice(pagesVisited, pagesVisited + postuladosPerPage).map((oferta,index) => (
         
                <Grid item xs={12} sm={6} md={4}>
                       {/* <ToastContainer />
                             {
                              cargando ? <CircularIndeterminate /> :  */}
                                  <Suspense fallback={<CircularIndeterminate/>}>
                                    <OfertCard key={index} oferta={oferta}/>
                                  </Suspense>
                             {/* } */}   
                </Grid>
                
  ))
  
  useEffect(() => {
 
    GetAllOferts().then((respuesta)=>{
      setListaOferta(respuesta.data)
      setListaOfertaFromApi(respuesta.data)
      console.log(respuesta)
 
    })
  }, [])

  // Inicio Lino
  useEffect(() => {
    setCargando(true)
    let nuevaListaOfertas = []    
    listaOfertaFromApi.map((data)=>{
      if(data.descripcion.includes(props.msg)){
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
    listaOfertaFromApi.map((data)=>{
      if(data.estado.includes(props.msg2)){
        nuevaListaOfertas.push(data)
      }
    })
    console.log(nuevaListaOfertas)
    setCargando(false)
    setListaOferta(nuevaListaOfertas)  
  }, [props.msg2])
  //fin david 


  const changePage = ({selected}) => {
    setPageNumber(selected)
  }
  return (
      <div className={classes.root}>
        {/* <paper className={classes.paper}> */}
            <br></br>
               <Typography color="textPrimary" variant="h5" align="center" color="primary">
                  OFERTAS
                </Typography> 
                <br></br> 
                    <div className={classes.root}>  
                  {/*     <ToastContainer />
                            {
                              cargando ? <CircularIndeterminate /> :
                  */}
                            
                            <Grid container spacing={3}>
                            
                                  {displayOferts}
                              <div className={classes.control}>
                               {/*  <paper className={classes.paper}> */}
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
                                  {/* </paper> */}
                              </div>

                            </Grid>
                            
                           {/*  } */}
                    
                    </div>
                      <br></br>
                      <br></br>
                      <br></br> 
         {/*  </paper> */}
      </div>  
  
  )
}
export default OfertListContainer;