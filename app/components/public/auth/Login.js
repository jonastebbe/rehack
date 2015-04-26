import React from 'react/addons';
import {Link} from 'react-router';
import {Alert, Grid, Row, Col, Label, Button, ButtonGroup, Input, FormGroup} from 'react-bootstrap';
import {ButtonLink} from 'react-router-bootstrap';
import {user, forbidAuth} from '../../../auth.js';

var LoginError = React.createClass({
  render: function () {
    return (
        <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss}>
            <h4>Login error</h4>
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

export var Login = React.createClass({
    contextTypes: {
        router: React.PropTypes.func.isRequired
    },
    mixins: [ forbidAuth ],
    getInitialState: function () {
        return {
            error: false,
            loading: false
        };
    },
    onSubmit: function (e) {
        e.preventDefault();

        var email = this.refs.email.getValue();
        var password = this.refs.password.getValue();

        this.setState({loading: true});

        user.login(email, password).then((result) => {

            if (!user.isLoggedIn()) {
                return this.setState({ error: true, loading: false});
            }

            this.setState({loading: false, error: false});

            var router = this.context.router;
            var nextPath = router.getCurrentQuery().nextPath;

            if (nextPath) {
                router.replaceWith(nextPath);
            } else {
                router.replaceWith('/private');
            }

        }).catch((err) => {
            console.log(err);
            this.setState({loading: false, error: err.data.errors});
        });

    },
    render: function () {
        var error;
        if (this.state.error) {
            error = <LoginError error={this.state.error}/>
        }

        return (
            <div>
                <div className="subheader">
                  <Grid>
                    <Row>
                        <Col className="subheader__title text-center" xs={12}>
                            <h2>Login</h2>
                        </Col>
                    </Row>
                  </Grid>
                </div>
                <Grid>
                    <Row>
                        <Col className="login" xs={12} sm={8} smOffset={2}>
                            {error}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="login" xs={12} sm={4} smOffset={4}>
                            <form className="login__form" onSubmit={this.onSubmit}>
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

                                <Button type="submit" bsStyle="primary" bsSize="large" block onSubmit={this.onSubmit}>Login</Button>
                            </form>
                            <ButtonLink to="login" bsStyle="link" bsSize="large" block>Forgot password?</ButtonLink>
                            <hr />
                            <ButtonLink to="register" bsSize="large" className="btn-ghost" block>Sign up</ButtonLink>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});
