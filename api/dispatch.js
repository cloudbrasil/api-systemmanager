import _ from 'lodash';
import Joi from 'joi';
import Axios from 'axios';

/**
 * @class Api dispatch manager
 */
class Dispatch {

  constructor(options) {

    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self.parent = options.parent;
    self._client = Axios.create({baseURL: self.parent.options.uri});
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
   * Get the URL context
   * @param url {string} Full url
   * @param session {session} Session, token JWT
   * @return {Promise<object>} The full data context of the URL
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const retContext = await api.dispatch.getContext('http://myndware.io/login/myorg);
   *
   */
  async getContext(url, session = null) {
    Joi.assert(url, Joi.string().required());

    if(url.includes('?')) {
      url = `${url}&json=true`;
    } else {
      url = `${url}?json=true`;
    }

    const self = this;
    const header = session ? self._setHeader(session) : {};
    const apiCall = self._client.get(url, header);
    return self._returnData(await apiCall);
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get client Axios
   * @return {promise} return client axios
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * await api.dispatch.getClient();
   */
  getClient() {
    try {
      const self = this;
      return self._client;
    } catch (ex) {
      return ex;
    }
  }
}

export default Dispatch;
