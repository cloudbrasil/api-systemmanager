const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

/**
 * Class for tasks
 * @class
 */
class Tasks {

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @constructor
   * @param {object} options Params of the constructot
   * @param {object} options.parent This of the pararent
   */
  constructor(options) {
    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self.parent = options.parent;
    self.client = self.parent.dispatch.getClient();
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
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Get filter to search tasks
   * @param {string} filter Filter type
   * @return {*}
   * @private
   */
  _taskFilters(filter) {
    const taskFilters = {
      CLEAN: 1,
      EXECUTED: 2,
      PENDING: 3,
      LATE: 4,
      NOT_DONE: 5,
      DONE: 6
    };
    return _.get(taskFilters, filter, 'NOT_DONE');
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description List all task by userId
   * @param {string} id user id
   * @public
   * @async
   */
  listAll(id) {
    return new Promise(async (resolve, reject) => {
      try {
        Joi.assert(id, Joi.string().required());

        const self = this;
        const filter = self._taskFilters('NOT_DONE');
        const queryString = `taskFilter=${filter}&includeOwner=false`;
        const apiCall = self.client.get(`/admin/users/${id}/tasks?${queryString}`);
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Method to get one tasks by task id and process id
   * @param {object} params Params to get one task
   * @param {object} params.processId Proccess id
   * @param {object} params.taskId Task id
   * @returns {promise}
   * @public
   */
  getById(params) {
    return new Promise(async (resolve, reject) => {
      try {
        Joi.assert(params, Joi.object().required());
        Joi.assert(params.processId, Joi.string().required());
        Joi.assert(params.taskId, Joi.string().required());

        const self = this;
        const orgId = self.parent.dispatch.getOrgId();
        const {processId, taskId} = params;
        const apiCall = self.client.get(`/organizations/${orgId}/process/${processId}/execute/${taskId}`);
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Update task
   * @param {object} params.userId User id
   * @param {string} params.processId Proccess id
   * @param {string} params.taskId Task id
   * @param {string} params.flowName Flow name
   * @param {string} params.action Button action (Reject, approved, revised)
   * @param {string} params.formData Data change of th user
   * @param {string} params.actionGuid GUID of the action
   * @return {Promise<unknown>}
   * @public
   * @async
   */
  update(params) {
    return new Promise(async (resolve, reject) => {
      try {
        Joi.assert(params, Joi.object().required());
        Joi.assert(params.userId, Joi.string().required());
        Joi.assert(params.processId, Joi.string().required());
        Joi.assert(params.taskId, Joi.string().required());
        Joi.assert(params.flowName, Joi.string().required());
        Joi.assert(params.action, Joi.number().required());
        Joi.assert(params.formData, Joi.object().required());
        Joi.assert(params.actionGuid, Joi.string());

        const self = this;
        const orgId = self.parent.dispatch.getOrgId();
        const {processId, taskId, flowName, action, actionGuid, formData} = params;

        const getUrl = {
          0: () => `organizations/${orgId}/users/tasks/${taskId}/action/${actionGuid}`,
          1: () => `organizations/${orgId}/adhoc/${processId}/save/${taskId}/${flowName}`,
          2: () => `organizations/${orgId}/adhoc/${processId}/endprocess/${taskId}/${flowName}`
        };
        const url = getUrl[action]();
        const apiCall = self.client.put(url, formData);
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    });
  }
}

module.exports = Tasks;
