const _ = require('lodash');
const Joi = require('joi');
const Axios = require('axios');

/**
 * @class Api dispatch manager
 */
class Dispatch {

  constructor(options) {

    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self.parent = options.parent;
    self._client = Axios.create({baseURL: self.parent.options.uri});
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
      return self._client;
    } catch (ex) {
      return ex;
    }
  }
}

module.exports = Dispatch;
