const _ = require('lodash');
const Joi = require('@hapi/joi');

const Access = require('./api/access');
const Dispatch = require('./api/dispatch');
const Documents = require('./api/documents');
const Forms = require('./api/forms');
const Lists = require('./api/lists');
const Tasks = require('./api/tasks');
const Users = require('./api/users');

class API {

  /**
   * @constructor
   * @description Options for constructor
   * @param {object} options Options to new instance
   * @param {object} options.auth Options to authentication
   * @param {string} options.auth.type Type (apikey or userpassword)
   * @param {object} options.auth.credentials Credentials to login SM
   * @param {string} options.auth.credentials.username Credentials to login SM
   * @param {string} options.auth.credentials.password Credentials to login SM
   * @param {string} options.uri Address of the server
   * @param {object} options.debug Enable debug of requisitions
   * @param {boolean} options.debug.success Enable debug success
   * @param {boolean} options.debug.error Enable debug error
   */
  constructor(options = {}) {

    if (!_.isUndefined(options)) {
      Joi.assert(options, Joi.object());
      Joi.assert(options.uri, Joi.string());
      Joi.assert(options.debug, Joi.object());
    }
    const self = this;

    self.options = _.defaultsDeep({}, options, {
      auth: {
        type: 'apikey',
        credentials: {
          username: null,
          password: null,
          key: '38bd15aa-6418-4d4f-812a-e7ed5b3bfcde' // apikey en_automation
        }
      },
      uri: 'http://localhost:8080',
      attemptsRetry: 3,
      httpStatusToRetry: [401],
      debug: {success: true, error: true}
    });

    //
    // CALL API
    //
    self.access = new Access({parent: self});
    self.dispatch = new Dispatch({parent: self});
    self.documents = new Documents({parent: self});
    self.forms = new Forms({parent: self});
    self.lists = new Lists({parent: self});
    self.tasks = new Tasks({parent: self});
    self.users = new Users({parent: self});
  }
}

module.exports = API;
