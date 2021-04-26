
import React,{ useEffect,useState,Fragment } from 'react';
import { deleteSolicitud } from '../../../services';
import { withStyles } from '@material-ui/core/styles';
import { Card, Box, DialogTitle, CardMedia, DialogContentText, DialogActions, DialogContent, CardContent, Typography, Button, Tooltip, Grid, Modal, TextField , Paper} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from '@material-ui/core/CardHeader';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import "../../../../../assets/css/style.css";
import CardActionArea from '@material-ui/core/CardActionArea';
import {GetAllUsers} from '../../../services';
import CircularIndeterminate from "../../CircularIndeterminate";
import { ToastContainer } from "react-toastify";
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
	
	root: {
        flexGrow: 1,
    },

	card_media: {
		 //16:9
		minHeight: "200px",
		margin: "1em",
		borderRadius: 10,
		backgroundColor: '#eeeeee',
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		textAlign: "center",		
	  },

	  card_media_verde: {
		//16:9
	   minHeight: "200px",
	   margin: "1em",
	   borderRadius: 10,
	   backgroundColor: '#eeeeee',
	   display: "flex",
	   justifyContent: "space-between",
	   alignItems: "center",
	   textAlign: "center",		
	 },

	 card_media_naranja: {
		//16:9
	   minHeight: "200px",
	   margin: "1em",
	   borderRadius: 10,
	   backgroundColor: '#eeeeee',
	   display: "flex",
	   justifyContent: "space-between",
	   alignItems: "center",
	   textAlign: "center",		
	 },

	 card_media_rojo: {
		//16:9
	   minHeight: "200px",
	   margin: "1em",
	   borderRadius: 10,
	   backgroundColor: '#eeeeee',
	   display: "flex",
	   justifyContent: "space-between",
	   alignItems: "center",
	   textAlign: "center",		
	 },

	title1: {
		color: '#00a152',
		fontSize: 13,
	},

	title2: {
		color: '#ffc400',
		fontSize: 13,
	},

	title3: {
		color: '#ff1744',
		fontSize: 13,
	},

	title4: {
		color: '#eeeeee',
		fontSize: 13,
	},

	color_titulo: {
		color: '#fff',	
	},
	carta_contenedor: {
		height: 10,
		width: '90%',
		margin: "auto",		
	},

	carta_disponible: {
		margin: 1,		
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		textAlign: "center",
	},

	titulo_oferta: {
		flexWrap: 'wrap',
		position: "relative",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		margin: "auto",	
		marginBottom: "0em",
		marginTop: "-0.5em",
		marginRight: "-1.5em",
		marginLeft: "-0.5em", 
	},
	
	descripcion_oferta: {
		margin: "auto",		
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},

	valor_oferta: {
				
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom:"-1em",
		marginTop: "5em"	
	},

	

	carta_contenedor__boton: {
		margin: 15,	
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",	
	},

	carta_header: {
		height: 75,
   		display: "flex",
		justifyContent: "space-between",
		width: "100%",
		backgroundColor: "#3f51b5",
	},
	
	card: {
    height: "100%",
	width: "auto",
    display: "flex",
    flexDirection: "column",
  }, 

  paper: {
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
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

dialogBox: {
	maxWidth: "none",
	margin: "auto -15px",
},

modal: {
	maxWidth: "none",
	margin: "auto -15px",
	position: 'absolute',
	backgroundColor: 'white',	
	padding: "5px 0px 5px",
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
},

container: {
	justifyContent: "center",
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

dialog: {
	minWidth: "65%",
	backgroundColor: "#f2f2f2",
	margin: "auto 0",
	padding: "auto 10px",
}, 

}));

