const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

/**
 * Class for proccess
 * @class
 */
class Proccess {

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
   * @param {object} params Params to start proccess
   * @param {string} params.proccesId ProcessId is id proccess in mongodb
   * @param {object} params.payload Payload start process
   * @return {Promise<unknown>}
   * @public
   * @async
   */
  startProcess(params) {
    return new Promise(async (resolve, reject) => {
      try {
        Joi.assert(params, Joi.object().required());
        Joi.assert(params.processId, Joi.string().required());
        Joi.assert(params.payload, Joi.object().required());

        const self = this;
        const { processId, payload } = params;
        const orgId = self.parent.dispatch.getOrgId();
        const apiCall = self.client.put(`/organizations/${orgId}/process/${processId}`, payload);
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    });
  }
}

module.exports = Proccess;
