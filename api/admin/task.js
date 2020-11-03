const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('joi');

/**
 * @description Class for task, permission admin
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
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get task by user Id
   * @param {object} params Params to get task
   * @param {string} params.userId User id (_id database)
   * @param {string} [params.filter=NOT_DONE] Filter type CLEAN | EXECUTED | PENDING | LATE | NOT_DONE | DONE
   * @param {boolean} [params.includeOwner=false] Include owner true | false
   * @param {string} session Session, token JWT
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  userId: '55e4a3bd6be6b45210833fae',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.task.find(params, session);
   */
  async find(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.userId, Joi.string().required());
      Joi.assert(params.filter, Joi.string());
      Joi.assert(params.includeOwner, Joi.boolean());
      Joi.assert(session, Joi.string().required());

      const filterType = _.get(params, 'filter', 'NOT_DONE');
      const includeOwner = _.get(params, 'includeOwner', false);
      const {userId} = params;

      const filter = self._taskFilters(filterType);
      const queryString = `taskFilter=${filter}&includeOwner=${includeOwner}`;
      const apiCall = self._client.get(`/admin/users/${userId}/tasks?${queryString}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

module.exports = Task;
