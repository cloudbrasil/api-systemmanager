import _ from 'lodash';
import Joi from 'joi';

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
   * @author Myndware <augusto.pissarra@myndware.com>
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
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Login with social login Facebook
   * @param {object} params Params to login Facebook
   * @param {string} params.accessToken Access token of the system manager
   * @param {object} params.initialUserData Object with roles default if sigin
   * @param {array} params.initialUserData.externalRoles Array with permission of user
   * @return {promise<object>} data
   * @return {object} data.auth true or false if we have the user authenticaited correctly
   * @return {object} data.user the logged user
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   *
   * // Params of the instance
   * const params = {...}
   * const api = new API(params);
   * const params = { accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cC...' };
   * const { auth, user } = await api.login.facebook(params);
   */
  async facebook(params) {
    const self = this;
    try {
      Joi.assert(params, Joi.object().required(), 'Params to login Facebook');
      Joi.assert(params.accessToken, Joi.string().required(), 'Access token of the system manager');

      if (_.hasIn(params, 'initialUserData')) {
        Joi.assert(params.initialUserData, Joi.object().required(), 'Object with roles default if sigin');
        Joi.assert(params.initialUserData.externalRoles, Joi.array().required(), 'Array with permission of user');
      }

      const apiCall = self._client.post('/login/facebook', params);
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Login with social login Google
   * @param {object} params Params to login Google
   * @param {string} params.accessToken Access token of the system manager
   * @param {object} params.initialUserData Object with roles default if sigin
   * @param {array} params.initialUserData.externalRoles Array with permission of user
   * @return {promise<object>} data
   * @return {object} data.auth true or false if we have the user authenticaited correctly
   * @return {object} data.user the logged user
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
   * const { auth, user } = await api.login.google(accessToken);
   */
  async google(params) {
    const self = this;
    try {
      Joi.assert(params, Joi.object().required(), 'Params to login Google');
      Joi.assert(params.accessToken, Joi.string().required(), 'Access token of the system manager');

      if (_.hasIn(params, 'initialUserData')) {
        Joi.assert(params.initialUserData, Joi.object().required(), 'Object with roles default if sigin');
        Joi.assert(params.initialUserData.externalRoles, Joi.array().required(), 'Array with permission of user');
      }

      const apiCall = self._client.post('/login/google', params);
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Login with apikey
   * @param {string} apikey Access key
   * @return {promise<object>} data
   * @return {object} data.auth true or false if we have the user authenticaited correctly
   * @return {object} data.user the logged user
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
   * const { auth, user } = await api.login.apiKey(apiKey);
   */
  async apiKey(apiKey) {
    const self = this;
    try {
      Joi.assert(apiKey, Joi.string().required());

      const apiCall = self._client.post('/login/api', {apiKey});
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Login with user and password
   * @param {object} params Object with user and password
   * @param {string} params.username Username or email of the user
   * @param {string} params.password Password of the user
   * @param {string} params.orgname The organame of the user
   * @return {promise<object>} data
   * @return {object} data.auth true or false if we have the user authenticaited correctly
   * @return {object} data.user the logged user
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
   * const { auth, user } = await api.login.userPass(params);
   */
  async userPass(params) {
    const self = this;
    try {
      Joi.assert(params.username, Joi.string().required());
      Joi.assert(params.password, Joi.string().required());
      const { orgname = '' } = params;
      let url;
      if(orgname !== '') {
        url = `/login/${orgname}`;
      } else {
        url = `/login`;
      }
      const apiCall = self._client.post(url, params);
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Logout user system manager
   * @param {string} session Session, token JWT
   * @return {promise<object>}} data
   * @return {boolean} data.success true|false
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
   * const { success } = await api.login.logout(session);
   */
  async logout(session) {
    const self = this;
    try {
      Joi.assert(session, Joi.string().required());

      const apiCall = self._client.get('/logout', self._setHeader(session));
      const { response = 'NOT_OK' } = self._returnData(await apiCall);
      return response === 'OK';
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Recover the password
   * @param {string} username The username or email
   * @return {promise<object>}} data
   * @return {boolean} data.success true|false
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   *
   * // Params of the instance
   * const params = {...}
   * const api = new API(params);
   * const { success } = await api.login.recover('myusername');
   */
  async recover(username) {
    const self = this;

    try {
      Joi.assert(username, Joi.string().required());

      const url = `users/${username}/sendResetEmail`;
      const apiCall = self._client.get(url);
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

export default Login;
