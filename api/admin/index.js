import Joi from 'joi';

import AdminDocument from './document';
import AdminForm from './form';
import AdminNotification from './notification';
import AdminList from './list';
import AdminPlugin from './plugin';
import AdminPolicy from './policy';
import AdminTask from './task';
import AdminUser from './user';
import AdminProcesses from './processes';
import AdminMessage from './message';
import AdminDocTypes from './doctypes';
import AdminOrganizations from './organization';

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
    self.doctypes = new AdminDocTypes(options);
    self.document = new AdminDocument(options);
    self.form = new AdminForm(options);
    self.list = new AdminList(options);
    self.message = new AdminMessage(options);
    self.organizations = new AdminOrganizations(options);
    self.notification = new AdminNotification(options);
    self.plugin = new AdminPlugin(options);
    self.policy = new AdminPolicy(options);
    self.processes = new AdminProcesses(options);
    self.task = new AdminTask(options);
    self.user = new AdminUser(options);
  }
}

export default Admin;
