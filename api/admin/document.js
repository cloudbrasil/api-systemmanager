const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('joi');

/**
 * Class for documents, permission admin
 * @class
 */
class Documents {

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
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Advanced search of document in elastic search ussing system manager
   * @param {!object} params - Params to search document
   * @param {!string} params.docId - Document id (_id database)
   * @param {!object} params.query - Query to search in elastic search
   * @param {!string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   docId: '5edd11c46b6ce9729c2c297c',
   *   query: {
   *      "query": {
   *        "bool": {
   *          "minimum_should_match": 1,
   *          "should": [
   *            {
   *              "match": {
   *                "locationText.keyword": {
   *                  "query": "sao pau"
   *                }
   *              }
   *            },
   *            {
   *              "wildcard": {
   *                "locationText.normalized": "*sao pau*"
   *              }
   *            }
   *          ]
   *        }
   *      }
   *    }
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.document.advancedSearch(params, session);
   */
  async advancedSearch(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to search document');
      Joi.assert(params.docId, Joi.string().required(), 'Document ID');
      Joi.assert(params.query, Joi.object().required(), 'eQuery, query to search document in elastic search');
      Joi.assert(session, Joi.string().required(), 'Session is token JWT');

      const {docId: docTypeId, query} = params;
      const payload = {docTypeId, query};

      const {docId, orgId} = params;
      const apiCall = self._client.post(`/admin/documents/search`, payload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get document by id
   * @param {object} params - Params to get document by id
   * @param {string} params.docId - Document id (_id database)
   * @param {string} params.orgId - Organization id (_id database)
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  docId: '5edd11c46b6ce9729c2c297c',
   *  orgId: '55e4a3bd6be6b45210833fae'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.document.findById(params, session);
   */
  async findById(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to get document by id');
      Joi.assert(params.docId, Joi.string().required(), 'Document id (_id database)');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(session, Joi.string().required(), 'Session is token JWT');

      const {docId, orgId} = params;
      const apiCall = self._client.get(`/admin/organizations/${orgId}/documents/${docId}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

module.exports = Documents;
