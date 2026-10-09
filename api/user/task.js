import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';
import TaskAvailable from './task_available.js';
import MyTasks from './my_tasks.js';

/**
 * Class for task, permission user
 * @class
 */
class Task {

  constructor(options) {
    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self.parent = options.parent;
    self._client = self.parent.dispatch.getClient();
    self.available = new TaskAvailable(options);
    self.mytasks = new MyTasks(options);
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
        Authorization: session,
      }
    };
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Method to find task by id
   * @param {object} params Params to get task
   * @param {object} params.processId Proccess id (_id database)
   * @param {object} params.taskId Task id (_id database)
   * @param {object} params.orgId Organization id (_id database)
   * @param {string} session Session, token JWT
   * @returns {promise}
   * @public
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  processId: '5dadd01dc4af3941d42f8c5c',
   *  taskId: '5df7f19618430c89a41a19d2',
   *  orgId: '55e4a3bd6be6b45210833fae',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.task.findById(params, session);
   */
  async findById(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to get task');
      Joi.assert(params.processId, Joi.string().required(), ' Proccess id (_id database)');
      Joi.assert(params.taskId, Joi.string().required(), ' Task id (_id database)');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const {processId, taskId, orgId} = params;
      const apiCall = self._client
        .get(`/organizations/${orgId}/process/${processId}/execute/${taskId}`, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Find task by id and update
   * @param {object} params Params to update task
   * @param {object} params.userId User id (_id database)
   * @param {string} params.processId Proccess id (_id database)
   * @param {string} params.taskId Task id (_id database)
   * @param {string} params.flowName Flow name
   * @param {string} params.action Button action
   * @param {object} params.formData Data to update task
   * @param {string=} params.actionGuid GUID of the action
   * @param {string} params.orgId Organization id (_id database)
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  userId: '5739d4c6ccb0ebc61f2a9557',
   *  processId: '5dadd01dc4af3941d42f8c5c',
   *  taskId: '5df7f19618430c89a41a19d2',
   *  action: 1,
   *  formData: {name: 'CloudBrasil'},
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.task.findByIdAndUpdate(params, session);
   */
  async findByIdAndUpdate(params, session) {
    const self = this;


    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.userId, Joi.string().required(), 'User id (_id database)');
      Joi.assert(params.processId, Joi.string().required(), 'Proccess id (_id database)');
      Joi.assert(params.taskId, Joi.string().required(), 'Task id (_id database)');
      Joi.assert(params.flowName, Joi.string().required(), 'Flow name');
      Joi.assert(params.action, Joi.number().required(), 'Button action');
      Joi.assert(params.formData, Joi.object().required(), 'Data to update task');
      Joi.assert(params.actionGuid, Joi.string(), 'GUID of the action');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(params.contextToBody, Joi.string(), 'Context to body');

      const {processId, taskId, flowName, action, actionGuid, formData, orgId, contextToBody} = params;
      const body = contextToBody ? {[contextToBody]: formData} : {...formData};

      const getUrl = {
        0: () => `organizations/${orgId}/users/tasks/${taskId}/action/${actionGuid}`,
        1: () => `organizations/${orgId}/adhoc/${processId}/save/${taskId}/${flowName}`,
        2: () => `organizations/${orgId}/adhoc/${processId}/endprocess/${taskId}/${flowName}`
      };
      const url = getUrl[action]();
      const apiCall = self._client.put(url, body, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Find task by id and update
   * @param {!object} params Params - to update task
   * @param {!string} params.taskId - Task id (_id database)
   * @param {!string} params.actionGuid - GUID of the action
   * @param {!string} params.orgId - Organization id (_id database)
   * @param {any} params.payload={} - Payload to send in action
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  taskId: '5df7f19618430c89a41a19d2',
   *  actionGuid: 'b3823a2ae52c7a05bfb9590fe427038d'
   *  orgId: '5df7f19618430c89a41a1bc3',
   *  payload: {}',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.task.executeActionFinalize(params, session);
   */
  async executeActionFinalize(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.taskId, Joi.string().required(), 'Task id (_id database)');
      Joi.assert(params.actionGuid, Joi.string(), 'GUID of the action');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(params.payload, Joi.any(), 'Payload to send in action');

      const {taskId, actionGuid, orgId, payload = {}} = params;
      const url = `organizations/${orgId}/users/tasks/${taskId}/action/${actionGuid}`;
      const apiCall = self._client.put(url, payload, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Get the tasks and available tasks summary (totals) for specific tags
   * @param {object} params Params - to update task
   * @param {array<string>} params.tags - The tags to get task summaries
   * @param {string} session Session, token JWT
   * @return {Promise<object>} data
   * @return {Promise<object>} data.tasks - the total tasks
   * @return {Promise<object>} data.availableTasks - the total available tasks
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  tags: ['INCIDENTS']
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.task.getSummaryByTags(params, session);
   */
  async getSummaryByTags(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.tags, Joi.array().required(), 'Tags is required');

      const url = `/organizations/tasks/summary`;
      const apiCall = self._client.post(url, params, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Save task progress without completing it
   * @param {object} params - Params to save task
   * @param {string} params.processId - Process id (_id database)
   * @param {string} params.taskId - Task id (_id database)
   * @param {string} params.flowName - Flow name
   * @param {string} params.orgId - Organization id (_id database)
   * @param {array} params.formData - Form data to save
   * @param {array=} params.selectedDocs - Selected documents
   * @param {array=} params.selectedAssignees - Selected assignees
   * @param {array=} params.selectedBoxes - Selected boxes
   * @param {object=} params.advFormData - Advanced form data
   * @param {object=} params.advFormSchema - Advanced form schema
   * @param {string=} params.status - Task status (empty string for save)
   * @param {number=} params.order - Task order
   * @param {string=} params.title - Task title
   * @param {array=} params.tags - Task tags
   * @param {string=} params.dueDate - Due date ISO string
 * @param {object=} params.processProperties - Keys merged into the process's processProperties bag (search, task cards, BI); omitted when empty
   * @param {array=} params.fluencetaskhistories - task history entries to append, each { entryId, at, kind, component, version, where, data }
   * @param {string} session - Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   processId: '5dadd01dc4af3941d42f8c5c',
   *   taskId: '5df7f19618430c89a41a19d2',
   *   flowName: 'simpleTask',
   *   orgId: '55e4a3bd6be6b45210833fae',
   *   formData: [{ name: 'Group', fields: [...] }],
   *   selectedDocs: [],
   *   selectedAssignees: [],
   *   selectedBoxes: [],
   *   advFormData: {},
   *   advFormSchema: {},
   *   status: '',
   *   order: 0,
   *   title: 'My Task',
   *   tags: [],
   *   dueDate: '2024-01-15T00:00:00Z',
 *   processProperties: { surgicalPatientName: 'Maria' } // optional, merged into the process bag
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.task.saveTask(params, session);
   */
  async saveTask(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.processId, Joi.string().required(), 'Process id (_id database)');
      Joi.assert(params.taskId, Joi.string().required(), 'Task id (_id database)');
      Joi.assert(params.flowName, Joi.string().required(), 'Flow name');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(params.formData, Joi.array().required(), 'Form data to save');
      Joi.assert(params.selectedDocs, Joi.array(), 'Selected documents');
      Joi.assert(params.selectedAssignees, Joi.array(), 'Selected assignees');
      Joi.assert(params.selectedBoxes, Joi.array(), 'Selected boxes');
      Joi.assert(params.advFormData, Joi.object(), 'Advanced form data');
      Joi.assert(params.advFormSchema, Joi.object(), 'Advanced form schema');
      Joi.assert(params.status, Joi.string().allow(''), 'Task status');
      Joi.assert(params.order, Joi.number(), 'Task order');
      Joi.assert(params.title, Joi.string().allow(''), 'Task title');
      Joi.assert(params.tags, Joi.array(), 'Task tags');
      Joi.assert(params.dueDate, Joi.string(), 'Due date ISO string');
      Joi.assert(params.processProperties, Joi.object(), 'Process properties to merge into the process bag');
      Joi.assert(params.fluencetaskhistories, Joi.array(), 'Task history entries to append');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const {
        processId,
        taskId,
        flowName,
        orgId,
        formData,
        selectedDocs = [],
        selectedAssignees = [],
        selectedBoxes = [],
        advFormData = {},
        advFormSchema = {},
        status = '',
        order = 0,
        title = '',
        tags = [],
        dueDate,
        processProperties,
        fluencetaskhistories
      } = params;

      const body = {
        formData,
        selectedDocs,
        selectedAssignees,
        selectedBoxes,
        advFormData,
        advFormSchema,
        status,
        order,
        title,
        tags
      };
      if (dueDate) body.dueDate = dueDate;
      // Forwarded verbatim; the server MERGES each key into the process's own
      // `processProperties` bag (site setStepData). Omitted when empty so a save
      // that has nothing to publish carries no key at all. Only a plain object
      // travels: an array or scalar would be folded into the bag index by index.
      if (_.isPlainObject(processProperties) && !_.isEmpty(processProperties)) {
        body.processProperties = processProperties;
      }
      // Task history entries (fluencetaskhistories) to append; omitted when empty.
      if (Array.isArray(fluencetaskhistories) && fluencetaskhistories.length) {
        body.fluencetaskhistories = fluencetaskhistories;
      }

      const url = `organizations/${orgId}/adhoc/${processId}/save/${taskId}/${flowName}`;
      const apiCall = self._client.put(url, body, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description End/complete a task and advance the workflow
   * @param {object} params - Params to end task
   * @param {string} params.processId - Process id (_id database)
   * @param {string} params.taskId - Task id (_id database)
   * @param {string} params.flowName - Flow name
   * @param {string} params.orgId - Organization id (_id database)
   * @param {array} params.formData - Form data to submit
   * @param {array=} params.selectedDocs - Selected documents
   * @param {array=} params.selectedAssignees - Selected assignees
   * @param {array=} params.selectedBoxes - Selected boxes
   * @param {object=} params.advFormData - Advanced form data
   * @param {object=} params.advFormSchema - Advanced form schema
   * @param {string=} params.status - Task status
   * @param {number=} params.order - Task order
   * @param {string=} params.title - Task title
   * @param {array=} params.tags - Task tags
   * @param {string=} params.dueDate - Due date ISO string
 * @param {object=} params.processProperties - Keys merged into the process's processProperties bag (search, task cards, BI); omitted when empty
   * @param {array=} params.fluencetaskhistories - task history entries to append, each { entryId, at, kind, component, version, where, data }
   * @param {string} session - Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   processId: '5dadd01dc4af3941d42f8c5c',
   *   taskId: '5df7f19618430c89a41a19d2',
   *   flowName: 'simpleTask',
   *   orgId: '55e4a3bd6be6b45210833fae',
   *   formData: [{ name: 'Group', fields: [...] }],
   *   selectedDocs: [],
   *   selectedAssignees: [],
   *   selectedBoxes: [],
   *   advFormData: {},
   *   advFormSchema: {},
   *   status: '',
   *   order: 0,
   *   title: 'My Task',
   *   tags: [],
   *   dueDate: '2024-01-15T00:00:00Z',
 *   processProperties: { surgicalPatientName: 'Maria' } // optional, merged into the process bag
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.task.endTask(params, session);
   */
  async endTask(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.processId, Joi.string().required(), 'Process id (_id database)');
      Joi.assert(params.taskId, Joi.string().required(), 'Task id (_id database)');
      Joi.assert(params.flowName, Joi.string().required(), 'Flow name');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(params.formData, Joi.array().required(), 'Form data to submit');
      Joi.assert(params.selectedDocs, Joi.array(), 'Selected documents');
      Joi.assert(params.selectedAssignees, Joi.array(), 'Selected assignees');
      Joi.assert(params.selectedBoxes, Joi.array(), 'Selected boxes');
      Joi.assert(params.advFormData, Joi.object(), 'Advanced form data');
      Joi.assert(params.advFormSchema, Joi.object(), 'Advanced form schema');
      Joi.assert(params.status, Joi.string().allow(''), 'Task status');
      Joi.assert(params.order, Joi.number(), 'Task order');
      Joi.assert(params.title, Joi.string().allow(''), 'Task title');
      Joi.assert(params.tags, Joi.array(), 'Task tags');
      Joi.assert(params.dueDate, Joi.string(), 'Due date ISO string');
      Joi.assert(params.processProperties, Joi.object(), 'Process properties to merge into the process bag');
      Joi.assert(params.fluencetaskhistories, Joi.array(), 'Task history entries to append');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const {
        processId,
        taskId,
        flowName,
        orgId,
        formData,
        selectedDocs = [],
        selectedAssignees = [],
        selectedBoxes = [],
        advFormData = {},
        advFormSchema = {},
        status = '',
        order = 0,
        title = '',
        tags = [],
        dueDate,
        processProperties,
        fluencetaskhistories
      } = params;

      const body = {
        formData,
        selectedDocs,
        selectedAssignees,
        selectedBoxes,
        advFormData,
        advFormSchema,
        status,
        order,
        title,
        tags
      };
      if (dueDate) body.dueDate = dueDate;
      // Forwarded verbatim; the server MERGES each key into the process's own
      // `processProperties` bag (site setStepData). Omitted when empty so a save
      // that has nothing to publish carries no key at all. Only a plain object
      // travels: an array or scalar would be folded into the bag index by index.
      if (_.isPlainObject(processProperties) && !_.isEmpty(processProperties)) {
        body.processProperties = processProperties;
      }
      // Task history entries (fluencetaskhistories) to append; omitted when empty.
      if (Array.isArray(fluencetaskhistories) && fluencetaskhistories.length) {
        body.fluencetaskhistories = fluencetaskhistories;
      }

      const url = `organizations/${orgId}/adhoc/${processId}/endprocess/${taskId}/${flowName}`;
      const apiCall = self._client.put(url, body, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Get one page of a task's history entries (fluencetaskhistories)
   * @param {object} params Params to get the task history
   * @param {string} params.orgId Organization id (_id database)
   * @param {string} params.taskId Task id (_id database, 24 hex characters)
   * @param {number=} params.page Page number, starting at 1 (default 1)
   * @param {number=} params.perPage Entries per page, 1 to 500 (default 100)
   * @param {string} session Session, token JWT
   * @return {Promise} { hasPermission, total, entries }
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   orgId: '55e4a3bd6be6b45210833fae',
   *   taskId: '5df7f19618430c89a41a19d2',
   *   page: 1,
   *   perPage: 100
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.task.getTaskHistory(params, session);
   */
  async getTaskHistory(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to get the task history');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(params.taskId, Joi.string().hex().length(24).required(), 'Task id (_id database)');
      Joi.assert(params.page, Joi.number().integer().min(1), 'Page number');
      Joi.assert(params.perPage, Joi.number().integer().min(1).max(500), 'Entries per page');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const { orgId, taskId, page, perPage } = params;
      const url = `/organizations/${orgId}/tasks/${taskId}/history?page=${page || 1}&perPage=${perPage || 100}`;
      const apiCall = self._client.get(url, self._setHeader(session));

      return self._returnData(await apiCall, { hasPermission: false, total: 0, entries: [] });
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Get the task chat sessions shown in the task history
   * @param {object} params Params to get the task chat history
   * @param {string} params.orgId Organization id (_id database)
   * @param {string} params.taskId Task id (_id database, 24 hex characters)
   * @param {string} session Session, token JWT
   * @return {Promise} { hasPermission, sessions }
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   orgId: '55e4a3bd6be6b45210833fae',
   *   taskId: '5df7f19618430c89a41a19d2'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.task.getTaskChatHistory(params, session);
   */
  async getTaskChatHistory(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to get the task chat history');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(params.taskId, Joi.string().hex().length(24).required(), 'Task id (_id database)');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const { orgId, taskId } = params;
      const url = `/organizations/${orgId}/tasks/${taskId}/history/chats`;
      const apiCall = self._client.get(url, self._setHeader(session));

      return self._returnData(await apiCall, { hasPermission: false, sessions: [] });
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Get the task AI chat sessions shown in the task history
   * @param {object} params Params to get the task AI chat history
   * @param {string} params.orgId Organization id (_id database)
   * @param {string} params.taskId Task id (_id database, 24 hex characters)
   * @param {string} session Session, token JWT
   * @return {Promise} { hasPermission, sessions }
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   orgId: '55e4a3bd6be6b45210833fae',
   *   taskId: '5df7f19618430c89a41a19d2'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.task.getTaskAiChatHistory(params, session);
   */
  async getTaskAiChatHistory(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to get the task AI chat history');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(params.taskId, Joi.string().hex().length(24).required(), 'Task id (_id database)');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const { orgId, taskId } = params;
      const url = `/organizations/${orgId}/tasks/${taskId}/history/aichats`;
      const apiCall = self._client.get(url, self._setHeader(session));

      return self._returnData(await apiCall, { hasPermission: false, sessions: [] });
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Ask the server for an AI report of the task history. Never throws on an HTTP error:
   *   it resolves { ok: false, status, message } so the caller keeps the status (e.g. 501 not configured, 403)
   * @param {object} params Params to create the task AI report
   * @param {string} params.orgId Organization id (_id database)
   * @param {string} params.taskId Task id (_id database, 24 hex characters)
   * @param {string=} params.language Report language: 'pt-BR' (default), 'en-US' or 'es'
   * @param {object} params.processOntology Process ontology { entities: [], relations: [] }
   * @param {array=} params.documentIds Document ids to read for the report (default [])
   * @param {string} session Session, token JWT
   * @return {Promise} { ok: true, status: 200, report } or { ok: false, status, message }
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   orgId: '55e4a3bd6be6b45210833fae',
   *   taskId: '5df7f19618430c89a41a19d2',
   *   language: 'pt-BR',
   *   processOntology: { entities: [], relations: [] },
   *   documentIds: []
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.task.createTaskAiReport(params, session);
   */
  async createTaskAiReport(params, session) {
    const self = this;

    Joi.assert(params, Joi.object().required(), 'Params to create the task AI report');
    Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
    Joi.assert(params.taskId, Joi.string().hex().length(24).required(), 'Task id (_id database)');
    Joi.assert(params.language, Joi.string().valid('pt-BR', 'en-US', 'es'), 'Report language');
    Joi.assert(params.processOntology, Joi.object({
      entities: Joi.array().required(),
      relations: Joi.array().required()
    }).unknown(true).required(), 'Process ontology');
    Joi.assert(params.documentIds, Joi.array().items(Joi.string()), 'Document ids');
    Joi.assert(session, Joi.string().required(), 'Session token JWT');

    const { orgId, taskId, language, processOntology, documentIds } = params;
    const url = `/organizations/${orgId}/tasks/${taskId}/history/aireport`;
    const body = {
      language: language || 'pt-BR',
      processOntology,
      documentIds: documentIds || []
    };
    // The route takes up to about 115 s (20 s document reads + 90 s model).
    const cfg = { ...self._setHeader(session), timeout: 150000 };

    let response;
    try {
      response = await self._client.post(url, body, cfg);
    } catch (ex) {
      return {
        ok: false,
        status: (ex && ex.response && ex.response.status) || 0,
        message: (ex && ex.response && ex.response.data && ex.response.data.message) || ''
      };
    }

    if (response && response.status === 200) {
      return { ok: true, status: 200, report: response.data };
    }
    return {
      ok: false,
      status: (response && response.status) || 0,
      message: (response && response.data && response.data.message) || ''
    };
  }
}

export default Task;
