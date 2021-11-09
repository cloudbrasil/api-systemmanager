import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';

/**
 * Admin Class for user, permission admin
 * @class
 */
class AdminMessage {

  constructor(options) {
    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self.parent = options.parent;
    self.client = self.parent.dispatch.getClient();
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
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
   * @description Pagination SMS texts
   * @param {!object} params - Params to pagintion SMS
   * @param {!string} params.message - Message to pagination
   * @param {!number} params.limitSize=130 - Limit of the start pagination
   * @param {!number} params.continueText=continua... - Text to continue other SMS
   */
  _paginationOfTheSMS(params) {
    const self = this;
    try {
      Joi.assert(params, Joi.object().required(), 'Params to paginate SMS');
      Joi.assert(params.message, Joi.string(), 'Message to pagination');
      Joi.assert(params.limitSize, Joi.number(), 'Limit of the start pagination');
      Joi.assert(params.continueText, Joi.string(), 'Text to continue other SMS');

      const defaultSize = 130;
      const defaultContinue = 'continua...';
      const { message, limitSize = defaultSize, continueText = defaultContinue } = params;

      const size = limitSize - continueText.length;
      const regex = new RegExp(`.{1,${size}}`, 'g');
      const smsData = message.match(regex).map(item => item.trim());
      const smsDataWithContinue = smsData.map((message, index, arr) => {
        return index !== (arr.length - 1)
          ? `${message} ${continueText}`
          : message;
      });

      return smsDataWithContinue;

    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description Validation struct to send email
   * @param {!object} params - Params to send email
   * @param {!string} params.subject - Subject of the email
   * @param {!string} params.message - Body of the email
   * @param {!string} params.to - Destination email
   * @param {?string} params.from - Source email
   */
  _validItemToSendEmail(params) {
    try {
      Joi.assert(params, Joi.object().required(), 'Params to send email');
      Joi.assert(params.subject, Joi.string().required(), 'Subject of the email');
      Joi.assert(params.message, Joi.string().required(), 'Body of the email');
      Joi.assert(params.to, Joi.string().required(), 'Destination email');
      Joi.assert(params.from, Joi.string(), 'Source email');

      return true;
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description Send an SMS message
   * @param {!object} params - Params to send SMS
   * @param {!string} params.apiKey - Organization API key
   * @param {!string} params.message - The text message to send
   * @param {!string} params.recipient - The telephone number without with only numbers
   * @param {?number} params.limitSize=130 - Size limit to send SMS
   * @return {Promise<{}>}
   */
  async sendSMS(params) {
    const self = this;
    try {
      Joi.assert(params, Joi.object().required(), 'Params to send SMS');
      Joi.assert(params.apiKey, Joi.string().required(), 'Organization API key');
      Joi.assert(params.message, Joi.string().required(), 'The text message to send');
      Joi.assert(params.recipient, Joi.string().required(), 'The telephone number without with only numbers');
      Joi.assert(params.limitSize, Joi.number(), 'Size limit to send SMS');

      const defaultSize = 130;
      const { apiKey, message, recipient, limitSize = defaultSize } = params;

      const paramsOfThePagination = { message, limitSize };
      const smsData = self._paginationOfTheSMS(paramsOfThePagination);

      for await (const smsText of smsData) {
        const payload = { apiKey, data: { message: smsText }, recipient };
        await self.client.post('/sms/send', payload);
      }

      return { success: true, send: smsData.length };

    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description Send email, array with email list or send one email
   * @param {!object} params - Params to send email
   * @param {!string} params.subject - Subject of the email
   * @param {!string} params.message - Body of the email
   * @param {!string} params.to - Destination email
   * @param {?string} params.from - Source email
   * @param {string} session - Session, token JWT
   * @return {Promise<{success: boolean, sent: object[]}>} - Success and email sent
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  subject: 'Test email',
   *  message: '<h1>Hi!</h1>',
   *  to: 'destination@gmail.com'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.message.sendEmail(params, session);
   */
  async sendEmail(params, session) {
    const self = this;

    try {
      Joi.assert(session, Joi.string().required(), 'Session, token JWT');

      let emailList = [];
      const emailSent = [];

      if (Array.isArray(params)) {
        params.forEach(element => self._validItemToSendEmail(element));
        emailList = [...params];
      } else {
        self._validItemToSendEmail(params);
        emailList = [params];
      }

      for await (const email of emailList) {
        await self.client.post('/admin/email', email, self._setHeader(session));
        emailSent.push(email);
      }

      return { success: true, sent: emailSent };

    } catch (ex) {
      throw ex;
    }
  }
}

export default AdminMessage;
