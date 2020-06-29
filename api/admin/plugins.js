const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

/**
 * Class for plugins
 * @class
 */
class Plugins {

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
   * @description Get plugins by id database
   * @param {object=} [id={nome:'thiago'\,sobrenome:'Anselmo'}] - Id form in mongodb
   * @return {Promise}
   * @public
   * @async
   * @example
   * const API = new API();
   *
   * const id = '234r5t6y78i923456789';
   * await API.getById(id);
   */
  getById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        Joi.assert(id, Joi.string().required());

        const self = this;
        const apiCall = self.client.get(`/admin/plugins/${id}`);
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    });
  }
}

module.exports = Plugins;
