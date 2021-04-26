import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';

import { isUserAuthenticated } from '../helpers/authUtils';
import * as layoutConstants from '../constants/layout';
import { allFlattenRoutes as routes } from './index';

import {useAuth} from "../components/UserContext"

const loading = () => <div></div>;

// All layouts/containers
const AuthLayout = Loadable({
    loader: () => import('../layouts/Auth'),
    render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props} />;
    },
    loading,
});

const VerticalLayout = Loadable({
    loader: () => import('../layouts/Vertical'),
    render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props} />;
    },
    loading,
});

const HorizontalLayout = Loadable({
    loader: () => import('../layouts/Horizontal'),
    render(loaded, props) {
        let Component = loaded.default;
        return <Component {...props} />;
    },
    loading,
});

const Routes = (props) => {
    
    const auth = useAuth();
    const getLayout = () => {
            if(localStorage.getItem('usuario')) return HorizontalLayout
            let layoutCls = HorizontalLayout;
            return layoutCls
            


    }
    const Layout = getLayout();
            return <BrowserRouter>
                <Layout {...props}>
                    <Switch>
                        {routes.map((route, index) => {
                            return (
                                !route.children ?
                                    <route.route
                                        key={index}
                                        path={route.path}
                                        roles={route.roles}
                                        exact={route.exact}
                                        component={route.component}></route.route>
                                    : null
                            );
                        })}
                    </Switch>
                </Layout>
                
            </BrowserRouter>
}
const mapStateToProps = state => {
    return {
        layout: state.Layout,
        user: state.Auth.user,
    };
};
export default connect(
    mapStateToProps,
    null
)(Routes);
