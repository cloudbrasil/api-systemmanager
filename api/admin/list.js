import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';

/**
 * Admin Class for lists, permission admin
 * @class
 */
class AdminLists {

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
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Set header with new session
   * @param {string} session Session, token JWT
   * @return {object} header with new session
   * @private
   */
  _setHeader(session) {
    return {
      headers: {
        Authorization: session,
      }
    };
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
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
   * @author Myndware <augusto.pissarra@myndware.com>
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

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Filter organization lists by name
   * @param {object} params Parameters
   * @param {string} params.orgId Organization ID (required)
   * @param {array} [params.names=[]] Array of list names to filter (empty = all)
   * @param {string} session JWT session token
   * @return {Promise<array>} Array of matching org lists sorted by name
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = { orgId: '5edd11c46b6ce9729c2c297c', names: ['Tags', 'Categorias'] };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const lists = await api.admin.list.filterByName(params, session);
   */
  async filterByName(params = {}, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.orgId, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const { orgId, names = [] } = params;
      const payload = { names };

      const apiCall = self._client.post(
        `/admin/organizations/${orgId}/orgtags/filter`,
        payload,
        self._setHeader(session)
      );

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Create a new organization list
   * @param {object} params Parameters
   * @param {string} params.orgId Organization ID (required)
   * @param {string} params.name List name (required)
   * @param {array} [params.list=[]] Initial list items
   * @param {string} session JWT session token
   * @return {Promise<object>} Created list document
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = { orgId: '5edd11c46b6ce9729c2c297c', name: 'My List', list: [] };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const list = await api.admin.list.create(params, session);
   */
  async create(params = {}, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.orgId, Joi.string().required());
      Joi.assert(params.name, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const { orgId, name, list = [] } = params;
      const payload = { orgId, name, list };

      const apiCall = self._client.put(
        `/admin/organizations/${orgId}/orgtags`,
        payload,
        self._setHeader(session)
      );

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Update an organization list
   * @param {object} params Parameters
   * @param {string} params.orgId Organization ID (required)
   * @param {string} params.id List ID (required)
   * @param {object} params.data Fields to update (name, list, etc.)
   * @param {string} session JWT session token
   * @return {Promise<object>} Updated list document
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = { orgId: '5edd11c46b6ce9729c2c297c', id: '55e4a3bd6be6b45210833fae', data: { name: 'Renamed' } };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const list = await api.admin.list.update(params, session);
   */
  async update(params = {}, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.orgId, Joi.string().required());
      Joi.assert(params.id, Joi.string().required());
      Joi.assert(params.data, Joi.object().required());
      Joi.assert(session, Joi.string().required());

      const { orgId, id, data } = params;

      const apiCall = self._client.put(
        `/admin/organizations/${orgId}/orgtags/${id}`,
        data,
        self._setHeader(session)
      );

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Remove an organization list
   * @param {object} params Parameters
   * @param {string} params.orgId Organization ID (required)
   * @param {string} params.id List ID to remove (required)
   * @param {string} session JWT session token
   * @return {Promise<object>} Removal confirmation
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = { orgId: '5edd11c46b6ce9729c2c297c', id: '55e4a3bd6be6b45210833fae' };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.list.remove(params, session);
   */
  async remove(params = {}, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.orgId, Joi.string().required());
      Joi.assert(params.id, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const { orgId, id } = params;

      const apiCall = self._client.delete(
        `/admin/organizations/${orgId}/orgtags/${id}`,
        self._setHeader(session)
      );

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Update list items of an organization list
   * @param {object} params Parameters
   * @param {string} params.orgId Organization ID (required)
   * @param {string} params.id List ID (required)
   * @param {array} params.list Updated list items array (required)
   * @param {string} session JWT session token
   * @return {Promise<object>} Updated list document
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   orgId: '5edd11c46b6ce9729c2c297c',
   *   id: '55e4a3bd6be6b45210833fae',
   *   list: [{ _id: '1', value: 'Item 1', filter: '', order: 0 }]
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const list = await api.admin.list.updateListItems(params, session);
   */
  async updateListItems(params = {}, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.orgId, Joi.string().required());
      Joi.assert(params.id, Joi.string().required());
      Joi.assert(params.list, Joi.array().required());
      Joi.assert(session, Joi.string().required());

      const { orgId, id, list } = params;

      const apiCall = self._client.put(
        `/admin/organizations/${orgId}/orgtags/${id}`,
        { list },
        self._setHeader(session)
      );

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

export default AdminLists;
