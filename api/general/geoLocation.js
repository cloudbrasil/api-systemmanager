import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';

/**
 * General Class for user, permission organization
 * @class
 */
class GeoLocation {

  constructor(options) {
    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self._parent = options.parent;
    self._client = self._parent.dispatch.getClient();
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
        authorization: session,
      }
    };
  }

  /**
   * @author Myndware <augusto.pissarra@myndware.com>
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
      Joi.assert(params, Joi.object().required());
      Joi.assert(params.address, Joi.string().required(), 'The address to get the location for');
      Joi.assert(params.apiKey, Joi.string().required(), 'The Organization API Key');

      const {address, apiKey} = params;
      const query = `address=${address}&apiKey=${apiKey}`;

      const apiCall = self._client.get(`/location/geo?${query}`);
      return self._returnData(await apiCall);
    } catch (ex) {
      throw ex;
    }
  }
}

export default GeoLocation;
