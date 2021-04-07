import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';

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

// apps
// const CalendarApp = React.lazy(() => import('../pages/apps/Calendar'));
// const EmailInbox = React.lazy(() => import('../pages/apps/Email/Inbox'));
// const EmailDetail = React.lazy(() => import('../pages/apps/Email/Detail'));
// const EmailCompose = React.lazy(() => import('../pages/apps/Email/Compose'));
// const ProjectList = React.lazy(() => import('../pages/apps/Project/List'));
// const ProjectDetail = React.lazy(() => import('../pages/apps/Project/Detail/'));
// const TaskList = React.lazy(() => import('../pages/apps/Tasks/List'));
// const TaskBoard = React.lazy(() => import('../pages/apps/Tasks/Board'));

// // pages
// const Starter = React.lazy(() => import('../pages/other/Starter'));
// const Profile = React.lazy(() => import('../pages/other/Profile/'));
// const Activity = React.lazy(() => import('../pages/other/Activity'));
// const Invoice = React.lazy(() => import('../pages/other/Invoice'));
// const Pricing = React.lazy(() => import('../pages/other/Pricing'));
// const Error404 = React.lazy(() => import('../pages/other/Error404'));
// const Error500 = React.lazy(() => import('../pages/other/Error500'));

// // ui
// const BSComponents = React.lazy(() => import('../pages/uikit/BSComponents/'));
// const FeatherIcons = React.lazy(() => import('../pages/uikit/Icons/Feather'));
// const UniconsIcons = React.lazy(() => import('../pages/uikit/Icons/Unicons'));
// const Widgets = React.lazy(() => import('../pages/uikit/Widgets/'));

// // charts
// const Charts = React.lazy(() => import('../pages/charts/'));

// // forms
// const BasicForms = React.lazy(() => import('../pages/forms/Basic'));
// const FormAdvanced = React.lazy(() => import('../pages/forms/Advanced'));
// const FormValidation = React.lazy(() => import('../pages/forms/Validation'));
// const FormWizard = React.lazy(() => import('../pages/forms/Wizard'));
// const FileUpload = React.lazy(() => import('../pages/forms/FileUpload'));
// const Editor = React.lazy(() => import('../pages/forms/Editor'));

// // tables
// const BasicTables = React.lazy(() => import('../pages/tables/Basic'));
// const AdvancedTables = React.lazy(() => import('../pages/tables/Advanced'));


// handle auth and authorization
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            // if (!isUserAuthenticated()) {
            //     // not logged in so redirect to login page with the return url
            //     return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />;
            // }

            const loggedInUser = getLoggedInUser();
            // check if route is restricted by role
            // if (roles && roles.indexOf(loggedInUser.role) === -1) {
            //     // role not authorised so redirect to home page
            //     return <Redirect to={{ pathname: '/' }} />;
            // }
            // return <Redirect to={{ pathname: '/home' }} />;

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/home" />,
    route: PrivateRoute,
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
    route: PrivateRoute
};

const ofertas = {
    path: '/ofertas',
    name: 'Ofertas',
    icon: FeatherIcon.Home,
    component: listaOfertas,
    roles: ['Admin'],
    route: PrivateRoute
};

const postulados = {
    path: '/postulados',
    name: 'Postulados',
    icon: FeatherIcon.Coffee,
    component: listaPostulados,
    roles: ['Admin'],
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


// const authRoutes = {
//     path: '/account',
//     name: 'Auth',
//     children: [
//         {
//             path: '/account/login',
//             name: 'Login',
//             component: Login,
//             route: Route,
//         }
//     ],
// };

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
    //authRoutes
];
const authProtectedRoutes = [ofertas,crearSolicitud,postulados];
// const authProtectedRoutes = [dashboardRoutes, ...appRoutes, pagesRoutes, componentsRoutes, chartRoutes, formsRoutes, tableRoutes];
const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes};
