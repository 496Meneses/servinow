import React, { useEffect, useState, Fragment, lazy, Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel } from "@material-ui/core";
import {
  GetOfertasDisponibles,
  GetAllOferts,
  GetAllOfertsByRequestor,
  ConsultarPostuladosPorOfertaService,
} from "../../../services";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "../components/OfertList";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Pagination from "../components/OfertPagination";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Tooltip,
} from "@material-ui/core";
//import OfertCard from '../components/OfertCard';
import "../../../../../assets/css/style.css";
import { Box, Grid, Paper } from "@material-ui/core";
import CircularIndeterminate from "../../CircularIndeterminate";
import { ToastContainer } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const OfertCard = lazy(() => import("../components/OfertCard"));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  control: {
    padding: theme.spacing(1),
    bottom: "5px",
    width: "97%",
  },

  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  contenedor_paginacion: {
    flexDirection: "row",
  },

  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1),
  },

  div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
}));
export const OfertListContainer = (props) => {

  var activarEstado = true;

  //Cadena correspondiente al filtro "descrpción"
  const [cadenaBusqueda, setCadenaBusqueda] = useState("");
  const handleSearch = () => {
    setCadenaBusqueda("");
  };
  const updateSearch = (e) => {
    setCadenaBusqueda(e.target.value);
  };
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");

  //Cadena correspondiente al filtro "Estado"
  const [cadenaBusqueda2, setCadenaBusqueda2] = useState("");
  const handleSearch2 = () => {
    setCadenaBusqueda2("");
  };
  const updateSearch2 = (e) => {
    setCadenaBusqueda2(e.target.value);
  };
  const [listaOferta, setListaOferta] = useState([]);

  const eliminarOferta = (id_oferta_to_delete) => {
    console.log(listaOferta)
    //console.log("Position to delete: "+listaOferta.map((obj) => obj.id_oferta).indexOf(id_oferta_to_delete));
    let arreglo = listaOferta
    console.log(arreglo)
    const position = arreglo.map((obj) => obj.id_oferta).indexOf(id_oferta_to_delete)
    console.log("Position to delete: "+ position)
    if (position > -1) {
      let deleteItems = arreglo.splice(position, 1);
      let difference = arreglo.filter(x => !deleteItems.includes(x));
      setListaOferta(difference)    
      setListaOfertaFromApi(difference)  
    }



    /* const position = listaOferta.map((obj) => obj.id_oferta).indexOf(id_oferta_to_delete)
    if (position > -1) {
      setListaOferta(listaOferta.splice(position, 1));
      //setListaOferta(listaOferta)
    }
    console.log("Here we go...");
    console.log(listaOferta) */
    
  }

  

  console.log("Obtuve " + props.estado);
  
  const [listaOfertaFromApi, setListaOfertaFromApi] = useState([]);
  const [cargando, setCargando] = useState(false);
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState(0);
  const postuladosPerPage = 6;
  const pagesVisited = pageNumber * postuladosPerPage;
  const pageCount = Math.ceil(listaOferta.length / postuladosPerPage);
  const displayOferts = listaOferta
    .slice(pagesVisited, pagesVisited + postuladosPerPage)
    .map((oferta, index) => (
      <Grid item xs={12} sm={6} md={4}>
        <OfertCard key={index} oferta={oferta} auxiliar={activarEstado} handleUpdateListaOferta={eliminarOferta}/>
      </Grid>
    ));


  const filterInPlace = (array, predicate) => {
      let end = 0;
  
      for (let i = 0; i < array.length; i++) {
          const obj = array[i];
  
          if (predicate(obj)) {
              array[end++] = obj;
          }
      }
  
      array.length = end;

      
  };
  
  const toDelete = new Set(['abc', 'efg']);
  
  const arrayOfObjects = [{id: 'abc', name: 'oh'},
                          {id: 'efg', name: 'em'},
                          {id: 'hij', name: 'ge'}];
  

  
    
/*   const array = [2, 5, 9];

console.log(array);


const index = array.indexOf(5);
if (index > -1) {
  array.splice(index, 1);
}

// array = [2, 9]
console.log(array); 
                         */


/* const myArray = [
  {
      'color':'red',
      'name': 'redName'
  },
  {
      'color':'blue',
      'name': 'blueName'
  },
  {
      'color':'green',
      'name': 'greenName'
      },
  {
      'color':'yellow',
      'name': 'yellowName'
  },
];
console.log("Position to delete: "+myArray.map((el) => el.color).indexOf('green'));

const position = myArray.map((el) => el.color).indexOf('yellow')
if (position > -1) {
    myArray.splice(position, 1);
}
console.log(myArray) */

 
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

        //eliminarOferta()

      })

    }
  }, []);

  //Useeffect para realizar la busqueda por descrpción
  useEffect(() => {
    setCargando(true);

    let nuevaListaOfertas = [];
    listaOfertaFromApi.map((data) => {
      if (data.descripcion.includes(cadenaBusqueda)) {
        nuevaListaOfertas.push(data);
      }
    });
    console.log(nuevaListaOfertas);
    setCargando(false);
    setListaOferta(nuevaListaOfertas);
  }, [cadenaBusqueda]);

  //Useeffect para realizar la busqueda por estado
  useEffect(() => {
    setCargando(true);

    let nuevaListaOfertas = [];
    listaOfertaFromApi.map((data) => {
      if (data.estado.includes(cadenaBusqueda2)) {
        nuevaListaOfertas.push(data);
      }
    });
    console.log(nuevaListaOfertas);
    setCargando(false);
    setListaOferta(nuevaListaOfertas);
  }, [cadenaBusqueda2]);



  const handleChange = (event) => {
    setAge(Number(event.target.value) || "");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className={classes.root}>
      
      <Suspense fallback={<CircularIndeterminate />}>
        <br></br>
        <Paper className={classes.paper}>
          <div>
            {(() => {
              switch (props.auxiliar) {
                case true:
                  activarEstado = false;
                  return (
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      align="center"
                      color="primary"
                    >
                      {" "}
                      MIS OFERTAS
                    </Typography>
                  );
                  break;
                default:
                  return (
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      align="center"
                      color="primary"
                    >
                      OFERTAS
                    </Typography>
                  );
                  break;
              }
            })()}
            <br></br>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <div className={classes.div}>
                  <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                      id="outlined-basic"
                      label="Buscar"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={cadenaBusqueda}
                      onChange={updateSearch}
                    />
                  </form>
                </div>
              </Grid>

              <Grid item xs={12} sm={4}>
                <div className={classes.div}>
                  <FormControl variant="outlined" className={classes.root} disabled={activarEstado}>
                    <InputLabel>Estado</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={cadenaBusqueda2}
                      onChange={updateSearch2}
                      label="Age"
                    >
                      <MenuItem value="">
                        <Typography color="primary">OFERTAS</Typography>
                      </MenuItem>
                      <MenuItem value="DISPONIBLE">DISPONIBLE</MenuItem>
                      <MenuItem value="EN PROCESO">EN PROCESO</MenuItem>
                      <MenuItem value="FINALIZADA">FINALIZADA</MenuItem>
                      <MenuItem value="CANCELADA">CANCELADA</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Grid>
            </Grid>
          </div>



          <br></br>
          <div className={classes.root}>
          <Button onClick={()=>eliminarOferta(263)} color="primary">263</Button>
          <Button onClick={()=>eliminarOferta(274)} color="secondary">274</Button>
          <Button onClick={()=>eliminarOferta(289)} color="secondary">289</Button>
            <Grid container spacing={3}>
              {displayOferts}

              <div className={classes.control}>
                <ReactPaginate
                  className="algo"
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
          </div>
        </Paper>
        <br></br>
        <br></br>
        <br></br>
      </Suspense>
    </div>
  );
};
export default OfertListContainer;
