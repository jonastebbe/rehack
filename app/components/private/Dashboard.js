'use strict';

/* global ft */

import React from 'react';
import Reflux from 'reflux';

import {Button, Input, Grid, Row, Col} from 'react-bootstrap';

import from '../../../assets/stylesheets/Dashboard.scss';


var SpendingChart = React.createClass({
    componentDidMount() {

        var spending = new ft.charts.spending({}).init({root: '#spending-chart'});

        var createData = function(i) {

            var negative = i === 1 ? -1 : 1;

            return {values: _.range(20).map(function(d) { return {
                key: d,
                value: negative * _.random(5, 20)
            }; }), 
            options: {
                name: 'Besucher ' + i,
                color: ['#1abc9c', '#e67e22', '#f1c40f', '#95a5a6', '#e74c3c'][i]
            }};
        };

        var update = function() {

            spending.data(_.range(2).map(createData)).update();
            setTimeout(function(){
                update();
            }, 5000);
        };

        update();

    },
    render () {
        return (
            <svg height={400} id="spending-chart" className="dashboard__spending-chart__svg">
            </svg>
        );
    }

});

const Dashboard = React.createClass({
        render() {
            return (
                <div>
                    <div className="dashboard__spending-chart">
                        <SpendingChart />
                    </div>
                    <Grid>
                        <Row>
                            
                        </Row>
                    </Grid>
                </div>
        );
    }
});

export default Dashboard;
    