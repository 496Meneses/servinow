import React,{Fragment} from 'react';
import OfertCard from './OfertCard';
import { Grid } from '@material-ui/core';

function List({ listaOfertas }) {
  //console.log("ALUUUUUUUUUUUU ",listaOfertas )
  if(listaOfertas){
    return(
      <Fragment>
        
          <Grid container >
          {listaOfertas.map((oferta,index) => {
            return <OfertCard key={index} oferta={oferta}/>
          })}
        </Grid>
      </Fragment>
    );
  }
}

export default List;