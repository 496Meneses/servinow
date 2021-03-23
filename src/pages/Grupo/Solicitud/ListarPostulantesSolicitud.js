import {
  Box,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel } from '@material-ui/core';
import { ConsultarPostuladosPorOfertaService } from "../services"
import InputAdornment from '@material-ui/core/InputAdornment';

import './../../../assets/css/style.css'
import avatar from './../../../assets/images/perfil/avatar.png'
import ReactPaginate from 'react-paginate'
import JsonData from './test.json'
// ICONOS

import {
  Row,
  Col,
  Card,
  CardBody,
  CustomInput,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';

const useStyles = makeStyles({
  root: {
    background: 'white',
    border: 1,
    borderRadius: 3,
    paddingTop: '30px',
    paddingLeft: '50px',
    marginTop: "300px"
  },
  title: {
    margin: "20px 10px"
  },
  Row: {
    justifyContent: 'center',
  },
  Form: {
    
  },
  form_section: {
    margin: "20px auto",
    width: '50%'
  },
  container: {
    marginTop: '30px',
    width: '120vh'
  },
  button: {
    display: 'block',
    width: '400px'
  },
  textField: {
    width: 200,
  },

});


export const ListarPostulantesSolicitud = () => {

  const classes = useStyles();
  const [postulados, setPostulados] = useState(JsonData)
  const [pageNumber, setPageNumber] = useState(0)
  const postuladosPerPage = 3
  const pagesVisited = pageNumber * postuladosPerPage
  const pageCount = Math.ceil(postulados.length / postuladosPerPage)
  const displayPostulados = postulados.slice(pagesVisited, pagesVisited + postuladosPerPage).map((postulados) => {
    return (
      <div className="cards">
        <div className="grid-container">
          <div className="perfil">
            <img src={avatar} id="img-perfil"/>
            <a href="" id="btn-perfil">Ver Perfil</a>
          </div>
          <div className="desc">
            <p id="nombre">{postulados.last_name}</p>
            {/* <hr style="border: 0.1% solid #07090A"/> */}
            <p id="habilidades">
              {postulados.desc}              
            </p>
            <div className="buttons">
              <a href="" id="btn-aceptar">Aceptar</a>
              <a href="" id="btn-rechazar">Rechazar</a>
            </div> 
          </div>
        </div>
      </div>
    )
  })
  const [postulados1, setPostulados1] = useState([]);
  useEffect(() => {
    ConsultarPostuladosPorOfertaService(1)
      .then(request => {
        console.log(request.data);
        setPostulados1(request.data)
        
      })
      .catch(() => console.log("Error"));
  }, []);


  const changePage = ({selected}) => {
    setPageNumber(selected)
  }


  return (
    <Card key={postulados.id_oferta}>
      <Typography color="textPrimary" variant="h6" className={classes.title}>
        Prestadores postulados a tu oferta Pasear Perro
      </Typography>
      {/* {console.log(ConsultarPostuladosPorOfertaService(1).numeroDePostulados)} */}
      {displayPostulados}
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
      {console.log(postulados1)}
    </Card>
  )
}

export default ListarPostulantesSolicitud
