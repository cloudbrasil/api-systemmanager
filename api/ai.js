import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';

/**
 * Class using AI
 * @class
 */
class MyndAI {

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
  _setHeader(authorization) {
    return {
      headers: {
        authorization,
      }
    };
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Create new document
   * @param {object} params Object for add new document
   * @param {string} params.model The model to use for the explain
   * @param {object} params.context The context to apply to a prompt
   * @param {string} params.text The text to add to the prompt
   * @param {array<base64>} params.medias Medias to add to the case in base64 (PDF, Image, Video, Audio)
   * @param {array<string>} params.mediaIds Media Ids to add - id of an internal document (PDF, Image, Video, Audio)
   * @param {string} params.prompt The actual prompt with context and text to apply to
   * @param {boolean} params.json=false If we return in json format or not
   * @return {Promise<object>} data
   * @return {boolean} data.success true|false for success
   * @return {object} data.result the result of the AI call
   * @return {string} data.result.response The actual text response according the prompt
   * @return {number} data.result.tokens The quantity of token used in this request
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const authorization = '...';
   * const params = {
   *  model: 'model-name',
   *  context: { name: 'Some name' },
   *  text: 'Say hello to the world',
   *  medias: ['...'],
   *  prompt: 'Write a story about {{name}} with the following theme: {{text}}',
   * };
   * const retData = await api.ai.explain(params, authorization);
   */
  async explain(params, authorization) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required().error(new Error('params is required')));
      Joi.assert(params.prompt, Joi.string().required().error(new Error('Provide a prompt')));

      const apiCall = self._client
          .post('/agents/explain', params, self._setHeader(authorization));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

export default MyndAI;
