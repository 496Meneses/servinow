import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { OfertListContainer } from "../david/containers/OfertListContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>cuadro de Busqueda</Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>Select</Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          
              <OfertListContainer></OfertListContainer>
          
        </Grid>
        
      </Grid>
    </div>
  );
}
