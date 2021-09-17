import axios from "axios";
const URLAPI = 'http://54.234.20.23:8082/';



export const obtenerMisSolicitudes = (idUsuario) => {

    const url = `${URLAPI}ofertaService/getOfertasSolicitadas?id_usuario=${idUsuario}`;
    return axios.post(url, solicitud, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': "Basic "+btoa(localStorage.getItem('autenticacion'))
          }
      } );
}





