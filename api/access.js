const _ = require('lodash');
const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

/**
 * Class for access
 * @class
 */
class Access {

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @constructor
   * @param {object} options Params of the constructot
   * @param {object} options.parent This of the pararent
   */
  constructor(options) {
    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

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
      throw Boom.badRequest(_.get(retData, 'message', 'No error message reported!'))
    } else {
      return _.get(retData, 'data', def);
    }
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Set session in axios
   * @param {object} userData Payload success login
   * @param {object} userData.user User data
   * @param {object} userData.user.sessionId Session JWT
   * @return {Promise<unknown>}
   * @private
   * @async
   */
  _setSessionSU(userData) {
    return new Promise((resolve, reject) => {
      try {
        const self = this;
        const {user: {sessionId}} = userData;

        self.parent.dispatch.setSession(sessionId);
        resolve();
      } catch (ex) {
        reject(ex);
      }
    });
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Clean session in header axios
   * @return {Promise<unknown>}
   * @private
   * @async
   */
  _cleanSessionSU() {
    return new Promise((resolve, reject) => {
      try {
        const self = this;
        self.parent.dispatch.cleanSession();
        resolve();
      } catch (ex) {
        reject(ex);
      }
    });
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Logout super user SU
   * @return {Promise<unknown>}
   * @private
   * @async
   */
  _getSessionSU() {
    return new Promise((resolve, reject) => {
      try {
        const self = this;
        const retData = self.parent.dispatch.getSession();
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Start login super user in system manager
   * @return {promise}
   * @public
   * @async
   */
  loginSU() {
    return new Promise(async (resolve, reject) => {
      try {
        const self = this;
        const auth = _.get(self, 'parent.options.auth');
        const {type, credentials} = auth;

        if (type === 'userpassword') {

        } else if (type === 'apikey') {

          const {key: apiKey} = credentials;
          const apiCall = self.client.post('/login/api', {apiKey});
          const retData = self._returnData(await apiCall);
          await self._setSessionSU(retData);
          resolve(retData);
        } else {
          throw new Error('Type crendials invalid, valid is "userpassword or apikey');
        }
      } catch (ex) {
        reject(ex);
      }
    });
  }

  /**
   * @author Thiago Anselmo <thiagoo.anselmoo@gmail.com>
   * @description Logout super user system manager
   * @return {promise}
   * @public
   * @async
   */
  logoutSU() {
    return new Promise(async (resolve, reject) => {
      try {
        const self = this;
        const accessToken = await self._getSessionSU();
        const payload = { accessToken };
        const apiCall = self.client.post('/logout', payload);
        const retData = self._returnData(await apiCall);
        await self._cleanSessionSU();
        resolve(retData);
      } catch (ex) {
        reject(ex);
      }
    });
  }
}

module.exports = Access;
