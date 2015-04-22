'use strict';

import Reflux from 'reflux';
import axios from 'axios';

import TwitterActions from '../actions/TwitterActions';
import Constants from '../constants/constants';

const TwitterStore = Reflux.createStore({
    init: function () {
        this.listenTo(TwitterActions.getShareCount, this.getShareCount);

        this.data = {
            count: 'no data fetched'
        };
    },
    getInitialState: function () {
        return this.data;
    },
    getShareCount: function(link) {
        this.data.count = 'loading...';
        this.trigger(this.data);
        axios.get('https://www.quandl.com/api/v1/datasets/WIKI/' + link + '.json?auth_token=f7rZULpX8FjRoe5PmChL')
          .then((data) => {
              this.data.count = data.data.name;
              this.trigger(this.data);
              return data;
          })
          .catch(function (response) {
            console.log('error');
          });
    }
});

export default TwitterStore;
