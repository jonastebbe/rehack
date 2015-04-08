'use strict';

import React from 'react';
import Router from 'react-router';
import Routes from './routes/routes';

// React dev tools
if (typeof window !== 'undefined') {
    window.react = React;
}

Router.run(Routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});

// or HTML5 pushstate history:
//Router.run(routes, Router.HistoryLocation, function (Handler) {
//    React.render(<Handler/>, document.getElementById('app'));
//});
