import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
  },
  //inicio David
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  //fin David
}));

export default function CenteredGrid() {
  const classes = useStyles();
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
          <Paper className={classes.paper}>cuadro de Busqueda</Paper>
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
                            {console.log("opción 1")}
                          <option value={20}>En proceso</option>
                            {console.log("opción 1")}
                          <option value={30}>Finalizadas</option>
                            {console.log("opción 1")}
                          <option value={40}>Canceladas</option>
                            {console.log("opción 1")}
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
          
              <OfertListContainer></OfertListContainer>
          
        </Grid>
        
      </Grid>
    </div>
  );
}
