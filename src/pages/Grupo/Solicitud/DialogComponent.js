import React, { useState, Fragment } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const DialogComponent = (props) => {

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
        //alert("Here we go")
    };
    const handleClose = () => {
        setOpen(false);

    };
    const handleAccept = () => {
        setOpen(false);
        props.metodoAEjecutar()
    };

    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Fragment>
                <Button variant="contained" color={props.colorBoton} onClick={handleClickOpen}>
                    {props.textoBoton}
                </Button>
                {/*  <Fab color="primary" aria-label="add" onClick={handleClickOpen} style={{flex:1}}>
                <AddIcon />
            </Fab> */}
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{props.titulo}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {props.descripcion}
                        </DialogContentText>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            No
                            </Button>
                        <Button onClick={handleAccept} color="primary" variant="contained">
                            Si
                            </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        </div>
    )
}

export default DialogComponent
