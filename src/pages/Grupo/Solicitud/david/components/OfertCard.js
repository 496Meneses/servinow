import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography, Button, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
//import 'fontsource-roboto';
import {makeStyles} from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from '@material-ui/core/CardHeader';
import { deepOrange, deepPurple } from '@material-ui/core/colors';



const useStyles = makeStyles((theme) => ({
	root: {
	  display: 'flex',
	  '& > *': {
		margin: theme.spacing(1),
	  },
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

	  title: {
		color: 'black',
	  },
	
  }));

 
function OfertCard({ oferta,classes,to = ""}) {
	 const sw = useStyles();
	 const [anchorEl, setAnchorEl] = React.useState(null); 
	 const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	  };
	
	  const handleClose = () => {
		setAnchorEl(null);
	  }; 
	return(
		<div className={classes.container}>
			<Card className={classes.item} >{/* style={{ backgroundImage: `url(${fondo})` }} */}
			<Link to={to}>
				<div className={classes.root}>
				<div>
					{/* <div align="center">
						<img src={logo}/>
					</div> */}		
				<CardHeader 
					avatar={
					<Avatar aria-label="recipe" className={sw.purple}>  {/* img src={avatar1} */}
						 {/* {oferta.nombre} */}
						 D
					</Avatar>
					}
				 	action={
					<div>
					<IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
						<MoreVertIcon color='inherit'/>
					</IconButton>
					</div>
					} 
					
					title={
						<Typography  className={sw.title} component="p" variant="h5">
							{oferta.titulo}
						
						</Typography>
						
					}
					/* subheader={oferta.descripcion} */
				/>			
				</div>
				{/* <Typography align="center" color="textSecondary" component="p" variant="h5">{oferta.titulo}</Typography> */}
				</div>
			</Link>
			<CardMedia className={classes.media} image={oferta.imagen} />
			<CardContent >
				{/* <Typography component="p" variant="h6">Cortar pasto</Typography> */}
				<Typography component="p" variant="h6">DESCRIPCIÓN:</Typography>
                <Typography component="p" variant="h6">{oferta.descripcion}</Typography>
                {/* <Typography component="p" variant="h6">{oferta.estado}</Typography> */}
				
			</CardContent>
				<div className="col-sm-12 col-xs-12">
				{/* <form className={classes.container} noValidate>
								<TextField
									id="date"
									label="Birthday"
									type="date"
									defaultValue="2017-05-24"
									className={classes.textField}
									InputLabelProps={{
									shrink: true,
									}}
								/>
								</form>
								<br></br> */}
					{/* <Tooltip title="Ver a detalle la oferta"> */}
						
						<Button  variant="contained" color="secondary" href={`/oferta/detalle/${oferta.id_oferta}`}> {/* onClick={() => {alert('pulsado')}} */}
							 Ver detalle 
						</Button>
						{/* <Link  to={`/oferta/detalle/${oferta.id}`}>Ver Detalle</Link> */}
					{/* </Tooltip> */}
						
						&nbsp;&nbsp;&nbsp;
						<Tooltip title="Estado de la oferta">

							<Button color="primary">
									<Typography>{oferta.estado}</Typography>
							</Button>
						</Tooltip>					
				</div>
		</Card>
		</div>
		
	);
}

export default withStyles({
	item:{
		/* backgroundColor: 'orange', */
		minWidth: "450px",
		textAlign: "left",
		margin: "2em",
		padding: '0.5em',
		flex: 'auto'
	},
	media:{
		minHeight: "170px",
		margin: "1em",
	},
})(OfertCard);