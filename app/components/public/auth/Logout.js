import React from 'react/addons';
import {Link} from 'react-router';
import {Row, Col, Label, Button, ButtonGroup, Input, FormGroup} from 'react-bootstrap';
import {user, requireAuth} from '../../../auth.js';

export var Logout = React.createClass({
    getInitialState: function () {
        return {
            loading: true,
            success: false,
            error: false
        };
    },
    componentDidMount: function () {
        user.logout().then(() => {
            this.setState({loading: false, success: true, error: false});

        }).catch((err) => {
            this.setState({loading: false, success: false, error: true});
        });
    },
    render: function () {
        return (
            <Row>
                <Col xs={12}>
                    <h1>Signed out successfully!</h1>
                </Col>
            </Row>
        );
    }
});
