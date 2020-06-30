const _ = require('lodash');
const Joi = require('@hapi/joi');

/**
 * @class Login manager
 */
class Login {

  constructor(options) {

    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self.parent = options.parent;
    self._client = self.parent.dispatch.getClient();
  }

  /**
   * @author Augusto Pissarra <abernardo.br@gmail.com>
   * @description Get the return data and check for errors
   * @param {object} retData Response HTTP
   * @return {*}
   * @private
   */
  _returnData(retData, def = {}) {
    if (retData.status !== 200) {
      throw Boom.badRequest(_.get(retData, 'message', 'No error message reported!'))
    } else {
      return _.get(retData, 'data', def);
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Set header with new session
   * @param {string} session Session, token JWT
   * @return {object} header with new session
   * @private
   */
  _setHeader(session) {
    return {
      headers: {
        authorization: session,
      }
    };
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
    return new Promise(async (resolve, reject) => {
      try {
        Joi.assert(accessToken, Joi.string().required());

        const self = this;

        const apiCall = self._client.post('/login/facebook', {accessToken});
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
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
    return new Promise(async (resolve, reject) => {
      try {
        Joi.assert(accessToken, Joi.string().required());

        const self = this;

        const apiCall = self._client.post('/login/google', {accessToken});
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
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
  apiKey(apiKey) {
    return new Promise(async (resolve, reject) => {
      try {
        Joi.assert(apiKey, Joi.string().required());

        const self = this;

        const apiCall = self._client.post('/login/api', {apiKey});
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
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
   * const retData = await api.login.userPass(params);
   */
  userPass(params) {
    return new Promise(async (resolve, reject) => {
      try {
        Joi.assert(params.username, Joi.string().required());
        Joi.assert(params.password, Joi.string().required());

        const self = this;

        const apiCall = self._client.post('/login', params);
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Logout user system manager
   * @param {string} session Session, token JWT
   * @return {promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   *
   * // Params of the instance
   * const params = {...}
   * const api = new API(params);
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const retData = await api.login.logout(session);
   */
  logout(session) {
    return new Promise(async (resolve, reject) => {
      try {
        Joi.assert(session, Joi.string().required());

        const self = this;
        const apiCall = self._client.get('/logout', self._setHeader(session));
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    });
  }
}

module.exports = Login;