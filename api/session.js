const _ = require('lodash');
const Joi = require('@hapi/joi');
const Axios = require('axios');

/**
 * @class Session manager of the API
 */
class Session {

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
