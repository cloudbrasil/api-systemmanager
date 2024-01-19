import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';

/**
 * Class for my tasks, permission user
 * @class
 */
class MyTasks {

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
   * @description Method to find my tasks for a user
   * @param {object} params Params to get tasks
   * @param {object} params.query Search my tasks query
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
   *  query: {"s":[{"historyBegin":{"order":"desc"}}],"i":1,"p":20},
   *  orgId: '55e4a3bd6be6b45210833fae',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const retSearch = await api.user.task.mytasks.find(params, session);
   */
  async find(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to get my tasks');
      Joi.assert(params.query, Joi.object().required(), 'The query for the search');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const {query, orgId} = params;
      const queryString = JSON.stringify(query);
      const apiCall = self._client
        .post(`/organizations/${orgId}/users/tasks/advsearch?query=${queryString}`, {}, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Update task dueDate
   * @param {object} data The Date to save
   * @param {string} data.dueDate DueDate
   * @param {string} data.orgId Organization id
   * @param {string} data.taskId Task Id
   * @param {string} session Is token JWT of user
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const data = {
   *    dueDate: '2011-10-05T14:48:00.000Z',
   *    orgId: '646386c9583e04a131adc894',
   *    taskId: '646386c9583e04a131adc895'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.task.mytasks.saveDueDate(data, session);
   */
  async saveDueDate(data, session) {
    const self = this;

    try {
      Joi.assert(data, Joi.object().required());
      Joi.assert(data.dueDate, Joi.string().required());
      Joi.assert(data.orgId, Joi.string().required());
      Joi.assert(data.taskId, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const {taskId, orgId} = params;

      const apiCall = self._client.put(`/organizations/${orgId}/users/tasks/${taskId}/duedate`, data, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Update task dueDate
   * @param {string} data.orgId Organization id
   * @param {string} data.taskId Task Id
   * @param {string} session Is token JWT of user NOT allow SU
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const data = {
   *    orgId: '646386c9583e04a131adc894',
   *    taskId: '646386c9583e04a131adc895'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.task.mytasks.removeDueDate(data, session);
   */
  async removeDueDate(data, session) {
    const self = this;

    try {
      Joi.assert(data, Joi.object().required());
      Joi.assert(data.orgId, Joi.string().required());
      Joi.assert(data.taskId, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const {taskId, orgId} = params;

      const apiCall = self._client.delete(`/organizations/${orgId}/users/tasks/${taskId}/duedate`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

export default MyTasks;
