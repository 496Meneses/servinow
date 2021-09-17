import { Avatar, Box, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { Link } from '@material-ui/icons'
import React from 'react'
import { Button } from 'reactstrap'





const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: "20px 5%",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      marginTop: "10px",
    },
    cardGrid: {
      padding: "20px 0"
    },
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12)
    },
    div: {
      marginTop: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    box: {
      marginTop: 10,
      marginLeft: 2,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end"
    }
  }));

  const solicitudes = [
    {
        "id_oferta": 1,
        "numeroDePostulados": 1,
        "habilidad": {
            "id_habilidad": 1,
            "nombreHabilidad": "Manicure y Pedicure",
            "nombreCategoria": "Estetica y Belleza"
        },
        "prestador": null,
        "solicitante": {
            "id_usuario": 1,
            "nombres": "Luis Alberto",
            "apellidos": "Chilito Vega",
            "genero": "M",
            "activoComoPrestador": false,
            "url_imagen": ''
        },
        "titulo": "Se solicita manicurista",
        "imagen": "https://uñasdecoradas.co/wp-content/uploads/2015/07/u%C3%B1as-negras-decoradas-con-negro-3.jpg",
        "fecha_fin": 1616019030000,
        "fecha_inicio": 1616015430000,
        "estado": "DISPONIBLE",
        "descripcion": "Necesito un(a) manicurista",
        "postulados": [
            {
                "usuarioYHabilidades": {
                    "prestador": {
                        "id_usuario": 2,
                        "nombres": "Nombre2",
                        "apellidos": "",
                        "genero": "M",
                        "activoComoPrestador": false,
                        "url_imagen": 'url'
                    },
                    "habilidades": [
                        {
                            "id_habilidad": 2,
                            "nombreHabilidad": "corte de pelo",
                            "nombreCategoria": "Belleza"
                        }
                    ]
                }
            }
        ],
    },





]



export const ListarPostulantes = () => {
    
    
    
    
    
    
    const classes = useStyles();
    
    
    return (

        <>
        <h1>holis</h1>
       

        {solicitudes.map( solicitud  => {
            return (
                console.log('solicitud',solicitud.postulados)
            )

        })}
        </>
    //     solicitud.postulados.map ( (postulado) => {


            
    //     return (
            
    //         <Paper className={classes.paper} key={solicitud.id_oferta + postulado.usuarioYHabilidades.prestador.id_prestador}>
    //         <Grid container spacing={4} style={{width:'100%', margin: '0 auto'}}>
              
    //           <Grid item xs={12} sm={3} md={3} >
    //             <Box className={classes.div}>
    //               <Avatar
    //                 className={classes.large}
    //                 src={postulado.usuarioYHabilidades.prestador.url_imagen}
    //                 />
    //             </Box>
    //             <Link
    //               component="button"
    //               variant="body2"
    //               onClick={() => {
    //                 console.info("var perfil.");
    //               }}
    //             >
    //               Ver Perfil
    //             </Link>
    //           </Grid>
    //           <Grid item xs={12} sm={9} md={9} >
    //             <Typography variant="h5" align="left" color="primary">
    //               {postulado.usuarioYHabilidades.prestador.nombres} {postulado.usuarioYHabilidades.prestador.apellidos} 
    //             </Typography>
    //             <Divider/>
    //             <Typography variant="h6" align="left">
    //               Habilidades:
    //             </Typography>
    //             {//postulado.usuarioYHabilidades.habilidades.map((habilidad, index)=>(
    //              // (habilidad!=null) ? (
    //              //   <List aria-label="secondary mailbox folders" key={parseInt(postulado.usuarioYHabilidades.prestador.id_usuario) + parseInt(solicitud.id_oferta)}>
    //              //   <ListItem style={{margin: "-20px 0"}}>
    //              //     <ListItemText primary={habilidad.nombreHabilidad} />
    //              //   </ListItem>
    //              // </List>
    //              // ): (
    //              //   <p>No tiene habilidades registradas</p>
    //              // )
    
    // /*               <Typography key={index} variant="p" align="center">
    //                 {habilidad.nombreCategoria}
    //               </Typography> */
    //             //))
    //           }
    //             <Divider/>
    //             <Box className={classes.box}>
    //               <Button
    //                 variant="contained"
    //                 color="primary"
    //                 style={{ marginRight: "10px" }}
    //                 // onClick = { (e) => AceptarSolicitud(e,
    //                 // {    "id_oferta": solicitud.id_oferta,
    //                 // "id_solicitante": solicitud.solicitante.id_usuario,
    //                 // "id_prestador":   postulado.usuarioYHabilidades.prestador.id_usuario})}
                    
    //               >
    //                 Aceptar
    //               </Button>
    //               <Button variant="contained" color="secondary"
    //                 // onClick = { (e) => RechazarSolicitud(e,
    //                 //   {    "id_oferta": solicitud.id_oferta,
    //                 //   "id_solicitante": solicitud.solicitante.id_usuario,
    //                 //   "id_prestador":   postulado.usuarioYHabilidades.prestador.id_usuario})}
                  
    //               >
    //                 Rechazar
    //               </Button>
    //             </Box>
    //           </Grid>
    //         </Grid> 
    //       </Paper>
    //         )


    //     } )
    )








}


export default ListarPostulantes;