import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';

/**
 * Class for AI Session management
 * @class
 */
class AISession {

  constructor(options) {
    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self.parent = options.parent;
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
    }
    const body = _.get(retData, 'data', def);
    // Unwrap Akamai response envelope { statusCode, message, data }
    if (body && typeof body === 'object' && body.statusCode !== undefined && body.data !== undefined) {
      return body.data;
    }
    return body;
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
        Authorization: authorization,
      }
    };
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Get full session data by document ID.
   * Returns session, execution, activities, pages, triples and summary.
   * @param {object} params Parameters
   * @param {string} params.documentId The document ID to look up the session for
   * @param {string} authorization Authorization token
   * @return {Promise<object>} data The full session data
   * @return {object} data.session The session object
   * @return {object} data.execution The latest execution or null
   * @return {array<object>} data.activities Activity log entries
   * @return {array<object>} data.pages Extracted page objects
   * @return {array<object>} data.triples Ontology triple objects
   * @return {object} data.summary Document summary or null
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const authorization = '...';
   * const params = { documentId: 'doc-123' };
   * const retData = await api.ai.sessions.getByDocument(params, authorization);
   */
  async getByDocument(params, authorization) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required().error(new Error('params is required')));
      Joi.assert(params.documentId, Joi.string().required().error(new Error('documentId is required')));

      const client = self.parent.dispatch.getAkamaiClient();
      const apiCall = client
        .get(`/agents/session/document/${params.documentId}`, self._setHeader(authorization));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Update session document data (pages, triples, summary).
   * Used by Scarface to push corrections or enrichments for a document.
   * @param {object} params Parameters
   * @param {string} params.documentId The document ID
   * @param {array<object>} [params.pages] Page updates
   * @param {number} params.pages.pageNumber 1-based page number
   * @param {string} [params.pages.markdown] Updated markdown text
   * @param {array<object>} [params.pages.entities] Updated entities
   * @param {array<object>} [params.triples] New triples to add
   * @param {number} params.triples.pageNumber Source page number
   * @param {string} params.triples.subject Subject entity text
   * @param {string} params.triples.predicate Relationship predicate
   * @param {string} params.triples.object Object entity text
   * @param {object} [params.summary] Summary field updates
   * @param {string} [params.summary.documentName] Document name
   * @param {number} [params.summary.entityCount] Total entity count
   * @param {number} [params.summary.tripleCount] Total triple count
   * @param {string} authorization Authorization token
   * @return {Promise<object>} data The update results
   * @return {array<object>} data.pages Page update results [{pageNumber, updated}]
   * @return {object} data.triples Triple insert results {added: number}
   * @return {object} data.summary Applied summary updates
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const authorization = '...';
   * const params = {
   *   documentId: 'doc-123',
   *   pages: [
   *     { pageNumber: 1, markdown: '# Updated page content' }
   *   ],
   *   summary: {
   *     documentName: 'Patient Report.pdf',
   *     entityCount: 42,
   *     tripleCount: 15
   *   }
   * };
   * const retData = await api.ai.sessions.updateData(params, authorization);
   */
  async updateData(params, authorization) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required().error(new Error('params is required')));
      Joi.assert(params.documentId, Joi.string().required().error(new Error('documentId is required')));

      const { documentId, ...payload } = params;

      const client = self.parent.dispatch.getAkamaiClient();
      const apiCall = client
        .patch(`/agents/session/document/${documentId}`, payload, self._setHeader(authorization));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Create a new agent session.
   * Use this to create a session with full metadata before triggering execution.
   * @param {object} params Parameters
   * @param {string} params.agentType The agent type (e.g., 'doc-rlm-ingest')
   * @param {object} [params.config] Agent configuration options
   * @param {object} [params.metadata] Session metadata (documentId, pipelineVariant, analysisMode, etc.)
   * @param {string} authorization Authorization token
   * @return {Promise<object>} data The created session
   * @return {string} data.sessionId The session ID
   * @return {string} data.status The session status
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const authorization = '...';
   * const params = {
   *   agentType: 'doc-rlm-ingest',
   *   metadata: {
   *     documentId: 'doc-123',
   *     documentName: 'Patient Report.pdf',
   *     pipelineVariant: 'A',
   *     analysisMode: 'full'
   *   }
   * };
   * const retData = await api.ai.sessions.create(params, authorization);
   */
  async create(params, authorization) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required().error(new Error('params is required')));
      Joi.assert(params.agentType, Joi.string().required().error(new Error('agentType is required')));

      const client = self.parent.dispatch.getAkamaiClient();
      const apiCall = client
        .post('/agents/create', params, self._setHeader(authorization));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Start execution on an existing agent session.
   * @param {object} params Parameters
   * @param {string} params.sessionId The session ID to execute
   * @param {object} [params.input] Execution input (documentId, options, etc.)
   * @param {string} authorization Authorization token
   * @return {Promise<object>} data The execution data
   * @return {string} data.executionId The execution ID
   * @return {string} data.status The execution status
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const authorization = '...';
   * const params = {
   *   sessionId: 'session-abc-123',
   *   input: {
   *     documentId: 'doc-123',
   *     options: { pipelineVariant: 'A', analysisMode: 'full' }
   *   }
   * };
   * const retData = await api.ai.sessions.execute(params, authorization);
   */
  async execute(params, authorization) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required().error(new Error('params is required')));
      Joi.assert(params.sessionId, Joi.string().required().error(new Error('sessionId is required')));

      const { sessionId, ...payload } = params;

      const client = self.parent.dispatch.getAkamaiClient();
      const apiCall = client
        .post(`/agents/${sessionId}/execute`, payload, self._setHeader(authorization));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Add documents to an existing agent session.
   * The agent will handle the documentIds accordingly.
   * @param {object} params Parameters
   * @param {string} params.sessionId The session ID
   * @param {array<string>} params.documentIds Array of document IDs to add
   * @param {string} authorization Authorization token
   * @return {Promise<object>} data The result from the agent
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const authorization = '...';
   * const params = {
   *   sessionId: 'session-abc-123',
   *   documentIds: ['doc-123', 'doc-456']
   * };
   * const retData = await api.ai.sessions.addDocuments(params, authorization);
   */
  async addDocuments(params, authorization) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required().error(new Error('params is required')));
      Joi.assert(params.sessionId, Joi.string().required().error(new Error('sessionId is required')));
      Joi.assert(params.documentIds, Joi.array().items(Joi.string()).min(1).required().error(new Error('documentIds is required and must be a non-empty array')));

      const { sessionId, documentIds } = params;

      const client = self.parent.dispatch.getAkamaiClient();
      const apiCall = client
        .post(`/agents/${sessionId}/documents/add`, { documentIds }, self._setHeader(authorization));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Remove documents from an existing agent session.
   * The agent will handle the documentIds accordingly.
   * @param {object} params Parameters
   * @param {string} params.sessionId The session ID
   * @param {array<string>} params.documentIds Array of document IDs to remove
   * @param {string} authorization Authorization token
   * @return {Promise<object>} data The result from the agent
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const authorization = '...';
   * const params = {
   *   sessionId: 'session-abc-123',
   *   documentIds: ['doc-123', 'doc-456']
   * };
   * const retData = await api.ai.sessions.removeDocuments(params, authorization);
   */
  async removeDocuments(params, authorization) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required().error(new Error('params is required')));
      Joi.assert(params.sessionId, Joi.string().required().error(new Error('sessionId is required')));
      Joi.assert(params.documentIds, Joi.array().items(Joi.string()).min(1).required().error(new Error('documentIds is required and must be a non-empty array')));

      const { sessionId, documentIds } = params;

      const client = self.parent.dispatch.getAkamaiClient();
      const apiCall = client
        .post(`/agents/${sessionId}/documents/remove`, { documentIds }, self._setHeader(authorization));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

export default AISession;
