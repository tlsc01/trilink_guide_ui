import React from 'react';
// import ReactDOM from 'react-dom';
// import React, { Component } from 'react';

import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import './index.css';
import './App.css';
// import Router from './router';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import LandingPage from './landingPage';
import HomeDepot from './homeDepot';

const routes = [
  { path: '/',
    exact: true,
    component: LandingPage
  },
  { path: '/home-depot-fitup',
    exact: true,
    component: HomeDepot
  }
]

render((
  <BrowserRouter>
    {/* <Router /> */}
    {renderRoutes(routes)}
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
