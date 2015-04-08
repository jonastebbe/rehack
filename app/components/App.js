'use strict';

import React from 'react';
import {RouteHandler} from 'react-router';
import {Grid, Row, Col, Nav} from 'react-bootstrap';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';

import from './../../assets/stylesheets/App.scss';

const App = React.createClass({
    render () {
        return (
          <div>
            <Header />
            <RouteHandler />
            <Footer />
          </div>
        );
    }
});

export default App;
