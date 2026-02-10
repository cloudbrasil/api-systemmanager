import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';

/**
 * Admin Class for user, permission admin
 * @class
 */
class AdminUser {

  constructor(options) {
    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self.parent = options.parent;
    self.client = self.parent.dispatch.getClient();
    self._orgId = null;
  }

  /**
   * @description Set the organization ID for org-scoped API calls
   * @param {string} orgId - Organization ID
   * @return {AdminUser} this instance for chaining
   * @public
   */
  setOrgId(orgId) {
    this._orgId = orgId;
    return this;
  }

  /**
   * @description Get the base path for user admin API calls.
   * When orgId is set, uses org-scoped endpoints.
   * When orgId is not set, falls back to legacy admin endpoints.
   * @return {string} base path
   * @private
   */
  _basePath() {
    if (this._orgId) {
      return `/organizations/${this._orgId}/adminusers`;
    }
    return '/admin/users';
  }

  /**
   * @description Get the base path for org-specific operations (groups, orgchart).
   * When orgId is set, uses org-scoped endpoints.
   * @param {string} orgId - Organization ID for the operation
   * @return {string} base path
   * @private
   */
  _orgPath(orgId) {
    if (this._orgId) {
      return `/organizations/${orgId}/adminusers`;
    }
    return `/admin/organizations/${orgId}`;
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Get the return data and check for errors
   * @param {object} retData Response HTTP
   * @return {*}
   * @private
   */
  _returnData(retData, def = {}) {
    if (retData.status !== 200) {
      return Boom.badRequest(_.get(retData, 'message', 'No error message reported!'));
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
   * @description Request profile by userId
   * @param {string} userId User identifier (_id database)
   * @param {string} session Is token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const userId = '55e4a3bd6be6b45210833fae';
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.user.findById(userId, session);
   */
  async findById(userId, session) {
    const self = this;

    try {

      Joi.assert(userId, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const apiCall = self.client.get(`${self._basePath()}/${userId}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Request profile by userId
   * @param {string} userIds Users identifier (_id database)
   * @param {string} apiKey Api to use to search users
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const userIds = ['55e4a3bd6be6b45210833fae', '55e4a3bd6be6b45210833fae'];
   * const apiKey = 'c9bbd652-d112-454e-8595-f1669f49dde0';
   * await api.admin.user.findByIds(userIds, apiKey);
   */
  async findByIds(userIds, apiKey) {
    const self = this;

    try {
      Joi.assert(userIds, Joi.array().items(Joi.string()).required(), 'Users identifier (_id database)');
      Joi.assert(apiKey, Joi.string().required(), 'Api to use to search users');

      const apiCall = self.client.post(`/api/admin/users?apiKey=${apiKey}`, { userIds });
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Update password by userId
   * @param {object} params Params to update password
   * @param {string} params.userId Id of the user
   * @param {string} params.oldPassword Old password
   * @param {string} params.newPassword New password
   * @param {string} session Is token JWT
   * @return {Promise<unknown>}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  userId: '55e4a3bd6be6b45210833fae',
   *  oldPassword: '123456',
   *  newPassword: '123456789'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.user.findByIdAndUpdatePassword(params, session);
   */
  async findByIdAndUpdatePassword(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.userId, Joi.string().required());
      Joi.assert(params.oldPassword, Joi.string().required());
      Joi.assert(params.newPassword, Joi.string().required());
      Joi.assert(session, Joi.string().required());

      const { userId, ...payload } = params;
      const apiCall = self.client.put(`${self._basePath()}/${userId}/password`, payload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Check if email is unique
   * @param {string} email Check if email is unique
   * @param {string} session Is token JWT
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const email = 'ana.silva@gmail.com';
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.user.emailExist(email, session);
   */
  async emailExist(email, session) {
    const self = this;

    try {
      Joi.assert(email, Joi.string().email().required());
      Joi.assert(session, Joi.string().required());

      const payload = { email };
      const apiCall = self.client.post(`${self._basePath()}/email/exist`, payload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description update userData by userSMId
   * @param {string} userId - User SM Id
   * @param {object} payload - Payload to update
   * @param {string} session - Is token JWT
   * @returns {Promise<*>}
   * @async
   * @public
   * @example
   *
   * const userId = '55e4a3bd6be6b45210833fae';
   * const payload = {
   *   name: 'Maria joaquina',
   *   email: 'maria@gmail.com'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   */
  async findByIdAndUpdate(userId, payload, session) {
    const self = this;

    try {
      Joi.assert(userId, Joi.string().required(), 'User id of SM');
      Joi.assert(payload, Joi.object().required(), 'Payload to update');
      Joi.assert(session, Joi.string().required(), 'Session user admin');

      const apiCall = self.client.put(`${self._basePath()}/${userId}`, payload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Create a new user
   * @param {object} payload User data to create
   * @param {string} payload.name Full name (required)
   * @param {string} payload.username Username (required)
   * @param {string} payload.email Email (required)
   * @param {string} payload.orgId Primary organization ID (required)
   * @param {array} [payload.orgIds] Organization IDs
   * @param {array} [payload.role=[2]] Security roles
   * @param {string} [payload.password] Initial password
   * @param {string} session JWT session token
   * @return {Promise<object>} Created user document
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const payload = {
   *   name: 'Maria Silva',
   *   username: 'maria.silva',
   *   email: 'maria@example.com',
   *   orgId: '5edd11c46b6ce9729c2c297c',
   *   role: [2]
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.user.create(payload, session);
   */
  async create(payload, session) {
    const self = this;

    try {
      Joi.assert(payload, Joi.object().required(), 'User data to create');
      Joi.assert(payload.name, Joi.string().required(), 'Full name');
      Joi.assert(payload.username, Joi.string().required(), 'Username');
      Joi.assert(payload.email, Joi.string().email().required(), 'Email');
      Joi.assert(payload.orgId, Joi.string().required(), 'Primary organization ID');
      Joi.assert(session, Joi.string().required(), 'Session token');

      const apiCall = self.client.put(self._basePath(), payload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Remove a user
   * @param {string} userId User ID to remove (required)
   * @param {string} session JWT session token
   * @return {Promise<object>} Removal confirmation
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const userId = '55e4a3bd6be6b45210833fae';
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.user.remove(userId, session);
   */
  async remove(userId, session) {
    const self = this;

    try {
      Joi.assert(userId, Joi.string().required(), 'User ID');
      Joi.assert(session, Joi.string().required(), 'Session token');

      const apiCall = self.client.delete(`${self._basePath()}/${userId}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description Request GUID to change the password
   * @param {string} email - User email
   * @returns {Promise<*>}
   * @async
   * @public
   * @example
   *
   * const payload = {
   *   email: 'maria@gmail.com'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   */
  async getChangePasswordGuid(email, session) {
    const self = this;

    try {
      Joi.assert(email, Joi.string().required(), 'User email');
      Joi.assert(session, Joi.string().required(), 'Session user admin');

      const payload = { email };
      const apiCall = self.client.post(`${self._basePath()}/change/password`, payload, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description Change password guid
   * @param {object} Payload - Payload to change password
   * @param {string} Payload.guid - GUID
   * @param {string} Payload.newPassword - New password
   * @returns {Promise<*>}
   * @async
   * @public
   * @example
   *
   * const payload = {
   *   guid: '5b3c049c-4861-4353-a423-5e3f14242642',
   *   newPassword: '123456789'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   */
  async changePasswordGuid(payload, session) {
    const self = this;

    try {
      Joi.assert(payload, Joi.object().required(), 'Payload to change password');
      Joi.assert(payload.guid, Joi.string().required(), 'GUID');
      Joi.assert(payload.newPassword, Joi.string().required(), 'New password');
      Joi.assert(session, Joi.string().required(), 'Session user admin');

      const apiCall = self.client.put(`${self._basePath()}/change/password`, payload, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Request signed url url to put or get
   * @param {object} params - Params to get form list
   * @param {number} params.page=1 - Page of pagination
   * @param {number} params.perPage=200 - Items per page
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
   *  project: {_id: 1, name: 1, orgId: 1, orgIds: 1},
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.form.getUserList(params, session);
   */
  async getUserList(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Params to get form list');
      Joi.assert(params.page, Joi.number(), 'Page of pagination');
      Joi.assert(params.perPage, Joi.number(), 'Items per page');
      Joi.assert(params.project, Joi.object(), 'Fields to project');
      Joi.assert(params.sort, Joi.object(), 'Sort fields for');
      Joi.assert(session, Joi.string().required(), 'Session, token JWT');

      const PROJECTION_DEFAULT = {_id: 1, name: 1};
      const SORT_DEFAULT = {name: 1};

      const {
        page = 1,
        perPage = 200,
        project = PROJECTION_DEFAULT,
        sort = SORT_DEFAULT,
        filter = {}
      } = params;

      const payloadToSend = {$project: project, sort, ...filter};

      const apiCall = self.client
          .post(`${self._basePath()}?page=${page}&perPage=${perPage}`, payloadToSend, self._setHeader(session));

      return self._returnData(await apiCall);

    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Block a user (prevent login)
   * @param {string} userId User ID to block (required)
   * @param {string} session JWT session token
   * @return {Promise<object>} Updated user
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const userId = '55e4a3bd6be6b45210833fae';
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.user.block(userId, session);
   */
  async block(userId, session) {
    const self = this;

    try {
      Joi.assert(userId, Joi.string().required(), 'User ID');
      Joi.assert(session, Joi.string().required(), 'Session token');

      const apiCall = self.client.put(`${self._basePath()}/${userId}/block`, {}, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Unblock a user (allow login)
   * @param {string} userId User ID to unblock (required)
   * @param {string} session JWT session token
   * @return {Promise<object>} Updated user
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const userId = '55e4a3bd6be6b45210833fae';
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.user.unblock(userId, session);
   */
  async unblock(userId, session) {
    const self = this;

    try {
      Joi.assert(userId, Joi.string().required(), 'User ID');
      Joi.assert(session, Joi.string().required(), 'Session token');

      const apiCall = self.client.put(`${self._basePath()}/${userId}/unblock`, {}, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Block email notifications for a user
   * @param {string} userId User ID (required)
   * @param {string} session JWT session token
   * @return {Promise<object>} Updated user
   * @public
   * @async
   */
  async blockEmail(userId, session) {
    const self = this;

    try {
      Joi.assert(userId, Joi.string().required(), 'User ID');
      Joi.assert(session, Joi.string().required(), 'Session token');

      const apiCall = self.client.put(`${self._basePath()}/${userId}/blockemail`, {}, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Unblock email notifications for a user
   * @param {string} userId User ID (required)
   * @param {string} session JWT session token
   * @return {Promise<object>} Updated user
   * @public
   * @async
   */
  async unblockEmail(userId, session) {
    const self = this;

    try {
      Joi.assert(userId, Joi.string().required(), 'User ID');
      Joi.assert(session, Joi.string().required(), 'Session token');

      const apiCall = self.client.put(`${self._basePath()}/${userId}/unblockemail`, {}, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Update user type classification
   * @param {object} params Parameters
   * @param {string} params.userId User ID (required)
   * @param {string} params.userType New user type (required)
   * @param {string} session JWT session token
   * @return {Promise<object>} Updated user
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = { userId: '55e4a3bd6be6b45210833fae', userType: 'USER' };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.user.updateUserType(params, session);
   */
  async updateUserType(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Parameters');
      Joi.assert(params.userId, Joi.string().required(), 'User ID');
      Joi.assert(params.userType, Joi.string().required(), 'User type');
      Joi.assert(session, Joi.string().required(), 'Session token');

      const { userId, userType } = params;
      const apiCall = self.client.put(`${self._basePath()}/${userId}/type/${userType}`, {}, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Get organization groups with their permissions
   * @param {string} orgId Organization ID (required)
   * @param {string} session JWT session token
   * @return {Promise<array>} Array of groups with permissions
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const orgId = '5edd11c46b6ce9729c2c297c';
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const groups = await api.admin.user.getGroupsPermissions(orgId, session);
   */
  async getGroupsPermissions(orgId, session) {
    const self = this;

    try {
      Joi.assert(orgId, Joi.string().required(), 'Organization ID');
      Joi.assert(session, Joi.string().required(), 'Session token');

      const apiCall = self.client.get(
        `${self._orgPath(orgId)}/groups/permissions`,
        self._setHeader(session)
      );
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Update user's group memberships in an organization
   * @param {object} params Parameters
   * @param {string} params.orgId Organization ID (required)
   * @param {string} params.userId User ID (required)
   * @param {array} params.groups Array of group IDs (required)
   * @param {string} session JWT session token
   * @return {Promise<object>} Updated groups
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   orgId: '5edd11c46b6ce9729c2c297c',
   *   userId: '55e4a3bd6be6b45210833fae',
   *   groups: ['groupId1', 'groupId2']
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.user.updateUserGroups(params, session);
   */
  async updateUserGroups(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Parameters');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization ID');
      Joi.assert(params.userId, Joi.string().required(), 'User ID');
      Joi.assert(params.groups, Joi.array().required(), 'Group IDs');
      Joi.assert(session, Joi.string().required(), 'Session token');

      const { orgId, userId, groups } = params;
      const apiCall = self.client.put(
        `${self._orgPath(orgId)}/groups/${userId}`,
        { groups },
        self._setHeader(session)
      );
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Get organizations the admin user can manage
   * @param {string} session JWT session token
   * @return {Promise<array>} Array of organizations
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const orgs = await api.admin.user.getOrganizations(session);
   */
  async getOrganizations(session) {
    const self = this;

    try {
      Joi.assert(session, Joi.string().required(), 'Session token');

      const apiCall = self.client.get(`${self._basePath()}/organizations`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @description Get users belonging to an organization
   * @param {object} params Parameters
   * @param {string} params.orgId Organization ID (required)
   * @param {array} [params.userIds] Optional array of user IDs to filter
   * @param {string} session JWT session token
   * @return {Promise<array>} Array of users with id, name, email, title
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = { orgId: '5edd11c46b6ce9729c2c297c' };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const users = await api.admin.user.getOrgUsers(params, session);
   */
  async getOrgUsers(params, session) {
    const self = this;

    try {
      Joi.assert(params, Joi.object().required(), 'Parameters');
      Joi.assert(params.orgId, Joi.string().required(), 'Organization ID');
      Joi.assert(session, Joi.string().required(), 'Session token');

      const { orgId, userIds } = params;
      let url = this._orgId ? `${self._orgPath(orgId)}/orgusers` : `/admin/organizations/${orgId}/orgusers`;
      if (userIds && userIds.length > 0) {
        url += `?userIds=${JSON.stringify(userIds)}`;
      }

      const apiCall = self.client.get(url, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

export default AdminUser;
