'use strict';

import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

import App from '../components/App.js';

//
// PRIVATE, ONLY ACCESSIBLE WHEN USER IS LOGED IN
//

import Private     from '../components/private/Private';
import Home        from '../components/private/Home';

//
// PUBLIC, ONLY ACCESSIBLE WHEN LOGED OUT
//

import Public     from '../components/public/Public';
import Landing    from '../components/public/Landing';
import {Login}    from '../components/public/auth/Login.js';
import {Logout}   from '../components/public/auth/Logout.js';
import {Register} from '../components/public/auth/Register.js';

const routes = (
    <Route name="app" handler={App}>
        <Route name="public" path="/" handler={Public}>
            <Route name="landing" path="/" handler={Landing}/>
            <Route name="login" path="/login" handler={Login}/>
            <Route name="register" handler={Register}/>
            <Route name="logout" path="/logout" handler={Logout}/>
        </Route>
        <Route name="private" path="/private" handler={Private}>
            <DefaultRoute handler={Home}/>
            <NotFoundRoute handler={Home}/>
            <Route name="home" handler={Home}/>
        </Route>
    </Route>
);

export default routes;
