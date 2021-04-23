import axios from 'axios';
const URLAPI = 'http://52.7.252.110:8082/';

export const CrearSolicitudService = (solicitud) => {

    const url = `${URLAPI}ofertaService/crearOferta`;
    return axios.post(url, solicitud, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}
export const ConsultarCategoriaService = () => {

    const url = `${URLAPI}categoriaService/getCategorias`;
    return axios.get(url)

}

export const ConsultarHabilidadesPorCategoriaService = (idCategoria) => {

    const url = `${URLAPI}habilidadService/getHabilidades?id_categoria=${idCategoria}`;
    return axios.get(url)

}

export const ConsultarPostuladosPorOfertaService = (idOferta) => {
    const url = `${URLAPI}ofertaService/getDetalleOferta?id_oferta=${idOferta}`;
    return axios.get(url)

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


export const postularseOferta = (idOferta) => {

    const username = 'albert_vega55@outlook.com'
    const password = 'pass'

    const url = `${URLAPI}ofertaService/deleteOfertaById/${idOferta}`;
    return axios.delete(url, {
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
    return axios.get(url)
}

export const GetHabilidadUser = () => {
    const url = `${URLAPI}usuarioService/getHabilidades?id_prestador=1`;
    return axios.get(url)
}




export const LoginService = (usuario) => {

    const url = `${URLAPI}loginService/login`;
    return axios.post(url, usuario, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}