import Joi from 'joi';

import AdminDocument from './document.js';
import AdminForm from './form.js';
import AdminNotification from './notification.js';
import AdminList from './list.js';
import AdminPlugin from './plugin.js';
import AdminPolicy from './policy.js';
import AdminTask from './task.js';
import AdminUser from './user.js';
import AdminProcesses from './processes.js';
import AdminMessage from './message.js';
import AdminDocTypes from './doctypes.js';
import AdminOrganizations from './organization.js';

/**
 * @class API request, admin permission level
 */
class Admin {
  /**
   * @author Myndware <augusto.pissarra@myndware.com>
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
