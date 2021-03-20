import axios from 'axios';
const URLAPI = 'http://52.7.252.110:8082/';

export const CrearSolicitudService = (solicitud) => {

    const url = `${URLAPI}ofertaService/crearOferta`;
    return axios.post(url, solicitud, {
        headers:{
            'Content-Type': 'application/json',
          }
      } );
}
export const ConsultarCategoriaService = () => {

    const url = `${URLAPI}categoriaService/getCategorias`;
    return axios.get(url)

}

export const ConsultarHabilidadesPorCategoriaService = (idCategoria) => {

    const url = `${URLAPI}habilidadService/getHabilidades?id_categoria=${idCategoria}`;
    return axios.get(url)

}