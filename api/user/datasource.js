import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';

/**
 * Class for user datasource access, to be used with when creating new documents
 * @class
 */
class Datasource {

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
      return Boom.badRequest(_.get(retData, 'message', 'No error message reported!'))
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

  _cleanIdCard(idcard = '') {
    return idcard.replace(/\D+/g,'');
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Method to get autocomplete data from a datasource
   * @param {object} params Params to add notification token
   * @param {string} params.orgId The user organization _id
   * @param {array<object>} params.dataSources The document type data sources information
   * @param {string} params.dataSources._id The document type data sources _id
   * @param {array<object>} params.dataSources.fields The document type data sources list of fields
   * @param {array<object>} params.documents The document list
   * @param {string} params.documents._id The document _id
   * @param {string} session Is token JWT of user NOT allow SU
   * @returns {promise<array>} docs The returned documents field with autocomplete
   * @returns {string} docs._id the _id of the document
   * @returns {object} data.docTypeFieldsData the field values
   * @public
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const params = {
   *  orgId: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
   *  dataSources: [{}],
   *  documents: [{}]
   * };
   * const retData = await api.user.datasource.autocomplete(params, session);
   */
  async autocomplete(params = {}, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to get task');
      Joi.assert(params.orgId, Joi.string().required(), 'The organization _id is required');
      Joi.assert(params.dataSources, Joi.array().required(), 'Datasources is required');
      Joi.assert(params.documents, Joi.array().required(), ' Documents is required');

      const {
        documents = [],
        dataSources = [],
        orgId
      } = params;
      const aDocs = [];

      for(const doc of documents) {
        const newDoc = { guid: doc._id, dataSources: [] };
        for(const dataSource of dataSources) {
          const clonedDataSource = { _id: dataSource._id, fields: [] };
          const dataSourceFields = dataSource?.fields || [];
          for(const field of dataSourceFields) {
            const newField = {
              associatedFieldName: field.associatedFieldName,
              type: field.type,
              isPK: field.isPK,
              name: field.name
            };
            if(field.isPK) {
              newField.value = _.get(doc, `docTypeFieldsData.${field.associatedFieldName}`);
              if(newField.type === 'Número Inteiro') {
                newField.value = parseInt(newField.value, 10);
              } else if(newField.type === 'Número Duplo') {
                newField.value = parseFloat(newField.value);
              } else if(newField.type === 'CPF') {
                newField.value = self._cleanIdCard(newField.value);
              } else if(newField.type === 'CNPJ') {
                newField.value = self._cleanIdCard(newField.value);
              }
            }
            if(_.get(newField, 'value.docTypeFieldsData.docTypeFieldsData')) {
              delete newField.value.docTypeFieldsData.docTypeFieldsData;
            }
            clonedDataSource.fields.push(newField);
          }
          newDoc.dataSources.push(clonedDataSource);
        }
        aDocs.push(newDoc);
      }

      const url = `/organizations/${orgId}/documents/datasources/autocomplete`;
      const dataParams = { docs: aDocs };
      const apiCall = self._client
        .post(url, dataParams, self._setHeader(session));

      const retData = self._returnData(await apiCall);
      return retData;
    } catch (ex) {
      throw ex;
    }
  }
}

export default Datasource;
