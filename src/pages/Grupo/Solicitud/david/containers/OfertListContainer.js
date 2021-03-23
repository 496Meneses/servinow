import React,{ Component, useEffect } from 'react';
import axios from 'axios';
import List from '../components/OfertList';
import AppNav from '../components/AppNav';
import Pagination from '../components/OfertPagination';



class OfertListContainer extends Component {

  state ={
    pokeData: [],
    currentOffset: 0,
    pageCounter: 1,
  }


  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps,prevState) {
    const { currentOffset } = this.state;
    if (currentOffset !== prevState.currentOffset) {
      if (currentOffset < 0 ) {
        this.setState({
          currentOffset: 0,
          pageCounter: 1,
        });
        this.fetchData(prevState.currentOffset);
      }
      this.fetchData(currentOffset);
    }
  }

 
    fetchData = (offset = 0) => {
    //const url ='https://pokeapi.co/api/v2/pokemon';
    const url='http://52.7.252.110:8082/ofertaService/getOfertasALasQueCalifico?id_prestador=1';
    let params = {
      offset: offset,
      limit: 21
    }

    axios.get(url, { params })
    .then(res => {
      const { results } = res.data;

      this.setState({
        pokeData: results,
      })

    })
    .catch(error =>{
      console.log(error);
    })
  } 

 /*  useEffect(() => {
    GetOfertasDisponibles(1);
    
          
  }, []) */

  increment= () => {
    const { currentOffset, pageCounter } = this.state;
    this.setState({
      currentOffset: currentOffset + 21,
      pageCounter: pageCounter + 1,
    });
  }

  decrement= () => {
    const { currentOffset, pageCounter } = this.state;
    this.setState({
      currentOffset: currentOffset - 21,
      pageCounter: pageCounter - 1,
    });
  }
  


  render() {
    const { pokeData, pageCounter } = this.state;

    return(
      <>
         {/* <AppNav /> */} 
        <Pagination 
          increment={this.increment} 
          decrement={this.decrement} 
          page={pageCounter} 
        />
        <List pokedata={pokeData} />
      </>
    );
  }
}

export default OfertListContainer;