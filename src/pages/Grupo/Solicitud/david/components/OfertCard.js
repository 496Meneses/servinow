import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


function OfertCard({ name, classes, image, to='' }) {
	return(
		<Card className={classes.item}>
			<Link to={to}>
				<Typography component="p" variant="h6">{name}</Typography>
			</Link>
			<CardMedia className={classes.media} image={image}/>
			<CardContent>
				{/* <Typography component="p" variant="h6">Cortar pasto</Typography> */}
                <Typography component="p" variant="h5">Propina $ 20.000</Typography>
                <Typography component="p" variant="h5">Lugar: Villa Mercedes</Typography>
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