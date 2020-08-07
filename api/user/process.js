const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

/**
 * Class for process, permission user
 * @class
 */
class Process {

  constructor(options) {
    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self.parent = options.parent;
    self._client = self.parent.dispatch.getClient();
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
   * @description Start process
   * @param {object} params Params to start process
   * @param {string} params.processId Process id (_id database);
   * @param {string} params.orgId Organization id (_id database);
   * @param {object} [params.payload={}] Start process with data
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   processId: '5dadd01dc4af3941d42f8c5c',
   *   orgId: '5edd11c46b6ce9729c2c297c',
   *   payload: {}
   * }
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.process.start(params, session);
   */
  start(params, session) {
    return new Promise(async (resolve, reject) => {
      const self = this;

      try {
        Joi.assert(params, Joi.object().required());
        Joi.assert(params.processId, Joi.string().required());
        Joi.assert(params.orgId, Joi.string().required());
        Joi.assert(params.payload, Joi.object());
        Joi.assert(session, Joi.string().required());

        const {processId, orgId, payload = {}} = params;
        const apiCall = self._client.put(`/organizations/${orgId}/process/${processId}`, payload, self._setHeader(session));
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    });
  }
}

module.exports = Process;
