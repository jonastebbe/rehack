'use strict';

import React from 'react/addons';
import {Link} from 'react-router';
import {Grid, Row, Col, Button, Input, Alert} from 'react-bootstrap';
import {ButtonLink} from 'react-router-bootstrap';

import {user, forbidAuth} from '../../../auth.js';

var RegisterError = React.createClass({
  render: function () {
    return (
        <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss}>
            <h4>Fehler bei der Registrierung</h4>
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
                <h2>Sie haben sich erfolgreich regstriert.</h2>
                <p><Link to='login'>Bitte Melden Sie sich an.</Link></p>
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
                placeholder='Passwort'
                label='Passwort'
                ref='password'
                groupClassName='group-class'
                wrapperClassName='wrapper-class'
                labelClassName='label-class'/>

                <Input
                required={true}
                type='password'
                placeholder='Passwort'
                label='Passwort Bestätigen'
                ref='passwordConfirm'
                groupClassName='group-class'
                wrapperClassName='wrapper-class'
                labelClassName='label-class'/>

                <Button type="submit" bsStyle="primary" bsSize="large" block onSubmit={this.onSubmit}>Registrieren</Button>
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
            <div>
                <div className="subheader">
                  <Grid>
                    <Row>
                        <Col className="subheader__title text-center" xs={12}>
                            <h2>Registrierung</h2>
                        </Col>
                    </Row>
                  </Grid>
                </div>
                <Grid>
                    <Row>
                        <Col className="register" xs={12} sm={8} smOffset={2}>
                            {error}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="register" xs={12} sm={4} smOffset={4}>
                            <RegisterForm error={this.state.error} loading={this.state.loading} onSubmit={this.onSubmit}/>
                            <hr />
                            <ButtonLink to="login" bsStyle="link" bsSize="large" block>Schon registriert? Zum Login</ButtonLink>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});
