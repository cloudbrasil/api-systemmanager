import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';

/**
 * Class user access to charts
 * @class
 */
class Chart {
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
        authorization: session,
      }
    };
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Get the data for a chart
   * @param {object} params Params to get helps from topic
   * @param {object} params.type Type of the chart data
   * @param {object} params.query The query if any
   * @param {string} session Session, token JWT
   * @returns {promise}
   * @public
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  type: 'heatmap_data'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.dashboard.chart.getData(params, session);
   */
  async getData(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to helps from a topic');
      Joi.assert(params.type, Joi.string().required(), 'Type of graph');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const { type, query = {} } = params;
      const apiCall = self._client.post(`/organizations/dashboard/chart/data/${type}`, query, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Get the question data from a chart data
   * @param {object} params Params to get helps from topic
   * @param {object} params.orgId The organization id of the question
   * @param {object} params.processId The process id of the question
   * @param {object} params.path The path of the question so we can retrieve it
   * @param {string} session Session, token JWT
   * @returns {promise} data the question data
   * @public
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  orgId: '637e7523f555fabdfb1ed7b6',
   *  processId: '123e7523f555fabdfb1ed7c6',
   *  path: 'Checklist.Group Name.Field Name'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.dashboard.chart.getQuestion(params, session);
   */
  async getQuestion(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to helps from a topic');
      Joi.assert(params.orgId, Joi.string().required(), 'The organization id of the question');
      Joi.assert(params.processId, Joi.string().required(), 'The process id of the question');
      Joi.assert(params.path, Joi.string().required(), 'The path of the field of the question');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const apiCall = self._client.post(`/organizations/dashboard/chart/question/data`, params, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

/**
 * Class user access to dashboards
 * @class
 */
class Dashboard {

  constructor(options) {
    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self.parent = options.parent;
    self._client = self.parent.dispatch.getClient();
    self._chart = new Chart(options);
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
        authorization: session,
      }
    };
  }

  /**
   * @author Augusto Pissarra <abernardo.br@gmail.com>
   * @description return the chart
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.help.getTopics({}, session);
   */
    get chart() {
      const self = this;
      return self._chart;
  }
}

export default Dashboard;
