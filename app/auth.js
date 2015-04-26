import cookies from 'cookies-js';
import rp from 'axios';
import {constants} from './constants/constants.js';

import UserActions from './actions/UserActions.js';

class User {

    constructor () {
        this.resetAuth();
        // when we login via cookie or the normal way we make a request
        // we need to keep track of that promise to verify the correct working
        // of isLoggedIn()
        this.loginPromise = false;
        // we want to authenticate the user as soon as possible
        this.loginViaCookie();
    }

    resetAuth () {
        // keys we need for auth
        this.auth = {
            email: '',
            firstName: '',
            lastName: '',
            id: '',
            uid: '',
            'access-token': '',
            client: ''
        };
    }

    register (email, password, passwordConfirm) {
        return rp
            .post(constants.APIEndpoints.REGISTRATION, {
                email: email,
                password: password,
                password_confirmation: passwordConfirm,
                confirm_success_url: constants.APIEndpoints.BASE
            })
            .then((data) => {
                return data;
            });
    }

    login (email, password) {
        this.loginPromise = rp
            .post(constants.APIEndpoints.LOGIN, {
                email: email,
                password: password
            })
            .then((data) => {
                this.setHeaderData(data);
                UserActions.updateUser(data);
                this.setCookie();
                this.addInterceptor();

                return data;
            });

        return this.loginPromise;

    }

    logout () {
        return rp
            .delete(constants.APIEndpoints.LOGOUT)
            .then((data) => {
                this.deleteCookie();
                this.resetAuth();
                UserActions.resetUser();
                this.removeInterceptor();
                this.loginPromise = false;
                return data;
            });
    }

    loginViaCookie () {

        var header = {};

        Object.keys(this.auth).forEach(key => {
            header[key] = cookies.get(key);
        });

        if (header['access-token']) {
            this.loginPromise = rp.get(constants.APIEndpoints.VALIDATE, {
                headers: header
            }).then((data) => {
                this.setHeaderData(data);
                UserActions.updateUser(data);
                this.setCookie();
                this.addInterceptor();
            });
        }

        return false;

    }

    isLoggedIn (cb) {
        // when you give it a callback, we test first
        // the loginViaCookie method is still running
        if (cb && this.loginPromise) {
            return this.loginPromise
                .then(() => {
                    this.loginPromise = false;
                    cb(true);
                })
                .catch(() => {
                    this.loginPromise = false;
                    cb(false);
                });
        }

        if (cb) {
            // no promise running, call the callback nontheless
            return cb(!!this.auth['access-token']);
        }

        return !!this.auth['access-token'];
    }

    setHeaderData (data) {
        this.auth.email           = data.data.data.email;
        this.auth.firstName       = data.data.data.first_name;
        this.auth.lastName        = data.data.data.last_name;
        this.auth.uid             = data.data.data.uid;
        this.auth.id              = data.data.data.id;
        this.auth['access-token'] = data.headers['access-token'];
        this.auth.client          = data.headers.client;
    }

    setCookie () {
        Object.keys(this.auth).forEach(key => {
            cookies.set(key, this.auth[key]);
        });
    }

    deleteCookie () {
        Object.keys(this.auth).forEach(key => {
            cookies.expire(key);
        });
    }

    removeInterceptor () {
        rp.interceptors.request.eject(this.interceptor);
    }

    addInterceptor () {
        this.interceptor = rp.interceptors.request.use((config) => {
            config.headers = this.auth;
            return config;
        }, function (error) {
            return error;
        });
    }
}

export var user = new User();

export var requireAuth = {
    statics: {
        willTransitionTo: function (transition, params, query, callback) {
            user.isLoggedIn((result) => {
                if (!result) {
                    transition.redirect('/login',
                        {},
                        {'nextPath' : transition.path});
                    console.log('calling the path ', transition.path);
                }
                callback();
            });
        }
    }
};

export var forbidAuth = {
    statics: {
        willTransitionTo: function (transition, params, query, callback) {
            user.isLoggedIn((result) => {
                if (result) {
                    transition.redirect('/private',
                        {},
                        {});
                    console.log('calling the path ', transition.path);
                }
                callback();
            });
        }
    }
};
