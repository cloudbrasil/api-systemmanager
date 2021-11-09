import _ from 'lodash';
import Joi from 'joi';

import Document from './document';
import Organization from './organization';
import Process from './process';
import Task from './task';
import User from './user';
import Register from './register';

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
    self.user = self.profile = new User(options);
    self.register = new Register(options);
  }
}

export default Users;
