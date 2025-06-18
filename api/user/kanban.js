import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';
import TaskAvailable from './task_available.js';
import MyTasks from './my_tasks.js';

/**
 * Class for task, permission user
 * @class
 */
class Kanban {

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
   * @description Retrieves the Kanban board data for a specified organization process
   * @param {Object} params - Parameters object
   * @param {string} params.orgId - Organization id (_id database)
   * @param {string} params.orgProcessName - The name of the organization process
   * @param {string} params.flowId - Flow id for the specific kanban flow
   * @param {string} session - Session, token JWT
   * @returns {promise} Promise that resolves to Kanban board data
   * @returns {Object} returns.data - The response data containing:
   * @returns {boolean} returns.data.success - Indicates if the operation was successful
   * @returns {Array} returns.data.kanban - Array of status columns with their tasks
   * @returns {string} returns.data.kanban[].id - Unique identifier for the status column
   * @returns {string} returns.data.kanban[].title - Display title of the status column
   * @returns {boolean} returns.data.kanban[].isExpanded - Whether the status column is expanded or collapsed
   * @returns {Array} returns.data.kanban[].taskList - Array of tasks within this status column
   * @returns {Array} returns.data.kanban[].statusTagsList - List of status tags available for filtering
   * @public
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   orgId: '55e4a3bd6be6b45210833fae',
   *   orgProcessName: 'employee-onboarding',
   *   flowId: 'Task_16888el'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const kanbanData = await api.user.kanban.get(params, session);
   *
   * Expected response structure:
   * {
   *   success: true,
   *   kanban: [
   *     {
   *       id: 'pending',
   *       title: 'Pending Tasks',
   *       isExpanded: true,
   *       taskList: [
   *         { taskId: '507f1f77bcf86cd799439011', title: 'Review Document', ... },
   *         { taskId: '507f1f77bcf86cd799439012', title: 'Approve Request', ... }
   *       ],
   *       statusTagsList: ['urgent', 'review', 'approved', 'rejected']
   *     },
   *     {
   *       id: 'in-progress',
   *       title: 'In Progress',
   *       isExpanded: true,
   *       taskList: [...],
   *       statusTagsList: ['urgent', 'review', 'approved', 'rejected']
   *     }
   *   ]
   * }
   */
  async get(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to get task');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(params.orgProcessName, Joi.string().required(), 'The organization process name');
      Joi.assert(params.flowId, Joi.string().required(), 'Flow id for the specific kanban flow');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const { orgId, orgProcessName, flowId } = params;

      // Build API endpoint with flowId as part of the path
      const endpoint = `/organization/${orgId}/kanban/${orgProcessName}/flow/${flowId}`;

      const apiCall = self._client
          .get(endpoint, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Updates the tasks order and status
   * @param {Object} params - Parameters object
   * @param {string} params.orgId - Organization id (_id database)
   * @param {Array} params.tasks - Array of task objects containing taskId and order
   * @param {string} params.tasks[].taskId - The unique identifier of the task to update
   * @param {number} params.tasks[].order - The new order position for the task
   * @param {string} params.tasks[].status - The status of the task
   * @param {string} session - Session, token JWT
   * @returns {promise} Promise that resolves to operation status
   * @returns {Object} returns.data - The response data containing:
   * @returns {boolean} returns.data.success - Indicates if the operation was successful
   * @returns {string} [returns.data.error] - Error message if operation failed
   * @public
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   orgId: '55e4a3bd6be6b45210833fae',
   *   tasks: [
   *     { taskId: '507f1f77bcf86cd799439011', order: 0, status: '507f1f77bcf86cd799439012' },
   *     { taskId: '507f1f77bcf86cd799439012', order: 1, status: '507f1f77bcf86cd799439012' },
   *     { taskId: '507f1f77bcf86cd799439013', order: 0, status: '507f1f77bcf86cd799439013' }
   *   ]
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const result = await api.user.kanban.updateTasksOrder(params, session);
   *
   * Expected response structure (success):
   * {
   *   success: true
   * }
   *
   * Expected response structure (error):
   * {
   *   success: false,
   *   error: "One or more tasks not found"
   * }
   */
  async update(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to update tasks order');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(params.tasks, Joi.array().required(), 'Array of task objects containing taskId and order');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const { orgId, tasks } = params;

      // Build API endpoint for updating multiple tasks order
      const endpoint = `/organization/${orgId}/kanban/tasks`;

      const apiCall = self._client
          .put(endpoint, { tasks }, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Updates the order of a task in its status column on the Kanban board
   * @param {Object} params - Parameters object
   * @param {string} params.orgId - Organization id (_id database)
   * @param {string} params.taskId - The ID of the task to update
   * @param {number} params.order - The new order position of the task
   * @param {string} session - Session, token JWT
   * @returns {promise} Promise that resolves to operation status
   * @returns {Object} returns.data - The response data containing:
   * @returns {boolean} returns.data.success - Indicates if the operation was successful
   * @returns {string} [returns.data.error] - Error message if operation failed
   * @public
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   orgId: '55e4a3bd6be6b45210833fae',
   *   taskId: '507f1f77bcf86cd799439011',
   *   order: 3
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const result = await api.user.kanban.updateTaskOrder(params, session);
   *
   * Expected response structure (success):
   * {
   *   success: true
   * }
   *
   * Expected response structure (error):
   * {
   *   success: false,
   *   error: "Task not found"
   * }
   */
  async updateTaskOrder(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to update task order');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(params.taskId, Joi.string().required(), 'The ID of the task to update');
      Joi.assert(params.order, Joi.number().required(), 'The new order position of the task');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const { orgId, taskId, order } = params;

      // Build API endpoint for updating task order
      const endpoint = `/organization/${orgId}/kanban/task/${taskId}/order`;

      const apiCall = self._client
          .put(endpoint, { order }, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Updates the order of multiple tasks in their status columns on the Kanban board
   * @param {Object} params - Parameters object
   * @param {string} params.orgId - Organization id (_id database)
   * @param {Array} params.tasks - Array of task objects containing taskId and order
   * @param {string} params.tasks[].taskId - The unique identifier of the task to update
   * @param {number} params.tasks[].order - The new order position for the task
   * @param {string} session - Session, token JWT
   * @returns {promise} Promise that resolves to operation status
   * @returns {Object} returns.data - The response data containing:
   * @returns {boolean} returns.data.success - Indicates if the operation was successful
   * @returns {string} [returns.data.error] - Error message if operation failed
   * @public
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   orgId: '55e4a3bd6be6b45210833fae',
   *   tasks: [
   *     { taskId: '507f1f77bcf86cd799439011', order: 1 },
   *     { taskId: '507f1f77bcf86cd799439012', order: 2 },
   *     { taskId: '507f1f77bcf86cd799439013', order: 3 }
   *   ]
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const result = await api.user.kanban.updateTasksOrder(params, session);
   *
   * Expected response structure (success):
   * {
   *   success: true
   * }
   *
   * Expected response structure (error):
   * {
   *   success: false,
   *   error: "One or more tasks not found"
   * }
   */
  async updateTasksOrder(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to update tasks order');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(params.tasks, Joi.array().required(), 'Array of task objects containing taskId and order');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const { orgId, tasks } = params;

      // Build API endpoint for updating multiple tasks order
      const endpoint = `/organization/${orgId}/kanban/task/orders`;

      const apiCall = self._client
          .put(endpoint, { tasks }, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Updates the status of a task on the Kanban board when moved between columns
   * @param {Object} params - Parameters object
   * @param {string} params.orgId - Organization id (_id database)
   * @param {string} params.taskId - The ID of the task to update
   * @param {string} params.status - The new status value for the task
   * @param {string} session - Session, token JWT
   * @returns {promise} Promise that resolves to operation status
   * @returns {Object} returns.data - The response data containing:
   * @returns {boolean} returns.data.success - Indicates if the operation was successful
   * @returns {string} [returns.data.error] - Error message if operation failed
   * @public
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   orgId: '55e4a3bd6be6b45210833fae',
   *   taskId: '507f1f77bcf86cd799439011',
   *   status: 'in-progress'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const result = await api.user.kanban.updateTaskStatus(params, session);
   *
   * Expected response structure (success):
   * {
   *   success: true
   * }
   *
   * Expected response structure (error):
   * {
   *   success: false,
   *   error: "Task not found"
   * }
   */
  async updateTaskStatus(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to update task status');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(params.taskId, Joi.string().required(), 'The ID of the task to update');
      Joi.assert(params.status, Joi.string().required(), 'The new status value for the task');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const { orgId, taskId, status } = params;

      // Build API endpoint for updating task status
      const endpoint = `/organization/${orgId}/kanban/task/${taskId}/status`;

      const apiCall = self._client
          .put(endpoint, { status }, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Adds a tag to a task on the Kanban board without creating duplicates
   * @param {Object} params - Parameters object
   * @param {string} params.orgId - Organization id (_id database)
   * @param {string} params.taskId - The ID of the task to update
   * @param {string} params.tag - The tag to add to the task
   * @param {string} session - Session, token JWT
   * @returns {promise} Promise that resolves to operation status
   * @returns {Object} returns.data - The response data containing:
   * @returns {boolean} returns.data.success - Indicates if the operation was successful
   * @returns {string} [returns.data.error] - Error message if operation failed
   * @public
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   orgId: '55e4a3bd6be6b45210833fae',
   *   taskId: '507f1f77bcf86cd799439011',
   *   tag: 'urgent'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const result = await api.user.kanban.addTaskTag(params, session);
   *
   * Expected response structure (success):
   * {
   *   success: true
   * }
   *
   * Expected response structure (error):
   * {
   *   success: false,
   *   error: "Task not found"
   * }
   */
  async addTaskTag(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to add task tag');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(params.taskId, Joi.string().required(), 'The ID of the task to update');
      Joi.assert(params.tag, Joi.string().required(), 'The tag to add to the task');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const { orgId, taskId, tag } = params;

      // Build API endpoint for adding task tag
      const endpoint = `/organization/${orgId}/kanban/task/${taskId}/tag`;

      const apiCall = self._client
          .put(endpoint, { tag }, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Removes a specific tag from a task on the Kanban board
   * @param {Object} params - Parameters object
   * @param {string} params.orgId - Organization id (_id database)
   * @param {string} params.taskId - The ID of the task to update
   * @param {string} params.tag - The tag to remove from the task
   * @param {string} session - Session, token JWT
   * @returns {promise} Promise that resolves to operation status
   * @returns {Object} returns.data - The response data containing:
   * @returns {boolean} returns.data.success - Indicates if the operation was successful
   * @returns {string} [returns.data.error] - Error message if operation failed
   * @public
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   orgId: '55e4a3bd6be6b45210833fae',
   *   taskId: '507f1f77bcf86cd799439011',
   *   tag: 'urgent'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const result = await api.user.kanban.removeTaskTag(params, session);
   *
   * Expected response structure (success):
   * {
   *   success: true
   * }
   *
   * Expected response structure (error):
   * {
   *   success: false,
   *   error: "Task not found"
   * }
   */
  async removeTaskTag(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to remove task tag');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(params.taskId, Joi.string().required(), 'The ID of the task to update');
      Joi.assert(params.tag, Joi.string().required(), 'The tag to remove from the task');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const { orgId, taskId, tag } = params;

      // Build API endpoint for removing task tag
      const endpoint = `/organization/${orgId}/kanban/task/${taskId}/tag/${tag}`;

      const apiCall = self._client
          .delete(endpoint, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Updates the status list order for a specific flow in an organization process on the Kanban board
   *  Can also be used to update the name, expanded and or the color value of an status of the status list
   *  That is: updates the whole status list
   * @param {Object} params - Parameters object
   * @param {string} params.orgId - Organization id (_id database)
   * @param {string} params.orgProcessName - The name of the organization process
   * @param {string} params.flowId - The id of the organization process step flowId
   * @param {Array} params.statusList - The status list with new order
   * @param {Object} params.statusList[] - Status object configuration
   * @param {string} params.statusList[].value - The title of the status
   * @param {boolean} params.statusList[].expanded - If the status column is expanded or not
   * @param {string} params.statusList[].color - The hexadecimal color code for the status
   * @param {string} session - Session, token JWT
   * @returns {promise} Promise that resolves to operation status
   * @returns {Object} returns.data - The response data containing:
   * @returns {boolean} returns.data.success - Indicates if the operation was successful
   * @returns {string} [returns.data.error] - Error message if operation failed
   * @public
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   orgId: '55e4a3bd6be6b45210833fae',
   *   orgProcessName: 'employee-onboarding',
   *   flowId: 'Task_16888el',
   *   statusList: [
   *     { value: 'Pending', expanded: true, color: '#FF6B6B' },
   *     { value: 'In Progress', expanded: true, color: '#4ECDC4' },
   *     { value: 'Under Review', expanded: false, color: '#45B7D1' },
   *     { value: 'Completed', expanded: true, color: '#96CEB4' }
   *   ]
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const result = await api.user.kanban.updateStatusList(params, session);
   *
   * Expected response structure (success):
   * {
   *   success: true
   * }
   *
   * Expected response structure (error):
   * {
   *   success: false,
   *   error: "Organization process not found"
   * }
   */
  async updateStatusList(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to update status list');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization id (_id database)');
      Joi.assert(params.orgProcessName, Joi.string().required(), 'The name of the organization process');
      Joi.assert(params.flowId, Joi.string().required(), 'The id of the organization process step flowId');
      Joi.assert(params.statusList, Joi.array().required(), 'The status list with new order');
      Joi.assert(session, Joi.string().required(), 'Session token JWT');

      const { orgId, orgProcessName, flowId, statusList } = params;

      // Build API endpoint for updating status list
      const endpoint = `/organization/${orgId}/kanban/${orgProcessName}/flow/${flowId}`;

      const apiCall = self._client
          .put(endpoint, { statusList }, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

export default Kanban;
