import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';

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
   * @description Set header for a bigger payload
   * @param {string} session Session, token JWT
   * @return {object} header with new session
   * @private
   */
  _setMaxContentHeader(session) {
    return {
      headers: {
        authorization: session
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    };
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Start process
   * @param {object} params Params to start process
   * @param {string} params.orgProcessId The organization process id (_id database);
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
   *   orgProcessId: '5dadd01dc4af3941d42f8c5c',
   *   orgId: '5edd11c46b6ce9729c2c297c',
   *   payload: {}
   * }
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.process.start(params, session);
   */
  async start(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.orgProcessId, Joi.string().required());
      Joi.assert(params.orgId, Joi.string().required());
      Joi.assert(params.payload, Joi.object());
      Joi.assert(session, Joi.string().required());

      const {orgProcessId, orgId, payload = {}} = params;
      const apiCall = self._client.put(`/organizations/${orgId}/process/${orgProcessId}`, payload, self._setMaxContentHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get process properties of process
   * @param {object} params Params to get process properties
   * @param {string} params.processId Process id (_id database);
   * @param {string} params.orgId Organization id (_id database);
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
   * }
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.process.getProcessProperties(params, session);
   */
  async getProcessProperties(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.processId, Joi.string().required());
      Joi.assert(params.orgId, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const {processId, orgId} = params;
      const apiCall = self._client.get(`/organizations/${orgId}/process/${processId}/properties`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get the search info of a organization process
   * @param {object} params Params to get search info
   * @param {string} params.orgProcessId The id of an organization process (_id database);
   * @param {string} params.orgId Organization id (_id database);
   * @param {string} session Session, token JWT
   * @return {Promise} the search info result
   * @return {string} name the name of the organization process
   * @return {object} processIndexFields the list of fields to index
   * @return {object} processParticipantsGroup the permissions in this organization process
   * @return {object} stepsProperties the organization process steps properties
   * @return {string} _id the same organization id
   * @
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   orgProcessId: '5dadd01dc4af3941d42f8c67',
   *   orgId: '5edd11c46b6ce9729c2c297c',
   * }
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const retSearchInfo = await api.user.process.getOrgProcessSearchInfo(params, session);
   */
  async getOrgProcessSearchInfo(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.orgProcessId, Joi.string().required());
      Joi.assert(params.orgId, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const {orgProcessId, orgId} = params;
      const apiCall = self._client.get(`/organizations/${orgId}/orgprocess/${orgProcessId}/search/info`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Method to search processes
   * @param {object} params Params to search processes
   * @param {object} params.query Search process query
   * @param {object} params.orgId Organization id (_id database)
   * @param {string} session Session, token JWT
   * @returns {promise} returned data from the search
   * @returns {number} count the count of items searched
   * @returns {array<object>} items the items returned from search
   * @returns {number} page the page of the search (on pagination), zero indexed
   * @returns {number} perPage how many items per page
   * @public
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  query: {"orgProcessId": {"value":"62c2d1cdfb5455c195d1baa1","oper":"=","type":"string"},"s":[{"historyBegin":{"order":"desc"}}],"i":1,"p":20},
   *  orgId: '55e4a3bd6be6b45210833fae',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const retSearch = await api.user.process.find(params, session);
   */
  async find(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to search processes');
      Joi.assert(params.query, Joi.object().required(), 'The query for the search');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const {query, orgId} = params;
      const queryString = JSON.stringify(query);
      const apiCall = self._client
        .post(`/organizations/${orgId}/process/advsearch?query=${queryString}`, {}, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

export default Process;
