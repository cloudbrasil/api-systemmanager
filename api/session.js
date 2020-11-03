const _ = require('lodash');
const Joi = require('joi');
const Boom = require('@hapi/boom');

/**
 * @class Session manager of the API
 */
class Session {

  constructor(options) {
    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self._session;
    self._userData;

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
   * @description Show information for session (Valid token JWT)
   * @param {string} sessionId Is session (Token JWT)
   * @param {string} session Is session (token JWT) of th user SU
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const sessionId = 'eyJhbFVBBiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.session.information(token, session);
   */
  async information(sessionId, session) {
    const self = this;

    try {
      Joi.assert(sessionId, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const apiCall = self._client.get(`session?token=${sessionId}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

module.exports = Session;
