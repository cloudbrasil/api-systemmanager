import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';

/**
 * Class for user registration in a user
 * @class
 */
class Notification {

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
   * Notification token types
   * @return {{FCM_CAPACITOR: string, FCM_WEB: string}}
   */
  get tokenTypes () {
    return {
      FCM_WEB: 'FCM_WEB',
      FCM_CAPACITOR: 'FCM_CAPACITOR'
    };
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Method to add a notification token
   * @param {object} params Params to add notification token
   * @param {string} params.token The token
   * @param {object} params.type The token type
   * @param {string} session Is token JWT of user NOT allow SU
   * @returns {promise<object>} data
   * @returns {boolean} data._id the id of the added token
   * @public
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const params = {
   *  token: 'V6OSBr4aEVoiE9H1b4xzLe+vqmXB+ShVNc/FvJGxnIz4tZv6jBJkk4aQzz2',
   *  type: 'FCM_WEB'
   * };
   * const retData = await api.user.notification.addToken(params, session);
   */
  async addToken(params = {}, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to get task');
      Joi.assert(params.token, Joi.string().required(), 'Token is required');
      Joi.assert(params.type, Joi.string().required(), ' The token type');

      const apiCall = self._client
        .put(`/users/notifications/token`, params, self._setHeader(session));

      const retData = self._returnData(await apiCall);
      return retData;
    } catch (ex) {
      throw ex;
    }
  }
}

export default Notification;
