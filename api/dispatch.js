const _ = require('lodash');
const Joi = require('@hapi/joi');
const Axios = require('axios');

/**
 * @class Api dispatch manager
 */
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
    self.parent = options.parent;
    self._client = Axios.create({baseURL: self.parent.options.uri});

    self._startInterceptors();
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Interceptors HTTP to request, response and errors
   * @private
   */
  _startInterceptors() {
    const self = this;

    self._client.interceptors.request.use(request => {
      return request;
    });

    self._client.interceptors.response.use(response => {
      return response;
    }, error => {
      const {response} = error;
      const httpStatusToRetry = _.get(self, 'parent.options.httpStatusToRetry');

      if (httpStatusToRetry.indexOf(response.statusCode) > -1) {
      }

      return Promise.reject(error)
    });
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get client Axios
   * @return {promise} return client axios
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * await api.dispatch.getClient();
   */
  getClient() {
    try {
      const self = this;
      return Promise.resolve(self._client);
    } catch (ex) {
      const execption = _.hasIn(ex, 'message') ? ex.message : ex;
      return Promise.reject(execption);
    }
  }
}

module.exports = Dispatch;
