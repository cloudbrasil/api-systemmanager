import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';

/**
 * Class for documents, permission user
 * @class
 */
class External {

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
  _setHeader(authorization) {
    return {
      headers: {
        authorization,
      }
    };
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Create new document
   * @param {object} params Object for add new document
   * @param {string} params.id Organization form id
   * @return {Promise<object>} data
   * @return {string} _id the id of the form
   * @return {string} orgId the organization id of the form
   * @return {string} authorization the unique token registered internally by the system for all the next calls to the external form APIs
   *      The authorization is unique and is ONLY valid for this session.
   * @return {array<object>} groups the form groups to render
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  id: '611e679741cc63168c26d7ee'
   * };
   * const retForm = await api.external.context(params);
   */
  async context(params) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required().error(new Error('params is required')));
      Joi.assert(params.id, Joi.string().required().error(new Error('organization form id is required')));

      const { id } = params;
      const apiCall = self._client
          .get(`/component/external/forms/${id}`);

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get an upload signed url, so it will be possible to upload documents temporarily during the use of the external form
   * @param {string} mime the mime type of the document
   * @param {string} authorization a legal authorization
   * @returns {Promise<object>} doc
   * @returns {string}  doc.mime the original mime type of the document
   * @returns {string} doc.signedUrl the signed url to upload the document
   * @returns {string} doc.filename  the filename of the uploaded file
   * @returns {string} doc.extension  the extension of the filename, obtained from the mime type
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const authorization = '...';
   * const doc = {
   *  mime: 'application/pdf'
   * };
   * const retDoc = await api.external.getUploadDocumentSignedUrl(doc, authorization);
   */
  async getUploadDocumentSignedUrl(mime, authorization) {
    const self = this;

    try {
      Joi.assert(mime, Joi.string().required().error(new Error('mime type is required')));
      Joi.assert(authorization, Joi.string().required().error(new Error('authorization is required')));

      const apiCall = self._client
          .get(`/external/forms/upload/signedurl?mime=${encodeURIComponent(mime)}`, self._setHeader(authorization));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get an upload signed url, for many documents. So it will be possible to upload documents temporarily during the use of the external form
   * @param {array<object>} docs the list of documents
   * @param {string} docs.mime the mime type of the document
   * @param {string} authorization a legal authorization
   * @returns {Promise<array>} docs
   * @returns {string}  docs.mime the original mime type of the document
   * @returns {string} docs.signedUrl the signed url to upload the document
   * @returns {string} docs.filename  the filename of the uploaded file
   * @returns {string} docs.extension  the extension of the filename, obtained from the mime type
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const authorization = '...';
   * const docs = [
   *    {
   *      mime: 'application/pdf'
   *    }
   * ];
   * const retDocs = await api.external.getUploadDocumentsSignedUrl(docs, authorization);
   */
  async getUploadDocumentSignedUrl(docs, authorization) {
    const self = this;

    try {
      Joi.assert(docs, Joi.string().array().error(new Error('docs is required')));
      Joi.assert(authorization, Joi.string().required().error(new Error('authorization is required')));

      const apiCall = self._client
          .post(`/external/forms/upload/signedurls`, docs, self._setHeader(authorization));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Handles the execution of an external form
   * @param {string} authorization a legal authorization
   * @param {object} params the parameters to handle the execution of an external form
   * @param {array<object>} params.payload the payload of the external form. It should represent the form groups of the external form
   * @param {string} params.payload.name the name of the group
   * @param {array<object>} params.payload.fields the fields that belong to each group
   * @param {*|{}} params.payload.fields.value besides all the data inside a field, it should have the value of the the field
   * @returns {Promise<boolean>} true|false if success
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const authorization = '...';
   * const params = {
   *  payload: [
   *      {
   *          name: 'My Group One',
   *          fields: [
   *              {}
   *          ]
   *      }
   *  ]
   * };
   * const success = await api.external.handle(params, authorization);
   */
  async handle(params, authorization) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required().error(new Error('params is required')));
      Joi.assert(params.payload, Joi.array().required().error(new Error('form payload is required')));
      Joi.assert(authorization, Joi.string().required().error(new Error('authorization is required')));

      const apiCall = self._client
          .put('/external/forms', params, self._setHeader(authorization));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

}

export default External;
