'use strict';

import React from 'react';

import {Button, Input, Grid, Row, Col} from 'react-bootstrap';
import {ButtonLink} from 'react-router-bootstrap';

import Header from './layout/Header.js';

import from '../../../assets/stylesheets/App.scss';

import Logo from '../assets/logo.js';

const Landing = React.createClass({
        render() {
            return (
                <div className="hero-section">
                    <Header />
                    <Grid className="hero-section__content">
                        <Row>
                            <Col xs={12} className="text-center">
                                <Logo scale={1}/>
                                <h1>Prosper</h1>
                                <p className="lead">
                                    We make savings automated and unnoticable so you can invest more.
                                </p>
                            </Col>
                            <Col xs={6} smOffset={4} sm={2} className="text-right">
                                <ButtonLink to="register" bsStyle="primary" block>Sign up</ButtonLink>
                            </Col>
                            <Col xs={6} sm={2}>
                                <ButtonLink to="login" bsStyle="default" block>Sign in</ButtonLink>
                            </Col>
                        </Row>
                    </Grid>
                    <Grid className="tutorial-section">
                        <Row>
                            <Col></Col>
                        </Row>
                    </Grid>
                </div>
        );
    }
});

export default Landing;
