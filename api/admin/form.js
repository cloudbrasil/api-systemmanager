const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('joi');

/**
 * Class for forms, permission admin
 * @class
 */
class Form {

  #client;

  constructor(options) {
    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self.parent = options.parent;
    self.#client = self.parent.dispatch.getClient();
  }

  /**
   * @author Augusto Pissarra <abernardo.br@gmail.com>
   * @description Get the return data and check for errors
   * @param {object} retData Response HTTP
   * @return {*}
   * @private
   */
  #returnData(retData, def = {}) {
    if (retData.status !== 200) {
      return Boom.badRequest(_.get(retData, 'message', 'No error message reported!'))
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
  #setHeader(session) {
    return {
      headers: {
        authorization: session,
      }
    };
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get advance form by ID
   * @param {object} params Params to find form by id
   * @param {string} params.id Formulary Id (_id database)
   * @param {string} params.orgId Organization Id (_id database)
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  id: '55e4a3bd6be6b45210833fae',
   *  orgId: '5edd11c46b6ce9729c2c297c',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.form.findById(params, session);
   */
  async findById(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.id, Joi.string().required());
      Joi.assert(params.orgId, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const {id, orgId} = params;
      const apiCall = self.#client.get(`/admin/organizations/${orgId}/orgforms/${id}/form`, self.#setHeader(session));
      return self.#returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

   /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Request signed url url to put or get
   * @param {object} params - Params to get form list
   * @param {string} params.orgId - Organization id (_id database)
   * @param {number} params.page=1 - Page of pagination
   * @param {number} params.perPage=200 - Items per page
   * @param {object} params.type=2 - Form type (1 to Business or 2 to Advanced)
   * @param {object} params.project={_id: 1, name: 1} - Fields to project
   * @param {object} params.sort={name: 1} - Sort fields
   * @param {string} session - Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  orgId: '5dadd01dc4af3941d42f8c5c',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.form.getFormList(params, session);
   */
  async getFormList(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to get form list');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(params.page, Joi.number(), 'Page of pagination');
      Joi.assert(params.perPage, Joi.number(), 'Items per page');
      Joi.assert(params.type, Joi.number(), 'Form type (1 to Business or 2 to Advanced)');
      Joi.assert(params.project, Joi.object(), 'Fields to project');
      Joi.assert(params.sort, Joi.object(), 'Sort fields for');
      Joi.assert(session, Joi.string().required(), 'Session, token JWT');

      const FORM_ADVANCED = 2;
      const PROJECTION_DEFAULT = {_id: 1, name: 1};
      const SORT_DEFAULT = {name: 1};

      const {
        orgId,
        page = 1,
        perPage = 200,
        type = FORM_ADVANCED,
        project = PROJECTION_DEFAULT,
        sort = SORT_DEFAULT
      } = params;

      const payloadToSend = { orgId, type, $project: project, sort };

      const apiCall = self.#client
        .post(`/admin/organizations/${orgId}/orgforms?page=${page}&perPage=${perPage}`, payloadToSend, self.#setHeader(session));

      return self.#returnData(await apiCall);

    } catch (ex) {
      throw ex;
    }
  }
}

module.exports = Form;
