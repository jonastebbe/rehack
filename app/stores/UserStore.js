'use strict';

import _ from 'lodash';

/* global localStorage */

import React from 'react';
import Reflux from 'reflux';

import UserActions from '../actions/UserActions.js';

const UserStore = Reflux.createStore({
    init: function () {
        this.listenTo(UserActions.updateUser, this.updateUser);
        this.listenTo(UserActions.resetUser, this.resetUser);

        this.data = {
            loggedIn: false,
            email: '',
            firstName: '',
            lastName: ''
        };
    },
    getInitialState: function () {
        return this.data;
    },
    save: function () {
        // TODO save to react context
    },
    updateUser: function(data) {
        this.data.loggedIn = true;
        this.data.email = data.data.data.email;
        this.data.firstName = data.data.data.first_name;
        this.data.lastName = data.data.data.last_name;
        this.save();
        this.trigger(this.data);
    },
    resetUser: function() {
        this.data.loggedIn = false;
        this.data.email = '';
        this.data.firstName = '';
        this.data.lastName = '';
        this.save();
        this.trigger(this.data);
    }
});

export default UserStore;
