const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

/**
 * @description Class for organizations, permission user
 * @class
 */
class Organization {

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
   * @author Augusto Pissarra <abernardo.br@gmail.com>
   * @description Find organization by id
   * @param {string} orgId ID of the organization to find (_id database)
   * @param {string} session Is token JWT
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const orgId = '80443245000122';
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.organization.findById(idCard, session);
   */
  findById(orgId, session) {
    return new Promise(async (resolve, reject) => {
      try {
        Joi.assert(orgId, Joi.string().required(), 'orgId ID of the organization to find (_id database_');
        Joi.assert(session, Joi.string().required(), 'SM session (JWT) to call API');

        const self = this;

        const apiCall = self._client.get(`/organizations/${orgId}`, self._setHeader(session));
        const retData = self._returnData(await apiCall);

        if (_.isEmpty(retData)) throw Boom.notFound('Organization not found with informed id!');

        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    })
  }

  /**
   * @author Augusto Pissarra <abernardo.br@gmail.com>
   * @description Check if id card exist
   * @param {string} idcard Check if id card exist
   * @param {string} session Is token JWT
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const idCard = '80443245000122';
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.organization.idCardExist(idCard, session);
   */
  idCardExist(idCard, session) {
    return new Promise(async (resolve, reject) => {
      try {
        Joi.assert(idCard, Joi.string().required(), 'Check if id card exist');
        Joi.assert(session, Joi.string().required(), 'SM session (JWT) to call API');

        const self = this;

        const apiCall = self._client.get(`/organizations/exist/idcard/${idCard}`, self._setHeader(session));
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    })
  }
}

module.exports = Organization;
