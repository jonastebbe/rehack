'use strict';

import React from 'react';
import {RouteHandler} from 'react-router';

import Header from './layout/Header.js';

const Public = React.createClass({
    render () {
        return (
          <div>
            <Header />
            <RouteHandler />
          </div>
        );
    }
});

export default Public;
