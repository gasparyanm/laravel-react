import React from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";

import Home from './Home';
import Login from '../views/Login';
import Register from '../views/Register';
import NotFound from '../views/NotFound'
// User is LoggedIn
import PrivateRoute from './PrivateRoute'
import Dashboard from '../views/user/Dashboard/Dashboard';

const Main = props => (
    <Switch>
        {/*User might LogIn*/}
        <Route exact path='/' component={Home}/>
        {/*User will LogIn*/}
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        {/* User is LoggedIn*/}
        <PrivateRoute path='/dashboard' component={Dashboard}/>
        {/*Page Not Found*/}
        <Route component={NotFound}/>
    </Switch>
);

export default Main;
