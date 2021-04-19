import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import { OfertListContainer } from "../david/containers/OfertListContainer";
import {  Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(1.3),
        minWidth: 10,
      },
    paper: {
        background: "#fff",//"#3f51b5",
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    }, button: {
        margin: theme.spacing(2),
    },

    //inicio David
    
    paper2: {
        marginTop: -10,
        marginBottom: 10,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }, button: {
        margin: theme.spacing(1),
    },
    container: {
        spacing: 10,
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(100),
        minWidth: 340,
    }, div: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    }
    //fin David
}));

//inicio Lino
export default function CenteredGrid() {
    const classes = useStyles();
    let aux=false;
    const [cadenaBusqueda, setCadenaBusqueda] = useState('');
        const handleSearch = () => {
        setCadenaBusqueda("");
    }
    const updateSearch = e => {
        setCadenaBusqueda(e.target.value);
    }
        const [open, setOpen] = React.useState(false);
        const [age, setAge] = React.useState('');
       
    //inicio david
    const [cadenaBusqueda2, setCadenaBusqueda2] = useState('');
        const handleSearch2 = () => {
        setCadenaBusqueda2("");
    }
    const updateSearch2 = e => {
        setCadenaBusqueda2(e.target.value);
    }

    const [open2, setOpen2] = React.useState(false);
    const [age2, setAge2] = React.useState('');
    //fin david
    /////////////////////////////////////////////////////////////
    const handleChange = (event) => {
      setAge(Number(event.target.value) || '');
        };

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };   
    
 
    return (
        <div className={classes.root}>
            {aux=true}
            
            <Paper className={classes.paper}>
                <div>
                <Typography color="textPrimary" variant="h5" align="center" color="primary">
                              MIS OFERTAS
                           </Typography>
                </div>
                <br></br>
                {/* <Paper className={classes.paper2}> */}
                <Grid container spacing={2}>
                
                    <Grid item xs={12} sm={8}>
                    
                            <div className={classes.div}>
                              
                                  
                                <form className={classes.root} noValidate autoComplete="off" >
                                    <TextField 
                                    id="outlined-basic" 
                                    label="Buscar" 
                                    variant="outlined" 
                                    style={{ width: "100%" }} 
                                    value={cadenaBusqueda}
                                    onChange={updateSearch} />
                                </form>
                                
                                
                            {/*   <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    startIcon={<Search />}
                                    onClick={handleSearch}
                                >
                                    Buscarrr
                                </Button> */}
                            </div>
                    
                                </Grid>
                                    <Grid item xs={12} sm={4}>
                                                
                                        <div className={classes.div}>
    
                                        <FormControl variant="outlined" className={classes.root}>
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
            {/* </Paper> */}
            </Paper>
             
            <Grid item xs={12} sm={12}>

                <OfertListContainer msg={cadenaBusqueda} msg2={cadenaBusqueda2} auxiliar={aux}></OfertListContainer>

            </Grid>
           
        </div>
    );
}
