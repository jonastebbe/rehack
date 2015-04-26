'use strict';

import React from 'react';

import {Button, Input, Grid, Row, Col} from 'react-bootstrap';
import {ButtonLink} from 'react-router-bootstrap';

const Landing = React.createClass({
        render() {
            return (
                <Grid>
                    <Row>
                        <h1>Landing</h1>
                        <Col xs={6}>
                            <ButtonLink to="register" bsStyle="primary">Sign up</ButtonLink>
                        </Col>
                        <Col xs={6}>
                            <ButtonLink to="login" bsStyle="default">Sign in</ButtonLink>
                        </Col>
                    </Row>
                </Grid>
        );
    }
});

export default Landing;
