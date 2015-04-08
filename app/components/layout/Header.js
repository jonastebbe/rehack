'use strict';

import React from 'react';
import {Grid, Row, Col, Nav, Navbar} from 'react-bootstrap';
import {NavItemLink} from 'react-router-bootstrap';

import logo from './../../../assets/images/logo_white.png';

const Header = React.createClass({
    render () {

        var home = <NavItemLink to="home">Home</NavItemLink>;
        var about = <NavItemLink to="about">About</NavItemLink>;

        return(
            <Navbar brand='Brand'>
                <Nav>
                    {home}
                    {about}
                </Nav>
              </Navbar>
        );
    }
});

export default Header;
