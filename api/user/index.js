const _ = require('lodash');
const Joi = require('joi');

const Document = require('./document');
const Organization = require('./organization');
const Process = require('./process');
const Task = require('./task');
const User = require('./user');

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
    self.document = new Document(options);
    self.organization = new Organization(options);
    self.process = new Process(options);
    self.task = new Task(options);
    self.user = new User(options);
  }
}

module.exports = Users;