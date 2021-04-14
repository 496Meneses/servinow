import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { OfertListContainer } from "../david/containers/OfertListContainer";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
    },
    button: {
        margin: theme.spacing(1),
    },
    div: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    }
}));





export default function CenteredGrid() {
    const classes = useStyles();

    const [cadenaBusqueda, setCadenaBusqueda] = useState('');
    const handleSearch = () => {

        //        setQuery(search);
        
        setCadenaBusqueda("");
    }
    const updateSearch = e => {
        setCadenaBusqueda(e.target.value);
        //console.log(cadenaBusqueda)
    }


    return (
        <div className={classes.root}>
            <br></br>
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
                                onClick={ handleSearch}
                            >
                                Buscar
                            </Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper}>Select</Paper>
                </Grid>
                <Grid item xs={12} sm={12}>

                    <OfertListContainer msg={cadenaBusqueda}></OfertListContainer>

                </Grid>

            </Grid>
        </div>
    );
}
