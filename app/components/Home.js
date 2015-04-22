'use strict';

import React from 'react';
import Reflux from 'reflux';

import {Button, Input, Grid, Row, Col} from 'react-bootstrap';

import TwitterStore from '../stores/TwitterStore';
import TwitterActions from '../actions/TwitterActions';

const Home = React.createClass({
        mixins: [Reflux.connect(TwitterStore, 'data')],
        handleClick: function (e) {
            e.preventDefault();

            var link = this.refs.link.getValue();
            TwitterActions.getShareCount(link);
        },
        render() {
            return (
                <Grid>
                    <Row>
                        <Col sm={6}>
                            <h1>Gimme that name!</h1>
                            <Row>
                                <Col sm={6}>
                                    <Input ref="link" type="text" label="Keyword" />
                                </Col>
                                <Col sm={6}>
                                    <Button bsStyle="primary" onClick={this.handleClick}>Search</Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={6}>
                            <p className="lead">{this.state.data.count}</p>
                        </Col>
                    </Row>
                </Grid>
        );
    }
});

export default Home;
