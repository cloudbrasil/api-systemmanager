import _ from 'lodash';
import Joi from 'joi';
import Boom from '@hapi/boom';

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
   * @description Show information for session, thus validating the session (Valid token JWT)
   * @param {string} sessionId The user session (JWT Token)
   * @param {string} suSessionId=sessionId Given a JWT Token of a SU (SuperAdmin), allow to check session for another user.
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const sessionId = 'eyJhbFVBBiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const suSessionId = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.session.information(sessionId, suSessionId);
   *
   */
  async information(sessionId, suSessionId = null) {
    const self = this;

    try {
      Joi.assert(sessionId, Joi.string().required());

      // if not provided, just use the same sessionId
      suSessionId = suSessionId || sessionId;

      const apiCall = self._client.get(`session?token=${sessionId}`, self._setHeader(suSessionId));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

export default Session;
