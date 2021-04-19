
import React,{ useEffect,useState,Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography, Button, Tooltip, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
//import 'fontsource-roboto';
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
		height: 5,
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
    display: "flex",
    flexDirection: "column",
  }, 

  paper: {
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
}, button: {
    margin: theme.spacing(1),
},


}));

export default function OfertCard({ oferta }) {
	/* const [listaUsuarios, setListaUsuarios] = useState([]) */
	const classes = useStyles();
	let aux=0;
	const url = `/oferta/detalle/${oferta.id_oferta}`;
	const [cargando, setCargando] = useState(false)
	const [spacing, setSpacing] = React.useState(2);
	const [anchorEl, setAnchorEl] = React.useState(null);
	
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};


//Pruebas inicio 

/* eliminar=(dato)=>{
	var opcion=cconfirm("Realmente desea eliminar el registro ");
	if(opcion){
		var contador=0;
		var lista=this.state.oferta;
			lista.map(())

	}
} */

//Pruebas fin



	return (
		<div className={classes.root}>

		{/* 	 <ToastContainer />
                {
                    cargando ? <CircularIndeterminate /> : */}
						<paper className={classes.paper}>
							<Card className={classes.card}>
									<div>
											<CardHeader backgroundColor="primary"
												avatar={
													<div>
														<Avatar aria-label="recipe" src={oferta.solicitante.url_imagen}></Avatar>
													</div>
												}
												action={
											
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
															<MenuItem onClick={handleClose}>Ver oferta</MenuItem>
															<MenuItem onClick={handleClose}>Editar oferta</MenuItem>
															<MenuItem onClick={handleClose}>Eliminar oferta</MenuItem>
														</Menu>
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
											 	{/* </Grid>  */}
											</div>


											{/* <Typography component="p" variant="h6"></Typography> 
											<p>{oferta.descripcion}</p>*/}
											<div className={classes.descripcion_oferta}>
												<Typography variant="h7" align="justify">
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
								{/* <Link to={url} className="btn btn-primary carta_boton">VER DETALLE</Link> */}
								 <Button className="carta_boton" variant="contained" color="primary" href={`/oferta/detalle/${oferta.id_oferta}`}> {/* onClick={() => {alert('pulsado')}} */}					
											Ver detalle
									</Button>	 			
								</div>
								</div>
							</Card>
						</paper>
				
				{/* } */}
					</div>
	);
}

/* 
<Link to={url} className="btn btn-primary carta_boton">Ver detalle</Link> */