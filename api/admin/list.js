const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('joi');

/**
 * Class for lists, permission admin
 * @class
 */
class Lists {

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
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get list by ID
   * @param {object} params Params to find list by id
   * @param {string} params.id List Id (_id database)
   * @param {string} params.orgId Organization Id (_id database)
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  id: '55e4a3bd6be6b45210833fae',
   *  orgId: '5edd11c46b6ce9729c2c297c',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.list.findById(params, session);
   */
  async findById(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.id, Joi.string().required());
      Joi.assert(params.orgId, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const {id, orgId} = params;
      const apiCall = self._client.get(`/admin/organizations/${orgId}/orgtags/${id}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get all lists
   * @param {object} params={} Params to pagination and orgId
   * @param {number} [params.page=0] Current page to pagination
   * @param {number} [params.perPage=200] Qnt itens per page
   * @param {string} params.orgId Organization Id (_id database)
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  orgId: '55e4a3bd6be6b45210833fae'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.list.find(params, session);
   */
  async find(params = {}, session) {
    const self = this;

    try {

      Joi.assert(params, Joi.object());
      Joi.assert(params.page, Joi.number());
      Joi.assert(params.perPage, Joi.number());
      Joi.assert(params.orgId, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const orgId = _.get(params, 'orgId');
      const page = _.get(params, 'page', 0);
      const perPage = _.get(params, 'perPage', 200);
      const apiCall = self._client
        .post(`/admin/organizations/${orgId}/orgtags?page=${page}&perPage=${perPage}`, {}, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

module.exports = Lists;
