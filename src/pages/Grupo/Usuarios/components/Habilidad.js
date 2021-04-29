import React, { useEffect } from 'react'
import { Box, Typography, makeStyles, Menu, MenuItem, Link} from "@material-ui/core";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteHabilidad from '../elementos/DeleteHabilidad'
import EditHabilidad from '../elementos/EditHabilidad'
import { activarHabService, desactivarHabService } from '../../services';

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
        padding: '10px 5% 10px 5%',
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
        maxWidth: "90%",
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
    tachado: {
        textDecoration: "line-through",
        color: "#808080",
        textDecorationColor: "#808080",
    },
  }));

export default function Habilidad({habilidad, CallbackDelete, id_prestador}) {
    const classes = useStyles();
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [stateHab, setStateHab] = React.useState(habilidad.activa);

    const handleDeleteOpen = () => {
        setOpenDelete(true);
    };

    const handleEditOpen = () => {
        setOpenEdit(true);
    };

    const handleClose = () => {
        setOpenDelete(false);
        setOpenEdit(false);
    };

    const handleOptions = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseOptions = () => {
        setAnchorEl(null);
    };

    const handleChangeState = () => {
        if (!stateHab) {
            activarHabService(
                {
                    "id_prestador": id_prestador,
                    "id_habilidad": habilidad.id_habilidad
                }
            ).then(() =>{
                console.log("se activó la hab"); 
            }).catch(() =>{
                console.log("no se activó la hab"); 
            });
        } else {
            desactivarHabService(
                {
                    "id_prestador": id_prestador,
                    "id_habilidad": habilidad.id_habilidad
                }
            ).then(() =>{
                console.log("se desactivó la hab"); 
            }).catch(() =>{
                console.log("no se desactivó la hab"); 
            });
        }
        setStateHab(!stateHab);
    }

    useEffect(() => {
        setStateHab(habilidad.activa);
    }, [habilidad])
    return (
        <Box className={classes.box} key={habilidad.id_habilidad}>
            {!stateHab ?
                <Typography align="left" className={classes.tachado}>{habilidad.nombreHabilidad} ({habilidad.nombreCategoria}) {habilidad.id_habilidad}</Typography>
            : 
                <Typography align="left">{habilidad.nombreHabilidad} ({habilidad.nombreCategoria}) {habilidad.id_habilidad}</Typography>
            }
            <MoreHorizIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleOptions} cursor={"pointer"} style={{marginLeft: "15px"}}/>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseOptions}
            >
                <MenuItem onClick={handleCloseOptions}>
                    <Link underline="none" onClick={handleEditOpen}>Editar</Link>
                    <EditHabilidad parHabilidad={habilidad} openEdit={openEdit} handleClose={handleClose}/>
                </MenuItem>
                <MenuItem onClick={handleCloseOptions}>
                    <Link underline="none" onClick={handleDeleteOpen}>Eliminar</Link>
                    <DeleteHabilidad habilidad={habilidad} openDelete={openDelete} handleClose={handleClose} CallbackDelete={CallbackDelete}/>
                </MenuItem>
                <MenuItem onClick={handleCloseOptions}>
                    <Link underline="none" onClick={handleChangeState}>Desactivar/activar</Link>
                </MenuItem>
            </Menu>
        </Box>
    )
}
