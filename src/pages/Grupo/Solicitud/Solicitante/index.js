import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';

import { OfertListContainer } from "../david/containers/OfertListContainer";
//inicio david
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
//fin david

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }, button: {
        margin: theme.spacing(1),
    },
    //inicio David
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 340,
    }, div: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    }
    //fin David
}));

export default function CenteredGrid() {



    const classes = useStyles();


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
    const handleChange = (event) => {
        setAge(Number(event.target.value) || '');
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    //fin david

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                    <Paper className={classes.paper}>
                        <div className={classes.div}>
                            <form className={classes.root} noValidate autoComplete="off" >
                                <TextField id="outlined-basic" label="Buscar" value={cadenaBusqueda} variant="outlined" style={{ width: "100%" }} onChange={updateSearch} />
                            </form>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                                startIcon={<Search />}
                                onClick={handleSearch}
                            >
                                Buscar
                            </Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>
                        <div>
                            <Button onClick={handleClickOpen} variant="contained" color="primary">BUSACAR OFERTAS POR ESTADO</Button>
                            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                                <DialogTitle>OFERTAS</DialogTitle>
                                <DialogContent>
                                    <form className={classes.container}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="demo-dialog-native">Estados</InputLabel>
                                            <Select
                                                native
                                                value={age}
                                                onChange={handleChange}
                                                input={<Input id="demo-dialog-native" />}
                                            >
                                                <option aria-label="None" value="" />

                                                <option value={10}>Disponibles</option>
                                                
                                                <option value={20}>En proceso</option>
                                                
                                                <option value={30}>Finalizadas</option>
                                                
                                                <option value={40}>Canceladas</option>
                                                
                                            </Select>
                                        </FormControl>

                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                    </Button>
                                    <Button onClick={handleClose} color="primary">
                                        Ok
                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Paper>

                </Grid>
                <Grid item xs={12} sm={12}>

                    <OfertListContainer msg={cadenaBusqueda} estado={age}></OfertListContainer>

                </Grid>

            </Grid>
        </div>
    );
}
