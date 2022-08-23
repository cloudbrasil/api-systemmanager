import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';

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
    self.gender = {
      male: 1,
      female: 2,
      nonBinary: 3
    };
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
   * await api.user.profile.updateAvatar(params, session);
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
   * await api.user.profile.removeAvatar(session);
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

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Remove the signature of user by session
   * @param {string} session Is token JWT of user NOT allow SU
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.profile.removeSignature(session);
   */
  async removeSignature(session) {
    const self = this;

    try {
      Joi.assert(session, Joi.string().required());

      const apiCall = self._client.delete(`/users/signature`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Sava a new signature of user by session
   * @param {object} data The signature data to save
   * @param {string} data.type CURSIVE or HANDWRITE
   * @param {string} data.file CURSIVE the <fontname>:<name used on the signature>
   *                      HANDWRITE the base 64 image (w/o the mime a base prefix)
   * @param {string} session Is token JWT of user NOT allow SU
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const data = {
   *    type: 'CURSIVE',
   *    file: 'allura:Mary John Heart'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.profile.saveSignature(data, session);
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const data = {
   *    type: 'HANDWRITE',
   *    file: 'iVBORw0KGgoAAAANSUhEUgAAAj...'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.profile.saveSignature(session);
   */
  async saveSignature(data, session) {
    const self = this;

    try {
      Joi.assert(data, Joi.object().required());
      Joi.assert(data.type, Joi.string().required());
      Joi.assert(data.file, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const apiCall = self._client.put(`/users/signature`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Update a user profile by id
   * @param {object} params Params to update task
   * @param {string} params.name The name of the user
   * @param {string} params.site The site of the user
   * @param {string} params.faceboook The faceboook of the user
   * @param {string} params.linkedin The linkedin of the user
   * @param {date} params.dob The date of birth of the user
   * @param {number<UserGender>} params.gender The gender of of the user self.gender
   * @param {string} params.phone The phone
   * @param {string} params.phone2 The phone 2
   * @param {string} params.phone3 The phone 3
   * @param {string} params.password The password to change
   * @param {string} params.secQuestion The security question
   * @param {string} params.secAnswer The security answer
   * @param {string} params.timezone The timezone
   * @param {string} params.userLanguage The user language
   * @param {string} params.changePassword (required) If we need to change the status and we changed the password
   * @param {string} params.acceptTermsOfUse If the user has accepted the terms of change
   * @param {string} session Session, token JWT
   * @return {Promise<void>}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  name: 'New Name'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.profile.findByIdAndUpdate(params, session);
   */
  async findByIdAndUpdate(params = {}, session) {
    const self = this;

    try {
      Joi.assert(session, Joi.string().required());
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.changePassword, Joi.boolean().required());

      if(_.isEmpty(params)) return;

      const { changePassword = false, password = '' } = params;

      if(changePassword && password === '') {
        throw new Error('It is required to change the password')
      } else {
        params.changePassword = false;
      }

      const url = 'users';
      const apiCall = self._client.put(url, params, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Change a user's organization
   * @param {string} id Organization id
   * @param {string} session Is token JWT of user NOT allow SU
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const id = '616eccaaa9360a05293b10fe';
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.changeOrganization.updateAvatar(id, session);
   */
  async changeOrganization(id, session) {
    const self = this;

    try {
      Joi.assert(id, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const apiCall = self._client.put(`/organizations/${id}/change`, null, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

export default User;
