import React, { useEffect, useState } from 'react';
import { Grid, Paper, Box, Typography, makeStyles, Button} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import AddHabilidad from '../elementos/AddHabilidad'
import axios from 'axios'
import Habilidad from './Habilidad';
import { toast } from "react-toastify";
/* import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"; */
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const useStyles = makeStyles((theme) => ({
    root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
      margin: '20px 0px',
      textTransform: 'none',
    },
    formControl: {
        margin: "18px 0 0 0",
        maxWidth: 600,
        width: "100%",
    },
    container: {
        justifyContent: "center",
    },
    box: {
        padding: '10px 5% 10px 5%',
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    button: {
        padding: "5px 20px",
        display: "flex",
        marginBottom: "10px",
        justifyContent: "space-between",
        alignItems: "center",
        textTransform: 'none',
        fontSize: "12px",
    },
    iconPlus: {
        marginLeft: "20px",
    },
    x: {
        display: "block",
        position: "absolute",
        top: 6,
        right: 6,
    },
    title: {
        display: "flex",
        justifyContent: "center",
    },
    textField: {
        width: "100%",
    },
    select: {
        width: "100%",
        height: 40,
        padding: "25px auto",
    },
  }));

export default function Habilidades({id_prestador}) {
    const classes = useStyles();
    const [openAdd, setOpenAdd] = React.useState(false);
    const [habilidades, setHabilidades] = useState([]);
    const [listChange, setListChange] = useState(false);
    const [callBackEdit, setCallBackEdit] = useState(false);

    const handleAddOpen = () => {
        setOpenAdd(true);
    };
    
    const handleClose = () => {
        setOpenAdd(false);
    }

    const eliminarOferta = (idHabilidad) => {
        const position = habilidades.map((obj) => obj.id_habilidad).indexOf(idHabilidad)
        if (position > -1) {
          let listaOfertaEliminada = habilidades.splice(position, 1);
          let listaActualizadas = habilidades.filter(x => !listaOfertaEliminada.includes(x));
          toast("Se ha eliminado exitosamente! Gracias amigo", {
            type: 'success',
            draggable: true
          })
          setHabilidades(listaActualizadas)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
          const response = await axios(`http://52.7.252.110:8082/usuarioService/getHabilidades?id_prestador=${id_prestador}`);
          setHabilidades(response.data.habilidades)
        };
        fetchData();
    }, [])

    useEffect(() => {
        let find = habilidades.find(auxHab => auxHab.nombreHabilidad === listChange.nombreHabilidad);
        if (find !== undefined) console.log("Esta habilidad ya se encuentra en tus habilidades");
        else setHabilidades([...habilidades, listChange])
    }, [listChange])

    useEffect(() => {
        if (callBackEdit.data !== undefined) setHabilidades(callBackEdit.data);
    }, [callBackEdit])

    return ( 
        <>
            {/* <Paper className={classes.root}> */}
            <ToastContainer></ToastContainer>
                <Grid container maxwidth="md" align="center" className={classes.container}>
                    <Grid item xs={12} sm={9} md={9}>
                        <Typography variant="h4" align="center" component="h1">
                            Habilidades
                        </Typography>
                        <Box my={5, 2} style={{backgroundColor: "#f2f2f2"}} borderRadius="10px">
                            {
                                habilidades.map((habilidad)=>( <Habilidad habilidad={habilidad} CallbackDelete={eliminarOferta} callBackEdit={setCallBackEdit} id_prestador={id_prestador} /> ))
                            }
                        </Box>
                        <Button color="primary" variant="contained" className={classes.button} onClick={handleAddOpen} style={{marginBottom:"2rem"}}>
                            Agregar habilidad  <AddIcon className={classes.iconPlus}/>
                        </Button>
                        <AddHabilidad openAdd={openAdd} handleClose={handleClose} id_prestador={id_prestador} setListChange={setListChange}/>
                    </Grid>
                </Grid>
            {/* </Paper> */}
        </>
     );
}
