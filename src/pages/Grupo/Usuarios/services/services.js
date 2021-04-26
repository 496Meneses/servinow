import axios from 'axios';
const URLAPI = 'http://52.7.252.110:8082/';
const username = 'albert_vega55@outlook.com'
const password = 'pass'

export const getCategories = () => {


    const url = `${URLAPI}categoriaService/getCategorias`;
    return axios.get(url, {
        headers: {
            'Authorization': 'Basic ' + btoa(username + ":" + password)
        },
    })

}
