import React, { Fragment } from "react";
import { Button } from "@material-ui/core";

const Pagination = ({ increment, decrement, page }) => {

	
	return(
		<Fragment>
			{/* <h1>Ofertas Disponibles</h1> */}
			<br></br>
			<Button variant="outlined" color="primary" onClick={decrement} >Anterior</Button>
			<Button variant="contained" color="primary">
				{page}
			</Button>
			<Button variant="outlined" color="primary" onClick={increment} >Siguiente</Button>
		</Fragment>
	);
}

export default Pagination;