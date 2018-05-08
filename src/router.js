import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './landingPage';
import HomeDepot from './homeDepot';

const Router = () => (
  <main>
    <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Route path='/home-depot-fitup' component={HomeDepot}/>
    </Switch>
  </main>
)

export default Router