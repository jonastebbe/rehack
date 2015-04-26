'use strict';

import React from 'react';

import {RouteHandler} from 'react-router';

import Header from './layout/Header.js';

import {requireAuth} from '../../auth.js';

const Private = React.createClass({
	mixins: [ requireAuth],

    render () {
        return (
          <div>
			<div className="content">
				<Header />
				<RouteHandler />
			</div>
          </div>
        );
    }
});

export default Private;
