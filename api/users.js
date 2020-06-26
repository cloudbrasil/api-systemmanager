const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

/**
 * Class for users
 * @class
 */
class Users {

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
   * @param {string} id User id in mongodb
   * @return {Promise<unknown>}
   * @public
   * @async
   */
  getProfile(id) {
    return new Promise(async (resolve, reject) => {
      try {

        Joi.assert(id, Joi.string().required());

        const self = this;
        const apiCall = self.client.get(`/admin/users/${id}`);
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @param {object} params Params to update password
   * @param {string} params.id Id of the user
   * @param {string} params.oldPassword Old password
   * @param {string} params.newPassword New password
   * @return {Promise<unknown>}
   * @public
   * @async
   */
  updatePassword(params) {
    return new Promise(async (resolve, reject) => {
      try {
        Joi.assert(params, Joi.object().required());
        Joi.assert(params.id, Joi.string().required());
        Joi.assert(params.oldPassword, Joi.string().required());
        Joi.assert(params.newPassword, Joi.string().required());

        const self = this;
        const {id, ...payload} = params;
        const apiCall = self.client.put(`/admin/users/${id}/password`, payload);
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Check if value is unique
   * @param {object} params Params to update password
   * @param {string} params.field Field to check
   * @param {string} params.query Query to search
   * @param params
   */
  isunique(params) {
    return new Promise(async (resolve, reject) => {
      try {
        Joi.assert(params, Joi.object().required());
        Joi.assert(params.field, Joi.string().valid('cnpj', 'email').required());
        Joi.assert(params.query, Joi.string().required());

        const self = this;
        const {field, query} = params;
        let retData;

        if (field === 'cnpj') {
          const idCard = query.replace(/[\/.\-\"']/gi, '');
          const apiCall = self.client.get(`/organizations/exist/idcard/${idCard}`);
          retData = self._returnData(await apiCall);

        } else if (field === 'email') {
          const payload = {email: query};
          const apiCall = self.client.post(`/admin/users/email/exist`, payload);
          retData = self._returnData(await apiCall);
        }
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    })
  }
}

module.exports = Users;
