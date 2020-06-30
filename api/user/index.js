const _ = require('lodash');
const Joi = require('@hapi/joi');

const Organization = require('./organization');
const Process = require('./process');
const Task = require('./task');

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
    self.organization = new Organization(options);
    self.process = new Process(options);
    self.task = new Task(options);
  }
}

module.exports = Users;