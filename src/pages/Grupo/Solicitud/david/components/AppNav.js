import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

function AppNav(props){

	const { classes } = props;

	return(
		<AppBar className={classes.NavColor} position="static">
			<Toolbar variant="dense">
				<Typography povariant="h6" component="p">ServiNow</Typography>
			</Toolbar>
		</AppBar>
	);
}

export default withStyles({
	NavColor:{
    backgroundColor: '#F9FF33'
  }
})(AppNav);