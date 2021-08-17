import axios from 'axios';
const URLAPI = 'http://54.234.20.23:8082/';
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
