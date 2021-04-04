import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:"200px",
    display: 'flex',
    justifyContent: 'center',
    flexDirection:'column',
    alignItems:'center'
    
  },

}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
      <CircularProgress />
      <br></br>
      <Typography variant="caption">Cargando ...</Typography>
    </div>
  );
}
