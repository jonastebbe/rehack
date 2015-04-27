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
                <div>
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
                                <Col xs={6} smOffset={3} sm={3} className="text-right">
                                    <ButtonLink to="register" bsStyle="primary" bsSize="large" block>Sign up</ButtonLink>
                                </Col>
                                <Col xs={6} sm={3}>
                                    <ButtonLink to="login" bsStyle="default" bsSize="large" block>Sign in</ButtonLink>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                    <div className="tutorial-section">
                        <Grid>
                            <Row>
                                <Col sm={4}>
                                    <h5>Lorem Ipsum</h5>
                                    <p>
                                        Lorem Ipsum sit dolor amed. Lorem Ipsum sit dolor amed. Lorem Ipsum sit dolor amed. Lorem Ipsum sit dolor amed. Lorem Ipsum sit dolor amed.
                                    </p>
                                </Col>
                                <Col sm={4}>
                                    <h5>Lorem Ipsum</h5>
                                    <p>
                                        Lorem Ipsum sit dolor amed. Lorem Ipsum sit dolor amed. Lorem Ipsum sit dolor amed. Lorem Ipsum sit dolor amed. Lorem Ipsum sit dolor amed.
                                    </p>
                                </Col>
                                <Col sm={4}>
                                    <h5>Lorem Ipsum</h5>
                                    <p>
                                        Lorem Ipsum sit dolor amed. Lorem Ipsum sit dolor amed. Lorem Ipsum sit dolor amed. Lorem Ipsum sit dolor amed. Lorem Ipsum sit dolor amed.
                                    </p>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>
        );
    }
});

export default Landing;
