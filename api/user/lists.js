const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

/**
 * Class for lists
 * @class
 */
class Lists {

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
   * @description Get list by ID
   * @param {string} id Id form in mongodb
   * @return {Promise<unknown>}
   * @public
   * @async
   */
  getById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        Joi.assert(id, Joi.string().required());

        const self = this;
        const orgId = self.parent.dispatch.getOrgId();
        const apiCall = self.client.get(`/admin/organizations/${orgId}/orgtags/${id}`);
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Get all lists
   * @param {object} params Params to pagination
   * @param {number} params.page Current page to pagination
   * @param {number} params.perPage Qnt itens per page
   * @return {Promise<unknown>}
   * @public
   * @async
   */
  getAll(params = {}) {
    return new Promise(async (resolve, reject) => {
      try {

        Joi.assert(params, Joi.object());
        Joi.assert(params.page, Joi.number());
        Joi.assert(params.perPage, Joi.number());

        const self = this;
        const orgId = self.parent.dispatch.getOrgId();
        const page = _.get(params, 'page', 0);
        const perPage = _.get(params, 'perPage', 200);
        const apiCall = self.client.post(`/admin/organizations/${orgId}/orgtags?page=${page}&perPage=${perPage}`);
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    });
  }
}

module.exports = Lists;