export default function OfertCard({ oferta , auxiliar, handleUpdateListaOferta}) {
	//console.log("here i have your auxiliar ")
	//console.log(auxiliar)
	const url = `/oferta/detalle/${oferta.id_oferta}`
	const classes = useStyles();
	const [modal, setModal]=useState(false);
	var activarEstado=true;
	const [cargando, setCargando] = useState(false)
	const [spacing, setSpacing] = React.useState(2);
	const [anchorEl, setAnchorEl] = React.useState(null);
	
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		//console.log(oferta)
		setAnchorEl(null);
	};

	const handleDelete = () => {		
		console.log("Voy a borrar el id oferta: "+oferta.id_oferta)
		handleUpdateListaOferta(oferta.id_oferta)
		deleteSolicitud(oferta.id_oferta).then(res => {
			setModal(!modal);
			handleUpdateListaOferta(oferta.id_oferta)
			
		  }).catch((error) => {
			// Error 😨
			setModal(!modal);
			setCargando(false)
			if (error.response) {
			  /*
			   * The request was made and the server responded with a
			   * status code that falls out of the range of 2xx
			   */
			  console.log("Error.Response: " + error.response.data);
			  console.log("Error.Response: " + error.response.status);
			  console.log("Error.Response: " + error.response.headers);
			} else if (error.request) {
			  /*
			   * The request was made but no response was received, `error.request`
			   * is an instance of XMLHttpRequest in the browser and an instance
			   * of http.ClientRequest in Node.js
			   */
			  console.log("Error.Request: " + error.request);
			} else {
			  // Something happened in setting up the request and triggered an Error
			  console.log("General Error: " + error.message);
			}
			console.log("Error.config: " + error.config);
			});		
		setAnchorEl(null);
	};

	const abrirCerrarModal =()=>{
		setModal(!modal);
	}

	const body=(
		<div className={classes.modal}>

			<Grid container minwidth="md" className={classes.container}>
				<Grid item sm={12} md={12} xl={12}>
					<Box className={classes.title}>
						<DialogTitle id="responsive-dialog-title">
							<Typography variant="h6" align="center" component="h1">
								Eliminar Oferta
							</Typography>
						</DialogTitle>
					</Box>
					<div align="center">
					<Box className={classes.x}>
                        <ClearIcon style={{fontSize: "1.1em"}} onClick={()=>abrirCerrarModal()} cursor={"pointer"}/>
                    </Box>
					<DialogContent className={classes.dialog} >
                        <DialogContentText >
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={12} md={12} xl={12} className={classes.iconCenter}>
                                    <ErrorOutlineIcon style={{fontSize: "3em", margin: "10px 0"}}/>
                                    	<Typography>
                                            ¿Estás seguro que deseas eliminar <strong>{oferta.titulo}</strong> de tus ofertas?
                                        </Typography>
                                </Grid>
                            </Grid>
                        </DialogContentText>
                	</DialogContent>
					</div>

					<DialogActions>
                        <Grid container p={5}  justify="space-between" alignItems="center">
                            <Button color="secondary" variant="contained" className={classes.button} style={{ margin: "auto 20px 10px 20px"}} autoFocus onClick={handleDelete}>
                            	Sí, eliminar
                            </Button>
                            <Button onClick={()=>abrirCerrarModal()} variant="outlined" color="secondary" autoFocus className={classes.button} style={{ margin: "auto 20px 10px 20px"}}>
                                No, cancelar
                            </Button>
                        </Grid>
                    </DialogActions>
		
				</Grid>
			</Grid>			

		</div>
	)
	return (
		<div className={classes.root}>

		<Modal
		open={modal}
		onClose={abrirCerrarModal}
		aria-labelledby="responsive-dialog-title"
		className={classes.dialogBox}
		>
		{body}
		</Modal>
			<div className={classes.paper}>
				<Card className={classes.card}>
					<div>
						<CardHeader 
							avatar={
								<div>
									<Avatar aria-label="recipe" src={oferta.solicitante.url_imagen}></Avatar>
								</div>
									}
									action={	
									<div>
									{
										auxiliar ?
											<h6></h6>:
											<div>
											<Button className={classes.color_titulo} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
												<MoreVertIcon color='inherit' />
											</Button>
											<Menu
												id="simple-menu"	
												anchorEl={anchorEl}
												keepMounted
												open={Boolean(anchorEl)}
												onClose={handleClose}
											>
											<MenuItem onClick={handleClose} >
												<Typography color="primary">Ver oferta</Typography>	
											</MenuItem>
											<MenuItem onClick={handleClose} disabled={false}>
												<Typography color="primary">Editar oferta</Typography>
											</MenuItem>
											<MenuItem onClick={()=>abrirCerrarModal()} disabled={false}>
												<Typography color="primary">Eliminar oferta</Typography>
											</MenuItem>
											</Menu>
										</div>
									}			
									</div>
									}
									title={
										<div className={classes.titulo_oferta}>
											<Typography className={classes.color_titulo}  variant="inherit">{oferta.titulo}</Typography>
										</div>
										}
										className={classes.carta_header}
										/>
									</div>
								<div >
								<CardActionArea>

									<CardMedia className={classes.card_media} image={oferta.imagen} />
										<div className={classes.carta_contenedor}>
											
											<div className={classes.carta_disponible}>
											
											 {/* <Grid item mx={12} sm={6} md={4}> */}
												  
												{/* <h5>Descripción</h5> */}
												<Typography variant="subtitle1" align="justify">Descripción</Typography>
													<Tooltip title="Estado de la oferta">
														<div>
														{(() =>{
																switch(oferta.estado){
																	case 'DISPONIBLE':		
																		return <Typography align="justify" className={classes.title1}>{oferta.estado}</Typography>
																		break;
																	case 'EN PROCESO':
																		return <Typography align="justify" className={classes.title2}>{oferta.estado}</Typography>
																		break;
																	case 'FINALIZADA':
																		return <Typography align="justify" className={classes.title3}>{oferta.estado}</Typography>
																		break;
																	case 'CANCELADA':
																		return <Typography align="justify" className={classes.title4}>{oferta.estado}</Typography>
																		break;
																		default:
																			return console.log('default');
																			break;
																	}																
															})()}
														</div> 
					
													</Tooltip>
											</div>
											<div className={classes.descripcion_oferta}>
												<Typography variant="subtitle2" align="justify"> {/*noWrap="bool"*/}
													{oferta.descripcion}
												</Typography>
											</div>
										</div>
										<br></br>
										<div className={classes.carta_contenedor__boton}>
											<div className={classes.valor_oferta}>
												<Tooltip title="Valor sugerido por el solicitante 🎉">
													<Typography align="justify" variant="h6">
														$ {oferta.id_oferta} 
													</Typography>
												</Tooltip>
											</div>
										</div>
								</CardActionArea>
								<div className={classes.carta_contenedor__boton}>
								 <Link to={url} className="btn btn-primary carta_boton">VER DETALLE</Link> 
								{/*  <Button className="carta_boton" variant="contained" color="primary" href={`/oferta/detalle/${oferta.id_oferta}`}> {/* onClick={() => {alert('pulsado')}} 					
											Ver detalle
									</Button>	 */} 			
								</div>
								</div>
							</Card>
						</div>
					</div>
	);
}
