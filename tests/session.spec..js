const _ = require('lodash');
const expect = require('chai').expect;
const API = require('../index');

let session;
let sm;

let apiKey = '25c04b9a-0f6b-11ea-8d71-362b9e155667';
let userpass = {username: 'ana.breda@gmail.com', password: '123456'};

describe('Start API access', function () {
  before(function (done) {

    try {
      sm = new API();
      done();
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Login API Key', async function () {
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

      session = retData.user.sessionId
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Session information by sessionID', async function () {
    try {
      const retData = await sm.session.information(session, session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData._id).to.not.be.empty;
      expect(retData._id).to.be.an('string');
      expect(retData._id.length).equal(24);

      expect(retData.orgId).to.not.be.empty;
      expect(retData.orgId).to.be.an('string');
      expect(retData.orgId.length).equal(24);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });
});
