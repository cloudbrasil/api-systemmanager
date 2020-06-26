const _ = require('lodash');
const expect = require('chai').expect;

const API = require('../index');
const login = require('./payload/payload_login');

let listId;
let docIdAttr;
let sm;
let setPayloadLogin = () => ({...login});


describe('Start API policies', function () {
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

  it('Get all', async function () {
    try {
      const retData = await sm.policies.getAll();

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('array');
      expect(retData[0]).to.include.all.keys('_id', 'name', 'policy', 'description');
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });
});
