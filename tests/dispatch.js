const _ = require('lodash');
const expect = require('chai').expect;

const API = require('../index');
const login = require('./payload/payload_login');

let session;
let userId;
let sm;
let retData;
let setPayloadLogin = () => ({...login});

describe('Start API dispatch', function () {
  before(function (done) {

    try {
      sm = new API();
      done();
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Login User', async function () {
    try {
      const credentials = setPayloadLogin();
      const params = {network: 'empregonet', credentials}
      retData = await sm.access.loginUser(params);

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
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Verify session is valid', async function () {
    try {
      retData = await sm.dispatch.sessionIsValid(session);
      expect(retData).to.not.be.empty;
      expect(retData).to.include.all.keys('_id', 'orgId', 'externalRoles');
      expect(retData._id).to.not.be.empty;
      expect(retData.orgId).to.not.be.empty;
      expect(retData.orgId).to.not.be.empty;
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });
});
