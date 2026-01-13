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
   *   dueDate: '2024-01-15T00:00:00Z'
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
        dueDate
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
   *   dueDate: '2024-01-15T00:00:00Z'
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
        dueDate
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

      const url = `organizations/${orgId}/adhoc/${processId}/endprocess/${taskId}/${flowName}`;
      const apiCall = self._client.put(url, body, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

export default Task;
