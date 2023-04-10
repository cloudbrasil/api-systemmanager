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
  _setHeader(session) {
    return {
      headers: {
        authorization: session,
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
   * @return {string} responseToken the unique token registered internally by the system for all the next calls to the external form APIs
   *      The responseToken is unique and is ONLY valid for this session.
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

}

export default External;
