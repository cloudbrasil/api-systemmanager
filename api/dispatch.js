import _ from 'lodash';
import Joi from 'joi';
import Axios from 'axios';

/**
 * @class Api dispatch manager
 */
class Dispatch {
  constructor(options) {
    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self.parent = options.parent;
    self._cache = options.cache;
    self._client = Axios.create({baseURL: self.parent.options.uri, withCredentials: true});

    // Add request interceptor for offline handling
    self._client.interceptors.request.use(
        async (config) => {
          if (self._isOnline()) {
            return config;
          }

          const cachedData = await self._getCache(config.url, {
            method: config.method,
            data: config.data,
            params: config.params,
            headers: config.headers
          });

          if (cachedData) {
            // Cancel the actual request and return cached data
            const dummyResponse = {
              status: 200,
              data: cachedData,
              headers: {},
              config,
              cached: true
            };

            // Throwing a special error that includes our cached response
            throw {
              __CACHE_HIT__: true,
              response: dummyResponse
            };
          }

          throw new Error('Network error: No internet connection and no cached data available');
        },
        error => Promise.reject(error)
    );

    // Add response interceptor to handle cache hits and cache successful responses
    self._client.interceptors.response.use(
        async response => {
          // Cache successful responses when online
          if (response.status === 200 && self._isOnline()) {
            await self._setCache(response.config.url, {
              method: response.config.method,
              data: response.config.data,
              params: response.config.params,
              headers: response.config.headers
            }, response.data);
          }
          return response;
        },
        error => {
          if (error.__CACHE_HIT__) {
            return error.response;
          }
          return Promise.reject(error);
        }
    );
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
  _setHeader(session) {
    return {
      headers: {
        authorization: session,
      }
    };
  }

  /**
   * @description Check if the browser/client is currently online
   * @return {boolean} True if online, false if offline
   * @private
   */
  _isOnline() {
    return typeof navigator !== 'undefined' && navigator.onLine && this._cache;
  }

  /**
   * @description Get cached data for a specific request
   * @param {string} url The request URL
   * @param {object} options Request options including method, data, params, and headers
   * @return {Promise<object|null>} Cached data or null if no cache exists
   * @private
   */
  async _getCache(url, options) {
    try {
      return await this._cache.getCache(url, options);
    } catch (error) {
      console.warn('Cache retrieval failed:', error);
      return null;
    }
  }

  /**
   * @description Set data in cache for a specific request
   * @param {string} url The request URL
   * @param {object} options Request options including method, data, params, and headers
   * @param {object} data The data to cache
   * @return {Promise<void>}
   * @private
   */
  async _setCache(url, options, data) {
    try {
      await this._cache.setCache(url, options, data);
    } catch (error) {
      console.warn('Cache storage failed:', error);
    }
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
    Joi.assert(url, Joi.string().required());

    if(url.includes('?')) {
      url = `${url}&json=true`;
    } else {
      url = `${url}?json=true`;
    }

    const self = this;
    const header = session ? self._setHeader(session) : {};
    const apiCall = await self._client.get(url, header);
    return self._returnData(apiCall);
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
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

export default Dispatch;
