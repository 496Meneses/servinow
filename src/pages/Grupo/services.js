import axios from 'axios';
const URLAPI = 'http://54.234.20.23:8082/';

export const CrearSolicitudService = (solicitud) => {

    const url = `${URLAPI}ofertaService/crearOferta`;
    return axios.post(url, solicitud, {
        headers:{
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

//David
export const GetAllOferts = (getTodasOfertas) => {
    const url = `${URLAPI}ofertaService/getTodasOfertas`;//=${getTodasOfertas}
    return axios.get(url)

}

export const GetAllUsers = () =>{
    const url = `${URLAPI}usuarioService/getUsuarios`;
    return axios.get(url,{
        headers:{
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion'))
          
    }})
}

export const GetHabilidadUser = () =>{
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

export const EditarOfertaService = (oferta) => {
    const url = `${URLAPI}ofertaService/editarOferta`;
    return axios.put(url,oferta,{
        headers:{
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion'))
          
    }})
}


export const GetAllOfertsByRequestor = (idRequestor) => {

    const url = `${URLAPI}ofertaService/getOfertasSolicitadas?id_usuario=${idRequestor}`;//=
    //const url = `${URLAPI}ofertaService/getTodasOfertas`;//=${getTodasOfertas}
    return axios.get(url,{
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
export const deleteSolicitud = (idOferta) => {
    const url = `${URLAPI}ofertaService/deleteOfertaById/${idOferta}`;
    return axios.delete(url, {
        headers:{
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion'))
          
    }})

}

//Eliminar habilidad
export const deleteHabilidades = (idHabilidad) => {
    console.log("metodo delete "+ idHabilidad);
    const url = `${URLAPI}usuarioService/eliminarHabilidadDePrestador/1/${idHabilidad}`;
    return axios.delete(url, {
        headers:{
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion'))
          
    }})

}

export const postularseOferta = (request) => {


    const url = `${URLAPI}ofertaService/postularAOferta`;
    return axios.post(url, request, {
        headers:{
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion'))
          
    }})

}


export const retirarseOferta = (request) => {


    const url = `${URLAPI}ofertaService/revocarPostulacion`;
    return axios.post(url, request, {
        headers:{
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion'))
          
    }})

}

export const agregarHabilidadService = (request) => {
    const url = `${URLAPI}usuarioService/asignarHabilidad`;
    return axios.post(url, request, {
        headers:{
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion')) 
    }})
}
export const activarHabService = (request) =>{
    const url = `${URLAPI}usuarioService/activarHabilidadDePrestador`;
    return axios.post(url, request, {
        headers:{
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion')) 
    }})
}

export const crearUsuarioService = (request) => {
    const url = `${URLAPI}usuarioService/crearUsuario`;
    return axios.post(url, request)
}



export const desactivarHabService = (request) =>{
    const url = `${URLAPI}usuarioService/desactivarHabilidadDePrestador`;
    return axios.post(url, request, {
        headers:{
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion')) 
    }})
}


export const editarHabService = (request) =>{
    const url = `${URLAPI}usuarioService/cambiarHabilidad`;
    return axios.post(url, request, {
        headers:{
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion')) 
    }})
}


export const finalizarOfertaService = (request) =>{
    const url = `${URLAPI}ofertaService/terminarSolicitud`;
    return axios.post(url, request, {
        headers:{
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion')) 
    }})
}
  