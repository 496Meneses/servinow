import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


function OfertCard({ oferta,classes,to = "" }) {
	return(
		<Card className={classes.item}>
			<Link to={to}>
				<Typography component="p" variant="h6">{oferta.titulo}</Typography>
			</Link>
			<CardMedia className={classes.media} image={oferta.imagen}/>
			<CardContent>
				{/* <Typography component="p" variant="h6">Cortar pasto</Typography> */}
                <Typography component="p" variant="h5">{oferta.descripcion}</Typography>
                <Typography component="p" variant="h5">{oferta.estado}</Typography>
			</CardContent>
				<div>
                    <a href="">Postularme</a>
                </div> 
		</Card>
	);
}

export default withStyles({
	item:{
		minWidth: "350px",
		textAlign: "left",
		margin: "2em",
		padding: '1em'
	},
	media:{
		minHeight: "350px"
	}
})(OfertCard);