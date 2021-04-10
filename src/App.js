import React, { Component } from 'react';
import Routes from './routes/Routes';


import './assets/scss/theme.scss';
import {ProvideAuth} from './components/UserContext'
class App extends Component {
  render() {
    return <ProvideAuth><Routes></Routes></ProvideAuth>;
  }
}

export default App;
