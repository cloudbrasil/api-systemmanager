import _ from 'lodash';
import Joi from 'joi';

import Document from './document.js';
import Organization from './organization.js';
import Process from './process.js';
import Task from './task.js';
import User from './user.js';
import Register from './register.js';
import Notification from './notification.js';
import Updates from './updates.js';
import Help from './help.js';
import Datasource from './datasource.js';
import Application from './notification.js';

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
    self.datasource = new Datasource(options);
    self.organization = new Organization(options);
    self.process = new Process(options);
    self.task = new Task(options);
    self.user = self.profile = new User(options);
    self.register = new Register(options);
    self.notification = new Notification(options);
    self.updates = new Updates(options);
    self.help = new Help(options);
    self.application = new Application(options);
  }
}

export default Users;
