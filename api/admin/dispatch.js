const _ = require('lodash');
const Joi = require('@hapi/joi');
const Axios = require('axios');

class Dispatch {

  /**
   * @constructor
   * @description Options for constructor
   * @param {object} options Options to new instance
   * @param {object} options.parent This of the parent
   */
  constructor(options) {

    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;

    self.parent = options.parent;
    self._session = '';
    self._orgId = '';
    self._client = Axios.create({baseURL: self.parent.options.uri});

    self._startInterceptors();
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
   * @description Interceptors HTTP to request, response and errors
   * @private
   */
  _startInterceptors() {
    const self = this;

    self._client.interceptors.request.use(request => {
      return request;
    });

    self._client.interceptors.response.use(response => {
      return response;
    }, error => {
      const {response} = error;
      const httpStatusToRetry = _.get(self, 'parent.options.httpStatusToRetry');

      if (httpStatusToRetry.indexOf(response.statusCode) > -1) {
      }

      return Promise.reject(error)
    });
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Set new session in authorization header
   * @param {object} params Object with params
   * @param {string} params.session New session isi JWT
   * @param {string} params.orgId Organization id
   * @private
   */
  setSession(params) {
    try {

      Joi.assert(params, Joi.object().required());
      Joi.assert(params.session, Joi.string().required());
      Joi.assert(params.orgId, Joi.string().required());

      const self = this;
      const {session, orgId} = params;

      self._session = session;
      self._orgId = orgId;
      self._client.defaults.headers.common.Authorization = self._session;
    } catch (ex) {
      throw new Error(ex.message);
    }
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Get organization id
   * @return {string} return orgId
   * @public
   */
  getOrgId() {
    const self = this;
    return self._orgId;
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Get session id JWT
   * @return {string} return session JWT
   * @public
   */
  getSession() {
    const self = this;
    return self._session;
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Clean session id JWT
   * @public
   */
  cleanSession() {
    const self = this;
    self._client.defaults.headers.common.Authorization = '';
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Get client Axios
   * @return {string} return client axios
   * @public
   */
  getClient() {
    const self = this;
    return self._client;
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Get client Axios
   * @return {string} return client axios
   * @public
   */
  sessionIsValid(session) {
    return new Promise(async (resolve, reject) => {
      try {

        Joi.assert(session, Joi.string().required());

        const self = this;
        const apiCall = self._client.get(`/session?token=${session}`);
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    });
  }
}

module.exports = Dispatch;
