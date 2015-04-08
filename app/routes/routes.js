'use strict';

import React from 'react';
import {Route, DefaultRoute} from 'react-router';

import App from './../components/App';
import Home from './../components/Home';
import About from './../components/About';

const routes = (
    <Route name="app" handler={App}>
        <Route name="home" path="/" handler={Home}/>
        <Route name="about" path="/about" handler={About}/>
    </Route>
);

export default routes;
