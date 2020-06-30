const _ = require('lodash');
const Joi = require('@hapi/joi');
const Axios = require('axios');

/**
 * @class Session manager of the API
 */
class Session {

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @constructor
   * @param {object} options Params of the constructor
   * @param {object} options.parent This of the pararent
   */
  constructor(options) {
    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self._session;
    self._userData;

    self.parent = options.parent;
    self._client = self.parent.dispatch.getClient();
  }
}

module.exports = Session;
