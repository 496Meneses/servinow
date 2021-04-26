import React from 'react';
import { Grid, Box, Typography, makeStyles, Button, Dialog, DialogActions, DialogContent, DialogContentText , DialogTitle } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme) => ({
    root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
      margin: '20px auto',
      textTransform: 'none',
    },
    formControl: {
        margin: "18px 0 0 0",
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
        margin: "auto 0",
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
        height: 40,
        padding: "25px auto",
    },
    iconCenter: {
        display: "block",
        textAlign: "center",
    }
  }));

const DeleteHabilidad = ({openDelete, handleClose, habilidad}) => {
    const classes = useStyles();
    
    return (
        <>
            {
                habilidad ?
                ( 
                    <Dialog
                    open={openDelete}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                    className={classes.dialogBox}
                    >
                        <Grid container minwidth="md" className={classes.container}>
                            <Grid item sm={12} md={12} xl={12}>
                                <Box className={classes.title}>
                                    <DialogTitle id="responsive-dialog-title">
                                        <Typography variant="h6" align="center" component="h1">
                                            Eliminar habilidad
                                        </Typography>
                                    </DialogTitle>
                                </Box>
                                <Box className={classes.x}>
                                    <ClearIcon style={{fontSize: "1.1em"}} onClick={handleClose} cursor={"pointer"}/>
                                </Box>
                                <DialogContent className={classes.dialog} >
                                    <DialogContentText >
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item xs={12} md={12} xl={12} className={classes.iconCenter}>
                                                <ErrorOutlineIcon style={{fontSize: "3em", margin: "10px 0"}}/>
                                                <Typography>
                                                    ¿Estás seguro que deseas eliminar <strong>{habilidad.nombreHabilidad}</strong> de tus habilidades?
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Grid container p={5}  justify="space-between" alignItems="center">
                                            <Button color="secondary" variant="contained" className={classes.button} style={{ margin: "auto 20px 10px 20px"}} autoFocus onClick={handleClose}>
                                                Sí, eliminar
                                            </Button>
                                            <Button onClick={handleClose} variant="outlined" color="secondary" autoFocus className={classes.button} style={{ margin: "auto 20px 10px 20px"}}>
                                                No, cancelar
                                            </Button>
                                    </Grid>
                                </DialogActions>
                            </Grid>
                        </Grid>
                    </Dialog>
                ) :
                <Dialog
                    open={openDelete}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                    className={classes.dialogBox}
                    >
                        Error
                </Dialog>
            }
        </>
     );
}
 
export default DeleteHabilidad;