'use strict';

var APIBase = (process.env.NODE_ENV === 'development') ? 'http://api.production.com' : 'http://localhost:8000';

export const constants = {

  APIEndpoints: {
  },

  TwitterKeys: {
      consumerKey: 'v5KqYm2EAeReBMH1W8ix41h47',
      consumerSecret: 'dEFwUYgBpsO49LxWmLaW7AjPsvDI7iWgCRP7gHX96Nx43zEdst',
      accessToken: '80340371-JgIebiWbgzE3SRBtogImKZOJx51yyWNdoWMRiK9ua',
      accessTokenSecret: '80340371-JgIebiWbgzE3SRBtogImKZOJx51yyWNdoWMRiK9ua'
  }

};
