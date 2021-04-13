
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

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	cardMedia: {
		paddingTop: "56.25%", //16:9
		minHeight: "250px",
		margin: "1.2em",
		borderRadius: 10,
		backgroundColor: '#ccc',		
	  },
	  
	orange: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
	},
	purple: {
		color: theme.palette.getContrastText(deepPurple[500]),
		backgroundColor: deepPurple[500],
	},
	container: {

		display: 'flex',
		flexWrap: 'wrap',

	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},

	control: {
		padding: theme.spacing(2),
	},

	title: {
		color: 'black',
	},

	carta: {
		height: 550,
		width: 400,
		contain: 'content',
		/* backgroundColor: 'orange', */
		//minWidth: "750px",
		textAlign: "left",
		margin: "1em",
		padding: '0.5em',
	},

	carta_contenedor: {
		height: 120,
		width: 350,
		margin: 20,
		bottom: 10,	
	},

	carta_contenedor__boton: {
		height: 100,
		width: 300,
		margin: 15,			
	},

	boton_eliminar: {
		textAlign: "right"
	},

	carta_header: {
		height: 65,
   		display: "flex",
		width: "100%",
	},

	carta__descripcion: {
		height: "100%",
    	display: "flex",
	},

	cardContent: {
	flexGrow: 1,
	},
	
	card: {
    height: "90%",
    display: "flex",
    flexDirection: "column",
  }, 
}));

function OfertCard({ oferta, classes, to = "" }) {
	/* const [listaUsuarios, setListaUsuarios] = useState([]) */
	const sw = useStyles();
	const [spacing, setSpacing] = React.useState(2);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

/* 	useEffect(() => {

		GetAllUsers(1).then((respuesta)=>{
			setListaUsuarios(respuesta.data)
			  console.log(respuesta)
		
		})
	  }, [])
 */
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<Card className={sw.card}>
		
				<div className={classes.cardContent}>
						<CardHeader
							avatar={
								<div>
									<Avatar aria-label="recipe" src={oferta.solicitante.url_imagen}></Avatar>
								</div>
							}
							action={
								<div>
									<IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
										<MoreVertIcon color='inherit' />
									</IconButton>
								</div>
							}

							title={
								<h5>
									{oferta.titulo}
								</h5>
							}

							className={sw.carta_header}
						/>

				</div>

			<div >
			<CardActionArea>
			<CardMedia 
			className={sw.cardMedia} 
			image={oferta.imagen} />
			<div className={sw.carta_contenedor}>
			  <Tooltip title="Estado de la oferta">
					<Button color="primary" style={{ top: '30%', right: -245}}>
						<Typography>{oferta.estado}</Typography>
					</Button>
				</Tooltip> 
				{/* <Typography component="p" variant="h6"></Typography> */}
				<h5>Descripción</h5>
				<p>{oferta.descripcion}</p>
			</div>
			
			</CardActionArea>
			<div className={sw.carta_contenedor__boton}>
			 <Button className="carta_boton" variant="contained" color="primary" href={`/oferta/detalle/${oferta.id_oferta}`}> {/* onClick={() => {alert('pulsado')}} */}
							 Ver detalle
				</Button>
				{/* <Tooltip title="Estado de la oferta">
					<Button color="primary">
						<Typography>{oferta.estado}</Typography>
					</Button>
				</Tooltip> */}  
								
			</div>
			</div>
		</Card>

	);
}

export default withStyles({
	item: {
		height: 550,
		width: 600,
		contain: 'content',
		/* backgroundColor: 'orange', */
		//minWidth: "750px",
		textAlign: "left",
		margin: "2em",
		padding: '0.5em',


	},
	media: {
		minHeight: "270px",
		margin: "1em",
	},
})(OfertCard);
