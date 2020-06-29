const _ = require('lodash');
const Joi = require('@hapi/joi');

/**
 * @class Login manager
 */
class Dispatch {

  /**
   * @constructor
   * @description Options for constructor
   * @param {object} options Options to new instance
   * @param {object} options.parent This of the parent
   */
  constructor(options) {

    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self.parent = options.parent;
    self._client = self.parent.dispatch.getClient();
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Login with social login Facebook
   * @param {string} accessToken Access token of the system manager
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   *
   * // Params of the instance
   * const params = {...}
   * const api = new API(params);
   * const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cC...';
   * const retData = await api.login.facebook(accessToken);
   */
  facebook(accessToken) {
    return new Promise((resolve, reject) => {
      try {
        Joi.assert(accessToken, Joi.string().required());

        const self = this;
        resolve();
      } catch (ex) {
        const execption = _.hasIn(ex, 'message') ? ex.message : ex;
        reject(execption);
      }
    });
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Login with social login Google
   * @param {string} accessToken Access token of the system manager
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   *
   * // Params of the instance
   * const params = {...}
   * const api = new API(params);
   * const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cC...';
   * const retData = await api.login.google(accessToken);
   */
  google(accessToken) {
    return new Promise((resolve, reject) => {
      try {
        Joi.assert(accessToken, Joi.string().required());

        const self = this;
        resolve();
      } catch (ex) {
        const execption = _.hasIn(ex, 'message') ? ex.message : ex;
        reject(execption);
      }
    });
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Login with apikey
   * @param {string} apikey Access key
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   *
   * // Params of the instance
   * const params = {...}
   * const api = new API(params);
   * const apiKey = '043a0eb2-f5c3-4900-b781-7f229d00d092';
   * const retData = await api.login.apiKey(apiKey);
   */
  apiKey(apikey) {
    return new Promise((resolve, reject) => {
      try {
        Joi.assert(apikey, Joi.string().required());

        const self = this;
        resolve();
      } catch (ex) {
        const execption = _.hasIn(ex, 'message') ? ex.message : ex;
        reject(execption);
      }
    });
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Login with user and password
   * @param {object} params Object with user and password
   * @param {string} params.username Username or email of the user
   * @param {string} params.password Password of the user
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   *
   * // Params of the instance
   * const params = {...}
   * const api = new API(params);
   * const params = {
   *   username: 'ana.silva@gmail.com',
   *   password: '123456'
   * };
   * const retData = await api.login.userPass(apiKey);
   */
  userPass(params) {
    return new Promise((resolve, reject) => {
      try {
        Joi.assert(params, Joi.object().required());
        Joi.assert(params.username, Joi.string().required());
        Joi.assert(params.password, Joi.string().required());

        const self = this;
        resolve();
      } catch (ex) {
        const execption = _.hasIn(ex, 'message') ? ex.message : ex;
        reject(execption);
      }
    });
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description When logging in with an external user, the session is not saved in the instance, but returned to the external user.
   * @param {object} params Object for login
   * @param {string} params.type Login type facebook | google | apiKey | userPass
   * @param {string=} params.username Username or email of the user
   * @param {string=} params.password Password of the user
   * @param {string=} params.apiKey Key of the user
   * @param {string=} params.accessToken Access token of the system manager
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   *
   * // Params of the instance
   * const params = {...}
   * const api = new API(params);
   * const params = {
   *   type: 'userpass',
   *   username: 'ana.silva@gmail.com',
   *   password: '123456'
   * };
   * const retData = await api.login.externalUser(params);
   */
  externalUser(params) {
    return new Promise((resolve, reject) => {
      try {
        Joi.assert(params, Joi.object().required());
        Joi.assert(params.type, Joi.string().required());

        const { type } = params;
        if (type === 'facebook' || type === 'google') {
          Joi.assert(params.accessToken, Joi.string().required());

        } else if (type === 'userPass') {
          Joi.assert(params.userpass, Joi.string().required());
          Joi.assert(params.password, Joi.string().required());

        } else if (type === 'apiKey') {
          Joi.assert(params.apiKey, Joi.string().required());

        } else {
          throw new Error('Login type not found');
        }

        const self = this;
        resolve();
      } catch (ex) {
        const execption = _.hasIn(ex, 'message') ? ex.message : ex;
        reject(execption);
      }
    });
  }
}

module.exports = Dispatch;
