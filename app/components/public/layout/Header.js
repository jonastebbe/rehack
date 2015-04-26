'use strict';

import React from 'react';
import Reflux from 'reflux';
import {Grid, Row, Col, Nav, Navbar} from 'react-bootstrap';
import {NavItemLink} from 'react-router-bootstrap';

import UserStore from '../../../stores/UserStore';

const Header = React.createClass({
    mixins: [Reflux.connect(UserStore, 'data')],
    render () {

        var link = this.state.data.loggedIn ? <NavItemLink to="logout">Logout</NavItemLink> : <NavItemLink to="login">Login</NavItemLink>;
        var landing = <NavItemLink to="landing">Landing</NavItemLink>;

        return(
            <Navbar brand='Brand'>
                <Nav>
                    {landing}
                    {link}
                </Nav>
              </Navbar>
        );
    }
});

export default Header;
