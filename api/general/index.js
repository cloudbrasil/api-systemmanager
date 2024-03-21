import Joi from 'joi';
import Geo from './geoLocation.js';

/**
 * @class API request, user permission level
 */
class Users {
  /**
   * @author Myndware <augusto.pissarra@myndware.com>
   * @constructor
   * @param {object} options Params of the constructor
   * @param {object} options.parent This of the pararent
   */
  constructor(options) {
    Joi.assert(options, Joi.object().required());
    Joi.assert(options.parent, Joi.object().required());

    const self = this;
    self.geo = new Geo(options);
  }
}

export default Users;
