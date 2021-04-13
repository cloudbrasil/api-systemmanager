const _ = require('lodash');
const Joi = require('joi');

const AdminDocument = require('./document');
const AdminForm = require('./form');
const AdminNotification = require('./notification');
const AdminList = require('./list');
const AdminPlugin = require('./plugin');
const AdminPolicy = require('./policy');
const AdminTask = require('./task');
const AdminUser = require('./user');
const AdminProcesses = require('./processes');
const AdminMessage = require('./message');
const AdminDocTypes = require('./doctypes');

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
    self.document = new AdminDocument(options);
    self.form = new AdminForm(options);
    self.notification = new AdminNotification(options);
    self.list = new AdminList(options);
    self.plugin = new AdminPlugin(options);
    self.policy = new AdminPolicy(options);
    self.task = new AdminTask(options);
    self.user = new AdminUser(options);
    self.processes = new AdminProcesses(options);
    self.message = new AdminMessage(options);
    self.doctypes = new AdminDocTypes(options);
  }
}

module.exports = Admin;
