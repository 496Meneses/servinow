import React, { useEffect, useState } from 'react';
import { Grid, Paper, Box, Typography, makeStyles, Button} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import AddHabilidad from '../elementos/AddHabilidad'
import axios from 'axios'
import Habilidad from './Habilidad';
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
    root: {
      ...theme.typography.button,

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
    const [callbackDelete, setCallbackDelete] = useState(false)



    const eliminarOferta = (idHabilidad) => {
        const position = habilidades.map((obj) => obj.id_habilidad).indexOf(idHabilidad)
        if (position > -1) {
          let listaOfertaEliminada = habilidades.splice(position, 1);
          let listaActualizadas = habilidades.filter(x => !listaOfertaEliminada.includes(x));
          setHabilidades(listaActualizadas)
          toast("Se ha eliminado exitosamente!", {
            type: 'success',
            draggable: true
          })
    
        }
      }


    const handleAddOpen = () => {
        setOpenAdd(true);
    };

    
    const handleClose = () => {
        setOpenAdd(false);
    }

    useEffect(() => {
        const fetchData = async () => {
          const response = await axios(`http://52.7.252.110:8082/usuarioService/getHabilidades?id_prestador=${id_prestador}`);
          setHabilidades(response.data.habilidades)
          console.log(response.data.habilidades);
        };
        fetchData();
      }, [])

      useEffect(() => {
          
      }, [callbackDelete])


    return ( 
        <>
                <Grid container maxwidth="md" align="center" className={classes.container}>
                    <Grid item xs={12} sm={9} md={9}>
                        <Typography variant="h4" align="center" component="h1">
                            Habilidades
                        </Typography>
                        <Box my={5, 2} style={{backgroundColor: "#f2f2f2"}} borderRadius="10px">
                            {
                                habilidades.map((habilidad)=>( <Habilidad habilidad={habilidad} CallbackDelete={eliminarOferta}/> ))
                            }
                        </Box>
                        <Button color="primary" variant="contained" className={classes.button} onClick={handleAddOpen} style={{marginBottom:"2rem"}}>
                            Agregar habilidad  <AddIcon className={classes.iconPlus}/>
                        </Button>
                        <AddHabilidad openAdd={openAdd} handleClose={handleClose}/>
                    </Grid>
                </Grid>
        </>
     );
}
