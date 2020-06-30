const _ = require('lodash');
const expect = require('chai').expect;

const API = require('../../index');

let userId;
let orgId;
let sm;
let session;
let pluginId = '5ecea0030878f140eee13e3a';
let apiKey = '38bd15aa-6418-4d4f-812a-e7ed5b3bfcde';

describe('Start API plugin', function () {
  before(function (done) {

    try {
      sm = new API();
      done();
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Login SU', async function () {
    try {
      const retData = await sm.login.apiKey(apiKey);

      expect(retData).to.not.be.empty;
      expect(retData.auth).to.be.true;
      expect(retData.user).to.be.an('object');
      expect(retData.user).to.be.an('object');
      expect(retData.user).to.not.be.empty;
      expect(retData.user.sessionId).to.not.be.empty;
      expect(retData.user.sessionId.split('.').length).equal(3);
      expect(retData.user.orgId.length).equal(24);

      session = retData.user.sessionId;
      userId = retData.user._id;
      orgId = retData.user.orgId;
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Get plugin by ID', async function () {
    try {
      const retData = await sm.admin.plugin.findById(pluginId, session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData._id).equal(pluginId);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Logout user', async function () {
    try {
      const retData = await sm.login.logout(session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData.response).to.not.be.empty;
      expect(retData.response).equal('OK');
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });
});


