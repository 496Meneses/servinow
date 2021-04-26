import React, { useEffect, useState } from 'react';
import { FormControl, Grid, Box, Typography, makeStyles, Button, Dialog, DialogActions, DialogContent, DialogContentText , DialogTitle } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import { BoxCategoria } from './../../Solicitud/BoxCategoria';
import { Habilidades } from './../../Solicitud/BoxHabilidad';
import { agregarHabilidadService } from '../../services';


const useStyles = makeStyles((theme) => ({
    root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
      margin: 'auto',
      textTransform: 'none',
    },
    formControl: {
        margin: "auto",
        maxWidth: 600,
        width: "100%",
        backgroundColor: "#F2F2F2"
    },
    container: {
        justifyContent: "center",
    },
    box: {
        padding: '-20px 5%',
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
        backgroundColor: "#F2F2F2",
        padding: "-20px 10px",
    },
    dialogBox: {
        maxWidth: "none",
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

const AddHabilidad = ({openAdd, handleClose, id_prestador}) => {
    const classes = useStyles();
    /* const [openAdd, setopenAdd] = React.useState(false); */

    /* const handleClickopenAdd = () => {
        setopenAdd(true);
    }; 
    
    const handleClose = () => {
        setopenAdd(false);
    };*/

    const [categoria, setCategoria] = React.useState('');
    const [habilidad, setHabilidad] = React.useState('');

    const handleChangeCat = (event) => {
        setCategoria(event.target.value)
    };
    const handleChangeHab = (event) => {
        setHabilidad(event)
    };

    const handleSubmit = async (event) => {
        console.log("hab: ", habilidad); 
        console.log("cat: ", categoria); 
        agregarHabilidadService(
            {
                "id_prestador": id_prestador,
                "id_habilidad": habilidad
            }
        ).then(() =>{
            console.log("se creo hab: "); 
        }).catch(() =>{
            console.log("no se creo hab: "); 
        });
        event.preventDefault();
    }
    
    return ( 
        <Dialog
            open={openAdd}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            className={classes.dialogBox}
        >
            <Grid container minwidth="md" className={classes.container}>
                <Grid item sm={12} md={12} xl={12}>
                    <Box className={classes.title}>
                        <DialogTitle id="responsive-dialog-title">
                            <Typography variant="h6" align="center" component="h1">
                                Agregar habilidad
                            </Typography>
                        </DialogTitle>
                    </Box>
                    <Box className={classes.x}>
                        <ClearIcon style={{fontSize: "1.1em"}} onClick={handleClose} cursor={"pointer"}/>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <DialogContent className={classes.dialog} >
                            <DialogContentText>
                                <FormControl className={classes.formControl}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <BoxCategoria callback={setCategoria}></BoxCategoria>
                                        <Habilidades idCategoria={categoria} callback={setHabilidad}></Habilidades>
                                        {/* <InputLabel id="categoria" >Categoría</InputLabel>
                                        <Select
                                            labelId="categoria"
                                            id="categoria"
                                            value={categoria}
                                            onChange={handleChangeCat}
                                            label="Categoría"
                                            className={classes.select}
                                        >
                                            <MenuItem value="">
                                                <em>Categoría</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
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
                                        >
                                            <MenuItem value="">
                                                <em>Habilidad</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select> */}
                                    </FormControl>
                                </FormControl>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Grid container p={5}  justify="space-between" alignItems="center">
                                    <Button color="primary" variant="contained" className={classes.button} type="submit" style={{ margin: "auto 20px 10px 20px"}} autoFocus>
                                        Aceptar
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
 
export default AddHabilidad;