import React, { useEffect, useState, lazy } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel } from "@material-ui/core";
import { toast } from "react-toastify";
import { Input, Row, Col } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { GetAllOferts, GetAllOfertsByRequestor } from "../../../services";
import InputAdornment from "@material-ui/core/InputAdornment";
import ReactPaginate from "react-paginate";
import axios from "axios";
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

  },
  controlPagina: {

  },

  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  contenedor_paginacion: {
    flexDirection: "row",
    marginTop: "30px"
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
  InputPrincipal: {
    height: 50,
    fontSize: 15,
    marginTop: 20,
    
  },
  ContenedorInputPrincipal: {
    height: "100px",
    width: "100%",
  },
}));

export const OfertListContainer = (props) => {
  var activarEstado = true;
  if (props.auxiliar) {
    activarEstado = false;
  }

  //Cadena correspondiente al filtro "descrpción"
  const [cadenaBusqueda, setCadenaBusqueda] = useState("");
  const updateSearch = (e) => {
    setCadenaBusqueda(e.target.value);
  };
  //Cadena correspondiente al filtro "Estado"
  const [cadenaBusqueda2, setCadenaBusqueda2] = useState("");

  const updateSearch2 = (e) => {
    setCadenaBusqueda2(e.target.value);
  };
  const [listaOferta, setListaOferta] = useState([]);

  /**
   *
   * @param {Este parámetro es el id de la oferta que se va a eliminar} id_oferta_to_delete
   *  Este método recive el id de la oferta que va a eliminar.
   *  Por medio de la función map() e indexOf() y utilizando el id de la oferta a eliminar se obtiene la posición
   *  que ocupa en el arreglo de ofertas.
   *  Por medio de la función splice se elimina la posición selecccionada; este metodo retorna una lista con los
   *  elementos eliminados
   *  Se utiliza el metodo filter, para realizar una resta entre la lista orginial y la lista de la oferta eliminada
   *  Finalmente se actualizan las variables de estado.
   */
  const eliminarOferta = (id_oferta_to_delete) => {
    const position = listaOferta
      .map((obj) => obj.id_oferta)
      .indexOf(id_oferta_to_delete);
    if (position > -1) {
      let listaOfertaEliminada = listaOferta.splice(position, 1);
      let listaActualizadas = listaOferta.filter(
        (x) => !listaOfertaEliminada.includes(x)
      );
      setListaOferta(listaActualizadas);
      setListaOfertaFromApi(listaActualizadas);
      toast("Se ha eliminado exitosamente!", {
        type: "success",
        draggable: true,
      });
    }
  };

  
  const [listaOfertaFromApi, setListaOfertaFromApi] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [editarOfertaT, setEditarOfertaT] = useState(false)
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState(0);
  const postuladosPerPage = 3;
  const pagesVisited = pageNumber * postuladosPerPage;
  const pageCount = Math.ceil(listaOferta.length / postuladosPerPage);
  const displayOferts = listaOferta
    .slice(pagesVisited, pagesVisited + postuladosPerPage)
    .map((oferta, index) => (
      <Col className={classes.contenedor_paginacion} key={index} item xs={12} sm={12} md={6} lg={4} >
        <OfertCard
          key={index}
          oferta={oferta}
          auxiliar={activarEstado}
          handleUpdateListaOferta={eliminarOferta}
          listaOferta={listaOferta}
          editarOferta={editarOfertaT}
        />
      </Col>
    ));

  useEffect(() => {
    setCargando(true);

    console.log("Id Requestor: " + props.idRequestor);
    if (props.idRequestor == null) {
      GetAllOferts().then((respuesta) => {
        setListaOferta(respuesta.data);
        setListaOfertaFromApi(respuesta.data);
        setCargando(false);
        console.log(respuesta);
      });
    } else {
      GetAllOfertsByRequestor(props.idRequestor).then((respuesta) => {
        setListaOferta(respuesta.data);
        setListaOfertaFromApi(respuesta.data);
        setCargando(false);
        console.log(respuesta);
      });
    }
  }, [editarOfertaT]);

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
    setListaOferta(nuevaListaOfertas);
    setCargando(false);
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
    setListaOferta(nuevaListaOfertas);
    setCargando(false);
  }, [cadenaBusqueda2]);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div>
        {cargando ? (
          <CircularIndeterminate />
        ) : (
          <div>
            <br></br>
            <Paper className={classes.paper}>
              <br></br>
              <Grid>
                {!props.auxiliar ? (
                  <Row className={classes.ContenedorInputPrincipal}>
                    <Col sm="12">
                      <h3>
                        <b>Ofertas disponibles</b>
                      </h3>
                    </Col>

                    <Col sm="12" md={6} lg="4">
                      <div className={classes.div}>
                        <form
                          className={classes.root}
                          noValidate
                          autoComplete="off"
                        >
                          <div>
                            <Input
                              className={classes.InputPrincipal}
                              id="outlined-basic"
                              value={cadenaBusqueda}
                              onChange={updateSearch}
                              placeholder="Buscar oferta"
                            ></Input>
                          </div>
                        </form>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <>
                  <h3>
                  <b>Mis Ofertas</b>
                  </h3>
                  <div className='contenedorMisOfertasChange'>
                  <form noValidate autoComplete="off">
                        <div>
                            <Input
                              className='inputPrincipalCC'
                              id="outlined-basic"
                              value={cadenaBusqueda}
                              onChange={updateSearch}
                              placeholder="Buscar oferta"
                            ></Input>
                        </div>
                  </form>
                  <Grid item xs={12} sm={6} md={4}>
                    <div className={classes.div}>
                      <FormControl
                        variant="outlined"
                        className={classes.root}
                        disabled={activarEstado}
                      >
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
                          <MenuItem value="DISPONIBLE">
                            <Typography color="primary">DISPONIBLE</Typography>
                          </MenuItem>
                          <MenuItem value="EN PROCESO">
                            <Typography color="primary">EN PROCESO</Typography>
                          </MenuItem>
                          <MenuItem value="FINALIZADA">
                            <Typography color="primary">FINALIZADA</Typography>
                          </MenuItem>
                          <MenuItem value="CANCELADA">
                            <Typography color="primary">CANCELADA</Typography>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Grid>
                  </div>

                  </>
                )}

              </Grid>
                <Row>
                  {displayOferts}
                  <Col className={classes.control} sm={12}>
                    
                      <ReactPaginate
                        className={classes.controlPagina}
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
                
                  </Col>
                </Row>
              
            </Paper>
            <br></br>
            <br></br>
            <br></br>
          </div>
        )}
      </div>
    </>
  );
};
export default OfertListContainer;
