import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography, Button, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import 'fontsource-roboto';


function OfertCard({ oferta,classes,to = "" }) {
	return(
		<Card className={classes.item}>
			<Link to={to}>
				<div className={classes.root}>
				<Typography align="center" color="textSecondary" component="p" variant="h5">{oferta.titulo}</Typography>
				</div>
			</Link>
			<CardMedia className={classes.media} image={oferta.imagen}/>
			<CardContent >
				{/* <Typography component="p" variant="h6">Cortar pasto</Typography> */}
                <Typography component="p" variant="h5">{oferta.descripcion}</Typography>
                <Typography component="p" variant="h5">{oferta.estado}</Typography>
			</CardContent>
				<div className="col-sm-12 col-xs-12" align="center">
					<Tooltip title="Ver detalle">
						<Button variant="contained" color="secondary">
								Postularme 
						</Button>
					</Tooltip>
						
						&nbsp;&nbsp;&nbsp;
						<Tooltip title="Estado de la oferta">
							<Button variant="contained" color="primary">
									Disponible 
							</Button>
						</Tooltip>
				</div>
				{/* <div>
                    <a href="">Postularme</a>
                </div>  */}
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