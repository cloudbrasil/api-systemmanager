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
   * @author Myndware <augusto.pissarra@myndware.com>
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
   * @author Myndware <augusto.pissarra@myndware.com>
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
   * @author Myndware <augusto.pissarra@myndware.com>
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
   * @author Myndware <augusto.pissarra@myndware.com>
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
   * @author Myndware <augusto.pissarra@myndware.com>
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

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Method to remove process
   * @param {object} params Params to remove process
   * @param {object} params.orgId Organization id (_id database)
   * @param {object} params.processId Process id (_id database)
   * @param {string} session Session, token JWT
   * @public
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  orgId: '55e4a3bd6be6b45210833fae',
   *  processId: '55e4a3bd6be6b45210833fae'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const retSearch = await api.user.process.remove(params, session);
   */
  async remove(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to remove the process');
      Joi.assert(params.processId, Joi.string().required(), 'Process id (_id database)');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const {processId, orgId} = params;

      const apiCall = self._client.delete(`/organizations/${orgId}/process/${processId}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
  * @author Myndware <augusto.pissarra@myndware.com>
  * @description Method to export status data
  * @param {object} params Params to export status data
  * @param {object} params.query Search process query
  * @param {object} params.orgId Organization id (_id database)
  * @param {string} session Session, token JWT
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
  * const retSearch = await api.user.process.exportStatusData(params, session);
  */
  async exportStatusData(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to export status data');
      Joi.assert(params.query, Joi.object().required(), 'The query for the search');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const {query, orgId} = params;
      const queryString = JSON.stringify(query);
      const apiCall = self._client
        .get(`/organizations/${orgId}/process/export/status/data?query=${queryString}`, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
  * @author Myndware <augusto.pissarra@myndware.com>
  * @description Method to export process data
  * @param {object} params Params to export process data
  * @param {object} params.query Search process query
  * @param {object} params.orgId Organization id (_id database)
  * @param {string} session Session, token JWT
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
  * const retSearch = await api.user.process.exportProcessData(params, session);
  */
  async exportProcessData(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to export process data');
      Joi.assert(params.query, Joi.object().required(), 'The query for the search');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const {query, orgId} = params;
      const queryString = JSON.stringify(query);
      const apiCall = self._client
        .get(`/organizations/${orgId}/process/export/collect/data?query=${queryString}`, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
  * @author Myndware <augusto.pissarra@myndware.com>
  * @description Method to get Process Docs
  * @param {object} params Params to get process docs
  * @param {string} params.orgProcessId Organization Process Id
  * @param {string} params.processId Process Id
  * @param {string} params.orgId Organization id (_id database)
  * @param {string} session Session, token JWT
  * @returns {promise} returned data from the get process docs
  * @returns {array<object>} Docs returned from process
  * @public
  * @example
  *
  * const API = require('@docbrasil/api-systemmanager');
  * const api = new API();
  * const params = {
  *  orgProcessId: '55e4a3bd6be6b45210833fae',
  *  processId: '55e4a3bd6be6b45210833fae',
  *  orgId: '55e4a3bd6be6b45210833fae',
  * };
  * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
  * const retSearch = await api.user.process.processDocs(params, session);
  */
  async processDocs(params, session) {
  const self = this;

  try {
    Joi.assert(params, Joi.object().required(), 'Params to get process docs');
    Joi.assert(params.orgProcessId, Joi.string().required(), 'Organization Process Id');
    Joi.assert(params.processId, Joi.string().required(), 'Process Id');
    Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
    Joi.assert(session, Joi.string().required(), 'Session token JWT');

    const {orgProcessId, processId, orgId} = params;
    const apiCall = self._client.get(`/organizations/${orgId}/orgprocess/${orgProcessId}/process/${processId}/documents`, self._setHeader(session));
    return self._returnData(await apiCall);
  } catch (ex) {
    throw ex;
  }
  }

  /**
  * @author Myndware <augusto.pissarra@myndware.com>
  * @description Method to download the process documents
  * @param {object} params Params to download the process documents
  * @param {string} params.orgId Organization id (_id database)
  * @param {string} params.type Document Type
  * @param {array} params.docIds Documents Ids
  * @param {string} params.footer Documents Footer
  * @param {string} session Session, token JWT
  * @returns {promise} returned data from the search
  * @public
  * @example
  *
  * const API = require('@docbrasil/api-systemmanager');
  * const api = new API();
  * const params = {
  *  orgId: '55e4a3bd6be6b45210833fae',
  *  type: 'Docs',
  *  docIds: ['55e4a3bd6be6b45210833fae'],
  *  footer: 'Documento - {page} de {pages}'
  * };
  * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
  * const result = await api.user.process.downloadDocs(params, session);
  */
  async downloadDocs(params, session) {
  const self = this;

  try {
    Joi.assert(params, Joi.object().required(), 'Params to download the process documents');
    Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
    Joi.assert(params.type, Joi.string().required(), 'Document Type');
    Joi.assert(params.docIds, Joi.array().required(), 'Document Ids');
    Joi.assert(session, Joi.string().required(), 'Session token JWT');

    const {orgId, type, docIds, footer} = params;
    const data = {
      docIds
    };

    if (footer) {
      data.footer = footer
    }

    const apiCall = self._client
      .post(`/organizations/${orgId}/documents/download/${type}`, data, self._setHeader(session));

    return self._returnData(await apiCall);
  } catch (ex) {
    throw ex;
  }
  }

  /**
  * @author Myndware <augusto.pissarra@myndware.com>
  * @description Get DocType properties of process
  * @param {object} params Params to get document DocType
  * @param {string} params.docTypeId Document DocTypeId id (_id database);
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
  *   docTypeId: '5dadd01dc4af3941d42f8c5c',
  *   orgId: '5edd11c46b6ce9729c2c297c',
  * }
  * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
  * await api.user.process.getOrgDocTypes(params, session);
  */
  async getOrgDocTypes(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.docTypeId, Joi.string().required());
      Joi.assert(params.orgId, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const {docTypeId, orgId} = params;
      const apiCall = self._client.get(`/organizations/${orgId}/doctype/${docTypeId}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
  * @author Myndware <augusto.pissarra@myndware.com>
  * @description Get Org Groups
  * @param {object} params Params to get Org Groups
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
  *   orgId: '5edd11c46b6ce9729c2c297c',
  * }
  * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
  * await api.user.process.getOrgGroups(params, session);
  */
  async getOrgGroups(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.orgId, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const {orgId} = params;
      const apiCall = self._client.get(`/organizations/${orgId}/groups`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
  * @author Myndware <augusto.pissarra@myndware.com>
  * @description Get Org Users
  * @param {object} params Params to get Org Users
  * @param {string} params.orgId Organization id (_id database);
  * @param {array} params.userIds UserIds
  * @param {string} session Session, token JWT
  * @return {Promise}
  * @public
  * @async
  * @example
  *
  * const API = require('@docbrasil/api-systemmanager');
  * const api = new API();
  * const params = {
  *   orgId: '5edd11c46b6ce9729c2c297c',
  *   userIds: []
  * }
  * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
  * await api.user.process.getOrgUsers(params, session);
  */
  async getOrgUsers(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.orgId, Joi.string().required());
      Joi.assert(params.userIds, Joi.array().required());
      Joi.assert(session, Joi.string().required());

      const {orgId, userIds} = params;
      let queryString = '';
              if(!_.isEmpty(userIds)) {
                  queryString = `?userIds=${JSON.stringify(userIds)}&{"sort":{"name":1}}`;
              }
      const apiCall = self._client.get(`/admin/organizations/${orgId}/orgusers${queryString}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
  * @author Myndware <augusto.pissarra@myndware.com>
  * @description Get step history of a process flow
  * @param {object} params Params to get step history
  * @param {string} params.orgId Organization id (_id database);
  * @param {string} params.processId Process id (_id database);
  * @param {string} params.flowId Flow id;
  * @param {string} session Session, token JWT
  * @return {Promise<Array>} Array of step history entries
  * @public
  * @async
  * @example
  *
  * const API = require('@docbrasil/api-systemmanager');
  * const api = new API();
  * const params = {
  *   orgId: '5edd11c46b6ce9729c2c297c',
  *   processId: '5dadd01dc4af3941d42f8c5c',
  *   flowId: 'Task_18v1xx7'
  * }
  * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
  * const stepHistory = await api.user.process.getStepHistory(params, session);
  */
  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Restart a finished process from a specific flow step. Resets the process completion state
   * and triggers re-execution from the specified flow name.
   * @param {object} params Params to restart the process
   * @param {string} params.processId Process id (_id database);
   * @param {string} params.orgId Organization id (_id database);
   * @param {string} params.flowName The flow name of the step to restart from;
   * @param {string} session Session, token JWT
   * @return {Promise<object>} { response: 'OK' } on success
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   processId: '5dadd01dc4af3941d42f8c5c',
   *   orgId: '5edd11c46b6ce9729c2c297c',
   *   flowName: 'Task_1'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.process.restart(params, session);
   */
  async restart(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to restart the process');
      Joi.assert(params.processId, Joi.string().required(), 'Process id (_id database)');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(params.flowName, Joi.string().required(), 'Flow name of the step');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const {processId, orgId, flowName} = params;
      const apiCall = self._client.put(`/organizations/${orgId}/process/${processId}/restart/${flowName}`, {}, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Re-execute a specific flow step in a running process. Unlike restart, this does not
   * reset the process completion state. Task creation is deferred to the BPMN engine via RabbitMQ.
   * @param {object} params Params to re-execute the process step
   * @param {string} params.processId Process id (_id database);
   * @param {string} params.orgId Organization id (_id database);
   * @param {string} params.flowName The flow name of the step to re-execute;
   * @param {string} session Session, token JWT
   * @return {Promise<object>} { response: 'OK' } on success
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   processId: '5dadd01dc4af3941d42f8c5c',
   *   orgId: '5edd11c46b6ce9729c2c297c',
   *   flowName: 'Task_1'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.process.reexecute(params, session);
   */
  async reexecute(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to re-execute the process step');
      Joi.assert(params.processId, Joi.string().required(), 'Process id (_id database)');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(params.flowName, Joi.string().required(), 'Flow name of the step');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const {processId, orgId, flowName} = params;
      const apiCall = self._client.put(`/organizations/${orgId}/process/${processId}/reexecute/${flowName}`, {}, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Re-execute a specific user task step in a running process, creating a new task
   * synchronously with optional userId reassignment. For non-group tasks, the task is reassigned
   * to the current logged-in user. For group tasks, the original assignment is preserved.
   * @param {object} params Params to re-execute the task
   * @param {string} params.processId Process id (_id database);
   * @param {string} params.orgId Organization id (_id database);
   * @param {string} params.flowName The flow name of the user task step to re-execute;
   * @param {string} session Session, token JWT
   * @return {Promise<object>} { response: 'OK', taskId } on success
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   processId: '5dadd01dc4af3941d42f8c5c',
   *   orgId: '5edd11c46b6ce9729c2c297c',
   *   flowName: 'Task_1'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const result = await api.user.process.reexecuteTask(params, session);
   * console.log(result.taskId);
   */
  async reexecuteTask(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to re-execute the task');
      Joi.assert(params.processId, Joi.string().required(), 'Process id (_id database)');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(params.flowName, Joi.string().required(), 'Flow name of the user task step');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const {processId, orgId, flowName} = params;
      const apiCall = self._client.put(`/organizations/${orgId}/process/${processId}/reexecutetask/${flowName}`, {}, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  async getStepHistory(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.orgId, Joi.string().required());
      Joi.assert(params.processId, Joi.string().required());
      Joi.assert(params.flowId, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const {orgId, processId, flowId} = params;
      const apiCall = self._client.get(`/organizations/${orgId}/process/${processId}/flow/${flowId}/history`, self._setHeader(session));
      return self._returnData(await apiCall, []);
    } catch (ex) {
      throw ex;
    }
  }
}

export default Process;
