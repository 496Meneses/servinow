import React,{ useEffect,useState } from 'react';
import {GetOfertasDisponibles} from '../../../services'
import List from '../components/OfertList';
import Pagination from '../components/OfertPagination';
import axios from 'axios';

export const OfertListContainer = () => {

  
  const [listaOferta, setListaOferta] = useState([])
  //const [currentOffset, setCurrentOffset] = useState()
  //const [pageCounter, setPageCounter] = useState()
  const [post, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
      const fethPosts = async () => {
        setLoading(true);
        GetOfertasDisponibles(1).then((respuesta)=>{
        setListaOferta(respuesta.data)
        console.log(respuesta)
        setPosts(respuesta.data);
        setLoading(false);
      })
      }
      fethPosts();

  }, [])

 /*  const increment= () => {
    setCurrentOffset(currentOffset+10)
    setPageCounter(pageCounter+1)
  }

  const decrement= () => {
    setCurrentOffset(currentOffset+10)
    setPageCounter(pageCounter+1)
  } */

  //Get current posts
  //const indexOfLastPost = currentPage * postsPerPage;
  //const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //const currentPosts = List.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
        {/* <Pagination 
          increment={increment()} 
          decrement={decrement()} 
          page={pageCounter} 
        /> */}
        <List listaOfertas={listaOferta} />
    </div>
  )
}

// class OfertListContainer extends Component {

//   state ={
//     pokeData: [],
//     currentOffset: 0,
//     pageCounter: 1,
//   }


//   componentDidMount() {
//     this.fetchData();
//   }

//   componentDidUpdate(prevProps,prevState) {
//     const { currentOffset } = this.state;
//     if (currentOffset !== prevState.currentOffset) {
//       if (currentOffset < 0 ) {
//         this.setState({
//           currentOffset: 0,
//           pageCounter: 1,
//         });
//         this.fetchData(prevState.currentOffset);
//       }
//       this.fetchData(currentOffset);
//     }
//   }

 
//     fetchData = (offset = 0) => {
//     //const url ='https://pokeapi.co/api/v2/pokemon';
//     const url='http://52.7.252.110:8082/ofertaService/getOfertasALasQueCalifico?id_prestador=1';
//     let params = {
//       offset: offset,
//       limit: 21
//     }

//     axios.get(url, { params })
//     .then(res => {
//       console.log("DATOSSSSSSSSSS ",res)
//       const { results } = res.data;

//       this.setState({
//         pokeData: results,
//       })

//     })
//     .catch(error =>{
//       console.log(error);
//     })
//   } 

//  /*  useEffect(() => {
//     GetOfertasDisponibles(1);
    
          
//   }, []) */

//   increment= () => {
//     const { currentOffset, pageCounter } = this.state;
//     this.setState({
//       currentOffset: currentOffset + 21,
//       pageCounter: pageCounter + 1,
//     });
//   }

//   decrement= () => {
//     const { currentOffset, pageCounter } = this.state;
//     this.setState({
//       currentOffset: currentOffset - 21,
//       pageCounter: pageCounter - 1,
//     });
//   }

//   render() {
//     const { pokeData, pageCounter } = this.state;
//     <h1>{console.log("ESTADOOOOOOOOOO ",this.state)}</h1>
//     return(
//       <>
//          {/* <AppNav /> */} 
//         <Pagination 
//           increment={this.increment} 
//           decrement={this.decrement} 
//           page={pageCounter} 
//         />
//         <List pokedata={pokeData} />
//       </>
//     );
//   }
// }

export default OfertListContainer;