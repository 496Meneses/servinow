import React,{Fragment} from 'react';
import OfertCard from './OfertCard';
import { Grid } from '@material-ui/core';



function List({ pokedata }) {
  return(
    <Fragment>
      
        <Grid container justify="center">
        {pokedata.map((pokemon, index) => {
            
          let url = "https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/"
          //let url = "http://52.7.252.110:8082/ofertaService/getOfertasALasQueCalifico/"
          //https://github.com/PokeAPI/pokeapi.git
          let pokeIndex = pokemon.url.split('/')[pokemon.url.split('/').length - 2]
          
          return <OfertCard key={index} to={`/poke-info/${pokeIndex}/${pokemon.name}`} name={pokemon.name} image={`${url}${pokeIndex}.png?raw=true`}/>
        })}
      </Grid>
    </Fragment>
  );
}

export default List;