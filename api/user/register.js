import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';
import Cypher from '../utils/cypher.js';

/**
 * Class for user registration in a user
 * @class
 */
class Register {

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
   * @param {object} params.registerId The registerId that comes with the registration page context
   * @return {string} orgname The orgname of the organization in the registerId
   * @public
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  registerId: 'U2FsdGVkX1+xEq+sV6OSBr4aEVoiE9H1b4xzLe+vqmXB+ShVNc/FvJGxnIz4tZv6jBJkk4aQzz24O5koH+rGmdl/DjqfyWfENe5NFuQ+6xXhuOSN24Z+Topo87+e+CrRO8ox...'
   * };
   * const orgname = await api.user.register.getOrgname(params);
   */
  getOrgname(registerId) {
    const { orgname = '' } = Cypher.get(registerId) || {};
    return orgname;
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Method to find task by id
   * @param {object} params Params to get task
   * @param {string} params.registerId The registerId that comes with the registration page context
   * @param {object} params.email The email to validate
   * @returns {promise<object>} data
   * @returns {boolean} data.success If the operation was successfully done (true|false)
   * @returns {boolean} data.userAlreadyExists If the user already exists (true|false), if true, then the other information is not returned
   * @returns {string} data.registrationEmailInfoRaw The fully cryptographed registration information
   * @returns {object} data.registrationEmailInfo The registration information
   * @returns {string} data.registrationEmailInfo.orgname The orgname
   * @returns {string} data.registrationEmailInfo.orgId The orgId of the organization
   * @returns {string} data.registrationEmailInfo.guid The unique id for the registration
   * @returns {object} data.registrationEmailInfo.emailValidation The email validation information
   * @returns {string} data.registrationEmailInfo.emailValidation.email The email that the code was sent to
   * @returns {string} data.registrationEmailInfo.emailValidation.code The 4 digit code to validate the email
   * @public
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  registerId: 'U2FsdGVkX1+xEq+sV6OSBr4aEVoiE9H1b4xzLe+vqmXB+ShVNc/FvJGxnIz4tZv6jBJkk4aQzz24O5koH+rGmdl/DjqfyWfENe5NFuQ+6xXhuOSN24Z+Topo87+e+CrRO8ox...',
   *  email: 'myemail@company.com'
   * };
   * const retData = await api.user.register.validateEmail(params);
   */
  async validateEmail(params = {}) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to get task');
      Joi.assert(params.registerId, Joi.string().required(), ' RegisterId for registration');
      Joi.assert(params.email, Joi.string().required(), ' The emnail to register');

      const { registerId = '', email = '' } = params;
      const registerInfo = Cypher.get(registerId) || {};
      const infoData = { ...registerInfo, email };
      const payload = { info: Cypher.set(infoData) };
      const apiCall = self._client
        .post(`/users/validate/email`, payload);

      const { success = false, info = '', userAlreadyExists = false } = self._returnData(await apiCall);
      const retData = { success, userAlreadyExists, registrationEmailInfoRaw: info, registrationEmailInfo: Cypher.get(info) };
      return retData;
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Method to register a user
   * @param {object} params Params to get task
   * @param {string} params.registerId The registerId that comes with the registration page context
   * @param {string} params.type=sign The type of the registration. By defailt,
   * @param {boolean} params.login=false If we want to login the user directly after registering the user successfully. If you have a redirect, the best option is to login automatically.
   * @param {object} params.emailInfo The information for the email validation
   * @param {string} params.emailInfo.email The email validation information
   * @param {string} params.emailInfo.code The 4 digit code to validate the email
   * @param {object} params.registerData The registration data
   * @param {string} params.registerData.name The name if the user
   * @param {string} params.registerData.registerEmail The email of the user
   * @param {string} params.registerData.phone The phone of the user
   * @param {string} params.registerData.idcard The ID card of the user
   * @param {string} params.registerData.registerPassword The user password in open text
   * @param {string} params.registerData.emailValidationCode The code used to validate the email
   * @param {string} params.registerData.phoneValidationCode The code used to validate the phone
   * @param {string} params.registerData.language The defaulf navigator language (i.e.: navigator.language)
   * @param {string} params.registerData.timezone The defaulf navigator timezone (i.e.: Intl.DateTimeFormat().resolvedOptions().timeZone)
   * @returns {promise<object>} data
   * @returns {boolean} data.success If the operation was successfully done (true|false)
   * @returns {boolean} data.userAlreadyExists If the user already exists (true|false), if true, then the other information is not returned
   * @returns {object} auth The full authentication data with session, if login is true.
   * @returns {string} auth.redirectUrl The url to redirect.
   * @public
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params ={
   *     "registerId": 'U2FsdGVkX1+xEq+sV6OSBr4aEVoiE9H1b4xzLe+vqmXB+ShVNc/FvJGxnIz4tZv6jBJkk4aQzz24O5koH+rGmdl/DjqfyWfENe5NFuQ+6xXhuOSN24Z+Topo87+e+CrRO8ox...',
   *     "type": 'sign',
   *     "login": false,
   *     "emailInfo": {
   *       "code": "5974",
   *       "email": "cbtoto_1@mailinator.com"
   *     },
   *     "registerData": {
   *       "name": "Augusto Totlo",
   *       "registerEmail": "cbtoto_1@mailinator.com",
   *       "phone": "",
   *       "idcard": "",
   *       "dob": "1978-01-12T03:00:00.000Z",
   *       "registerPassword": "123456",
   *       "emailValidationCode": "5974",
   *       "phoneValidationCode": "",
   *       "language": "en-US",
   *       "timezone": "Europe/Dublin"
   *     }
   *   };
   * const retData = await api.user.register.execute(params);
   */
  async execute(params = {}) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to get task');
      Joi.assert(params.registerId, Joi.string().required(), ' RegisterId for registration');
      Joi.assert(params.emailInfo, Joi.object().required(), ' The email info');
      Joi.assert(params.registerData, Joi.object().required(), ' The registerData');

      const {
        type = 'sign',
        registerId = '',
        emailInfo = {},
        registerData = {},
        login = false
      } = params;
      const registerInfo = Cypher.get(registerId) || {};
      const payload = { ...registerInfo, type, login, emailInfo, registerData };
      const payloadInfo = { info: Cypher.set(payload) };
      const apiCall = self._client
          .put(`/users/register`, payloadInfo);

      const { success = false, userAlreadyExists = false, auth } = self._returnData(await apiCall);
      const retData = { success, userAlreadyExists, auth };
      return retData;
    } catch (ex) {
      throw ex;
    }
  }
}

export default Register;
