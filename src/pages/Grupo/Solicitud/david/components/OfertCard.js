
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


const useStyles = makeStyles((theme) => ({
	
	root: {
        flexGrow: 1,
    },

	card_media: {
		 //16:9
		minHeight: "250px",
		margin: "1.2em",
		borderRadius: 10,
		backgroundColor: '#eeeeee',
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		textAlign: "center",		
	  },

	title1: {
		color: '#00a152',
	},

	title2: {
		color: '#ffc400',
	},

	title3: {
		color: '#ff1744',
	},

	title4: {
		color: '#d500f9',
	},

	color_titulo: {
		color: '#fff',	
	},
	carta_contenedor: {
		height: 60,
		width: '90%',
		margin: 20,	
		
		
	},

	carta_disponible: {
		margin: 5,		
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		textAlign: "center",
	},

	titulo_oferta: {
		margin: 0.3,		
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		
	},
	
	descripcion_oferta: {
		margin: 5,		
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},

	valor_oferta: {
		margin: 5,		
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},

	

	carta_contenedor__boton: {
		margin: 20,	
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",		
	},

	carta_header: {
		height: 73,
   		display: "flex",
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
	const colorEstado = 0;
	const [cargando, setCargando] = useState(false)
	const [spacing, setSpacing] = React.useState(2);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
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
														<IconButton className={classes.color_titulo} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
															<MoreVertIcon color='inherit' />
														</IconButton>
													</div>
												}
			
												title={
													<div className={classes.titulo_oferta}>
														<Typography className={classes.color_titulo}  variant="h6">{oferta.titulo}</Typography>
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
												{/* <h5>Descripción</h5> */}
												<Typography variant="h6">Descripción</Typography>
													<Tooltip title="Estado de la oferta">
														<div>
														{(() =>{
																switch(oferta.estado){
																	case 'DISPONIBLE':
																		return <Typography  className={classes.title1}>{oferta.estado}</Typography>
																		break;
																	case 'EN PROCESO':
																		return <Typography  className={classes.title2}>{oferta.estado}</Typography>
																		break;
																	case 'FINALIZADA':
																		return <Typography  className={classes.title3}>{oferta.estado}</Typography>
																		break;
																	case 'CANCELADA':
																		return <Typography  className={classes.title4}>{oferta.estado}</Typography>
																		break;
																		default:
																			return console.log('default');
																			break;
																	}																
															})()}
														</div> 
					
													</Tooltip>
											</div>
											{/* <Typography component="p" variant="h6"></Typography> 
											<p>{oferta.descripcion}</p>*/}
											<div className={classes.descripcion_oferta}>
												<Typography variant="h7">
													{oferta.descripcion}
												</Typography>
											</div>
										</div>
										<div className={classes.carta_contenedor__boton}>
											<div className={classes.valor_oferta}>
													<Typography variant="h6">
														$ {oferta.valor}
													</Typography>
											</div>
										</div>
								</CardActionArea>
								<div className={classes.carta_contenedor__boton}>
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

