import React,{Fragment} from 'react';
import OfertCard from './OfertCard';
import { Grid } from '@material-ui/core';



function List({ listaOfertas }) {
  console.log("ALUUUUUUUUUUUU ",listaOfertas )
  if(listaOfertas){
    return(
      <Fragment>
        
          <Grid container justify="center">
          {listaOfertas.map((oferta,index) => {
              
            //let url = "https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/"
            //let url = "http://52.7.252.110:8082/ofertaService/getOfertasALasQueCalifico/"
            //https://github.com/PokeAPI/pokeapi.git
            return <OfertCard key={index} oferta={oferta}/>
          })}
        </Grid>
      </Fragment>
    );
  }
}

export default List;