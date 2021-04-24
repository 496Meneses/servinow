import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";
import { OfertListContainer } from "../david/containers/OfertListContainer";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
/* import OfertCard from '../david/components/OfertCard'; */

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1.3),
    minWidth: 10,
  },
  paper: {
    background: "#fff", //"#3f51b5",
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(2),
  },

  paper2: {
    marginTop: -10,
    marginBottom: 10,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1),
  },
  container: {
    spacing: 10,
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(100),
    minWidth: 340,
  },
  div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

}));

export default function CenteredGrid() {
  const classes = useStyles();

  const [idRequestor, setIdRequestor] = useState(1);

  let aux = false;
  const [cadenaBusqueda, setCadenaBusqueda] = useState("");
  const handleSearch = () => {
    setCadenaBusqueda("");
  };
  const updateSearch = (e) => {
    setCadenaBusqueda(e.target.value);
  };
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");

  const [cadenaBusqueda2, setCadenaBusqueda2] = useState("");
  const handleSearch2 = () => {
    setCadenaBusqueda2("");
  };
  const updateSearch2 = (e) => {
    setCadenaBusqueda2(e.target.value);
  };

  const handleChange = (event) => {
    setAge(Number(event.target.value) || "");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {(aux = true)}
      <Grid item xs={12} sm={12}>
        <OfertListContainer
          auxiliar={aux}
          idRequestor={idRequestor}
        ></OfertListContainer>
        {/* <OfertCard>auxiliar={aux}</OfertCard> */}
      </Grid>
      
    </div>
  );
}
