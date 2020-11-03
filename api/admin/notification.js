const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('joi');

/**
 * Class for notification, permission admin
 * @class
 */
class Notification {

  constructor(options) {
    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self.parent = options.parent;
    self.client = self.parent.dispatch.getClient();
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
      return Boom.badRequest(_.get(retData, 'message', 'No error message reported!'))
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
   * @description Create notification
   * @param {object} params Params to create notification
   * @param {string} params.orgId OrgId of the user SU
   * @param {string} params.userId User to create notification
   * @param {object} params.message Object with data to send user
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  orgId: '5edd11c46b6ce9729c2c297c',
   *  userId: '55e4a3bd6be6b45210833fae',
   *  message: 'Olá como vai tudo bem?'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.notifications.add(params, session);
   */
  async add(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Object with params to add notifications');
      Joi.assert(params.orgId, Joi.string().required(), 'OrgId of the user SU');
      Joi.assert(params.userId, Joi.string().required(), 'User to create notification');
      Joi.assert(params.message, Joi.object().required(), 'Object with data to send user');
      Joi.assert(session, Joi.string().required(), 'Session, token JWT');

      const {orgId, ...notificationPayload} = params;
      const apiCall = self.client.post(`/admin/organizations/${orgId}/notifications`, notificationPayload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Search notification using (notificationId or userId)
   * @param {object} params Params to create notification
   * @param {string} params.orgId OrgId of the user SU
   * @param {string} params.id ALERT! Id is userId or id is notificationId
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  orgId: '5edd11c46b6ce9729c2c297c',
   *  id: '55e4a3bd6be6b45210833fae',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.notifications.findById(params, session);
   */
  async findById(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Object with params to add notifications');
      Joi.assert(params.orgId, Joi.string().required(), 'OrgId of the user SU');
      Joi.assert(params.id, Joi.string().required(), 'ALERT! Id is userId or id is notificationId');
      Joi.assert(session, Joi.string().required(), 'Session, token JWT');

      const {orgId, id} = params;
      const apiCall = self.client.get(`/admin/organizations/${orgId}/notifications/${id}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Update notification using (notificationId or userId)
   * @param {object} params Params to create notification
   * @param {string} params.orgId OrgId of the user SU
   * @param {string} params.id ALERT! Id is userId or id is notificationId
   * @param {boolean} params.read If message is read true or false
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  orgId: '5edd11c46b6ce9729c2c297c',
   *  id: '55e4a3bd6be6b45210833fae',
   *  read: true
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.notifications.findByIdAndUpdate(params, session);
   */
  async findByIdAndUpdate(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Object with params to add notifications');
      Joi.assert(params.orgId, Joi.string().required(), 'OrgId of the user SU');
      Joi.assert(params.id, Joi.string().required(), 'ALERT! Id is userId or id is notificationId');
      Joi.assert(params.read, Joi.boolean().required(), 'If message is read true or false');
      Joi.assert(session, Joi.string().required(), 'Session, token JWT');

      const {orgId, id, ...statusPayload} = params;
      const apiCall = self.client.put(`/admin/organizations/${orgId}/notifications/${id}`, statusPayload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Delete notification using (notificationId or userId)
   * @param {object} params Params to create notification
   * @param {string} params.orgId OrgId of the user SU
   * @param {string} params.id ALERT! Id is userId or id is notificationId
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  orgId: '5edd11c46b6ce9729c2c297c',
   *  id: '55e4a3bd6be6b45210833fae',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.notifications.findByIdAndDelete(params, session);
   */
  async findByIdAndRemove(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Object with params to add notifications');
      Joi.assert(params.orgId, Joi.string().required(), 'OrgId of the user SU');
      Joi.assert(params.id, Joi.string().required(), 'ALERT! Id is userId or id is notificationId');
      Joi.assert(session, Joi.string().required(), 'Session, token JWT');

      const {orgId, id} = params;
      const apiCall = self.client.delete(`/admin/organizations/${orgId}/notifications/${id}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

module.exports = Notification;
