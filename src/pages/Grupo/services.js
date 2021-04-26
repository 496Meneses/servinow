import axios from 'axios';
const URLAPI = 'http://52.7.252.110:8082/';

export const CrearSolicitudService = (solicitud) => {

    const url = `${URLAPI}ofertaService/crearOferta`;
    return axios.post(url, solicitud, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion'))
          }
      } );
}
export const ConsultarCategoriaService = () => {

    const url = `${URLAPI}categoriaService/getCategorias`;
    return axios.get(url,{
        headers:{
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion'))
          
    }})

}

export const ConsultarHabilidadesPorCategoriaService = (idCategoria) => {

    
    const url = `${URLAPI}habilidadService/getHabilidades?id_categoria=${idCategoria}`;
    return axios.get(url, {
        headers:{
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion'))
          }})

}

export const ConsultarPostuladosPorOfertaService = (idOferta) => {
    const url = `${URLAPI}ofertaService/getDetalleOferta?id_oferta=${idOferta}`;
    return axios.get(url,{
        headers:{
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion'))
          
    }})

}

export const GetOfertasDisponibles = (idPrestador) => {
    const url = `${URLAPI}ofertaService/getOfertasALasQueCalifico?id_prestador=${idPrestador}`;
    return axios.get(url)

}


export const deleteSolicitud = (idOferta) => {

    const username = 'albert_vega55@outlook.com'
    const password = 'pass'

    const url = `${URLAPI}ofertaService/deleteOfertaById/${idOferta}`;
    return axios.delete(url, {
        headers: {
            'Authorization': 'Basic ' + btoa(username + ":" + password)

        },
    })

}


export const postularseOferta = (request) => {

    const username = 'albert_vega55@outlook.com'
    const password = 'pass'

    const url = `${URLAPI}ofertaService/postularAOferta`;
    return axios.post(url, request, {
        headers: {
            'Authorization': 'Basic ' + btoa(username + ":" + password)
        },
    })

}


export const retirarseOferta = (request) => {

    const username = 'albert_vega55@outlook.com'
    const password = 'pass'

    const url = `${URLAPI}ofertaService/revocarPostulacion`;
    return axios.post(url, request, {
        headers: {
            'Authorization': 'Basic ' + btoa(username + ":" + password)
        },
    })

}


//David
export const GetAllOferts = (getTodasOfertas) => {
    const url = `${URLAPI}ofertaService/getTodasOfertas`;//=${getTodasOfertas}
    return axios.get(url)

}


export const GetAllOfertsByRequestor = (idRequestor) => {

    const url = `${URLAPI}ofertaService/getOfertasSolicitadas?id_usuario=${idRequestor}`;//=
    //const url = `${URLAPI}ofertaService/getTodasOfertas`;//=${getTodasOfertas}
    return axios.get(url)

}

export const GetAllUsers = () => {
    const url = `${URLAPI}usuarioService/getUsuarios`;
    return axios.get(url,{
        headers:{
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion'))
          
    }})
}

export const GetHabilidadUser = () => {
    const url = `${URLAPI}usuarioService/getHabilidades?id_prestador=1`;
    return axios.get(url,{
        headers:{
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion'))
          
    }})
}

export const LoginService = (usuario) => {

    const url = `${URLAPI}loginService/login`;
    return axios.post(url,{}, {
        headers:{

            'Authorization': "Basic "+btoa(usuario)
          }
      } );
}

export const EditarUsuarioService = (usuario) => {
    const url = `${URLAPI}usuarioService/actualizarUsuario`;
    return axios.put(url,usuario,{
        headers:{
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion'))
          
    }})
}

export const ObtenerDetalleUsuario = (idUsuario) =>{
    const url = `${URLAPI}usuarioService/getUsuarioDetalle/${idUsuario}`;
    return axios.get(url,{
        headers:{
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion'))
          
    }})
}