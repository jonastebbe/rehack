'use strict';

import React from 'react/addons';
import {Link} from 'react-router';
import {Grid, Row, Col, Button, Input, Alert} from 'react-bootstrap';
import {ButtonLink} from 'react-router-bootstrap';

import {user, forbidAuth} from '../../../auth.js';
import Header from '../layout/Header.js';


var RegisterError = React.createClass({
  render: function () {
    return (
        <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss}>
            <h4>Sign up error</h4>
            <ul>
                { this.props.error.map(function(item){
                    return <li>{item}</li>;
                })}
            </ul>
        </Alert>
    );
  },

  handleAlertDismiss() {
    this.setState({alertVisible: false});
  },

  handleAlertShow() {
    this.setState({alertVisible: true});
  }
});

var RegisterSuccess = React.createClass({
    render: function () {
        return (
            <div>
                <h2>You have signed up successfully.</h2>
                <p><Link to='login'>Please login.</Link></p>
            </div>
        );
    }
});

var RegisterForm = React.createClass({
    onSubmit: function (e) {
        e.preventDefault();

        var email = this.refs.email.getValue();
        var password = this.refs.password.getValue();
        var passwordConfirm = this.refs.passwordConfirm.getValue();
        this.props.onSubmit(email, password, passwordConfirm);
    },
    render: function () {
        return (
            <form className="register__form" onSubmit={this.onSubmit}>

                <Input
                required={true}
                type='email'
                placeholder='Email'
                label='Email'
                ref='email'
                groupClassName='group-class'
                wrapperClassName='wrapper-class'
                labelClassName='label-class'/>

                <Input
                required={true}
                type='password'
                placeholder='Password'
                label='Password'
                ref='password'
                groupClassName='group-class'
                wrapperClassName='wrapper-class'
                labelClassName='label-class'/>

                <Input
                required={true}
                type='password'
                placeholder='Password'
                label='Confirm password'
                ref='passwordConfirm'
                groupClassName='group-class'
                wrapperClassName='wrapper-class'
                labelClassName='label-class'/>

                <Button type="submit" bsStyle="primary" bsSize="large" block onSubmit={this.onSubmit}>Sign up</Button>
            </form>
        );
    }
});

export var Register = React.createClass({
    mixins: [forbidAuth],
    getInitialState: function () {
        return {
            error: false,
            loading: false,
            success: false
        };
    },
    onSubmit: function (email, password, passwordConfirm) {

        this.setState({loading: true});

        user.register(email, password, passwordConfirm).then((result) => {
            this.setState({loading: false, error: false, success: true});
        }).catch((err) => {
            this.setState({loading: false, error: err.data.errors.full_messages});
        });

    },
    render: function () {
        var error;
        if (this.state.error) {
            error = <RegisterError error={this.state.error}/>
        }

        return (
            <div className="auth-form">
                <Header />
                <Grid>
                    <Row>
                        <Col className="auth-form__content register" xs={12} sm={4} smOffset={4}>
                            <Col xs={12}>
                                    <h2 className="text-center">Register</h2>
                                    {error}
                                    <RegisterForm error={this.state.error} loading={this.state.loading} onSubmit={this.onSubmit}/>
                                    <hr />
                                    <ButtonLink to="login" bsStyle="link" bsSize="large" block>Already have an account? Login now</ButtonLink>
                            </Col>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});
