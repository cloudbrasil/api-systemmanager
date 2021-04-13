const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('joi');
const Axios = require('axios');

/**
 * @description Class for organizations, permission user
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
   * @author Augusto Pissarra <abernardo.br@gmail.com>
   * @description Find organization by id
   * @param {string} orgId ID of the organization to find (_id database)
   * @param {string} session Is token JWT
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const orgId = '80443245000122';
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.organization.findById(idCard, session);
   */
  async findById(orgId, session) {
    const self = this;

    try {
      Joi.assert(orgId, Joi.string().required(), 'orgId ID of the organization to find (_id database_');
      Joi.assert(session, Joi.string().required(), 'SM session (JWT) to call API');

      const apiCall = self._client.get(`/organizations/${orgId}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Augusto Pissarra <abernardo.br@gmail.com>
   * @description Check if id card exist
   * @param {string} idcard Check if id card exist
   * @param {string} session Is token JWT
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const idCard = '80443245000122';
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.organization.idCardExist(idCard, session);
   */
  async idCardExist(idCard, session) {
    const self = this;

    try {
      Joi.assert(idCard, Joi.string().required(), 'Check if id card exist');
      Joi.assert(session, Joi.string().required(), 'SM session (JWT) to call API');

      const apiCall = self._client.get(`/organizations/exist/idcard/${idCard}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Augusto Pissarra <abernardo.br@gmail.com>
   * @description Call URL internal
   * @param {!object} params Params to call fectch (URL internal)
   * @param {!string} params.url URL to call
   * @param {!string} [params.method=POST] Fetch Method
   * @param {string} params.payload Payload to send
   * @returns {promise}
   * @public
   * @async
   /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Call URL internal, need auth JWT (session)
   * @param {!object} params Params to call fectch (URL internal)
   * @param {!string} params.url URL to call
   * @param {!string} [params.method=POST] Fetch Method
   * @param {string} params.payload Payload to send system manager
   * @returns {promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   *
   * const params = {
   *   url: 'http://localhost:8080/organizations/..../process/..../task/candidateAccepted/end/....',
   *   method: 'POST'
   * }
   * await api.user.organization.callFetchs(params, session);
   */
  async callFetch(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to call fectch (URL internal)');
      Joi.assert(params.url, Joi.string().required(), 'URL to call');
      Joi.assert(params.method, Joi.string(), 'Fetch Method');
      Joi.assert(params.payload, Joi.object(), 'Payload to send system manager');
      Joi.assert(session, Joi.string().required(), 'Session to call');

      const {url, payload = {}} = params;
      let {method} = params;

      method = method.toLowerCase();
      const methodWithPayload = ['post', 'put'];

      const options = {
        method,
        headers: {authorization: session},
        url,
      };

      if (methodWithPayload.indexOf(method) !== -1)
        options.data = payload;

      return await self._returnData(await Axios(options));

    } catch (ex) {
      throw ex;
    }
  }
}

module.exports = Organization;
