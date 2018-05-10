import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './landingPage';
import HomeDepot from './homeDepot';

const routes = [
  { 
    routes: [
      { path: '/',
        exact: true,
        component: LandingPage
      },
      { path: '/home-depot-fitup',
        component: HomeDepot
      }
    ]
  }
]

const Router = () => (
  // <main>
  //   <Switch>
  //     <Route exact path='/' component={LandingPage}/>
  //     <Route exact path='/home-depot-fitup' component={HomeDepot}/>
  //   </Switch>
  // </main>
  <Route
    location=
  />
)

export default Router