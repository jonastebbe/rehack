'use strict';

import React from 'react';
import {RouteHandler} from 'react-router';
import {Grid, Row, Col, Nav} from 'react-bootstrap';

import from './../../assets/stylesheets/App.scss';

const App = React.createClass({
    render () {
        return (
          <div>
            <RouteHandler />
          </div>
        );
    }
});

export default App;
