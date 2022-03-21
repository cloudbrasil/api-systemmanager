import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';

/**
 * Class for organizations, permission user
 * @class
 */
class Organization {

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
   * @description Update avatar of organization by session of user not allow session user SU
   * @param {object} params Params to update avatar
   * @param {string} params.orgId - Organization id
   * @param {string} params.avatar - Image in base64 to update
   * @param {string} params.type - MimeType (image/png)
   * @param {string} session - Is token JWT of user SU
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  orgId: '5dadd01dc4af3941d42f8c5c',
   *  avatar: 'iVBORw0KGgoAAAANSUhEUgAAAasAAAHnCAYAAAAGi3J6AAA9BElEQVR...He3/kk/m7kl35S8AAAAASUVORK5CYII=',
   *  type: 'image/png',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.organizations.upsertAvatar(params, session);
   */
  async upsertAvatar(params = {}, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id');
      Joi.assert(params.avatar, Joi.string().required(), 'Image in base64 to update');
      Joi.assert(params.type, Joi.string().required(), 'MimeType (image/png)');
      Joi.assert(session, Joi.string().required(), 'Is token JWT of user SU');

      const {orgId, avatar, type} = params;
      const payload = {avatar, type};

      const apiCall = self._client.put(`/admin/organizations/${orgId}/logo`, payload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Remove avatar of user by session of user not allow session user SU
   * @param {string} params.orgId - Organization id
   * @param {string} session - Is token JWT of user SU
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const orgId = '5dadd01dc4af3941d42f8c5c';
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.organizations.removeAvatar(orgId, session);
   */
  async removeAvatar(orgId, session) {
    const self = this;

    try {
      Joi.assert(orgId, Joi.string().required(), 'Organization id');
      Joi.assert(session, Joi.string().required(), 'Is token JWT of user SU');

      const apiCall = self._client.delete(`/admin/organizations/${orgId}/logo`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

export default Organization;
