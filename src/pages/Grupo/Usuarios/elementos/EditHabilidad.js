import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, Grid, Box, Typography, makeStyles, Button, Dialog, DialogActions, DialogContent, DialogContentText , DialogTitle } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import {ConsultarCategoriaService, editarHabService} from '../../services'

const useStyles = makeStyles((theme) => ({
    root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
      margin: 'auto',
      textTransform: 'none',
    },
    formControl: {
        margin: "10px auto",
        maxWidth: 600,
        width: "100%",
    },
    container: {
        justifyContent: "center",
    },
    box: {
        padding: '20px 5%',
        backgroundColor: "#F2F2F2",
        borderRadius: 10,
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
    dialog: {
        minWidth: "65%",
        backgroundColor: "#f2f2f2",
        margin: "0 0",
        padding: "auto 10px",
    },
    dialogBox: {
        maxWidth: "none",
        margin: "auto -15px",
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
        /* height: 40,
        padding: "25px auto", */
    },
  }));

const EditHabilidad = ({openEdit, handleClose, parHabilidad, id_prestador, callBackEdit}) => {
    const classes = useStyles();

    const [categoria, setCategoria] = React.useState(parHabilidad.nombreCategoria);
    const [habilidad, setHabilidad] = React.useState(parHabilidad.nombreHabilidad);
    const [categorias, setCategorias] = React.useState([]);
    const [habilidades, setHabilidades] = React.useState([]);

    const handleChangeCat = (event) => {
        setCategoria(event.target.value)

    };
    const handleChangeHab = (event) => {
        setHabilidad(event.target.value)
    };

    const handleSubmit = (event) => {
        let id_hab = getIdHabilidad();
        console.log("prest: ", id_prestador, " old hab: ", parHabilidad.id_habilidad, " new hab: ", id_hab);
        editarHabService({
            "id_prestador": id_prestador,
            "id_habilidad_vieja": parHabilidad.id_habilidad,
            "id_habilidad_nueva": id_hab
        })
        .then(() => {
            console.log("se editó");
        })
        .catch(() => {
            console.log("no se editó");
        })
        callBackEdit(true);
        handleClose();
        event.preventDefault();
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await ConsultarCategoriaService();
            setCategorias(response.data);
        };
        fetchData();
    }, [])

    useEffect(() => {
        getIdCategoria();
        setHabilidad(parHabilidad.nombreHabilidad)
    }, [categoria])

    const getIdCategoria = async () => {
        let catFind = await categorias.find(itemCat => itemCat.nombre === categoria);
        if (catFind !== undefined) setHabilidades(catFind.habilidades);
    }

    const getIdHabilidad = () => {
        let id_hab = -1;
        let habFind = habilidades.find(itemHab => itemHab.nombreHabilidad === habilidad);
        if (habFind !== undefined) id_hab = habFind.id_habilidad;
        return id_hab;
    }  

    return ( 
        <Dialog
            open={openEdit}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            className={classes.dialogBox}
        >
            <Grid container minwidth="md" className={classes.container}>
                <Grid item sm={12} md={12} xl={12}>
                    <Box className={classes.title}>
                        <DialogTitle id="responsive-dialog-title">
                            <Typography variant="h6" align="center" component="h1">
                                Editar habilidad
                            </Typography>
                        </DialogTitle>
                    </Box>
                    <Box className={classes.x}>
                        <ClearIcon style={{fontSize: "1.1em"}} onClick={handleClose} cursor={"pointer"}/>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <DialogContent className={classes.dialog} >
                            <DialogContentText style={{marginBottom: 0}}>
                                <FormControl className={classes.formControl}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="categoria" >Categoría</InputLabel>
                                        <Select
                                            labelId="categoria"
                                            id="categoria"
                                            value={categoria}
                                            onChange={handleChangeCat}
                                            label="Categoría"
                                            className={classes.select}
                                            variant="standard"
                                        >
                                            {
                                                categorias.map((item)=>(<MenuItem key={item.id_categoria} value={item.nombre}>{item.nombre}</MenuItem>))
                                            }
                                        </Select>
                                    </FormControl>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="habilidad" >Habilidad</InputLabel>
                                        <Select
                                            labelId="habilidad"
                                            id="habilidad"
                                            value={habilidad}
                                            onChange={handleChangeHab}
                                            label="Habilidad"
                                            className={classes.select}
                                            variant="standard"
                                        >
                                            {
                                                habilidades.map((item)=>(<MenuItem key={item.id_habilidad} value={item.nombreHabilidad}>{item.nombreHabilidad}</MenuItem>))
                                            }
                                        </Select>
                                    </FormControl>
                                </FormControl>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Grid container p={5}  justify="space-between" alignItems="center">
                                    <Button color="primary" variant="contained" className={classes.button} onClick={handleSubmit} type="submit" style={{ margin: "auto 20px 10px 20px"}} autoFocus>
                                        Editar
                                    </Button>
                                    <Button onClick={handleClose} variant="outlined" color="primary" autoFocus className={classes.button} style={{ margin: "auto 20px 10px 20px"}}>
                                        Cancelar
                                    </Button>
                            </Grid>
                        </DialogActions>
                    </form>
                </Grid>
            </Grid>
        </Dialog>
     );
}
 
export default EditHabilidad;