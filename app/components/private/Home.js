'use strict';

import React from 'react';
import Reflux from 'reflux';

import {Button, Input, Grid, Row, Col} from 'react-bootstrap';

const Home = React.createClass({
        render() {
            return (
                <Grid>
                    <Row>
                        <Col sm={6}>
                            <h1>Hi there!</h1>
                            <Row>
                                <Col sm={6}>
                                </Col>
                                <Col sm={6}>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={6}>
                        </Col>
                    </Row>
                </Grid>
        );
    }
});

export default Home;
