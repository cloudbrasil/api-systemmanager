'use strict';

var _ = require('lodash');
var Joi = require('joi');
var Axios = require('axios');
var Boom$1 = require('@hapi/boom');
var Moment = require('moment');
var CryptoJS = require('crypto-js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ___default = /*#__PURE__*/_interopDefaultLegacy(_);
var Joi__default = /*#__PURE__*/_interopDefaultLegacy(Joi);
var Axios__default = /*#__PURE__*/_interopDefaultLegacy(Axios);
var Boom__default = /*#__PURE__*/_interopDefaultLegacy(Boom$1);
var Moment__default = /*#__PURE__*/_interopDefaultLegacy(Moment);
var CryptoJS__default = /*#__PURE__*/_interopDefaultLegacy(CryptoJS);

/**
 * @class Api dispatch manager
 */
class Dispatch {

  constructor(options) {

    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

    const self = this;
    self.parent = options.parent;
    self._client = Axios__default["default"].create({baseURL: self.parent.options.uri});
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
      throw Boom.badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
    } else {
      return ___default["default"].get(retData, 'data', def);
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
   * Get the URL context
   * @param url {string} Full url
   * @param session {session} Session, token JWT
   * @return {Promise<object>} The full data context of the URL
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const retContext = await api.dispatch.getContext('http://myndware.io/login/myorg);
   *
   */
  async getContext(url, session = null) {
    Joi__default["default"].assert(url, Joi__default["default"].string().required());

    if(url.includes('?')) {
      url = `${url}&json=true`;
    } else {
      url = `${url}?json=true`;
    }

    const self = this;
    const header = session ? self._setHeader(session) : {};
    const apiCall = self._client.get(url, header);
    return self._returnData(await apiCall);
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get client Axios
   * @return {promise} return client axios
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * await api.dispatch.getClient();
   */
  getClient() {
    try {
      const self = this;
      return self._client;
    } catch (ex) {
      return ex;
    }
  }
}

/**
 * @class Session manager of the API
 */
class Session {

  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

    const self = this;
    self._session;
    self._userData;

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
      return Boom__default["default"].badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
    } else {
      return ___default["default"].get(retData, 'data', def);
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
   * @description Show information for session, thus validating the session (Valid token JWT)
   * @param {string} sessionId The user session (JWT Token)
   * @param {string} suSessionId=sessionId Given a JWT Token of a SU (SuperAdmin), allow to check session for another user.
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const sessionId = 'eyJhbFVBBiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const suSessionId = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.session.information(sessionId, suSessionId);
   *
   */
  async information(sessionId, suSessionId = null) {
    const self = this;

    try {
      Joi__default["default"].assert(sessionId, Joi__default["default"].string().required());

      // if not provided, just use the same sessionId
      suSessionId = suSessionId || sessionId;

      const apiCall = self._client.get(`session?token=${sessionId}`, self._setHeader(suSessionId));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

/**
 * @class Login manager
 */
class Login {

  constructor(options) {

    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

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
      throw Boom.badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
    } else {
      return ___default["default"].get(retData, 'data', def);
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
   * @description Login with social login Facebook
   * @param {object} params Params to login Facebook
   * @param {string} params.accessToken Access token of the system manager
   * @param {object} params.initialUserData Object with roles default if sigin
   * @param {array} params.initialUserData.externalRoles Array with permission of user
   * @return {promise<object>} data
   * @return {object} data.auth true or false if we have the user authenticaited correctly
   * @return {object} data.user the logged user
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   *
   * // Params of the instance
   * const params = {...}
   * const api = new API(params);
   * const params = { accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cC...' };
   * const { auth, user } = await api.login.facebook(params);
   */
  async facebook(params) {
    const self = this;
    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required(), 'Params to login Facebook');
      Joi__default["default"].assert(params.accessToken, Joi__default["default"].string().required(), 'Access token of the system manager');

      if (___default["default"].hasIn(params, 'initialUserData')) {
        Joi__default["default"].assert(params.initialUserData, Joi__default["default"].object().required(), 'Object with roles default if sigin');
        Joi__default["default"].assert(params.initialUserData.externalRoles, Joi__default["default"].array().required(), 'Array with permission of user');
      }

      const apiCall = self._client.post('/login/facebook', params);
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Login with social login Google
   * @param {object} params Params to login Google
   * @param {string} params.accessToken Access token of the system manager
   * @param {object} params.initialUserData Object with roles default if sigin
   * @param {array} params.initialUserData.externalRoles Array with permission of user
   * @return {promise<object>} data
   * @return {object} data.auth true or false if we have the user authenticaited correctly
   * @return {object} data.user the logged user
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   *
   * // Params of the instance
   * const params = {...}
   * const api = new API(params);
   * const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cC...';
   * const { auth, user } = await api.login.google(accessToken);
   */
  async google(params) {
    const self = this;
    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required(), 'Params to login Google');
      Joi__default["default"].assert(params.accessToken, Joi__default["default"].string().required(), 'Access token of the system manager');

      if (___default["default"].hasIn(params, 'initialUserData')) {
        Joi__default["default"].assert(params.initialUserData, Joi__default["default"].object().required(), 'Object with roles default if sigin');
        Joi__default["default"].assert(params.initialUserData.externalRoles, Joi__default["default"].array().required(), 'Array with permission of user');
      }

      const apiCall = self._client.post('/login/google', params);
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Login with apikey
   * @param {string} apikey Access key
   * @return {promise<object>} data
   * @return {object} data.auth true or false if we have the user authenticaited correctly
   * @return {object} data.user the logged user
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   *
   * // Params of the instance
   * const params = {...}
   * const api = new API(params);
   * const apiKey = '043a0eb2-f5c3-4900-b781-7f229d00d092';
   * const { auth, user } = await api.login.apiKey(apiKey);
   */
  async apiKey(apiKey) {
    const self = this;
    try {
      Joi__default["default"].assert(apiKey, Joi__default["default"].string().required());

      const apiCall = self._client.post('/login/api', {apiKey});
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Login with user and password
   * @param {object} params Object with user and password
   * @param {string} params.username Username or email of the user
   * @param {string} params.password Password of the user
   * @param {string} params.orgname The organame of the user
   * @return {promise<object>} data
   * @return {object} data.auth true or false if we have the user authenticaited correctly
   * @return {object} data.user the logged user
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   *
   * // Params of the instance
   * const params = {...}
   * const api = new API(params);
   * const params = {
   *   username: 'ana.silva@gmail.com',
   *   password: '123456'
   * };
   * const { auth, user } = await api.login.userPass(params);
   */
  async userPass(params) {
    const self = this;
    try {
      Joi__default["default"].assert(params.username, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.password, Joi__default["default"].string().required());
      const { orgname = '' } = params;
      let url;
      if(orgname !== '') {
        url = `/login/${orgname}`;
      } else {
        url = `/login`;
      }
      const apiCall = self._client.post(url, params);
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Logout user system manager
   * @param {string} session Session, token JWT
   * @return {promise<object>}} data
   * @return {boolean} data.success true|false
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   *
   * // Params of the instance
   * const params = {...}
   * const api = new API(params);
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const { success } = await api.login.logout(session);
   */
  async logout(session) {
    const self = this;
    try {
      Joi__default["default"].assert(session, Joi__default["default"].string().required());

      const apiCall = self._client.get('/logout', self._setHeader(session));
      const { response = 'NOT_OK' } = self._returnData(await apiCall);
      return response === 'OK';
    } catch (ex) {
      throw ex;
    }
  }
}

/**
 * General Class for user, permission organization
 * @class
 */
class GeoLocation {

  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

    const self = this;
    self._parent = options.parent;
    self._client = self._parent.dispatch.getClient();
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
      return Boom__default["default"].badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
    } else {
      return ___default["default"].get(retData, 'data', def);
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
   * @description Get geo location of the address
   * @param {!object} params - Params to get geo location
   * @param {!string} params.address - The address to get the location for
   * @param {!string} params.apiKey - The Organization API Key
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  address: 'Rua Sud Menucci, 615 - Vila Camilopolis, Santo André - SP',
   *  apiKey: 'AIzaSyC7gJFOkuT-Mel3WZbX5uKuJ1USqLVkGnY',
   * };
   * await api.general.geo.location(params);
   */
  async location(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required());
      Joi__default["default"].assert(params.address, Joi__default["default"].string().required(), 'The address to get the location for');
      Joi__default["default"].assert(params.apiKey, Joi__default["default"].string().required(), 'The Organization API Key');

      const {address, apiKey} = params;
      const query = `address=${address}&apiKey=${apiKey}`;

      const apiCall = self._client.get(`/location/geo?${query}`);
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

/**
 * @class API request, user permission level
 */
class Users$1 {
  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @constructor
   * @param {object} options Params of the constructor
   * @param {object} options.parent This of the pararent
   */
  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

    const self = this;
    self.geo = new GeoLocation(options);
  }
}

/**
 * Class for documents, permission user
 * @class
 */
class Documents {

  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

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
      throw Boom__default["default"].badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
    } else {
      return ___default["default"].get(retData, 'data', def);
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
   * @description Create document with informed data
   * @param {object} params Object for add new document
   * @param {string} params.orgname Organization name
   * @param {string} params.areaId Doc area id (_id database)
   * @param {string} params.docId Document id (_id database)
   * @param {string} [params.documentDate=new\ Date()] Date of document
   * @param {string} params.filename File name
   * @param {string} params.type Mimetype of the document (image/png)
   * @param {string} params.name Doument name
   * @param {string} [params.content=''] Content of document
   * @param {string} [params.description=''] Description of document
   * @param {string} [params.category=''] Category of document
   * @param {array} [params.tags=[]] Tags of document
   * @param {string} params.docTypeId Document type id (_id database)
   * @param {boolean} [params.hasPhisicalStorage=false] Has Phisical Storage
   * @param {string} [params.boxId=''] Box ID
   * @param {string} [params.storageStatus=''] Storage status
   * @param {boolean} [params.ocrDocumentBackend=false] Ocr document backend
   * @param {number} params.bytes Size document in bytes
   * @param {object} [params.docAreaPermission={}] Permission to doc area
   * @param {object} [params.docTypeFieldsData={}] Fields data "extraField'
   * @param {string} params.signedUrl SIgned URL
   * @param {string} [params.urlType='S3'] URL type
   * @param {string} [params.addType='S3_SIGNED'] Add type
   * @return {{documentDate: *, docId: *, docAreaPermission: *, document: *, docTypeFieldsData: *, description: *, storageStatus: *, type: *, content: *, tags: *, addType: *, urlType: *, areaId: *, orgname: *, docTypeId: *, bytes: *, name: *, category: *, hasPhisicalStorage: *, signedUrl: *, ocrDocumentBackend: *, boxId: *}}
   * @private
   */
  _formatDocument(params) {
    try {
      return {
        orgname: ___default["default"].get(params, 'orgname'),
        areaId: ___default["default"].get(params, 'areaId'),
        docId: ___default["default"].get(params, 'docId'),
        documentDate: ___default["default"].get(params, 'documentDate', Moment__default["default"]().format()),
        document: ___default["default"].get(params, 'document'),
        type: ___default["default"].get(params, 'type'),
        name: ___default["default"].get(params, 'name'),
        content: ___default["default"].get(params, 'content', ''),
        description: ___default["default"].get(params, 'description', ''),
        category: ___default["default"].get(params, 'category', ''),
        tags: ___default["default"].get(params, 'tags', []),
        docTypeId: ___default["default"].get(params, 'docTypeId'),
        hasPhisicalStorage: ___default["default"].get(params, 'hasPhisicalStorage', false),
        boxId: ___default["default"].get(params, 'boxId', ''),
        storageStatus: ___default["default"].get(params, 'storageStatus', ''),
        ocrDocumentBackend: ___default["default"].get(params, 'ocrDocumentBackend', false),
        bytes: ___default["default"].get(params, 'bytes'),
        docAreaPermission: ___default["default"].get(params, 'docAreaPermission', {}),
        docTypeFieldsData: ___default["default"].get(params, 'docTypeFieldsData', {}), // {"extraId": userId},
        signedUrl: ___default["default"].get(params, 'signedUrl', ''),
        urlType: ___default["default"].get(params, 'urlType', 'S3'),
        addType: ___default["default"].get(params, 'addType', 'S3_SIGNED'),
      };
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Transform objtect query in query string
   * @param {object} searchQuery object wicth query
   * @return {string} Retutn string query
   * @private
   */
  _queryReducer(searchQuery) {
    return Object.keys(searchQuery).reduce((query, key, idx, sourceList) => {
      idx++;

      const data = key === 'ix'
        ? JSON.stringify(searchQuery[key])
        : searchQuery[key];

      const querySearch = sourceList.length === idx
        ? `${key}=${data}`
        : `${key}=${data}&`;

      query += querySearch;
      return query;
    }, '');
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Create new document
   * @param {object} params Object for add new document
   * @param {string} params.orgname Organization name
   * @param {string} params.areaId Doc area id (_id database)
   * @param {string} params.docId Document id (_id database)
   * @param {string} [params.documentDate=new\ Date()] Date of document
   * @param {string} params.document The path to the file. If S3, the key to S3, gotten after getting a signed URL
   * @param {string} params.filename File name
   * @param {string} params.type Mimetype of the document (image/png)
   * @param {string} params.name Document name
   * @param {string} [params.content=''] Content of document
   * @param {string} [params.description=''] Description of document
   * @param {string} [params.category=''] Category of document
   * @param {array} [params.tags=[]] Tags of document
   * @param {string} params.docTypeId Document type id (_id database)
   * @param {boolean} [params.hasPhisicalStorage=false] Has Phisical Storage
   * @param {string} [params.boxId=''] Box ID
   * @param {string} [params.storageStatus=''] Storage status
   * @param {boolean} [params.ocrDocumentBackend=false] Ocr document backend
   * @param {number} params.bytes Size document in bytes
   * @param {object} [params.docAreaPermission={}] Permission to doc area
   * @param {object} [params.docTypeFieldsData={}] Fields data "extraField'
   * @param {string} params.signedUrl SIgned URL
   * @param {string} [params.urlType='S3'] URL type
   * @param {string} [params.addType='S3_SIGNED'] Add type
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
   *  orgname: 'cloundbrasil',
   *  areaId: '5edf9f8ee896b817e45b8dac',
   *  docId: '5edf86fbe896b817e45b8da6',
   *  fileName: 'foto',
   *  type: 'image/png',
   *  name: 'Fotografia',
   *  docTypeId = '5edf9f8ee896b817e45b8dac',
   *  bytes: 12345,
   *  signedUrl: 'https://s3.amazonaws.com...'
   *  docTypeFieldsData: {extraUser: '12349f8ee896b817e45b8dac'},
   *  orgId: '5df7f19618430c89a41a19d2',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.document.findByIdAndRemove(params, session);
   */
  async add(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required());
      Joi__default["default"].assert(params.orgname, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.areaId, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.docId, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.type, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.name, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.docTypeId, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.bytes, Joi__default["default"].number().required());
      Joi__default["default"].assert(params.orgId, Joi__default["default"].string().required());
      Joi__default["default"].assert(session, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.signedUrl, Joi__default["default"].string().required());

      // Get fields required, and set data default to create document
      const payloadToSend = self._formatDocument(params);

      Joi__default["default"].assert(payloadToSend.documentDate, Joi__default["default"].string().allow(''));
      Joi__default["default"].assert(payloadToSend.content, Joi__default["default"].string().allow(''));
      Joi__default["default"].assert(payloadToSend.description, Joi__default["default"].string().allow(''));
      Joi__default["default"].assert(payloadToSend.category, Joi__default["default"].string().allow(''));
      Joi__default["default"].assert(payloadToSend.tags, Joi__default["default"].array());
      Joi__default["default"].assert(payloadToSend.hasPhisicalStorage, Joi__default["default"].boolean());
      Joi__default["default"].assert(payloadToSend.boxId, Joi__default["default"].string().allow(''));
      Joi__default["default"].assert(payloadToSend.storageStatus, Joi__default["default"].string().allow(''));
      Joi__default["default"].assert(payloadToSend.ocrDocumentBackend, Joi__default["default"].boolean());
      Joi__default["default"].assert(payloadToSend.docAreaPermission, Joi__default["default"].object().allow({}));
      Joi__default["default"].assert(payloadToSend.docTypeFieldsData, Joi__default["default"].object().allow({}));
      Joi__default["default"].assert(payloadToSend.urlType, Joi__default["default"].string().allow(''));
      Joi__default["default"].assert(payloadToSend.addType, Joi__default["default"].string().allow(''));

      const {areaId, orgId} = params;
      const apiCall = self._client
        .put(`/organizations/${orgId}/areas/${areaId}/documents`, payloadToSend, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @param {object} params Object with params
   * @param {string} params.index Field to search
   * @param {string} params.txtToSearch Text to search
   * @param {string} [params.compare=*] Filter to search (=, ~, *, =*, *=, *?)
   * @param {string} params.docId Document id for serach
   * @param {string} params.docAreaId Doc area id
   * @param {string} params.tag Tag of the document
   * @param {string} [params.projection=""] Projection to return fields
   * @param {string} [params.sort="Mais+recentes"] Sort data
   * @param {string} params.orgId Organization id (_id database)
   * @param {string} params.pagination Set pagination
   * @param {number} [params.pagination.page=1] Page
   * @param {number} [params.pagination.perPage=100] perPage Itens per page
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  index: 'extraCity',
   *  txtToSearch: 'São',
   *  docId: '5df7f19618430c89a41a19d2',
   *  docAreaId: '5edd11c46b6ce9729c2c297c',
   *  tag: 'Nome da cidade',
   *  orgId: '1234d01dc4af3941d42f8c5c'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.document.findByIdAndRemove(params, session);
   */
  async find(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required());
      Joi__default["default"].assert(params.index, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.txtToSearch, Joi__default["default"].string().allow(null));
      Joi__default["default"].assert(params.compare, Joi__default["default"].string().allow(null));
      Joi__default["default"].assert(params.docId, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.docAreaId, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.tag, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.projection, Joi__default["default"].string());
      Joi__default["default"].assert(params.orgId, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.sort, Joi__default["default"].string());

      if (___default["default"].hasIn(params, 'pagination')) {
        Joi__default["default"].assert(params.pagination, Joi__default["default"].object());
        Joi__default["default"].assert(params.pagination.page, Joi__default["default"].number());
        Joi__default["default"].assert(params.pagination.perPage, Joi__default["default"].number());
      }

      Joi__default["default"].assert(session, Joi__default["default"].string().required());

      const orgId = ___default["default"].get(params, 'orgId');
      const index = ___default["default"].get(params, 'index');
      const txtToSearch = ___default["default"].get(params, 'txtToSearch', null);
      const compare = ___default["default"].get(params, 'compare', '*');
      const tag = ___default["default"].get(params, 'tag');
      const defaultSearch = {
        p: 100,             // Per page
        i: 1,               // Initial page
        s: 'Mais+recentes', // Sort to search
        ai: '',             // Doc Area Id lists emprego_net
        di: '',             // Document Type Id
        m: 'w',             // Default
        pj: ''              // Projection
      };

      // Mount query to search autocomplete
      defaultSearch.p = ___default["default"].get(params, 'pagination.perPage', 100);
      defaultSearch.i = ___default["default"].get(params, 'pagination.page', 1);
      defaultSearch.s = ___default["default"].get(params, 'sort', 'Mais+recentes');
      defaultSearch.ai = ___default["default"].get(params, 'docAreaId');
      defaultSearch.di = ___default["default"].get(params, 'docId');
      defaultSearch.pj = `_id,${___default["default"].get(params, 'projection', '')}`;

      if (!___default["default"].isNull(txtToSearch)) {
        defaultSearch.ix = {ix: [[index, txtToSearch, compare, 'string', tag]]};
      }

      const query = self._queryReducer(defaultSearch);
      const apiCall = self._client.get(`/organizations/${orgId}/documents/search?${query}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }

  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Remove document by id
   * @param {object} params Params to remove document
   * @param {string} params.docId Document Id (_id database)
   * @param {string} params.orgId Organizarion id (_id database)
   * @param {string} session Session, token JWT
   * @return {Promise<object>} data The returned data
   * @return {number} data.removed The quantity of removed documents
   * @return {array<object>} data.errors Array of errors
   * @return {string} data.errors.id Id of the document that had an error
   * @return {string} data.errors.code Error code
   * @return {string} data.errors.message Error message
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  docId: '5dadd01dc4af3941d42f8c5c',
   *  orgIdId: '5df7f19618430c89a41a19d2',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.document.findByIdAndRemove(params, session);
   */
  async findByIdAndRemove(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required());
      Joi__default["default"].assert(params.docId, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.orgId, Joi__default["default"].string().required());
      Joi__default["default"].assert(session, Joi__default["default"].string().required());

      const {docId, orgId} = params;
      const payloadToSend = {documents: [{_id: docId}]};
      const apiCall = self._client.post(`/organizations/${orgId}/documents/remove`, payloadToSend, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Remove documents
   * @param {object} params Params to remove document
   * @param {array<string>} params.documents An array ids of documents (_id database)
   * @param {array<string>} params.documents._id The document id (_id database)
   * @param {string} params.orgId Organizarion id (_id database)
   * @param {string} session Session, token JWT
   * @return {Promise<object>} data The returned data
   * @return {number} data.removed The quantity of removed documents
   * @return {array<object>} data.errors Array of errors
   * @return {string} data.errors.id Id of the document that had an error
   * @return {string} data.errors.code Error code
   * @return {string} data.errors.message Error message
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  documents: [{ _id: '5dadd01dc4af3941d42f8c5c' }],
   *  orgIdId: '5df7f19618430c89a41a19d2',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.document.findByIdsAndRemove(params, session);
   */
  async findByIdsAndRemove(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required());
      Joi__default["default"].assert(params.documents, Joi__default["default"].array().required());
      Joi__default["default"].assert(params.orgId, Joi__default["default"].string().required());
      Joi__default["default"].assert(session, Joi__default["default"].string().required());

      const {documents, orgId} = params;
      const payloadToSend = { documents };
      const apiCall = self._client.post(`/organizations/${orgId}/documents/remove`, payloadToSend, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   *
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Request signed url url to put or get
   * @param {object} params Params to request signed url
   * @param {string} params.methodType Method type HTTP get or put
   * @param {string} params.docId Document id
   * @param {string} params.fileName File name
   * @param {string} params.docAreaId docAreaId of the document
   * @param {string} params.type mimeType image/png image/jpg others
   * @param {string} params.document Name document to request if method type is get
   * @param {string} params.orgId Organization id (_id database)
   * @param {string} session Session, token JWT
   * @return {Promise<object>} doc Returned document data with the signed url
   * @return {string} doc.docId Document id
   * @return {string} doc.name The name of the document, which is the fileName
   * @return {string} doc.areaId docAreaId of the document
   * @return {string} doc.type the document mimi type
   * @return {string} doc.signedUrl the signed URL to upload
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  methodType: 'put',
   *  docId: '5dadd01dc4af3941d42f8c5c',
   *  docAreaId: '5df7f19618430c89a41a19d2',
   *  fileName: 'Foto',
   *  type: 'image/png'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const { doc: { docId, name, areaId, type, signedUrl } } = await api.user.document.signedUrl(params, session);
   *
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  methodType: 'get',
   *  document: 'pinkandthebrain/5df7f19618430c89a41a19d2/5dadd01dc4af3941d42f8c5c/9dadd01dc4af3941d42f6dd4.pdf',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * const base64Data = await api.user.document.signedUrl(params, session);
   */
  async signedUrl(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required());
      Joi__default["default"].assert(params.methodType, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.orgId, Joi__default["default"].string().required());
      Joi__default["default"].assert(session, Joi__default["default"].string().required());

      const {methodType} = params;

      if (methodType === 'put') {
        Joi__default["default"].assert(params, Joi__default["default"].object().required());
        Joi__default["default"].assert(params.docId, Joi__default["default"].string().required());
        Joi__default["default"].assert(params.docAreaId, Joi__default["default"].string().required());
        Joi__default["default"].assert(params.fileName, Joi__default["default"].string().required());
        Joi__default["default"].assert(params.type, Joi__default["default"].string().required());
      } else {
        Joi__default["default"].assert(params.document, Joi__default["default"].string().required());
      }

      const {orgId} = params;
      let payloadToSend;

      if (params.methodType === 'put') {
        const {docId, fileName: name, docAreaId: areaId, type} = params;
        payloadToSend = {docs: [{docId, name, areaId, type}]};
      } else {
        const {document} = params;
        payloadToSend = {docs: [{document}]};
      }

      const apiCall = self._client
        .post(`/organizations/${orgId}/documents/getDocumentSignedUrl/${methodType}`, payloadToSend, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * Uploads the file
   * @param {object} params Params to upload document
   * @param {string|buffer} params.content The content of the file (base64 or Buffer)
   * @param {string} params.signedUrl The signed URL
   * @param {string} params.type The file mime type
   * @return {Promise<boolean>} True if success
   *
   * @public
   * @async
   * @example
   *
   * const FS = require('fs');
   * const Path = require('path');
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  content: FS.readFileSync(Path.join(__dirname, '.mypdf.pdf')),
   *  signedUrl: 'https://signedurl.com/token...',
   *  type: 'application/pdf'
   * };
   * const retData = await api.user.document.uploadSignedDocument(params);
   */
  async uploadSignedDocument(params) {
    const { content, signedUrl, type } = params;
    Joi__default["default"].assert(params, Joi__default["default"].object().required());
    Joi__default["default"].assert(params.content, Joi__default["default"].string().required());
    Joi__default["default"].assert(params.signedUrl, Joi__default["default"].string().required());
    Joi__default["default"].assert(params.type, Joi__default["default"].string().required());

    const self = this;
    const headers = {
      headers: {
        'Content-Type': type
      }
    };
    const apiCall = self._client
        .put(signedUrl, content, headers);
    self._returnData(await apiCall);
    return true;
  }

}

/**
 * Class for organizations, permission user
 * @class
 */
class Organization {

  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

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
      throw Boom__default["default"].badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
    } else {
      return ___default["default"].get(retData, 'data', def);
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
   * @author Augusto Pissarra <abernardo.br@gmail.com>
   * @description Find organization by id
   * @param {string} orgId ID of the organization to find (_id database)
   * @param {string} session Is token JWT
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const orgId = '80443245000122';
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.organization.findById(idCard, session);
   */
  async findById(orgId, session) {
    const self = this;

    try {
      Joi__default["default"].assert(orgId, Joi__default["default"].string().required(), 'orgId ID of the organization to find (_id database_');
      Joi__default["default"].assert(session, Joi__default["default"].string().required(), 'SM session (JWT) to call API');

      const apiCall = self._client.get(`/organizations/${orgId}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Augusto Pissarra <abernardo.br@gmail.com>
   * @description Check if id card exist
   * @param {string} idcard Check if id card exist
   * @param {string} session Is token JWT
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const idCard = '80443245000122';
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.organization.idCardExist(idCard, session);
   */
  async idCardExist(idCard, session) {
    const self = this;

    try {
      Joi__default["default"].assert(idCard, Joi__default["default"].string().required(), 'Check if id card exist');
      Joi__default["default"].assert(session, Joi__default["default"].string().required(), 'SM session (JWT) to call API');

      const apiCall = self._client.get(`/organizations/exist/idcard/${idCard}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Update avatar of organization by session of user not allow session user SU
   * @param {object} params Params to update avatar
   * @param {string} params.avatar Image in base64 to update
   * @param {string} params.type mimeType (image/png)
   * @param {string} session Is token JWT of user NOT allow SU
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  avatar: 'iVBORw0KGgoAAAANSUhEUgAAAasAAAHnCAYAAAAGi3J6AAA9BElEQVR...He3/kk/m7kl35S8AAAAASUVORK5CYII=',
   *  type: 'image/png',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.profile.updateAvatar(params, session);
   */
  async upsertAvatar(params = {}, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required());
      Joi__default["default"].assert(params.avatar, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.type, Joi__default["default"].string().required());
      Joi__default["default"].assert(session, Joi__default["default"].string().required());

      const {avatar, type} = params;
      const payload = {avatar, type};

      const apiCall = self._client.put('/organizations/1234567890/logo', payload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Remove avatar of user by session of user not allow session user SU
   * @param {string} session Is token JWT of user NOT allow SU
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.profile.removeAvatar(session);
   */
  async removeAvatar(session) {
    const self = this;

    try {
      Joi__default["default"].assert(session, Joi__default["default"].string().required());

      const apiCall = self._client.delete('/organizations/1234567890/logo', self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Augusto Pissarra <abernardo.br@gmail.com>
   * @description Call URL internal
   * @param {!object} params Params to call fectch (URL internal)
   * @param {!string} params.url URL to call
   * @param {!string} [params.method=POST] Fetch Method
   * @param {string} params.payload Payload to send
   * @returns {promise}
   * @public
   * @async
   /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Call URL internal, need auth JWT (session)
   * @param {!object} params Params to call fectch (URL internal)
   * @param {!string} params.url URL to call
   * @param {!string} [params.method=POST] Fetch Method
   * @param {string} params.payload Payload to send system manager
   * @returns {promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   *
   * const params = {
   *   url: 'http://localhost:8080/organizations/..../process/..../task/candidateAccepted/end/....',
   *   method: 'POST'
   * }
   * await api.user.organization.callFetchs(params, session);
   */
  async callFetch(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required(), 'Params to call fectch (URL internal)');
      Joi__default["default"].assert(params.url, Joi__default["default"].string().required(), 'URL to call');
      Joi__default["default"].assert(params.method, Joi__default["default"].string(), 'Fetch Method');
      Joi__default["default"].assert(params.payload, Joi__default["default"].object(), 'Payload to send system manager');
      Joi__default["default"].assert(session, Joi__default["default"].string().required(), 'Session to call');

      const {url, payload = {}} = params;
      let {method} = params;

      method = method.toLowerCase();
      const methodWithPayload = ['post', 'put'];

      const options = {
        method,
        headers: {authorization: session},
        url,
      };

      if (methodWithPayload.indexOf(method) !== -1)
        options.data = payload;

      return await self._returnData(await Axios__default["default"](options));

    } catch (ex) {
      throw ex;
    }
  }
}

/**
 * Class for process, permission user
 * @class
 */
class Process {

  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

    const self = this;
    self.parent = options.parent;
    self._client = self.parent.dispatch.getClient();
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
      return Boom__default["default"].badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
    } else {
      return ___default["default"].get(retData, 'data', def);
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
   * @description Start process
   * @param {object} params Params to start process
   * @param {string} params.processId Process id (_id database);
   * @param {string} params.orgId Organization id (_id database);
   * @param {object} [params.payload={}] Start process with data
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   processId: '5dadd01dc4af3941d42f8c5c',
   *   orgId: '5edd11c46b6ce9729c2c297c',
   *   payload: {}
   * }
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.process.start(params, session);
   */
  async start(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required());
      Joi__default["default"].assert(params.processId, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.orgId, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.payload, Joi__default["default"].object());
      Joi__default["default"].assert(session, Joi__default["default"].string().required());

      const {processId, orgId, payload = {}} = params;
      const apiCall = self._client.put(`/organizations/${orgId}/process/${processId}`, payload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get process properties of process
   * @param {object} params Params to get process properties
   * @param {string} params.processId Process id (_id database);
   * @param {string} params.orgId Organization id (_id database);
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   processId: '5dadd01dc4af3941d42f8c5c',
   *   orgId: '5edd11c46b6ce9729c2c297c',
   * }
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.process.getProcessProperties(params, session);
   */
  async getProcessProperties(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required());
      Joi__default["default"].assert(params.processId, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.orgId, Joi__default["default"].string().required());
      Joi__default["default"].assert(session, Joi__default["default"].string().required());

      const {processId, orgId} = params;
      const apiCall = self._client.get(`/organizations/${orgId}/process/${processId}/properties`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

/**
 * Class for task, permission user
 * @class
 */
class Task {

  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

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
      return Boom__default["default"].badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
    } else {
      return ___default["default"].get(retData, 'data', def);
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
      Joi__default["default"].assert(params, Joi__default["default"].object().required(), 'Params to get task');
      Joi__default["default"].assert(params.processId, Joi__default["default"].string().required(), ' Proccess id (_id database)');
      Joi__default["default"].assert(params.taskId, Joi__default["default"].string().required(), ' Task id (_id database)');
      Joi__default["default"].assert(params.orgId, Joi__default["default"].string().required(), 'Organization id (_id database)');
      Joi__default["default"].assert(session, Joi__default["default"].string().required(), 'Session token JWT');

      const {processId, taskId, orgId} = params;
      const apiCall = self._client
        .get(`/organizations/${orgId}/process/${processId}/execute/${taskId}`, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
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
      Joi__default["default"].assert(params, Joi__default["default"].object().required());
      Joi__default["default"].assert(params.userId, Joi__default["default"].string().required(), 'User id (_id database)');
      Joi__default["default"].assert(params.processId, Joi__default["default"].string().required(), 'Proccess id (_id database)');
      Joi__default["default"].assert(params.taskId, Joi__default["default"].string().required(), 'Task id (_id database)');
      Joi__default["default"].assert(params.flowName, Joi__default["default"].string().required(), 'Flow name');
      Joi__default["default"].assert(params.action, Joi__default["default"].number().required(), 'Button action');
      Joi__default["default"].assert(params.formData, Joi__default["default"].object().required(), 'Data to update task');
      Joi__default["default"].assert(params.actionGuid, Joi__default["default"].string(), 'GUID of the action');
      Joi__default["default"].assert(params.orgId, Joi__default["default"].string().required(), 'Organization id (_id database)');
      Joi__default["default"].assert(params.contextToBody, Joi__default["default"].string(), 'Context to body');

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
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Find task by id and update
   * @param {!object} params Params - to update task
   * @param {!string} params.taskId - Task id (_id database)
   * @param {!string} params.actionGuid - GUID of the action
   * @param {!string} params.orgId - Organization id (_id database)
   * @param {any} params.orgId={} - Payload to send in action
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
   *  body: {}',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.task.executeActionFinalize(params, session);
   */
  async executeActionFinalize(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required());
      Joi__default["default"].assert(params.taskId, Joi__default["default"].string().required(), 'Task id (_id database)');
      Joi__default["default"].assert(params.actionGuid, Joi__default["default"].string(), 'GUID of the action');
      Joi__default["default"].assert(params.orgId, Joi__default["default"].string().required(), 'Organization id (_id database)');
      Joi__default["default"].assert(params.payload, Joi__default["default"].any(), 'Payload to send in action');

      const {taskId, actionGuid, orgId, payload = {}} = params;
      const url = `organizations/${orgId}/users/tasks/${taskId}/action/${actionGuid}`;
      const apiCall = self._client.put(url, payload, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

/**
 * Class for user, permission user
 * @class
 */
class User {

  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

    const self = this;
    self._parent = options.parent;
    self._client = self._parent.dispatch.getClient();
    self.gender = {
      male: 1,
      female: 2,
      nonBinary: 3
    };
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
      return Boom__default["default"].badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
    } else {
      return ___default["default"].get(retData, 'data', def);
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
   * @description Update avatar of user by session of user not allow session user SU
   * @param {object} params Params to update avatar
   * @param {string} params.avatar Image in base64 to update
   * @param {string} params.type mimeType (image/png)
   * @param {string} session Is token JWT of user NOT allow SU
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  avatar: '55e4a3bd6be6b45210833fae',
   *  type: '123456',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.profile.updateAvatar(params, session);
   */
  async updateAvatar(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required());
      Joi__default["default"].assert(params.avatar, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.type, Joi__default["default"].string().required());
      Joi__default["default"].assert(session, Joi__default["default"].string().required());

      const {avatar, type} = params;
      const payload = {avatar, type};

      const apiCall = self._client.post(`/users/avatar`, payload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Remove avatar of user by session of user not allow session user SU
   * @param {string} session Is token JWT of user NOT allow SU
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.profile.removeAvatar(session);
   */
  async removeAvatar(session) {
    const self = this;

    try {
      Joi__default["default"].assert(session, Joi__default["default"].string().required());

      const apiCall = self._client.delete(`/users/avatar`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Update a user profile by id
   * @param {object} params Params to update task
   * @param {string} params.name The name of the user
   * @param {string} params.site The site of the user
   * @param {string} params.faceboook The faceboook of the user
   * @param {string} params.linkedin The linkedin of the user
   * @param {date} params.dob The date of birth of the user
   * @param {number<UserGender>} params.gender The gender of of the user self.gender
   * @param {string} params.phone The phone
   * @param {string} params.phone2 The phone 2
   * @param {string} params.phone3 The phone 3
   * @param {string} params.password The password to change
   * @param {string} params.secQuestion The security question
   * @param {string} params.secAnswer The security answer
   * @param {string} params.timezone The timezone
   * @param {string} params.userLanguage The user language
   * @param {string} params.changePassword (required) If we need to change the status and we changed the password
   * @param {string} params.acceptTermsOfUse If the user has accepted the terms of change
   * @param {string} session Session, token JWT
   * @return {Promise<void>}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  name: 'New Name'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.profile.findByIdAndUpdate(params, session);
   */
  async findByIdAndUpdate(params = {}, session) {
    const self = this;

    try {
      Joi__default["default"].assert(session, Joi__default["default"].string().required());
      Joi__default["default"].assert(params, Joi__default["default"].object().required());
      Joi__default["default"].assert(params.changePassword, Joi__default["default"].boolean().required());

      if(___default["default"].isEmpty(params)) return;

      const { changePassword = false, password = '' } = params;

      if(changePassword && password === '') {
        throw new Error('It is required to change the password')
      } else {
        params.changePassword = false;
      }

      const url = 'users';
      const apiCall = self._client.put(url, params, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

class Cypher {

  constructor() {
    const self = this;
    self._registerKey = 'kduD^!r8sl5#Vb$OpsD4!xWY8z#QH#WWTc4mNpmzg*TnVnMCZ^';
  }

  get(info) {
    const self = this;
    try {
      const bytes = CryptoJS__default["default"].AES.decrypt(info, self._registerKey);
      const bias = bytes.toString(CryptoJS__default["default"].enc.Utf8);
      return JSON.parse(bias);
    } catch (ex) {
      return {};
    }
  }

  set(obj) {
    const self = this;
    let retData;
    try {
      const info = JSON.stringify(obj);
      retData = CryptoJS__default["default"].AES.encrypt(info, self._registerKey).toString();
    } catch(ex) {
      retData = '';
    } finally {
      return retData;
    }
  }
}

const cypher = new Cypher();

/**
 * Class for user registration in a user
 * @class
 */
class Register {

  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

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
      return Boom__default["default"].badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
    } else {
      return ___default["default"].get(retData, 'data', def);
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
    const { orgname = '' } = cypher.get(registerId) || {};
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
      Joi__default["default"].assert(params, Joi__default["default"].object().required(), 'Params to get task');
      Joi__default["default"].assert(params.registerId, Joi__default["default"].string().required(), ' RegisterId for registration');
      Joi__default["default"].assert(params.email, Joi__default["default"].string().required(), ' The emnail to register');

      const { registerId = '', email = '' } = params;
      const registerInfo = cypher.get(registerId) || {};
      const infoData = { ...registerInfo, email };
      const payload = { info: cypher.set(infoData) };
      const apiCall = self._client
        .post(`/users/validate/email`, payload);

      const { success = false, info = '', userAlreadyExists = false } = self._returnData(await apiCall);
      const retData = { success, userAlreadyExists, registrationEmailInfoRaw: info, registrationEmailInfo: cypher.get(info) };
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
      Joi__default["default"].assert(params, Joi__default["default"].object().required(), 'Params to get task');
      Joi__default["default"].assert(params.registerId, Joi__default["default"].string().required(), ' RegisterId for registration');
      Joi__default["default"].assert(params.emailInfo, Joi__default["default"].object().required(), ' The email info');
      Joi__default["default"].assert(params.registerData, Joi__default["default"].object().required(), ' The registerData');

      const {
        type = 'sign',
        registerId = '',
        emailInfo = {},
        registerData = {},
        login = false
      } = params;
      const registerInfo = cypher.get(registerId) || {};
      const payload = { ...registerInfo, type, login, emailInfo, registerData };
      const payloadInfo = { info: cypher.set(payload) };
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

/**
 * @class API request, user permission level
 */
class Users {
  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @constructor
   * @param {object} options Params of the constructor
   * @param {object} options.parent This of the pararent
   */
  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

    const self = this;
    self.document = new Documents(options);
    self.organization = new Organization(options);
    self.process = new Process(options);
    self.task = new Task(options);
    self.user = self.profile = new User(options);
    self.register = new Register(options);
  }
}

/**
 * Admin Class for documents, permission admin
 * @class
 */
class AdminDocuments {

  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

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
      throw Boom__default["default"].badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
    } else {
      return ___default["default"].get(retData, 'data', def);
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
   * @description Advanced search of document in elastic search ussing system manager
   * @param {!object} params - Params to search document
   * @param {!string} params.docId - Document id (_id database)
   * @param {!object} params.query - Query to search in elastic search
   * @param {!string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   docId: '5edd11c46b6ce9729c2c297c',
   *   query: {
   *      "query": {
   *        "bool": {
   *          "minimum_should_match": 1,
   *          "should": [
   *            {
   *              "match": {
   *                "locationText.keyword": {
   *                  "query": "sao pau"
   *                }
   *              }
   *            },
   *            {
   *              "wildcard": {
   *                "locationText.normalized": "*sao pau*"
   *              }
   *            }
   *          ]
   *        }
   *      }
   *    }
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.document.advancedSearch(params, session);
   */
  async advancedSearch(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required(), 'Params to search document');
      Joi__default["default"].assert(params.docId, Joi__default["default"].string().required(), 'Document ID');
      Joi__default["default"].assert(params.query, Joi__default["default"].object().required(), 'eQuery, query to search document in elastic search');
      Joi__default["default"].assert(session, Joi__default["default"].string().required(), 'Session is token JWT');

      const {docId: docTypeId, query} = params;
      const payload = {docTypeId, query};

      const apiCall = self._client.post(`/admin/documents/search`, payload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get document by id
   * @param {object} params - Params to get document by id
   * @param {string} params.docId - Document id (_id database)
   * @param {string} params.orgId - Organization id (_id database)
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  docId: '5edd11c46b6ce9729c2c297c',
   *  orgId: '55e4a3bd6be6b45210833fae'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.document.findById(params, session);
   */
  async findById(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required(), 'Params to get document by id');
      Joi__default["default"].assert(params.docId, Joi__default["default"].string().required(), 'Document id (_id database)');
      Joi__default["default"].assert(params.orgId, Joi__default["default"].string().required(), 'Organization id (_id database)');
      Joi__default["default"].assert(session, Joi__default["default"].string().required(), 'Session is token JWT');

      const {docId, orgId} = params;
      const apiCall = self._client.get(`/admin/organizations/${orgId}/documents/${docId}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   *
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Request signed url url to put or get
   * @param {object} params Params to request signed url
   * @param {string} params.methodType Method type HTTP get or put
   * @param {string} params.docId The unique id of the document
   * @param {string} apiKey Api Key as permission to use this functionality
   * @return {Promise<object>} doc Returned document data with the signed url
   * @return {string} doc.docId Document id
   * @return {string} doc.name The name of the document, which is the fileName
   * @return {string} doc.areaId docAreaId of the document
   * @return {string} doc.type the document mimi type
   * @return {string} doc.signedUrl the signed URL to upload
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  methodType: 'put',
   *  docId: '5dadd01dc4af3941d42f8c5c'
   * };
   * const apiKey: '...';
   * const { docId, name, areaId, type, signedUrl } = await api.admin.document.signedUrl(params, apiKey);
   *
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  methodType: 'get',
   *  docId: '5dadd01dc4af3941d42f8c5c'
   * };
   * const apiKey: '...';
   * const { signedUrl, imageType } = await api.admin.document.signedUrl(params, apiKey);
   */
  async signedUrl(params = {}, apiKey) {

    Joi__default["default"].assert(params, Joi__default["default"].object().required());
    Joi__default["default"].assert(params.methodType, Joi__default["default"].string().required());
    Joi__default["default"].assert(params.docId, Joi__default["default"].string().required());
    Joi__default["default"].assert(apiKey, Joi__default["default"].string().required());

    const self = this;
    const { methodType, docId } = params;
    const url = `/api/documents/signedurl?apiKey=${apiKey}&methodType=${methodType}&docId=${docId}`;
    const apiCall = self._client
        .get(url);

    return self._returnData(await apiCall);
  }

  /**
   *
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Update a document content
   * @param {object} params Params to request signed url
   * @param {string} params.content The content text
   * @param {string} params.docId The unique id of the document
   * @param {string} apiKey Api Key as permission to use this functionality
   * @return {Promise<object>} doc Returned document data with the signed url
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  content: 'some text...',
   *  docId: '5dadd01dc4af3941d42f8c5c'
   * };
   * const apiKey: '...';
   * await api.admin.document.updateContent(params, apiKey);
   */
  async updateContent(params = {}, apiKey) {

    Joi__default["default"].assert(params, Joi__default["default"].object().required());
    Joi__default["default"].assert(params.content, Joi__default["default"].string().required());
    Joi__default["default"].assert(params.docId, Joi__default["default"].string().required());
    Joi__default["default"].assert(apiKey, Joi__default["default"].string().required());

    const self = this;
    const { content, docId } = params;
    const url = `/api/documents/${docId}/content?apiKey=${apiKey}`;
    const data = { content };
    const apiCall = self._client
        .put(url, data, {
          maxContentLength: Infinity,
          maxBodyLength: Infinity
        });
    return self._returnData(await apiCall);
  }

  /**
   *
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Update a document content
   * @param {object} params Params to request signed url
   * @param {string} params.content The content text
   * @param {string} params.docId The unique id of the document
   * @param {string} params.searchablePDFURL The searchable PDF Url
   * @param {object} params.overlay The overlay information
   * @param {array} params.entities The list of entities extracted from the text
   * @param {object} params.language The language detected
   * @param {string} params.language.name The language name detected
   * @param {string} params.language.confidence The confidence that it is the language
   * @param {string} apiKey Api Key as permission to use this functionality
   * @return {Promise<object>} doc Returned document data with the signed url
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params - {
   *  content: 'some text...',
   *  docId: '5dadd01dc4af3941d42f8c5c'
   * };
   * const apiKey: '...';
   * await api.admin.document.updateContent(params, apiKey);
   */
  async updateAI(params = {}, apiKey) {

    Joi__default["default"].assert(params, Joi__default["default"].object().required());
    Joi__default["default"].assert(params.docId, Joi__default["default"].string().required());
    Joi__default["default"].assert(apiKey, Joi__default["default"].string().required());

    const self = this;
    const { docId } = params;
    delete params.docId;
    const url = `/api/documents/${docId}/ai?apiKey=${apiKey}`;
    const apiCall = self._client
        .put(url, params, {
          maxContentLength: Infinity,
          maxBodyLength: Infinity
        });
    return self._returnData(await apiCall);
  }

}

/**
 * Admin Class for forms, permission admin
 * @class
 */
class AdminForm {

  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

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
      return Boom__default["default"].badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
    } else {
      return ___default["default"].get(retData, 'data', def);
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
      Joi__default["default"].assert(params, Joi__default["default"].object().required());
      Joi__default["default"].assert(params.id, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.orgId, Joi__default["default"].string().required());
      Joi__default["default"].assert(session, Joi__default["default"].string().required());

      const {id, orgId} = params;
      const apiCall = self._client.get(`/admin/organizations/${orgId}/orgforms/${id}/form`, self._setHeader(session));
      return self._returnData(await apiCall);
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
      Joi__default["default"].assert(params, Joi__default["default"].object().required(), 'Params to get form list');
      Joi__default["default"].assert(params.orgId, Joi__default["default"].string().required(), 'Organization id (_id database)');
      Joi__default["default"].assert(params.page, Joi__default["default"].number(), 'Page of pagination');
      Joi__default["default"].assert(params.perPage, Joi__default["default"].number(), 'Items per page');
      Joi__default["default"].assert(params.type, Joi__default["default"].number(), 'Form type (1 to Business or 2 to Advanced)');
      Joi__default["default"].assert(params.project, Joi__default["default"].object(), 'Fields to project');
      Joi__default["default"].assert(params.sort, Joi__default["default"].object(), 'Sort fields for');
      Joi__default["default"].assert(session, Joi__default["default"].string().required(), 'Session, token JWT');

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

      const apiCall = self._client
        .post(`/admin/organizations/${orgId}/orgforms?page=${page}&perPage=${perPage}`, payloadToSend, self._setHeader(session));

      return self._returnData(await apiCall);

    } catch (ex) {
      throw ex;
    }
  }
}

/**
 * Admin Class for notification, permission admin
 * @class
 */
class AdminNotification {

  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

    const self = this;
    self.parent = options.parent;
    self.client = self.parent.dispatch.getClient();
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
      return Boom__default["default"].badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
    } else {
      return ___default["default"].get(retData, 'data', def);
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
   * @description Create notification
   * @param {object} params Params to create notification
   * @param {string} params.orgId OrgId of the user SU
   * @param {string} params.userId User to create notification
   * @param {object} params.message Object with data to send user
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  orgId: '5edd11c46b6ce9729c2c297c',
   *  userId: '55e4a3bd6be6b45210833fae',
   *  message: 'Olá como vai tudo bem?'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.notifications.add(params, session);
   */
  async add(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required(), 'Object with params to add notifications');
      Joi__default["default"].assert(params.orgId, Joi__default["default"].string().required(), 'OrgId of the user SU');
      Joi__default["default"].assert(params.userId, Joi__default["default"].string().required(), 'User to create notification');
      Joi__default["default"].assert(params.message, Joi__default["default"].object().required(), 'Object with data to send user');
      Joi__default["default"].assert(session, Joi__default["default"].string().required(), 'Session, token JWT');

      const {orgId, ...notificationPayload} = params;
      const apiCall = self.client.post(`/admin/organizations/${orgId}/notifications`, notificationPayload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Search notification using (notificationId or userId)
   * @param {object} params Params to create notification
   * @param {string} params.orgId OrgId of the user SU
   * @param {string} params.id ALERT! Id is userId or id is notificationId
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  orgId: '5edd11c46b6ce9729c2c297c',
   *  id: '55e4a3bd6be6b45210833fae',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.notifications.findById(params, session);
   */
  async findById(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required(), 'Object with params to add notifications');
      Joi__default["default"].assert(params.orgId, Joi__default["default"].string().required(), 'OrgId of the user SU');
      Joi__default["default"].assert(params.id, Joi__default["default"].string().required(), 'ALERT! Id is userId or id is notificationId');
      Joi__default["default"].assert(session, Joi__default["default"].string().required(), 'Session, token JWT');

      const {orgId, id} = params;
      const apiCall = self.client.get(`/admin/organizations/${orgId}/notifications/${id}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Update notification using (notificationId or userId)
   * @param {object} params Params to create notification
   * @param {string} params.orgId OrgId of the user SU
   * @param {string} params.id ALERT! Id is userId or id is notificationId
   * @param {boolean} params.read If message is read true or false
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  orgId: '5edd11c46b6ce9729c2c297c',
   *  id: '55e4a3bd6be6b45210833fae',
   *  read: true
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.notifications.findByIdAndUpdate(params, session);
   */
  async findByIdAndUpdate(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required(), 'Object with params to add notifications');
      Joi__default["default"].assert(params.orgId, Joi__default["default"].string().required(), 'OrgId of the user SU');
      Joi__default["default"].assert(params.id, Joi__default["default"].string().required(), 'ALERT! Id is userId or id is notificationId');
      Joi__default["default"].assert(params.read, Joi__default["default"].boolean().required(), 'If message is read true or false');
      Joi__default["default"].assert(session, Joi__default["default"].string().required(), 'Session, token JWT');

      const {orgId, id, ...statusPayload} = params;
      const apiCall = self.client.put(`/admin/organizations/${orgId}/notifications/${id}`, statusPayload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Delete notification using (notificationId or userId)
   * @param {object} params Params to create notification
   * @param {string} params.orgId OrgId of the user SU
   * @param {string} params.id ALERT! Id is userId or id is notificationId
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  orgId: '5edd11c46b6ce9729c2c297c',
   *  id: '55e4a3bd6be6b45210833fae',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.notifications.findByIdAndDelete(params, session);
   */
  async findByIdAndRemove(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required(), 'Object with params to add notifications');
      Joi__default["default"].assert(params.orgId, Joi__default["default"].string().required(), 'OrgId of the user SU');
      Joi__default["default"].assert(params.id, Joi__default["default"].string().required(), 'ALERT! Id is userId or id is notificationId');
      Joi__default["default"].assert(session, Joi__default["default"].string().required(), 'Session, token JWT');

      const {orgId, id} = params;
      const apiCall = self.client.delete(`/admin/organizations/${orgId}/notifications/${id}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

/**
 * Admin Class for lists, permission admin
 * @class
 */
class AdminLists {

  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

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
      return Boom__default["default"].badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
    } else {
      return ___default["default"].get(retData, 'data', def);
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
   * @description Get list by ID
   * @param {object} params Params to find list by id
   * @param {string} params.id List Id (_id database)
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
   * await api.admin.list.findById(params, session);
   */
  async findById(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required());
      Joi__default["default"].assert(params.id, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.orgId, Joi__default["default"].string().required());
      Joi__default["default"].assert(session, Joi__default["default"].string().required());

      const {id, orgId} = params;
      const apiCall = self._client.get(`/admin/organizations/${orgId}/orgtags/${id}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get all lists
   * @param {object} params={} Params to pagination and orgId
   * @param {number} [params.page=0] Current page to pagination
   * @param {number} [params.perPage=200] Qnt itens per page
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
   *  orgId: '55e4a3bd6be6b45210833fae'
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.list.find(params, session);
   */
  async find(params = {}, session) {
    const self = this;

    try {

      Joi__default["default"].assert(params, Joi__default["default"].object());
      Joi__default["default"].assert(params.page, Joi__default["default"].number());
      Joi__default["default"].assert(params.perPage, Joi__default["default"].number());
      Joi__default["default"].assert(params.orgId, Joi__default["default"].string().required());
      Joi__default["default"].assert(session, Joi__default["default"].string().required());

      const orgId = ___default["default"].get(params, 'orgId');
      const page = ___default["default"].get(params, 'page', 0);
      const perPage = ___default["default"].get(params, 'perPage', 200);
      const apiCall = self._client
        .post(`/admin/organizations/${orgId}/orgtags?page=${page}&perPage=${perPage}`, {}, self._setHeader(session));

      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

/**
 * Admin Class for plugin, permission admin
 * @class
 */
class AdminPlugin {

  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

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
      return Boom__default["default"].badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
    } else {
      return ___default["default"].get(retData, 'data', def);
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
   * @author Augusto Pissarra <abernardo.br@gmail.com>
   * @description Find plugins
   * @param {object} params - Params to search plugins
   * @param {number} params.page - Start page to pagination
   * @param {number} params.perPage - Items per page
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {page: 1, perPage: 200};
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.user.organization.findById(params, session);
   */
  async find(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required(), 'Params to search plugins');
      Joi__default["default"].assert(params.page, Joi__default["default"].number(), 'Start page to pagination');
      Joi__default["default"].assert(params.perPage, Joi__default["default"].number(), 'Items per page');
      Joi__default["default"].assert(session, Joi__default["default"].string().required(), 'SM session (JWT) to call API');

      const {page = 1, perPage = 300} = params;
      const queryString = `page=${page}&perPage=${perPage}`;

      const apiCall = self._client.post(`/admin/plugins?${queryString}`, {}, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get plugin by ID
   * @param {string} id Plugin Id (_id database)
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const id ='55e4a3bd6be6b45210833fae',
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.plugin.findById(id, session);
   */
  async findById(id, session) {
    const self = this;

    try {
      Joi__default["default"].assert(id, Joi__default["default"].string().required());
      Joi__default["default"].assert(session, Joi__default["default"].string().required());

      const apiCall = self._client.get(`/admin/plugins/${id}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

/**
 * Admin Class for policy, permission admin
 * @class
 */
class AdminPolicy {

  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

    const self = this;
    self.parent = options.parent;
    self._client = self.parent.dispatch.getClient();
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
      return Boom__default["default"].badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
    } else {
      return ___default["default"].get(retData, 'data', def);
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
   * @description Find all policies
   * @param {string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.policy.find(session);
   */
  async find(session) {
    const self = this;

    try {
      Joi__default["default"].assert(session, Joi__default["default"].string().required());

      const apiCall = self._client.get('/admin/policies', self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

/**
 * Admin Class for task, permission admin
 * @class
 */
class AdminTask {

  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

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
      return Boom__default["default"].badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
    } else {
      return ___default["default"].get(retData, 'data', def);
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
   * @description Get filter to search tasks
   * @param {string} filter Filter type
   * @return {*}
   * @private
   */
  _taskFilters(filter) {
    const taskFilters = {
      CLEAN: 1,
      EXECUTED: 2,
      PENDING: 3,
      LATE: 4,
      NOT_DONE: 5,
      DONE: 6
    };
    return ___default["default"].get(taskFilters, filter, 'NOT_DONE');
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Get task by user Id
   * @param {object} params Params to get task
   * @param {string} params.userId User id (_id database)
   * @param {string} [params.filter=NOT_DONE] Filter type CLEAN | EXECUTED | PENDING | LATE | NOT_DONE | DONE
   * @param {boolean} [params.includeOwner=false] Include owner true | false
   * @param {string} session Session, token JWT
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *  userId: '55e4a3bd6be6b45210833fae',
   * };
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.task.find(params, session);
   */
  async find(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required());
      Joi__default["default"].assert(params.userId, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.filter, Joi__default["default"].string());
      Joi__default["default"].assert(params.includeOwner, Joi__default["default"].boolean());
      Joi__default["default"].assert(session, Joi__default["default"].string().required());

      const filterType = ___default["default"].get(params, 'filter', 'NOT_DONE');
      const includeOwner = ___default["default"].get(params, 'includeOwner', false);
      const {userId} = params;

      const filter = self._taskFilters(filterType);
      const queryString = `taskFilter=${filter}&includeOwner=${includeOwner}`;
      const apiCall = self._client.get(`/admin/users/${userId}/tasks?${queryString}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

/**
 * Admin Class for user, permission admin
 * @class
 */
class AdminUser {

  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

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
      return Boom__default["default"].badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
    } else {
      return ___default["default"].get(retData, 'data', def);
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

      Joi__default["default"].assert(userId, Joi__default["default"].string().required());
      Joi__default["default"].assert(session, Joi__default["default"].string().required());

      const apiCall = self.client.get(`/admin/users/${userId}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
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
      Joi__default["default"].assert(params, Joi__default["default"].object().required());
      Joi__default["default"].assert(params.userId, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.oldPassword, Joi__default["default"].string().required());
      Joi__default["default"].assert(params.newPassword, Joi__default["default"].string().required());
      Joi__default["default"].assert(session, Joi__default["default"].string().required());

      const {userId, ...payload} = params;
      const apiCall = self.client.put(`/admin/users/${userId}/password`, payload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
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
      Joi__default["default"].assert(email, Joi__default["default"].string().email().required());
      Joi__default["default"].assert(session, Joi__default["default"].string().required());

      const payload = {email};
      const apiCall = self.client.post(`/admin/users/email/exist`, payload, self._setHeader(session));
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
      Joi__default["default"].assert(userId, Joi__default["default"].string().required(), 'User id of SM');
      Joi__default["default"].assert(payload, Joi__default["default"].object().required(), 'Payload to update');
      Joi__default["default"].assert(session, Joi__default["default"].string().required(), 'Session user admin');

      const apiCall = self.client.put(`/admin/users/${userId}`, payload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

/**
 * Admin Class for processes, permission admin
 * @class
 */
class AdminProcesses {

  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

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
    self._schemaOrgId = Joi__default["default"].string().required().label('Organization id'),

    self._schemaProcessId = Joi__default["default"].object({
      value: Joi__default["default"].array().items(Joi__default["default"].string()).min(1).label('Numbers of processId'),
      type: Joi__default["default"].string().default('string').valid(...self._operatorsType).label('Operation type'),
      oper: Joi__default["default"].string().default('=').valid(...self.allOperators).label('Type of condition'),
      name: Joi__default["default"].string().default('processId').label('Propertie name'),
    });

    self._schemaProtocol = Joi__default["default"].object({
      value: Joi__default["default"].string().required().label('Number of protocol'),
      type: Joi__default["default"].string().default('string').valid(...self._operatorsType).label('Operation type'),
      oper: Joi__default["default"].string().default('=').valid(...self.allOperators).label('Type of condition'),
    });

    self._schemaHistoryBegin = Joi__default["default"].object({
      value: Joi__default["default"].string().required().label('History begin'),
      type: Joi__default["default"].string().default('date').valid(...self._operatorsType).label('Operation type'),
      oper: Joi__default["default"].string().default('=').valid(...self.allOperators).label('Type of condition'),
    });

    self._schemaHistoryEnd = Joi__default["default"].object({
      value: Joi__default["default"].string().required().label('History end'),
      type: Joi__default["default"].string().default('date').valid(...self._operatorsType).label('Operation type'),
      oper: Joi__default["default"].string().default('=').valid(...self.allOperators).label('Type of condition'),
    });

    self._schemaStatus = Joi__default["default"].object({
      value: Joi__default["default"].string().default('FINISHED').valid(self._status.toString()).label('Process Status'),
      type: Joi__default["default"].string().default('string').valid('string').label('Operation type'),
      oper: Joi__default["default"].string().default('=').valid('=').label('Type of condition'),
    });

    self._schemaOrgProcessId = Joi__default["default"].object({
      value: Joi__default["default"].string().required().label('Organization process id'),
      type: Joi__default["default"].string().default('string').valid('string').label('Operation type'),
      oper: Joi__default["default"].string().default('=').valid('=').label('Type of condition'),
    }).required().label('Organization process id');

    self._schemaFormData = Joi__default["default"].array().items(
      Joi__default["default"].object({
        value: Joi__default["default"].string().required().label('Text to search'),
        type: Joi__default["default"].string().default('string').valid(...self._operatorsType).label('Operation type'),
        oper: Joi__default["default"].string().default('=').valid(...self.allOperators).label('Type of condition'),
        name: Joi__default["default"].string().required().label('Property name'),
      })
    );

    self._schemaAdvFormData = Joi__default["default"].array().items(
      Joi__default["default"].object({
        value: Joi__default["default"].any().required().label('Value to search'),
        type: Joi__default["default"].string().default('string').valid(...self._operatorsType).label('Operation type'),
        oper: Joi__default["default"].string().default('=').valid(...self.allOperators).label('Type of condition'),
        name: Joi__default["default"].string().required().label('Property name'),
      })
    );

    self._schemaProcessProperties = Joi__default["default"].array().items(
      Joi__default["default"].object({
        value: Joi__default["default"].any().required().label('Value to search'),
        type: Joi__default["default"].string().default('string').valid(...self._operatorsType).label('Operation type'),
        oper: Joi__default["default"].string().default('=').label('Type of condition'),
        name: Joi__default["default"].string().required().label('Property name'),
      })
    );

    self._schemaInitParams = Joi__default["default"].array().items(
      Joi__default["default"].object({
        value: Joi__default["default"].any().required().label('Value to search'),
        type: Joi__default["default"].string().default('string').valid(...self._operatorsType).label('Operation type'),
        oper: Joi__default["default"].string().default('=').label('Type of condition'),
        name: Joi__default["default"].string().required().label('Property name'),
      })
    );

    self._schemaParticipants = Joi__default["default"].object({
      value: Joi__default["default"].array().items(
        Joi__default["default"].string().label('Value to search')
      ),
      type: Joi__default["default"].string().default('string').valid('string').label('Operation type'),
      oper: Joi__default["default"].string().default('=').valid('=').label('Type of condition'),
      name: Joi__default["default"].string().required().label('Process participant group'),
    });

    self._schemaProcessParticipantsGroup = Joi__default["default"].object({
      value: Joi__default["default"].string().label('Value to search'),
      type: Joi__default["default"].string().default('string').valid(...self._operatorsType).label('Operation type'),
      oper: Joi__default["default"].string().default('=').valid(...self.allOperators).label('Type of condition'),
      name: Joi__default["default"].string().required().label('Process participant group'),
    });

    self._schemaUserId = Joi__default["default"].object({
      value: Joi__default["default"].string().label('Value to search'),
      type: Joi__default["default"].string().default('string').valid('string').label('Operation type'),
      oper: Joi__default["default"].string().default('=').valid('=').label('Type of condition'),
      name: Joi__default["default"].string().required().label('User id'),
    });

    self._schemaUserGroups = Joi__default["default"].object({
      value: Joi__default["default"].array().items(
        Joi__default["default"].string().label('Value to search')
      ),
      type: Joi__default["default"].string().default('string').valid(...self._operatorsType).label('Operation type'),
      oper: Joi__default["default"].string().default('=').valid(...self.allOperators).label('Type of condition'),
      name: Joi__default["default"].string().required().label('User groups'),
    });

    self._schemaUserName = Joi__default["default"].object({
      value: Joi__default["default"].string().label('Value to search'),
      type: Joi__default["default"].string().default('string').valid(...self._operatorsType).label('Operation type'),
      oper: Joi__default["default"].string().default('=').valid(...self.allOperators).label('Type of condition'),
      name: Joi__default["default"].string().required().label('User name'),
    });

    self._schemaUserDepartment = Joi__default["default"].object({
      value: Joi__default["default"].string().label('Value to search'),
      type: Joi__default["default"].string().default('string').valid(...self._operatorsType).label('Operation type'),
      oper: Joi__default["default"].string().default('=').valid(...self.allOperators).label('Type of condition'),
      name: Joi__default["default"].string().required().label('User department'),
    });

    self._schemaUserSubDepartment = Joi__default["default"].object({
      value: Joi__default["default"].string().label('Value to search'),
      type: Joi__default["default"].string().default('string').valid(...self._operatorsType).label('Operation type'),
      oper: Joi__default["default"].string().default('=').valid(...self.allOperators).label('Type of condition'),
      name: Joi__default["default"].string().required().label('User sub department'),
    });

    self._schemaNp = Joi__default["default"].number().default(0).label('Enable or disable pagination'); // 1 disable pagination, 0 enable pagination

    self._schemaPj = Joi__default["default"].array().items(
      Joi__default["default"].string().label('Value to projection')
    ).default([
      'processId', 'orgId', 'protocol', 'historyBegin', 'historyEnd', 'status',
      'orgProcessId', 'processProperties', 'userId', 'userName', 'initParams'
    ]);

    self._schemaSort = Joi__default["default"].object().label('Sort data');
    self._schemaPerPage = Joi__default["default"].number().default(20).label('Item per page');
    self._schemaPage = Joi__default["default"].number().default(1).label('Start page in pagination');
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
      return Boom__default["default"].badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
    } else {
      return ___default["default"].get(retData, 'data', def);
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

      Joi__default["default"].assert(params, Joi__default["default"].object(), 'Params to mount query string');

      params = Object.keys(params).reduce((newParams, field) => {
        const fieldData = params[field];
        return ___default["default"].isArray(fieldData) || ___default["default"].isObject(fieldData)
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
      const paramsAfterValidation = Joi__default["default"].attempt(params,
        Joi__default["default"].object({
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
      );

      const setParams = {...paramsAfterValidation, pj: paramsAfterValidation.pj.toString()};
      const {orgId, ...payload} = setParams;
      const queryString = JSON.stringify(payload);

      const apiCall = self._client.get(`/admin/organizations/${orgId}/processes/search?query=${queryString}`, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @description Advanced search of process in elastic search ussing system manager
   * @param {!object} params - Params to search document
   * @param {!string} params.orgProcessId - Document id (_id database) of the process
   * @param {!object} params.query - Query to search in elastic search
   * @param {!string} session Session, token JWT
   * @return {Promise}
   * @public
   * @async
   * @example
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API();
   * const params = {
   *   orgProcessId: '5edd11c46b6ce9729c2c297c',
   *   query: {
   *      "_source": "processData.properties.processProperties",
   *      "query": {
   *        "term": {
   *          "initParams.email.keyword": {
   *            "value": "clintes001@gmail.com"
   *          }
   *        }
   *      }
   *   }
   * }
   * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   * await api.admin.processes.advancedSearch(params, session);
   */
  async advancedSearch(params, session) {
    const self = this;

    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required(), 'Params to search document');
      Joi__default["default"].assert(params.orgProcessId, Joi__default["default"].string().required(), 'Document id (_id database) of the process');
      Joi__default["default"].assert(params.query, Joi__default["default"].object().required(), 'eQuery, query to search document in elastic search');
      Joi__default["default"].assert(session, Joi__default["default"].string().required(), 'Session is token JWT');

      const {orgProcessId, query} = params;
      const payload = {orgProcessId, query};

      const apiCall = self._client.post(`/admin/processes/search`, payload, self._setHeader(session));
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

/**
 * Admin Class for user, permission admin
 * @class
 */
class AdminMessage {

  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

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
      return Boom__default["default"].badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
    } else {
      return ___default["default"].get(retData, 'data', def);
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
    try {
      Joi__default["default"].assert(params, Joi__default["default"].object().required(), 'Params to paginate SMS');
      Joi__default["default"].assert(params.message, Joi__default["default"].string(), 'Message to pagination');
      Joi__default["default"].assert(params.limitSize, Joi__default["default"].number(), 'Limit of the start pagination');
      Joi__default["default"].assert(params.continueText, Joi__default["default"].string(), 'Text to continue other SMS');

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
      Joi__default["default"].assert(params, Joi__default["default"].object().required(), 'Params to send email');
      Joi__default["default"].assert(params.subject, Joi__default["default"].string().required(), 'Subject of the email');
      Joi__default["default"].assert(params.message, Joi__default["default"].string().required(), 'Body of the email');
      Joi__default["default"].assert(params.to, Joi__default["default"].string().required(), 'Destination email');
      Joi__default["default"].assert(params.from, Joi__default["default"].string(), 'Source email');

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
      Joi__default["default"].assert(params, Joi__default["default"].object().required(), 'Params to send SMS');
      Joi__default["default"].assert(params.apiKey, Joi__default["default"].string().required(), 'Organization API key');
      Joi__default["default"].assert(params.message, Joi__default["default"].string().required(), 'The text message to send');
      Joi__default["default"].assert(params.recipient, Joi__default["default"].string().required(), 'The telephone number without with only numbers');
      Joi__default["default"].assert(params.limitSize, Joi__default["default"].number(), 'Size limit to send SMS');

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
      Joi__default["default"].assert(session, Joi__default["default"].string().required(), 'Session, token JWT');

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

class AdminDocTypes {
    constructor(options) {
        Joi__default["default"].assert(options, Joi__default["default"].object().required());
        Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

        const self = this;
        self.parent = options.parent;
        self._client = self.parent.dispatch.getClient();
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
            return Boom__default["default"].badRequest(___default["default"].get(retData, 'message', 'No error message reported!'))
        } else {
            return ___default["default"].get(retData, 'data', def);
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
     * @description Request profile by userId
     * @param {object} params The params
     * @param {string} params.id The organization document type id (_id database)
     * @param {string} params.orgId The organization id (_id database)
     * @param {string} session The JWT token
     * @return {Promise<object>} The document
     * @public
     * @async
     * @example
     *
     * const API = require('@docbrasil/api-systemmanager');
     * const api = new API();
     * const id = '55e4a3bd6be6b45210833fae';
     * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
     * const retDocType = await api.admin.doctypes.findById(id, session);
     */
    async findById(params, session) {
        const self = this;
        Joi__default["default"].assert(params, Joi__default["default"].object().required());
        Joi__default["default"].assert(params.id, Joi__default["default"].string().required());
        Joi__default["default"].assert(params.orgId, Joi__default["default"].string().required());
        Joi__default["default"].assert(session, Joi__default["default"].string().required());

        const {id, orgId} = params;
        const apiCall = self._client.get(`/admin/organizations/${orgId}/orgdoctypes/${id}`, self._setHeader(session));
        return self._returnData(await apiCall);
    }
}

/**
 * @class API request, admin permission level
 */
class Admin {
  /**
   * @author CloudBrasil <abernardo.br@gmail.com>
   * @constructor
   * @param {object} options Params of the constructor
   * @param {object} options.parent This of the pararent
   */
  constructor(options) {
    Joi__default["default"].assert(options, Joi__default["default"].object().required());
    Joi__default["default"].assert(options.parent, Joi__default["default"].object().required());

    const self = this;
    self.document = new AdminDocuments(options);
    self.form = new AdminForm(options);
    self.notification = new AdminNotification(options);
    self.list = new AdminLists(options);
    self.plugin = new AdminPlugin(options);
    self.policy = new AdminPolicy(options);
    self.task = new AdminTask(options);
    self.user = new AdminUser(options);
    self.processes = new AdminProcesses(options);
    self.message = new AdminMessage(options);
    self.doctypes = new AdminDocTypes(options);
  }
}

/**
 * Class API
 */
class API {

  /**
   * @constructor
   * @description Options for constructor
   * @param {object=} options Options to new instance
   * @param {object=} options.auth Options to authentication
   * @param {string} options.auth.type=null Type (apikey or userpassword)
   * @param {object=} options.auth.credentials Credentials to login SM
   * @param {string} options.auth.credentials.username=null Credentials to login SM
   * @param {string} options.auth.credentials.password=null Credentials to login SM
   * @param {string} options.auth.credentials.session=null Session started by social login
   * @param {string} options.auth.credentials.apikey=null Session started by social login
   * @param {string} options.attemptsRetry=3 Number of login attempts
   * @param {array} [options.httpStatusToRetry=[401]] HTTP status to retry login
   * @param {string} options.uri=http://127.0.0.1:8080 Address of the server
   * @param {object=} options.debug Enable debug of requisitions
   * @param {boolean} options.debug.success=true Enable debug success
   * @param {boolean} options.debug.error=true Enable debug error
   * @example
   *
   * const params = {
   *   auth: {
   *     type: 'apikey',
   *     credentials: {
   *       key: '36371923-27dc-4d30-b666-7fc4ecead925'
   *     }
   *   },
   *   url: 'http://cloudbrasil.com.br'
   * };
   *
   * const API = require('@docbrasil/api-systemmanager');
   * const api = new API(params);
   */
  constructor(options = {}) {

    if (!___default["default"].isUndefined(options)) {
      Joi__default["default"].assert(options, Joi__default["default"].object());
      Joi__default["default"].assert(options.uri, Joi__default["default"].string());
      Joi__default["default"].assert(options.debug, Joi__default["default"].object());
    }
    const self = this;

    self.options = ___default["default"].defaultsDeep({}, options, {
      auth: {
        type: null,
        credentials: {
          username: null,
          password: null,
          session: null,
          key: null
        }
      },
      uri: 'http://localhost:8080',
      attemptsRetry: 3,
      httpStatusToRetry: [401],
      debug: {success: true, error: true}
    });

    // API CALL
    self.dispatch = new Dispatch({parent: self});
    self.session = new Session({parent: self});
    self.login = new Login({parent: self});

    self.general = new Users$1({parent: self});
    self.user = new Users({parent: self});
    self.admin = new Admin({parent: self});
  }
}

module.exports = API;
