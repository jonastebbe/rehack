'use strict';

var APIBase = (process.env.NODE_ENV === 'production') ? 'https://prosper-web-api.herokuapp.com' : 'http://localhost:8000';

export const constants = {

  APIEndpoints: {
    BASE:           APIBase,
    LOGIN:          APIBase + '/v1/auth/sign_in',
    LOGOUT:         APIBase + '/v1/auth/sign_out',
    VALIDATE:       APIBase + '/v1/auth/validate_token',
    REGISTRATION:   APIBase + '/v1/auth/',
  },

};
