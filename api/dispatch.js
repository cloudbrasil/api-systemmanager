const _ = require('lodash');
const Joi = require('@hapi/joi');
const Axios = require('axios');

class Dispatch {

  /**
   * @constructor
   * @description Options for constructor
   * @param {object} options Options to new instance
   * @param {object} options.parent This of the parent
   */
  constructor(options) {

    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;

    self.session = '';
    self.parent = options.parent;
    self.client = Axios.create({baseURL: self.parent.options.uri});

    self._startInterceptors();
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Interceptors HTTP to request, response and errors
   * @private
   */
  _startInterceptors() {
    const self = this;

    self.client.interceptors.request.use(request => {
      return request;
    });

    self.client.interceptors.response.use(response => {
      return response;
    },error => {
      const { response } = error;
      const httpStatusToRetry = _.get(self, 'parent.options.httpStatusToRetry');

      if (httpStatusToRetry.indexOf(response.statusCode) > -1) {
      }

      return Promise.reject(error)
    });
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Set new session in authorization header
   * @param {string} session New session isi JWT
   * @private
   */
  setSession(session) {
    const self = this;

    self.session = session;
    self.client.defaults.headers.common.Authorization = self.session;
  }

  getSession() {
    const self = this;
    return self.session;
  }

  cleanSession() {
    const self = this;
    self.client.defaults.headers.common.Authorization = '';
  }

  getClient() {
    const self = this;
    return self.client;
  }
}

module.exports = Dispatch;
