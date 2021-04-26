import React, { useState, useEffect } from 'react'
import { Grid, Paper, Container, Link, Divider, Box, Avatar, Card, CardMedia, CardContent, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    container: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    icon: {
      marginRight: '20px',
    },
    buttons: {
      marginTop: '40px',
    },
    cardGrid: {
      padding: '20px 0',
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', //16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: '50px 0'
    }
}))

const CardPostulante = ({postulado, habilidades}) => {
    console.log("postu",postulado);
    console.log("habilidades",habilidades);
    const classes = useStyles();

    return (
        <>
          <div className={classes.container}>
            <Container className={classes.cardGrid} maxWidth="md">
              {//postulados.map((card) => (
              <Paper>
                <Grid container spacing={4} style={{width:'100%', margin: '0 auto'}}>
                  <Grid item xs={12} sm={3} md={3} >
                    <Box>
                      <Avatar
                        className={classes.large}
                        src=""
                        />
                    </Box>
                    <Link 
                      component="button"
                      variant="body2"
                      onClick={() => {
                        console.info("I'm a button.");
                      }}
                    >
                      Ver Perfil
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={9} md={9} >
                    <Typography variant="h5" align="left">
                      Lino Muñoz
                    </Typography>
                    <Typography variant="body1" align="center">
                      Habilidades
                    </Typography>
                    <Divider/>
                  </Grid>
                </Grid>
              </Paper>
              //))
            }
            </Container>
          </div>
        </>
    )
}

export default CardPostulante
