import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';
import Moment from 'moment';

/**
 * Class for documents, permission user
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
   * @description Create document with informed data
   * @param {object} params Object for add new document
   * @param {string} params.orgname Organization name
   * @param {string} params.areaId Doc area id (_id database)
   * @param {string} params.docId Document id (_id database)
   * @param {string} [params.documentDate=new\ Date()] Date of document
   * @param {string} params.filename File name
   * @param {string} params.type Mimetype of the document (image/png)
   * @param {string} params.name Doument name
   * @param {string} [params.content=''] Content of document
   * @param {string} [params.description=''] Description of document
   * @param {string} [params.category=''] Category of document
   * @param {array} [params.tags=[]] Tags of document
   * @param {string} params.docTypeId Document type id (_id database)
   * @param {boolean} [params.hasPhisicalStorage=false] Has Phisical Storage
   * @param {string} [params.boxId=''] Box ID
   * @param {string} [params.storageStatus=''] Storage status
   * @param {boolean} [params.ocrDocumentBackend=false] Ocr document backend
   * @param {number} params.bytes Size document in bytes
   * @param {object} [params.docAreaPermission={}] Permission to doc area
   * @param {object} [params.docTypeFieldsData={}] Fields data "extraField'
   * @param {string} params.signedUrl SIgned URL
   * @param {string} [params.urlType='S3'] URL type
   * @param {string} [params.addType='S3_SIGNED'] Add type
   * @return {{documentDate: *, docId: *, docAreaPermission: *, document: *, docTypeFieldsData: *, description: *, storageStatus: *, type: *, content: *, tags: *, addType: *, urlType: *, areaId: *, orgname: *, docTypeId: *, bytes: *, name: *, category: *, hasPhisicalStorage: *, signedUrl: *, ocrDocumentBackend: *, boxId: *}}
   * @private
   */
  _formatDocument(params) {
    try {
      return {
        orgname: _.get(params, 'orgname'),
        areaId: _.get(params, 'areaId'),
        docId: _.get(params, 'docId'),
        documentDate: _.get(params, 'documentDate', Moment().format()),
        document: _.get(params, 'document'),
        type: _.get(params, 'type'),
        name: _.get(params, 'name'),
        content: _.get(params, 'content', ''),
        description: _.get(params, 'description', ''),
        category: _.get(params, 'category', ''),
        tags: _.get(params, 'tags', []),
        docTypeId: _.get(params, 'docTypeId'),
        hasPhisicalStorage: _.get(params, 'hasPhisicalStorage', false),
        boxId: _.get(params, 'boxId', ''),
        storageStatus: _.get(params, 'storageStatus', ''),
        ocrDocumentBackend: _.get(params, 'ocrDocumentBackend', false),
        bytes: _.get(params, 'bytes'),
        docAreaPermission: _.get(params, 'docAreaPermission', {}),
        docTypeFields: _.get(params, 'docTypeFields', {}), // {"extraId": userId},
        docTypeFieldsData: _.get(params, 'docTypeFieldsData', {}), // {"extraId": userId},
        signedUrl: _.get(params, 'signedUrl', ''),
        urlType: _.get(params, 'urlType', 'S3'),
        addType: _.get(params, 'addType', 'S3_SIGNED'),
      };
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Transform objtect query in query string
   * @param {object} searchQuery object wicth query
   * @return {string} Retutn string query
   * @private
   */
  _queryReducer(searchQuery) {
    return Object.keys(searchQuery).reduce((query, key, idx, sourceList) => {
      idx++;

      const data = key === 'ix'
        ? JSON.stringify(searchQuery[key])
        : searchQuery[key];

      const querySearch = sourceList.length === idx
        ? `${key}=${data}`
        : `${key}=${data}&`;

      query += querySearch;
      return query;
    }, '');
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Create new document
   * @param {object} params Object for add new document
   * @param {string} params.orgname Organization name
   * @param {string} params.areaId Doc area id (_id database)
   * @param {string} params.docId Document id (_id database)
   * @param {string} [params.documentDate=new\ Date()] Date of document
   * @param {string} params.document The path to the file. If S3, the key to S3, gotten after getting a signed URL
   * @param {string} params.filename File name
   * @param {string} params.type Mimetype of the document (image/png)
   * @param {string} params.name Document name
   * @param {string} [params.content=''] Content of document
   * @param {string} [params.description=''] Description of document
   * @param {string} [params.category=''] Category of document
   * @param {array} [params.tags=[]] Tags of document
   * @param {string} params.docTypeId Document type id (_id database)
   * @param {boolean} [params.hasPhisicalStorage=false] Has Phisical Storage
   * @param {string} [params.boxId=''] Box ID
   * @param {string} [params.storageStatus=''] Storage status
   * @param {boolean} [params.ocrDocumentBackend=false] Ocr document backend
   * @param {number} params.bytes Size document in bytes
   * @param {object} [params.docAreaPermission={}] Permission to doc area
   * @param {object} [params.docTypeFieldsData={}] Fields data "extraField'
   * @param {string} params.signedUrl SIgned URL
   * @param {string} [params.urlType='S3'] URL type
   * @param {string} [params.addType='S3_SIGNED'] Add type
   * @param {string} params.orgId Organization id (_id database)
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  orgname: 'cloundbrasil',
   *  areaId: '5edf9f8ee896b817e45b8dac',
   *  docId: '5edf86fbe896b817e45b8da6',
   *  fileName: 'foto',
   *  type: 'image/png',
   *  name: 'Fotografia',
   *  docTypeId = '5edf9f8ee896b817e45b8dac',
   *  bytes: 12345,
   *  signedUrl: 'https://s3.amazonaws.com...'
   *  docTypeFieldsData: {extraUser: '12349f8ee896b817e45b8dac'},
   *  orgId: '5df7f19618430c89a41a19d2',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.document.findByIdAndRemove(params, session);
   */
  async add(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.orgname, Joi.string().required());
      Joi.assert(params.areaId, Joi.string().required());
      Joi.assert(params.docId, Joi.string().required());
      Joi.assert(params.type, Joi.string().required());
      Joi.assert(params.name, Joi.string().required());
      Joi.assert(params.docTypeId, Joi.string().required());
      Joi.assert(params.bytes, Joi.number().required());
      Joi.assert(params.orgId, Joi.string().required());
      Joi.assert(session, Joi.string().required());
      Joi.assert(params.signedUrl, Joi.string().required());

      // Get fields required, and set data default to create document
      const payloadToSend = self._formatDocument(params);

      Joi.assert(payloadToSend.documentDate, Joi.string().allow(''));
      Joi.assert(payloadToSend.content, Joi.string().allow(''));
      Joi.assert(payloadToSend.description, Joi.string().allow(''));
      Joi.assert(payloadToSend.category, Joi.string().allow(''));
      Joi.assert(payloadToSend.tags, Joi.array());
      Joi.assert(payloadToSend.hasPhisicalStorage, Joi.boolean());
      Joi.assert(payloadToSend.boxId, Joi.string().allow(''));
      Joi.assert(payloadToSend.storageStatus, Joi.string().allow(''));
      Joi.assert(payloadToSend.ocrDocumentBackend, Joi.boolean());
      Joi.assert(payloadToSend.docAreaPermission, Joi.object().allow({}));
      Joi.assert(payloadToSend.docTypeFieldsData, Joi.object().allow({}));
      Joi.assert(payloadToSend.urlType, Joi.string().allow(''));
      Joi.assert(payloadToSend.addType, Joi.string().allow(''));

      const {areaId, orgId} = params;
      const apiCall = self._client
        .put(`/organizations/${orgId}/areas/${areaId}/documents`, payloadToSend, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @param {object} params Object with params
   * @param {string} params.index Field to search
   * @param {string} params.txtToSearch Text to search
   * @param {string} [params.compare=*] Filter to search (=, ~, *, =*, *=, *?)
   * @param {string} params.docId Document id for serach
   * @param {string} params.docAreaId Doc area id
   * @param {string} params.tag Tag of the document
   * @param {string} [params.projection=""] Projection to return fields
   * @param {string} [params.sort="Mais+recentes"] Sort data
   * @param {string} params.orgId Organization id (_id database)
   * @param {string} params.pagination Set pagination
   * @param {number} [params.pagination.page=1] Page
   * @param {number} [params.pagination.perPage=100] perPage Itens per page
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  index: 'extraCity',
   *  txtToSearch: 'São',
   *  docId: '5df7f19618430c89a41a19d2',
   *  docAreaId: '5edd11c46b6ce9729c2c297c',
   *  tag: 'Nome da cidade',
   *  orgId: '1234d01dc4af3941d42f8c5c'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.document.findByIdAndRemove(params, session);
   */
  async find(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.index, Joi.string().required());
      Joi.assert(params.txtToSearch, Joi.string().allow(null));
      Joi.assert(params.compare, Joi.string().allow(null));
      Joi.assert(params.docId, Joi.string().required());
      Joi.assert(params.docAreaId, Joi.string().required());
      Joi.assert(params.tag, Joi.string().required());
      Joi.assert(params.projection, Joi.string());
      Joi.assert(params.orgId, Joi.string().required());
      Joi.assert(params.sort, Joi.string());

      if (_.hasIn(params, 'pagination')) {
        Joi.assert(params.pagination, Joi.object());
        Joi.assert(params.pagination.page, Joi.number());
        Joi.assert(params.pagination.perPage, Joi.number());
      }

      Joi.assert(session, Joi.string().required());

      const orgId = _.get(params, 'orgId');
      const index = _.get(params, 'index');
      const txtToSearch = _.get(params, 'txtToSearch', null);
      const compare = _.get(params, 'compare', '*');
      const tag = _.get(params, 'tag');
      const defaultSearch = {
        p: 100,             // Per page
        i: 1,               // Initial page
        s: 'Mais+recentes', // Sort to search
        ai: '',             // Doc Area Id lists emprego_net
        di: '',             // Document Type Id
        m: 'w',             // Default
        pj: ''              // Projection
      };

      // Mount query to search autocomplete
      defaultSearch.p = _.get(params, 'pagination.perPage', 100);
      defaultSearch.i = _.get(params, 'pagination.page', 1);
      defaultSearch.s = _.get(params, 'sort', 'Mais+recentes');
      defaultSearch.ai = _.get(params, 'docAreaId');
      defaultSearch.di = _.get(params, 'docId');
      defaultSearch.pj = `_id,${_.get(params, 'projection', '')}`;

      if (!_.isNull(txtToSearch)) {
        defaultSearch.ix = {ix: [[index, txtToSearch, compare, 'string', tag]]};
      }

      const query = self._queryReducer(defaultSearch);
      const apiCall = self._client.get(`/organizations/${orgId}/documents/search?${query}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }

  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Remove document by id
   * @param {object} params Params to remove document
   * @param {string} params.docId Document Id (_id database)
   * @param {string} params.orgId Organizarion id (_id database)
   * @param {string} session Session, token JWT
   * @return {Promise<object>} data The returned data
   * @return {number} data.removed The quantity of removed documents
   * @return {array<object>} data.errors Array of errors
   * @return {string} data.errors.id Id of the document that had an error
   * @return {string} data.errors.code Error code
   * @return {string} data.errors.message Error message
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  docId: '5dadd01dc4af3941d42f8c5c',
   *  orgIdId: '5df7f19618430c89a41a19d2',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.document.findByIdAndRemove(params, session);
   */
  async findByIdAndRemove(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.docId, Joi.string().required());
      Joi.assert(params.orgId, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const {docId, orgId} = params;
      const payloadToSend = {documents: [{_id: docId}]};
      const apiCall = self._client.post(`/organizations/${orgId}/documents/remove`, payloadToSend, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Remove documents
   * @param {object} params Params to remove document
   * @param {array<string>} params.documents An array ids of documents (_id database)
   * @param {array<string>} params.documents._id The document id (_id database)
   * @param {string} params.orgId Organizarion id (_id database)
   * @param {string} session Session, token JWT
   * @return {Promise<object>} data The returned data
   * @return {number} data.removed The quantity of removed documents
   * @return {array<object>} data.errors Array of errors
   * @return {string} data.errors.id Id of the document that had an error
   * @return {string} data.errors.code Error code
   * @return {string} data.errors.message Error message
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  documents: [{ _id: '5dadd01dc4af3941d42f8c5c' }],
   *  orgIdId: '5df7f19618430c89a41a19d2',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.document.findByIdsAndRemove(params, session);
   */
  async findByIdsAndRemove(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.documents, Joi.array().required());
      Joi.assert(params.orgId, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const {documents, orgId} = params;
      const payloadToSend = { documents };
      const apiCall = self._client.post(`/organizations/${orgId}/documents/remove`, payloadToSend, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   *
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Request signed url url to put or get
   * @param {object} params Params to request signed url
   * @param {string} params.methodType Method type HTTP get or put
   * @param {string} params.docId Document id
   * @param {string} params.fileName File name
   * @param {string} params.docAreaId docAreaId of the document
   * @param {string} params.type mimeType image/png image/jpg others
   * @param {string} params.document Name document to request if method type is get
   * @param {string} params.orgId Organization id (_id database)
   * @param {string} session Session, token JWT
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
   *  docId: '5dadd01dc4af3941d42f8c5c',
   *  docAreaId: '5df7f19618430c89a41a19d2',
   *  fileName: 'Foto',
   *  type: 'image/png'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const { doc: { docId, name, areaId, type, signedUrl } } = await api.user.document.signedUrl(params, session);
   *
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  methodType: 'get',
   *  document: 'pinkandthebrain/5df7f19618430c89a41a19d2/5dadd01dc4af3941d42f8c5c/9dadd01dc4af3941d42f6dd4.pdf',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const base64Data = await api.user.document.signedUrl(params, session);
   */
  async signedUrl(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.methodType, Joi.string().required());
      Joi.assert(params.orgId, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const {methodType} = params;

      if (methodType === 'put') {
        Joi.assert(params, Joi.object().required());
        Joi.assert(params.docId, Joi.string().required());
        Joi.assert(params.docAreaId, Joi.string().required());
        Joi.assert(params.fileName, Joi.string().required());
        Joi.assert(params.type, Joi.string().required());
      } else {
        Joi.assert(params.document, Joi.string().required());
      }

      const {orgId} = params;
      let payloadToSend;

      if (params.methodType === 'put') {
        const {docId, fileName: name, docAreaId: areaId, type} = params;
        payloadToSend = {docs: [{docId, name, areaId, type}]};
      } else {
        const {document} = params;
        payloadToSend = {docs: [{document}]};
      }

      const apiCall = self._client
        .post(`/organizations/${orgId}/documents/getDocumentSignedUrl/${methodType}`, payloadToSend, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Uploads the file
   * @param {object} params Params to upload document
   * @param {buffer} params.content The content of the file (Buffer)
   * @param {string} params.signedUrl The signed URL
   * @param {string} params.type The file mime type
   * @return {Promise<boolean>} True if success
   *
   * @public
   * @async
   * @example
   *
   * const FS = require('fs');
   * const Path = require('path');
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  content: FS.readFileSync(Path.join(__dirname, '.mypdf.pdf')),
   *  signedUrl: 'https://signedurl.com/token...',
   *  type: 'application/pdf'
   * };
   * const retData = await api.user.document.uploadSignedDocument(params);
   */
  async uploadSignedDocument(params) {
    const { content, signedUrl, type } = params;
    Joi.assert(params, Joi.object().required());
    Joi.assert(params.content, Joi.required());
    Joi.assert(params.signedUrl, Joi.string().required());
    Joi.assert(params.type, Joi.string().required());

    const self = this;
    const headers = {
      headers: {
        'Content-Type': type
      }
    };
    const apiCall = self._client
        .put(signedUrl, content, headers);
    const retData = self._returnData(await apiCall);
    return true;
  }

}

export default Documents;
