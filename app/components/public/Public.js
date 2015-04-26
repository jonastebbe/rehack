'use strict';

import React from 'react';
import {RouteHandler} from 'react-router';

const Public = React.createClass({
    render () {
        return (
          <div>
            <RouteHandler />
          </div>
        );
    }
});

export default Public;
