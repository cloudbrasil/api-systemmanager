const _ = require('lodash');
const expect = require('chai').expect;

const API = require('../index');
const login = require('./payload/payload_login');

let pluginId;
let sm;

describe('Start API plugin', function () {
  before(function (done) {

    try {
      sm = new API();
      done();
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Login', async function () {
    try {
      const retData = await sm.access.loginSU();

      expect(retData).to.not.be.empty;
      expect(retData.auth).to.be.true;
      expect(retData.user).to.be.an('object');
      expect(retData.user).to.be.an('object');
      expect(retData.user).to.not.be.empty;
      expect(retData.user.sessionId).to.not.be.empty;
      expect(retData.user.sessionId.split('.').length).equal(3);
      expect(retData.user.orgId.length).equal(24);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Get plugin by ID', async function () {
    try {
      pluginId = '5ecea0030878f140eee13e3a';
      const retData = await sm.plugins.getById(pluginId);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData._id).equal(pluginId);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });
});
