const _ = require('lodash');
const Joi = require('@hapi/joi');

const Form = require('./form');
const List = require('./list');
const Plugin = require('./plugin');
const Policy = require('./policy');
const Task = require('./task');
const User = require('./user');

/**
 * @class API request, admin permission level
 */
class Admin {
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
    self.form = new Form(options);
    self.list = new List(options);
    self.plugin = new Plugin(options);
    self.policy = new Policy(options);
    self.task = new Task(options);
    self.user = new User(options);
  }
}

module.exports = Admin;