'use strict';

import React from 'react';

import {Grid, Row, Col} from 'react-bootstrap';

import logo from './../../../assets/images/logo_white.png';
import style from './../../../assets/stylesheets/Footer.scss';
const Footer = React.createClass({
    render () {

        return(
            <div className="footer">
              <Grid>
                <Row>
                  <Col xs={12}>
                      <h3>
                          Brand
                      </h3>
                  </Col>
                </Row>
                <hr className="footer__hr" />
                    <Row>
                        <Col className="footer__regulatory" sm={6}>
                            <small>
                                some text
                            </small>
                        </Col>
                        <Col className="footer__regulatory" sm={6}>
                            <small>
                                some text
                            </small>
                        </Col>
                    </Row>
                <hr className="footer__hr"/>
              </Grid>
            </div>
        );
    }
});

export default Footer;
