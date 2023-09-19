import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';

/**
 * Admin Class for user, permission admin
 * @class
 */
class AdminUser {

  constructor(options) {
    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self.parent = options.parent;
    self.client = self.parent.dispatch.getClient();
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get the return data and check for errors
   * @param {object} retData Response HTTP
   * @return {*}
   * @private
   */
  _returnData(retData, def = {}) {
    if (retData.status !== 200) {
      return Boom.badRequest(_.get(retData, 'message', 'No error message reported!'));
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
   * @description Request profile by userId
   * @param {string} userId User identifier (_id database)
   * @param {string} session Is token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const userId = '55e4a3bd6be6b45210833fae';
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.user.findById(userId, session);
   */
  async findById(userId, session) {
    const self = this;

    try {

      Joi.assert(userId, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const apiCall = self.client.get(`/admin/users/${userId}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Request profile by userId
   * @param {string} userIds Users identifier (_id database)
   * @param {string} apiKey Api to use to search users
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const userIds = ['55e4a3bd6be6b45210833fae', '55e4a3bd6be6b45210833fae'];
   * const apiKey = 'c9bbd652-d112-454e-8595-f1669f49dde0';
   * await api.admin.user.findByIds(userIds, apiKey);
   */
  async findByIds(userIds, apiKey) {
    const self = this;

    try {
      Joi.assert(userIds, Joi.array().items(Joi.string()).required(), 'Users identifier (_id database)');
      Joi.assert(apiKey, Joi.string().required(), 'Api to use to search users');

      const apiCall = self.client.post(`/api/users?apiKey=${apiKey}`, { userIds });
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Update password by userId
   * @param {object} params Params to update password
   * @param {string} params.userId Id of the user
   * @param {string} params.oldPassword Old password
   * @param {string} params.newPassword New password
   * @param {string} session Is token JWT
   * @return {Promise<unknown>}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  userId: '55e4a3bd6be6b45210833fae',
   *  oldPassword: '123456',
   *  newPassword: '123456789'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.user.findByIdAndUpdatePassword(params, session);
   */
  async findByIdAndUpdatePassword(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.userId, Joi.string().required());
      Joi.assert(params.oldPassword, Joi.string().required());
      Joi.assert(params.newPassword, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const { userId, ...payload } = params;
      const apiCall = self.client.put(`/admin/users/${userId}/password`, payload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Check if email is unique
   * @param {string} email Check if email is unique
   * @param {string} session Is token JWT
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const email = 'ana.silva@gmail.com';
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.user.emailExist(email, session);
   */
  async emailExist(email, session) {
    const self = this;

    try {
      Joi.assert(email, Joi.string().email().required());
      Joi.assert(session, Joi.string().required());

      const payload = { email };
      const apiCall = self.client.post(`/admin/users/email/exist`, payload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description update userData by userSMId
   * @param {string} userId - User SM Id
   * @param {object} payload - Payload to update
   * @param {string} session - Is token JWT
   * @returns {Promise<*>}
   * @async
   * @public
   * @example
   *
   * const userId = '55e4a3bd6be6b45210833fae';
   * const payload = {
   *   name: 'Maria joaquina',
   *   email: 'maria@gmail.com'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   */
  async findByIdAndUpdate(userId, payload, session) {
    const self = this;

    try {
      Joi.assert(userId, Joi.string().required(), 'User id of SM');
      Joi.assert(payload, Joi.object().required(), 'Payload to update');
      Joi.assert(session, Joi.string().required(), 'Session user admin');

      const apiCall = self.client.put(`/admin/users/${userId}`, payload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description Request GUID to change the password
   * @param {string} email - User email
   * @returns {Promise<*>}
   * @async
   * @public
   * @example
   *
   * const payload = {
   *   email: 'maria@gmail.com'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   */
  async getChangePasswordGuid(email, session) {
    const self = this;

    try {
      Joi.assert(email, Joi.string().required(), 'User email');
      Joi.assert(session, Joi.string().required(), 'Session user admin');

      const payload = { email };
      const apiCall = self.client.post('/admin/users/change/password', payload, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description Change password guid
   * @param {object} Payload - Payload to change password
   * @param {string} Payload.guid - GUID
   * @param {string} Payload.newPassword - New password
   * @returns {Promise<*>}
   * @async
   * @public
   * @example
   *
   * const payload = {
   *   guid: '5b3c049c-4861-4353-a423-5e3f14242642',
   *   newPassword: '123456789'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   */
  async changePasswordGuid(payload, session) {
    const self = this;

    try {
      Joi.assert(payload, Joi.object().required(), 'Payload to change password');
      Joi.assert(payload.guid, Joi.string().required(), 'GUID');
      Joi.assert(payload.newPassword, Joi.string().required(), 'New password');
      Joi.assert(session, Joi.string().required(), 'Session user admin');

      const apiCall = self.client.put('/admin/users/change/password', payload, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

export default AdminUser;
