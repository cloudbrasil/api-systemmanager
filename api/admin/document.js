import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';

/**
 * Admin Class for documents, permission admin
 * @class
 */
class AdminDocuments {

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

      const apiCall = self._client.post(`/admin/documents/search`, payload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
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

  /**
   *
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Request signed url url to put or get
   * @param {object} params Params to request signed url
   * @param {string} params.methodType Method type HTTP get or put
   * @param {string} params.docId The unique id of the document
   * @param {string} apiKey Api Key as permission to use this functionality
   * @return {Promise<object>} doc Returned document data with the signed url
   * @return {string} doc.docId Document id
   * @return {string} doc.name The name of the document, which is the fileName
   * @return {string} doc.areaId docAreaId of the document
   * @return {string} doc.type the document mimi type
   * @return {string} doc.signedUrl the signed URL to upload
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  methodType: 'put',
   *  docId: '5dadd01dc4af3941d42f8c5c'
   * };
   * const apiKey: '...';
   * const { docId, name, areaId, type, signedUrl } = await api.admin.document.signedUrl(params, apiKey);
   *
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  methodType: 'get',
   *  docId: '5dadd01dc4af3941d42f8c5c'
   * };
   * const apiKey: '...';
   * const { signedUrl, imageType } = await api.admin.document.signedUrl(params, apiKey);
   */
  async signedUrl(params = {}, apiKey) {

    Joi.assert(params, Joi.object().required());
    Joi.assert(params.methodType, Joi.string().required());
    Joi.assert(params.docId, Joi.string().required());
    Joi.assert(apiKey, Joi.string().required());

    const self = this;
    const { methodType, docId } = params;
    const url = `/api/documents/signedurl?apiKey=${apiKey}&methodType=${methodType}&docId=${docId}`;
    const apiCall = self._client
        .get(url);

    return self._returnData(await apiCall);
  }

  /**
   *
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Update a document content
   * @param {object} params Params to request signed url
   * @param {string} params.content The content text
   * @param {string} params.docId The unique id of the document
   * @param {string} apiKey Api Key as permission to use this functionality
   * @return {Promise<object>} doc Returned document data with the signed url
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  content: 'some text...',
   *  docId: '5dadd01dc4af3941d42f8c5c'
   * };
   * const apiKey: '...';
   * await api.admin.document.updateContent(params, apiKey);
   */
  async updateContent(params = {}, apiKey) {

    Joi.assert(params, Joi.object().required());
    Joi.assert(params.content, Joi.string().required());
    Joi.assert(params.docId, Joi.string().required());
    Joi.assert(apiKey, Joi.string().required());

    const self = this;
    const { content, docId } = params;
    const url = `/api/documents/${docId}/content?apiKey=${apiKey}`;
    const data = { content };
    const apiCall = self._client
        .put(url, data, {
          maxContentLength: Infinity,
          maxBodyLength: Infinity
        });
    return self._returnData(await apiCall);
  }

  /**
   *
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Update a document content
   * @param {object} params Params to request signed url
   * @param {string} params.content The content text
   * @param {string} params.docId The unique id of the document
   * @param {string} params.searchablePDFURL The searchable PDF Url
   * @param {object} params.overlay The overlay information
   * @param {array} params.entities The list of entities extracted from the text
   * @param {object} params.language The language detected
   * @param {string} params.language.name The language name detected
   * @param {string} params.language.confidence The confidence that it is the language
   * @param {string} apiKey Api Key as permission to use this functionality
   * @return {Promise<object>} doc Returned document data with the signed url
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  content: 'some text...',
   *  docId: '5dadd01dc4af3941d42f8c5c'
   * };
   * const apiKey: '...';
   * await api.admin.document.updateContent(params, apiKey);
   */
  async updateAI(params = {}, apiKey) {

    Joi.assert(params, Joi.object().required());
    Joi.assert(params.docId, Joi.string().required());
    Joi.assert(apiKey, Joi.string().required());

    const self = this;
    const { docId } = params;
    delete params.docId;
    const url = `/api/documents/${docId}/ai?apiKey=${apiKey}`;
    const apiCall = self._client
        .put(url, params, {
          maxContentLength: Infinity,
          maxBodyLength: Infinity
        });
    return self._returnData(await apiCall);
  }

  /**
   *
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Get the content of a document
   * @param {object} params Params to request signed url
   * @param {string} params.docId The unique id of the document
   * @param {string} params.page The page, from 0, or 'all' if all pages (the full content)
   * @param {string} apiKey Api Key as permission to use this functionality
   * @return {Promise<object>} data the document content
   * @return {string} data._id the _id of the document
   * @return {string} data.content all the pages or if asked by page, just one page, the one requested
   * @return {string} data.content.TextOverlay the overlay text if requested
   * @return {string} data.content.ParsedText the page text content
   * @return {number} data.total the total number of pages
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  page: '0',
   *  docId: '5dadd01dc4af3941d42f8c5c'
   * };
   * const apiKey: '...';
   * await api.admin.document.getContent(params, apiKey);
   */
  async getContent(params = {}, apiKey) {

    Joi.assert(params, Joi.object().required());
    Joi.assert(params.docId, Joi.string().required());
    Joi.assert(params.page, Joi.string().required());
    Joi.assert(apiKey, Joi.string().required());

    const self = this;
    const { page, docId } = params;
    const url = `/api/documents/${docId}/content/${page}?apiKey=${apiKey}`;
    const apiCall = self._client
        .get(url);
    return self._returnData(await apiCall);
  }

}

export default AdminDocuments;
