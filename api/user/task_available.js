import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';

/**
 * Class for available tasks, permission user
 * @class
 */
class TaskAvailable {

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
   * @description Method to find available tasks for a user
   * @param {object} params Params to get task
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
   * const retSearch = await api.user.task.available.find(params, session);
   */
  async find(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to get task');
      Joi.assert(params.query, Joi.object().required(), ' The query for the search');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const {query, orgId} = params;
      const apiCall = self._client
        .post(`/organizations/${orgId}/users/tasks/groups/advsearch?query=${JSON.stringify(query)}`, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Method for a user to claim an available task
   * @param {object} params Params to get task
   * @param {object} params.taskId the task id to claim
   * @param {object} params.orgname Organization slug (short name of the orgnization)
   * @param {string} session Session, token JWT
   * @returns {promise} returned data from the method call
   * @returns {boolean} success true|false if the method was successful
   * @public
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  taskId: '55e4a3bd6be6b45210833f67',
   *  orgname: 'acme',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const success = await api.user.task.available.claim(params, session);
   */
  async claim(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to get task');
      Joi.assert(params.taskId, Joi.object().required(), 'The task id to claim');
      Joi.assert(params.orgname, Joi.string().required(), 'The slug of the organization');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const {query, orgId} = params;
      const apiCall = self._client
          .put(`/organizations/${orgname}/users/tasks/${taskId}/claim`, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

export default TaskAvailable;
