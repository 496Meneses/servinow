import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import {
  Typography,
  Button,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container
} from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
   container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  icon: {
    marginRight: "20px"
  },
  button: {
    marginTop: theme.spacing(8)
  },
  cardGrid: {
    padding: "20px 0"
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" //16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: "50px 0"
  }
})) 
export default function OfertCardtow({oferta}) {
const classes = useStyles();
    return (
        <div>
           
        <Card className={classes.card}>
          
          <CardMedia
            className={classes.cardMedia}
            image={oferta.imagen}
            title="Image Title"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5">
                {oferta.titulo}
            </Typography>
            <Typography>
              This is a media card. You can use this section to describe the
              content
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              View
            </Button>
            <Button size="small" color="primary">
              Edit
            </Button>
          </CardActions>
        </Card>
      
        </div>
    )
}
