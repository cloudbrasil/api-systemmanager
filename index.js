const _ = require('lodash');
const Joi = require('joi');

const Dispatch = require('./api/dispatch');
const Session = require('./api/session');
const Login = require('./api/login');

const User = require('./api/user');
const Admin = require('./api/admin');

/**
 * Class API
 */
class API {

  /**
   * @constructor
   * @description Options for constructor
   * @param {object=} options Options to new instance
   * @param {object=} options.auth Options to authentication
   * @param {string} options.auth.type=null Type (apikey or userpassword)
   * @param {object=} options.auth.credentials Credentials to login SM
   * @param {string} options.auth.credentials.username=null Credentials to login SM
   * @param {string} options.auth.credentials.password=null Credentials to login SM
   * @param {string} options.auth.credentials.session=null Session started by social login
   * @param {string} options.auth.credentials.apikey=null Session started by social login
   * @param {string} options.attemptsRetry=3 Number of login attempts
   * @param {array} [options.httpStatusToRetry=[401]] HTTP status to retry login
   * @param {string} options.uri=http://127.0.0.1:8080 Address of the server
   * @param {object=} options.debug Enable debug of requisitions
   * @param {boolean} options.debug.success=true Enable debug success
   * @param {boolean} options.debug.error=true Enable debug error
   * @example
   *
   * const params = {
   *   auth: {
   *     type: 'apikey',
   *     credentials: {
   *       key: '36371923-27dc-4d30-b666-7fc4ecead925'
   *     }
   *   },
   *   url: 'http://cloudbrasil.com.br'
   * };
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API(params);
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
        type: null,
        credentials: {
          username: null,
          password: null,
          session: null,
          key: null
        }
      },
      uri: 'http://localhost:8080',
      attemptsRetry: 3,
      httpStatusToRetry: [401],
      debug: {success: true, error: true}
    });

    // API CALL
    self.dispatch = new Dispatch({parent: self});
    self.session = new Session({parent: self});
    self.login = new Login({parent: self});

    self.user = new User({parent: self});
    self.admin = new Admin({parent: self});
  }
}

module.exports = API;
