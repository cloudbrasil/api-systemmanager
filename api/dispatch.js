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
    self._cache = options.parent.options.cache;
    self._forceCache = options.parent.options.forceCache;
    self.parent = options.parent;
    self._client = Axios.create({
      baseURL: self.parent.options.uri,
      withCredentials: true
    });

    // Add request interceptor for offline handling.
    self._client.interceptors.request.use(
        async (config) => {
          // If online or no cache is provided, proceed normally.
          if (self._isOnline() || !self._cache) {
            return config;
          }

          // We're offline and caching is enabled – try to retrieve cached data.
          const cachedData = await self._getCache(config.url, {
            method: config.method,
            data: config.data,
            params: config.params,
            headers: config.headers
          });

          if (cachedData) {
            // Instead of returning the modified config (which would trigger a network call),
            // return a rejected promise with a flag and a fake response.
            return Promise.reject({
              __fromCache: true,
              response: {
                data: cachedData,
                status: 200,
                statusText: 'OK',
                headers: config.headers,
                config: config,
                request: {} // empty placeholder
              }
            });
          }

          // No cached data found – signal an offline error.
          self.errorOffline();
          return Promise.reject(new Error('Network error: No internet connection and no cached data available'));
        },
        error => Promise.reject(error)
    );

    // Add response interceptor to handle caching and to return a cached response when available.
    self._client.interceptors.response.use(
        async response => {
          // If online, the response is OK, caching is enabled, and this wasn’t a cached response,
          // then cache the new response data.
          if (response.status === 200 && self._isOnline() && self._cache && !response.config.cached) {
            await self._setCache(
                response.config.url,
                {
                  method: response.config.method,
                  data: response.config.data,
                  params: response.config.params,
                  headers: response.config.headers
                },
                response.data
            );
          }
          return response;
        },
        error => {
          // If the error was generated because we had a cached response, then return that response.
          if (error.__fromCache && error.response) {
            return Promise.resolve(error.response);
          }
          return Promise.reject(error);
        }
    );
  }

  /**
   * @description Get the return data and check for errors.
   * @param {object} retData Response HTTP.
   * @param {*} [def={}] Default value to return if no data is found.
   * @return {*}
   * @private
   */
  _returnData(retData, def = {}) {
    if (retData.status !== 200) {
      throw new Error(_.get(retData, 'message', 'No error message reported!'));
    }
    return _.get(retData, 'data', def);
  }

  /**
   * @description Set header with new session.
   * @param {string} session Session token (JWT).
   * @return {object} Header object with the new session.
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
   * @description Check if the browser/client is currently online.
   * @return {boolean} True if online, false if offline.
   * @private
   */
  _isOnline() {
    if (this._forceCache) return false;
    return typeof navigator !== 'undefined' && navigator.onLine;
  }

  /**
   * @description Get cached data for a specific request.
   * @param {string} url The request URL.
   * @param {object} options Request options including method, data, params, and headers.
   * @return {Promise<object|null>} Cached data or null if no cache exists.
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
   * @description Set data in cache for a specific request.
   * @param {string} url The request URL.
   * @param {object} options Request options including method, data, params, and headers.
   * @param {object} data The data to cache.
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
   * Called when no cache is available and the client is offline.
   */
  errorOffline() {
    if (this._cache && typeof this._cache.errorOffline === 'function') {
      this._cache.errorOffline();
    }
  }

  /**
   * Get the URL context.
   * @param {string} url Full URL.
   * @param {string|null} [session=null] Session token (JWT).
   * @return {Promise<object>} The full data context of the URL.
   * @public
   * @async
   */
  async getContext(url, session = null) {
    Joi.assert(url, Joi.string().required());

    // Append the json flag to the URL.
    if (url.includes('?')) {
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
   * @description Get the Axios client.
   * @return {AxiosInstance} The Axios client.
   * @public
   */
  getClient() {
    return this._client;
  }
}

export default Dispatch;
