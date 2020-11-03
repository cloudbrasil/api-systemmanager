const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('joi');

/**
 * Class for processes, permission admin
 * @class
 */
class Processes {

  constructor(options) {
    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self.parent = options.parent;
    self._client = self.parent.dispatch.getClient();

    self._operatorsType = ['string', 'date', 'datetime', 'idcard', 'orgidcard', 'number', 'currency'];
    self._operatorOfString = ['=', '*', '*=', '=*', '*?', '~'];

    /**
     * @description Operator of string, format is: DD/MM/YYY -> Exemple: 22/10/2000
     * @type {string[]}
     * @private
     */
    self._operatorOfDate = ['=', '>', '>=', '<', '<=', '...'];

    /**
     * @description Operator of string, format is: DD/MM/YYY HH:mm -> Exemple: 22/10/2000 14:32
     * @type {string[]}
     * @private
     */
    self._operatorOfDateTime = ['=', '>', '>=', '<', '<=', '...'];
    self._operatorOfIdCard = ['=', '*', '*=', '=*'];
    self._operatorOfOrgICard = ['=', '*', '*=', '=*'];
    self._operatorOfNumber = ['=', '>', '>=', '<', '<='];
    self._operatorOfCurrency = ['=', '>', '>=', '<', '<='];

    self.allOperators = new Set([
      ...self._operatorOfString,  ...self._operatorOfDate, ...self._operatorOfDateTime,
      ...self._operatorOfIdCard, ...self._operatorOfOrgICard, ...self._operatorOfNumber,
      ...self._operatorOfCurrency
    ]);

    self._status = ['FINISHED', 'NOT_FINISHED'];

    //
    // SCHEMAS
    //
    self._schemaOrgId = Joi.string().required().label('Organization id'),

    self._schemaProcessId = Joi.object({
      value: Joi.array().items(Joi.string()).min(1).label('Numbers of processId'),
      type: Joi.string().default('string').valid(...self._operatorsType).label('Operation type'),
      oper: Joi.string().default('=').valid(...self.allOperators).label('Type of condition'),
      name: Joi.string().default('processId').label('Propertie name'),
    });

    self._schemaProtocol = Joi.object({
      value: Joi.string().required().label('Number of protocol'),
      type: Joi.string().default('string').valid(...self._operatorsType).label('Operation type'),
      oper: Joi.string().default('=').valid(...self.allOperators).label('Type of condition'),
    });

    self._schemaHistoryBegin = Joi.object({
      value: Joi.string().required().label('History begin'),
      type: Joi.string().default('date').valid(...self._operatorsType).label('Operation type'),
      oper: Joi.string().default('=').valid(...self.allOperators).label('Type of condition'),
    });

    self._schemaHistoryEnd = Joi.object({
      value: Joi.string().required().label('History end'),
      type: Joi.string().default('date').valid(...self._operatorsType).label('Operation type'),
      oper: Joi.string().default('=').valid(...self.allOperators).label('Type of condition'),
    });

    self._schemaStatus = Joi.object({
      value: Joi.string().default('FINISHED').valid(self._status.toString()).label('Process Status'),
      type: Joi.string().default('string').valid('string').label('Operation type'),
      oper: Joi.string().default('=').valid('=').label('Type of condition'),
    });

    self._schemaOrgProcessId = Joi.object({
      value: Joi.string().required().label('Organization process id'),
      type: Joi.string().default('string').valid('string').label('Operation type'),
      oper: Joi.string().default('=').valid('=').label('Type of condition'),
    }).required().label('Organization process id');

    self._schemaFormData = Joi.array().items(
      Joi.object({
        value: Joi.string().required().label('Text to search'),
        type: Joi.string().default('string').valid(...self._operatorsType).label('Operation type'),
        oper: Joi.string().default('=').valid(...self.allOperators).label('Type of condition'),
        name: Joi.string().required().label('Property name'),
      })
    );

    self._schemaAdvFormData = Joi.array().items(
      Joi.object({
        value: Joi.any().required().label('Value to search'),
        type: Joi.string().default('string').valid(...self._operatorsType).label('Operation type'),
        oper: Joi.string().default('=').valid(...self.allOperators).label('Type of condition'),
        name: Joi.string().required().label('Property name'),
      })
    );

    self._schemaProcessProperties = Joi.array().items(
      Joi.object({
        value: Joi.any().required().label('Value to search'),
        type: Joi.string().default('string').valid(...self._operatorsType).label('Operation type'),
        oper: Joi.string().default('=').label('Type of condition'),
        name: Joi.string().required().label('Property name'),
      })
    );

    self._schemaInitParams = Joi.array().items(
      Joi.object({
        value: Joi.any().required().label('Value to search'),
        type: Joi.string().default('string').valid(...self._operatorsType).label('Operation type'),
        oper: Joi.string().default('=').label('Type of condition'),
        name: Joi.string().required().label('Property name'),
      })
    );

    self._schemaParticipants = Joi.object({
      value: Joi.array().items(
        Joi.string().label('Value to search')
      ),
      type: Joi.string().default('string').valid('string').label('Operation type'),
      oper: Joi.string().default('=').valid('=').label('Type of condition'),
      name: Joi.string().required().label('Process participant group'),
    });

    self._schemaProcessParticipantsGroup = Joi.object({
      value: Joi.string().label('Value to search'),
      type: Joi.string().default('string').valid(...self._operatorsType).label('Operation type'),
      oper: Joi.string().default('=').valid(...self.allOperators).label('Type of condition'),
      name: Joi.string().required().label('Process participant group'),
    });

    self._schemaUserId = Joi.object({
      value: Joi.string().label('Value to search'),
      type: Joi.string().default('string').valid('string').label('Operation type'),
      oper: Joi.string().default('=').valid('=').label('Type of condition'),
      name: Joi.string().required().label('User id'),
    });

    self._schemaUserGroups = Joi.object({
      value: Joi.array().items(
        Joi.string().label('Value to search')
      ),
      type: Joi.string().default('string').valid(...self._operatorsType).label('Operation type'),
      oper: Joi.string().default('=').valid(...self.allOperators).label('Type of condition'),
      name: Joi.string().required().label('User groups'),
    });

    self._schemaUserName = Joi.object({
      value: Joi.string().label('Value to search'),
      type: Joi.string().default('string').valid(...self._operatorsType).label('Operation type'),
      oper: Joi.string().default('=').valid(...self.allOperators).label('Type of condition'),
      name: Joi.string().required().label('User name'),
    });

    self._schemaUserDepartment = Joi.object({
      value: Joi.string().label('Value to search'),
      type: Joi.string().default('string').valid(...self._operatorsType).label('Operation type'),
      oper: Joi.string().default('=').valid(...self.allOperators).label('Type of condition'),
      name: Joi.string().required().label('User department'),
    });

    self._schemaUserSubDepartment = Joi.object({
      value: Joi.string().label('Value to search'),
      type: Joi.string().default('string').valid(...self._operatorsType).label('Operation type'),
      oper: Joi.string().default('=').valid(...self.allOperators).label('Type of condition'),
      name: Joi.string().required().label('User sub department'),
    });

    self._schemaNp = Joi.number().default(0).label('Enable or disable pagination'); // 1 disable pagination, 0 enable pagination

    self._schemaPj = Joi.array().items(
      Joi.string().label('Value to projection')
    ).default([
      'processId', 'orgId', 'protocol', 'historyBegin', 'historyEnd', 'status',
      'orgProcessId', 'processProperties', 'userId', 'userName', 'initParams'
    ]);

    self._schemaSort = Joi.object().label('Sort data');
    self._schemaPerPage = Joi.number().default(20).label('Item per page');
    self._schemaPage = Joi.number().default(1).label('Start page in pagination');
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
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Mount query string to send in URL
   * @param {object} params Params to mount query string
   * @private
   * @example
   *
   * const params = {name: 'Thiago', lastname: 'anselmo'};
   * self._mountQueryString(params);
   * // output name=Thiago&lastname=anselmo
   */
  async _mountQueryString(params) {
    try {
      const allowTypeForQueryString = ['string', 'boolean', 'number'];

      Joi.assert(params, Joi.object(), 'Params to mount query string');

      params = Object.keys(params).reduce((newParams, field) => {
        const fieldData = params[field];
        return _.isArray(fieldData) || _.isObject(fieldData)
          ? {...newParams, [field]: JSON.stringify(fieldData)}
          : {...newParams, [field]: fieldData}
      }, {});

      const queryString = Object.entries(params)
        .map(filter => filter.join('='))
        .join('&');

      return queryString;
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @see https://confluence.external-share.com/content/7450b014-52c6-4d9e-b30e-a062b57453b5/17104899/17694721/532545537
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Advanced search of processes, check documentation, to verify all params, pass to method search
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  orgId: '5edd11c46b6ce9729c2c297c',
   *  ...
   *  ...
   *  ...
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.processes.search(params, session);
   */
  async search(params, session) {
    const self = this;

    try {
      const paramsAfterValidation = Joi.attempt(params,
        Joi.object({
          orgId: self._schemaOrgId,
          processId: self._schemaProcessId,
          protocol: self._schemaProtocol,
          historyBegin: self._schemaHistoryBegin,
          historyEnd: self._schemaHistoryEnd,
          status: self._schemaStatus,
          orgProcessId: self._schemaOrgProcessId,
          formData: self._schemaFormData,
          advFormData: self._schemaAdvFormData,
          processProperties: self._schemaProcessProperties,
          initParams: self._schemaInitParams,
          participants: self._schemaParticipants,
          processParticipantsGroup: self._schemaProcessParticipantsGroup,
          userId: self._schemaUserId,
          userGroups: self._schemaUserGroups,
          userName: self._schemaUserName,
          userDepartment: self._schemaUserDepartment,
          userSubDepartment: self._schemaUserSubDepartment,
          np: self._schemaNp,
          pj: self._schemaPj,
          s: self._schemaSort,
          p: self._schemaPerPage,
          i: self._schemaPage
        }).options({abortEarly: false, stripUnknown: true})
      )

      const setParams = {...paramsAfterValidation, pj: paramsAfterValidation.pj.toString()};
      const {orgId, ...payload} = setParams;
      const queryString = JSON.stringify(payload);

      const apiCall = self._client.get(`/admin/organizations/${orgId}/processes/search?query=${queryString}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

module.exports = Processes;
