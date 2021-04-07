import React from 'react';
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
import "../../../../../assets/css/style.css"


const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
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

}));


function OfertCard({ oferta, classes, to = "" }) {
	const sw = useStyles();
	const [spacing, setSpacing] = React.useState(2);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<Card className='carta' >
			<Link to={to}>
				<div>
						<CardHeader
							avatar={
								<Avatar aria-label="recipe" className={sw.purple}>
								</Avatar>
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
							className="carta_header"
						/>

				</div>
			</Link>

			<CardMedia className="carta__imagen" image={oferta.imagen} />
			<div className="carta_contenedor">
				<Typography component="p" variant="h6"></Typography>
				<h5><strong>Descripción</strong></h5>
				<p className="carta__descripcion">{oferta.descripcion}</p>

			</div>
			<div className="carta_contenedor__boton">
				<Button className="carta_boton" variant="contained" color="primary" href={`/oferta/detalle/${oferta.id_oferta}`}> {/* onClick={() => {alert('pulsado')}} */}
							 Ver detalle
				</Button>
				<Tooltip title="Estado de la oferta">
					<Button color="primary">
						<Typography>{oferta.estado}</Typography>
					</Button>
				</Tooltip>
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