const _ = require('lodash');
const Joi = require('@hapi/joi');
const Axios = require('axios');

/**
 * @class Session manager of the API
 */
class Session {

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
    self._session;
    self._userData;

    self.parent = options.parent;
    self.client = self.parent.dispatch.getClient();
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Set new session in authorization header
   * @param {string} session New session, session is token JWT
   * @return <promise>
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.session.newSession(session);
   */
  setSession(session) {
    try {

      Joi.assert(session, Joi.string().required());

      const self = this;
      self._session = session;
      self._client.defaults.headers.common.Authorization = self._session;
      return Promise.resolve('OK');
    } catch (ex) {
      const execption = _.hasIn(ex, 'message') ? ex.message : ex;
      return Promise.reject(execption);
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Set user data
   * @param {object} params User data to storegare
   * @return <promise>
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   auth: true,
   *   user: {
   *     email: 'user@gmail.com',
   *     externRoles: ['user:professional'],
   *     sessionId: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
   *     ...
   *     ...
   *   }
   * };
   * await api.session.setUserData(session);
   */
  setUserData(params) {
    try {
      Joi.assert(params, Joi.object().required());

      const self = this;

      self._userData = params;
      return Promise.resolve('OK');
    } catch (ex) {
      const execption = _.hasIn(ex, 'message') ? ex.message : ex;
      return Promise.reject(execption);
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Clean session id JWT
   * @return <promise>
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * await api.session.cleanSession();
   */
  cleanSession() {
    try {
      const self = this;

      self._userData = '';
      self._session = '';
      self._client.defaults.headers.common.Authorization = '';
      return Promise.resolve('OK');
    } catch (ex) {
      const execption = _.hasIn(ex, 'message') ? ex.message : ex;
      return Promise.reject(execption);
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get session
   * @return <promise>
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * await api.session.getSession();
   */
  getSession() {
    try {
      const self = this;

      const session = self._session;
      return Promise.resolve(session);
    } catch (ex) {
      const execption = _.hasIn(ex, 'message') ? ex.message : ex;
      return Promise.reject(execption);
    }
  }

   /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get user data
   * @return <promise>
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * await api.session.getUserData();
   */
  getUserData() {
    try {
      const self = this;

      const retData = self._userData;
      return Promise.resolve(retData);
    } catch (ex) {
      const execption = _.hasIn(ex, 'message') ? ex.message : ex;
      return Promise.reject(execption);
    }
  }
}

module.exports = Session;
