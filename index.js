const _ = require('lodash');
const Joi = require('@hapi/joi');

const Recruiter = require('./api/recruiter');
const Job = require('./api/job');
const History = require('./api/history');

class API {
  constructor(options) {

    if (!_.isUndefined(options)) {
      Joi.assert(options, Joi.object());
      Joi.assert(options.apiKey, Joi.string());
      Joi.assert(options.uri, Joi.string());
      Joi.assert(options.debug, Joi.object());
    }

    const self = this;
    self.options = _.defaultsDeep({}, options, {
      apiKey: '6d938014-6f5c-4e28-973d-ce1343ead38e',
      uri: 'http://localhost:5053',
      callPrefix: 'Actions.empregonet.recruiter',
      debug: {success: true, error: true}
    });
    self.header = {'x-api-key': self.options.apiKey};

    //
    // CALL API
    //
    self.user = new Recruiter({parent: self});
    self.job = new Job({parent: self});
    self.history = new History({parent: self});
  }
}

module.exports = API;
