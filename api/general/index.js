const _ = require('lodash');
const Joi = require('joi');

const Geo = require('./geoLocation');

/**
 * @class API request, user permission level
 */
class Users {
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
    self.geo = new Geo(options);
  }
}

module.exports = Users;