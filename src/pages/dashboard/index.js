import React, { Component } from 'react';
import { Row, Col, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { getLoggedInUser } from '../../helpers/authUtils';

import CrearSolicitud from '../Grupo/Solicitud/CrearSolicitud';
import ListarOfertas from '../Grupo/Solicitud/ListarOfertas';
import ListarSolicitudes from '../Grupo/Solicitud/ListarSolicitudes';

import OfertListContainer from '../Grupo/Solicitud/david/containers/OfertListContainer';


import ListarPostulantesSolicitud from '../Grupo/Solicitud/ListarPostulantesSolicitud'
import DetalleOfertaTwo from '../Grupo/Solicitud/DetalleOfertaTwo'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


class Dashboard extends Component {

    constructor(props) {
        super(props);

        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

        this.state = {
            user: getLoggedInUser(),
            filterDate: [oneWeekAgo, new Date()]
        };
    }

    render() {

        return (
            <React.Fragment>
                <ToastContainer/>
            </React.Fragment>
        )
    }
}


export default Dashboard;
