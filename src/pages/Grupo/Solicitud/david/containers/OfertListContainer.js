import React,{ useEffect,useState } from 'react';
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
import { Fragment } from 'react';
/* import ReactPaginate from 'react-paginate'; */
import { Grid } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';


 const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    /* '& > * + *': {
      marginTop: theme.spacing(2),
    }, */
  },
  title: {
		color: 'black',
	  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
})); 

export const OfertListContainer = () => {
  const [listaOferta, setListaOferta] = useState([])
  const classes = useStyles();

/*   const handleChange = (event) => {
    setListaOferta(Number(event.target.value));
  }; */

 
  const [pageNumber, setPageNumber] = useState(0)
  const postuladosPerPage = 8
  const pagesVisited = pageNumber * postuladosPerPage
  const pageCount = Math.ceil(listaOferta.length / postuladosPerPage)
  const displayOferts = listaOferta.slice(pagesVisited, pagesVisited + postuladosPerPage).map((oferta,index) => {
    return (
      <div className={classes.root}>
        <Grid container spacing={1}>    {/*container direction="row" justify="center" alignItems="center"   className={classes.root} spacing={24} */}
           <Grid justify="center" container item md={8} spacing={1}>{/* item lg={4} md={6} sm={6} xs={12} */}
              <OfertCard key={index} oferta={oferta}/>
           </Grid>
                           
        </Grid> 
      </div>   
    )
  })


  useEffect(() => {
    GetAllOferts(1).then((respuesta)=>{
      setListaOferta(respuesta.data)
      console.log(respuesta)
    })

  }, [])

  const changePage = ({selected}) => {
    setPageNumber(selected)
  }

  return (
    <div align="center">
      <br></br>
      {/* <h1 >Ofertas Disponibles</h1> */}
      <Typography className={classes.title} component="p" variant="h5">OFERTAS DISPONIBLES</Typography>
       {displayOferts} 
       {/* <List listaOfertas={displayOferts}></List>  */}
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
        <br></br>
        <br></br>
        <br></br>
    </div>

    
  )
}

export default OfertListContainer;