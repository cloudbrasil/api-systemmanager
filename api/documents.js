const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');
const Moment = require('moment');

/**
 * Class for documents
 * @class
 */
class Documents {

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

  _formatDocument(params) {

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.userId, Joi.string().required());
      Joi.assert(params.docId, Joi.string().required());
      Joi.assert(params.filename, Joi.string().required());
      Joi.assert(params.type, Joi.string().required());
      Joi.assert(params.name, Joi.string().required());
      Joi.assert(params.docTypeId, Joi.string().required());
      Joi.assert(params.areaId, Joi.string().required());
      Joi.assert(params.bytes, Joi.number().required());
      Joi.assert(params.signedUrl, Joi.string().required());

      const {userId, docId, areaId, filename, type, name, docTypeId, bytes, signedUrl} = params;

      return {
        orgname: "emprego.net",
        areaId,
        docId,
        documentDate: Moment().format(),
        document: filename, // File name in S3
        type: type, // Mime type (image/png)
        name, // File name
        content: "",
        description: "",
        category: "",
        tags: [],
        docTypeId,
        hasPhisicalStorage: false,
        boxId: "",
        storageStatus: "",
        ocrDocumentBackend: true,
        bytes, // 37298,
        docAreaPermission: {},
        docTypeFieldsData: {"extraId": userId},
        signedUrl, // "https://s3.amazonaws.com/dev.statitics.cloudbrasil/ati/5a81eb5baa88631108a2db18/0a28804ad76cd6901796cce80101523e.pdf?AWSAccessKeyId=AKIAJMG65QRMRYQ37X2Q&Content-Type=application%2Fpdf&Expires=1579945949&Signature=0v05La377G10L0Hz6Pp8UKS50Ag%3D",
        urlType: "S3",
        addType: "S3_SIGNED"
      };
    } catch (ex) {
      throw ex;
    }
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
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @param {object} params Object with params
   * @param {string} params.index Field to search ex: extraCityname
   * @param {string} params.txtToSearch Text to search ex: são
   * @param {string} params.docId Document id for serach
   * @param {string} params.docAreaId docArea id
   * @param {string} params.tag Tag of the document
   * @param {string} params.projection Projection to return fields
   * @return {Promise<unknown>}
   * @public
   * @async
   */
  autoComplete(params) {
    return new Promise(async (resolve, reject) => {
      try {

        Joi.assert(params, Joi.object().required());
        Joi.assert(params.index, Joi.string().required());
        Joi.assert(params.txtToSearch, Joi.string().required());
        Joi.assert(params.docId, Joi.string().required());
        Joi.assert(params.docAreaId, Joi.string().required());
        Joi.assert(params.tag, Joi.string().required());
        Joi.assert(params.projection, Joi.string());

        const self = this;
        const orgId = self.parent.dispatch.getOrgId();
        const index = _.get(params, 'index');
        const txtToSearch = _.get(params, 'txtToSearch');
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
        defaultSearch.ai = _.get(params, 'docAreaId');
        defaultSearch.di = _.get(params, 'docId');
        defaultSearch.pj = `_id,${_.get(params, 'projection', '')}`;
        defaultSearch.ix = {ix: [[index, txtToSearch, '*', 'string', tag]]};

        const query = self._queryReducer(defaultSearch);
        const apiCall = self.client.get(`/organizations/${orgId}/documents/search?${query}`);
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Get document by id database
   * @param {string} id document id
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
        const apiCall = self.client.get(`/admin/organizations/${orgId}/documents/${id}`);
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Request signed url url to put or get
   * @param {object} params Params to request signed url
   * @param {string} params.methodType Method type HTTP get or put
   * @param {string} params.docId Document id
   * @param {string} params.fileName File name
   * @param {string} params.docAreaId docAreaId of the document
   * @param {string} params.type mimeType image/png image/jpg others
   * @param {string} params.document Name document to request
   * @return {Promise<unknown>}
   * @public
   * @async
   */
  getSignedUrl(params) {
    return new Promise(async (resolve, reject) => {
      try {

        Joi.assert(params.methodType, Joi.string().valid('put', 'get').required());

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

        const self = this;
        const orgId = self.parent.dispatch.getOrgId();
        let payloadToSend;

        if (params.methodType === 'put') {
          const {docId, fileName: name, docAreaId: areaId, type} = params;
          payloadToSend = {docs: [{docId, name, areaId, type}]};
        } else {
          const {document} = params;
          payloadToSend = {docs: [{document}]};
        }

        const apiCall = self.client.post(`/organizations/${orgId}/documents/getDocumentSignedUrl/${methodType}`, payloadToSend);
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Create document
   * @param {object} params Params to create document
   * @param {string} params.docId Document id
   * @param {string} params.name File name
   * @param {string} params.areaId Docarea id
   * @param {string} params.type Mimetype of the file
   * @param {string} params.signedUrl SignedURL AWS
   * @param {string} params.filename File name
   * @param {number} params.bytes Size file
   * @return {Promise<unknown>}
   * @public
   * @async
   */
  createCV(params) {
    return new Promise(async (resolve, reject) => {
      try {

        Joi.assert(params, Joi.object().required());
        Joi.assert(params.userId, Joi.string().required());
        Joi.assert(params.docId, Joi.string().required());
        Joi.assert(params.name, Joi.string().required());
        Joi.assert(params.docTypeId, Joi.string().required());
        Joi.assert(params.areaId, Joi.string().required());
        Joi.assert(params.type, Joi.string().required());
        Joi.assert(params.signedUrl, Joi.string().required());
        Joi.assert(params.filename, Joi.string().required());
        Joi.assert(params.bytes, Joi.number().required());

        const self = this;
        const {areaId} = params;
        const orgId = self.parent.dispatch.getOrgId();
        const payloadToSend = self._formatDocument(params);
        const apiCall = self.client.put(`/organizations/${orgId}/areas/${areaId}/documents`, payloadToSend);
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Remove document tipo curriculo
   * @param {string} id Id of the document to remove
   * @return {Promise<unknown>}
   * @public
   * @async
   */
  removeCV(id) {
    return new Promise(async (resolve, reject) => {
      try {

        Joi.assert(id, Joi.string().required());

        const self = this;
        const orgId = self.parent.dispatch.getOrgId();
        const payloadToSend = {documents: [{_id: id}]};
        const apiCall = self.client.post(`/organizations/${orgId}/documents/remove`, payloadToSend);
        const retData = self._returnData(await apiCall);
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    });
  }
}

module.exports = Documents;
