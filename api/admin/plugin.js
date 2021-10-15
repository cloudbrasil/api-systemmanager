const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('joi');

/**
 * Admin Class for plugin, permission admin
 * @class
 */
class AdminPlugin {

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
   * @author Augusto Pissarra <abernardo.br@gmail.com>
   * @description Find plugins
   * @param {object} params - Params to search plugins
   * @param {number} params.page - Start page to pagination
   * @param {number} params.perPage - Items per page
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {page: 1, perPage: 200};
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.organization.findById(params, session);
   */
  async find(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to search plugins');
      Joi.assert(params.page, Joi.number(), 'Start page to pagination');
      Joi.assert(params.perPage, Joi.number(), 'Items per page');
      Joi.assert(session, Joi.string().required(), 'SM session (JWT) to call API');

      const {page = 1, perPage = 300} = params
      const queryString = `page=${page}&perPage=${perPage}`;

      const apiCall = self._client.post(`/admin/plugins?${queryString}`, {}, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get plugin by ID
   * @param {string} id Plugin Id (_id database)
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const id ='55e4a3bd6be6b45210833fae',
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.plugin.findById(id, session);
   */
  async findById(id, session) {
    const self = this;

    try {
      Joi.assert(id, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const apiCall = self._client.get(`/admin/plugins/${id}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

module.exports = AdminPlugin;
