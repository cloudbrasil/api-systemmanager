const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

/**
 * Class for task, permission user
 * @class
 */
class Task {

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
   * @description Method to find task by id
   * @param {object} params Params to get task
   * @param {object} params.processId Proccess id (_id database)
   * @param {object} params.taskId Task id (_id database)
   * @param {object} params.orgId Organization id (_id database)
   * @param {string} session Session, token JWT
   * @returns {promise}
   * @public
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  processId: '5dadd01dc4af3941d42f8c5c',
   *  taskId: '5df7f19618430c89a41a19d2',
   *  orgId: '55e4a3bd6be6b45210833fae',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.task.findById(params, session);
   */
  findById(params, session) {
    return new Promise(async (resolve, reject) => {
      const self = this;

      try {
        Joi.assert(params, Joi.object().required());
        Joi.assert(params.processId, Joi.string().required());
        Joi.assert(params.taskId, Joi.string().required());
        Joi.assert(params.orgId, Joi.string().required());
        Joi.assert(session, Joi.string().required());

        const {processId, taskId, orgId} = params;
        const apiCall = self._client
          .get(`/organizations/${orgId}/process/${processId}/execute/${taskId}`, self._setHeader(session));

        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(self._returnData(ex));
      }
    });
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Find task by id and update
   * @param {object} params Params to update task
   * @param {object} params.userId User id (_id database)
   * @param {string} params.processId Proccess id (_id database)
   * @param {string} params.taskId Task id (_id database)
   * @param {string} params.flowName Flow name
   * @param {string} params.action Button action
   * @param {object} params.formData Data to update task
   * @param {string=} params.actionGuid GUID of the action
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  userId: '5739d4c6ccb0ebc61f2a9557',
   *  processId: '5dadd01dc4af3941d42f8c5c',
   *  taskId: '5df7f19618430c89a41a19d2',
   *  action: 1,
   *  formData: {name: 'CloudBrasil'},
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.task.findByIdAndUpdate(params, session);
   */
  findByIdAndUpdate(params) {
    return new Promise(async (resolve, reject) => {
      const self = this;

      try {
        Joi.assert(params, Joi.object().required());
        Joi.assert(params.userId, Joi.string().required());
        Joi.assert(params.processId, Joi.string().required());
        Joi.assert(params.taskId, Joi.string().required());
        Joi.assert(params.flowName, Joi.string().required());
        Joi.assert(params.action, Joi.number().required());
        Joi.assert(params.formData, Joi.object().required());
        Joi.assert(params.actionGuid, Joi.string());

        const orgId = self.parent.dispatch.getOrgId();
        const {processId, taskId, flowName, action, actionGuid, formData} = params;

        const getUrl = {
          0: () => `organizations/${orgId}/users/tasks/${taskId}/action/${actionGuid}`,
          1: () => `organizations/${orgId}/adhoc/${processId}/save/${taskId}/${flowName}`,
          2: () => `organizations/${orgId}/adhoc/${processId}/endprocess/${taskId}/${flowName}`
        };
        const url = getUrl[action]();
        const apiCall = self._client.put(url, formData, self._setHeader(session));
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(self._returnData(ex));
      }
    });
  }
}

module.exports = Task;
