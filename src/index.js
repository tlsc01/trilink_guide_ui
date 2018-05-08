import React from 'react';
// import ReactDOM from 'react-dom';
// import React, { Component } from 'react';

import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './App.css';
import Router from './router';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

render((
  <BrowserRouter>
    <Router />
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
