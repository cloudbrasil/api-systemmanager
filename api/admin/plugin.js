const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

/**
 * Class for plugin, permission admin
 * @class
 */
class Plugin {

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
   * @description Get plugin by ID
   * @param {string} id Plugin Id (_id database)
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const id ='55e4a3bd6be6b45210833fae',
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.plugin.findById(id, session);
   */
  findById(id, session) {
    return new Promise(async (resolve, reject) => {
      const self = this;

      try {
        Joi.assert(id, Joi.string().required());
        Joi.assert(session, Joi.string().required());

        const apiCall = self._client.get(`/admin/plugins/${id}`, self._setHeader(session));
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(self._returnData(ex));
      }
    });
  }
}

module.exports = Plugin;