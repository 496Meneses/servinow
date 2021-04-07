import React,{ useEffect,useState,Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel } from '@material-ui/core';
import {GetOfertasDisponibles, GetAllOferts} from '../../../services';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '../components/OfertList';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import Pagination from '../components/OfertPagination';
import { Card, CardMedia, CardContent, Typography, Button, Tooltip } from '@material-ui/core';
import OfertCard from '../components/OfertCard';
import OfertCardtow from '../components/OfertCardtow';
import "../../../../../assets/css/style.css";
import {Box, Grid,Paper} from '@material-ui/core';
import CircularIndeterminate from "../../CircularIndeterminate";
import { ToastContainer } from "react-toastify";


 const useStyles = makeStyles((theme) => ({

  root: {
      flexGrow: 1
    },
    
  control: {
    padding: theme.spacing(2),
  },


  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },

})); 
export const OfertListContainer = () => {
  const [listaOferta, setListaOferta] = useState([])
  const [cargando, setCargando] = useState(false)
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState(0)
  const postuladosPerPage = 6
  const pagesVisited = pageNumber * postuladosPerPage
  const pageCount = Math.ceil(listaOferta.length / postuladosPerPage)
  const displayOferts = listaOferta.slice(pagesVisited, pagesVisited + postuladosPerPage).map((oferta,index) => (
         
         <Grid item xs={12} sm={6} md={4}>
           <ToastContainer />
            {
                cargando ? <CircularIndeterminate /> :
                  <OfertCard key={index} oferta={oferta}/>            
            }    
          </Grid>
  ))

  useEffect(() => {
    setCargando(true)
    GetAllOferts(1).then((respuesta)=>{
      setListaOferta(respuesta.data)
      console.log(respuesta)
    setCargando(false)
    })
  }, [])

  const changePage = ({selected}) => {
    setPageNumber(selected)
  }


  return (
    <div>
      <br></br>
      <Typography color="textPrimary" variant="h5" align="center" color="primary">
        OFERTAS DISPONIBLES
      </Typography>
      <br></br>
        <div className="contenedor-carta">
          <div className={classes.root}>
          <Grid container spacing={3}>
            {displayOferts}
          </Grid>
        </div>
      </div>
      <div className="contenedor-paginacion">
       
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
        <br></br>
        <br></br>
        <br></br>
    </div>

    
  )
}

export default OfertListContainer;