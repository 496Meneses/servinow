import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import { Menu, X, Search, Settings, User, HelpCircle, Lock, LogOut } from 'react-feather';

import { showRightSidebar } from '../redux/actions';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';

import logo from '../assets/images/logoServinow.svg';
import profilePic from '../assets/images/users/avatar-3.jpg';
import profileInvitado from '../assets/images/perfi.png';
import {useAuth} from "./UserContext"



const Notifications = [{
  id: 1,
  text: 'New user registered',
  subText: '1 min ago',
  icon: 'uil uil-user-plus',
  bgColor: 'primary'
},
{
  id: 2,
  text: 'Karen Robinson',
  subText: 'Wow ! this admin looks good and awesome design',
  icon: 'uil uil-comment-message',
  bgColor: 'success'
},
{
  id: 3,
  text: 'Cristina Pride',
  subText: 'Hi, How are you? What about our next meeting',
  icon: 'uil uil-comment-message',
  bgColor: 'danger'
}, {
  id: 4,
  text: 'New user registered',
  subText: '1 day ago',
  icon: 'uil uil-user-plus',
  bgColor: 'info'
},];

const ProfileMenus = [{
  label: 'Iniciar Sesión',
  icon: User,
  redirectTo: "/account/login",
},
{
  label: 'Registrarse',
  icon: Settings,
  redirectTo: "/ofertas"
},
]
const ProfileMenusUsuario = [{
  label: 'Mi perfil',
  icon: User,
  redirectTo: "/perfil",
},
{
  label: 'Editar Perfil',
  icon: Settings,
  redirectTo: "/perfil/editar"
},
{
  label: 'Cerrar Sesión',
  icon: Settings,
  redirectTo: "/ofertas"
},
]


const Topbar =(props) => {
  const handleRightSideBar = () => {
    props.showRightSidebar();
  }
  const auth = useAuth();
    return (
      <React.Fragment>
        <div className="navbar navbar-expand flex-column flex-md-row navbar-custom">
          <Container fluid>
            { /* logo */}
            <Link to="/" className="navbar-brand mr-0 mr-md-2 logo">
              <span className="logo-lg">
                <img src={logo} alt="" height="75" />
                <span className="d-inline h5 ml-2 text-logo">SERVINOW</span>
              </span>
              <span className="logo-sm">
                <img src={logo} alt="" height="64" />
              </span>
            </Link>

            { /* menu*/}
            <ul className="navbar-nav bd-navbar-nav flex-row list-unstyled menu-left mb-0">
              <li className="">
                <button className="button-menu-mobile open-left disable-btn" onClick={props.openLeftMenuCallBack}>
                  <Menu className="menu-icon" />
                  <X className="close-icon" />
                </button>
              </li>
            </ul>
            
            <ul className="navbar-nav flex-row ml-auto d-flex list-unstyled topnav-menu float-right mb-0">

              {
                (!auth.isAuthenticated) ? (<>
                  <ProfileDropdown profilePic={profileInvitado} menuItems={ProfileMenus} username={"Invitado"} description="Usuario" /></>
                ) : (
                  <>
                  <NotificationDropdown notifications={Notifications} />
                  <ProfileDropdown profilePic={profilePic} menuItems={ProfileMenusUsuario} username={auth.user} description="Usuario" /></>
                )
              }
              
            </ul>

          </Container>
        </div>
      </React.Fragment >
    );
}

export default connect(
  null,
  { showRightSidebar }
)(Topbar);
