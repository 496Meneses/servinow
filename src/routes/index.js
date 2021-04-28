import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';
import {useAuth} from '../components/UserContext'
//librerias David
// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
// dashboard
const Dashboard = React.lazy(() => import('../pages/dashboard'));
const DetalleOfert = React.lazy(() => import('../pages/Grupo/Solicitud/DetalleOfertaTwo'));
const crearSolicitudComponent = React.lazy(() => import ('../pages/Grupo/Solicitud/CrearSolicitud'));
const listaOfertas = React.lazy(() => import ('../pages/Grupo/Solicitud/david/containers/OfertListContainer'));
const listaPostulados = React.lazy(() => import ('../pages/Grupo/Solicitud/ListarPostulantesSolicitud'));
const listarSolicitudesSolicitante = React.lazy(() => import ('../pages/Grupo/Solicitud/Solicitante'));
const verPerfilComponent = React.lazy(() => import ('../pages/Grupo/Usuarios/Perfil'));

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const auth = useAuth();
    return (
        <Route {...rest}
            component= {
                (props) => (
                    (auth.isAuthenticated)
                    ? (<Component {...props}/>)
                    : (<Redirect to="/account/login"/>)
                )
            }
        
        />
    );


}

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/home" />,
    route: PrivateRoute
};

// dashboards
const dashboardRoutes = {
    path: '/home',
    name: 'Home',
    icon: FeatherIcon.Home,
    component: Dashboard,
    roles: ['Admin'],
    route: PrivateRoute
};
//detalle oferta
const detalleOfert = {
    path: '/oferta/detalle/:id',
    name: 'detalle',
    icon: FeatherIcon.Home,
    component: DetalleOfert,
    roles: ['Admin'],
    route: Route
};

const ofertas = {
    path: '/ofertas',
    name: 'Ofertas',
    icon: FeatherIcon.Home,
    component: listaOfertas,
    roles: ['Admin'],
    route: Route
};

const postulados = {
    path: '/postulados',
    name: 'Postulados',
    icon: FeatherIcon.Coffee,
    component: listaPostulados,
    route: PrivateRoute
};
const listarSolicitudes = {
    path: '/solicitudes',
    name: 'Solicitudes',
    icon: FeatherIcon.Coffee,
    component: listarSolicitudesSolicitante,
    route: PrivateRoute
};
const misSolicitudes = {
    path: '/misSolicitudes',
    name: 'Mis solicitudes',
    icon: FeatherIcon.Send,
    component: listaPostulados,
    route: PrivateRoute 
};

const crearSolicitud = {
    path: '/solicitud',
    name: 'Crear Solicitud',
    icon: FeatherIcon.Mail,
    component: crearSolicitudComponent,
    roles: ['Admin'],
    route: PrivateRoute
};

const verPerfil = {
    path: '/perfil',
    name: 'Ver perfil',
    icon: FeatherIcon.User,
    component: verPerfilComponent,
    roles: ['Admin'],
    route: Route
};
const registrarse = {
    path: '/Registrarse',
    name: 'Registrarse',
    icon: FeatherIcon.User,
    component: Register,
    roles: ['Admin'],
    route: Route
};

const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: Login,
            route: Route,
        }
    ],
};

// flatten the list of all nested routes
const flattenRoutes = routes => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach(item => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const allRoutes = [
    rootRoute,
    dashboardRoutes,
    detalleOfert,
    ofertas,
    crearSolicitud,
    postulados,
    listarSolicitudes,
    verPerfil,
    authRoutes,
    misSolicitudes,
    registrarse
];
const authProtectedRoutes = [ofertas,crearSolicitud,postulados, listarSolicitudes];
//const authProtectedRoutes = [ofertas,crearSolicitud,misSolicitudes];
// const authProtectedRoutes = [dashboardRoutes, ...appRoutes, pagesRoutes, componentsRoutes, chartRoutes, formsRoutes, tableRoutes];
const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes};
