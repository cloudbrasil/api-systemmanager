const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('joi');

/**
 * Class for user, permission user
 * @class
 */
class User {

  constructor(options) {
    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self._parent = options.parent;
    self._client = self._parent.dispatch.getClient();
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
   * @description Update avatar of user by session of user not allow session user SU
   * @param {object} params Params to update avatar
   * @param {string} params.avatar Image in base64 to update
   * @param {string} params.type mimeType (image/png)
   * @param {string} session Is token JWT of user NOT allow SU
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  avatar: '55e4a3bd6be6b45210833fae',
   *  type: '123456',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.user.updateAvatar(params, session);
   */
  async updateAvatar(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.avatar, Joi.string().required());
      Joi.assert(params.type, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const {avatar, type} = params;
      const payload = {avatar, type};

      const apiCall = self._client.post(`/users/avatar`, payload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Remove avatar of user by session of user not allow session user SU
   * @param {string} session Is token JWT of user NOT allow SU
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.user.removeAvatar(session);
   */
  async removeAvatar(session) {
    const self = this;

    try {
      Joi.assert(session, Joi.string().required());

      const apiCall = self._client.delete(`/users/avatar`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

module.exports = User;
