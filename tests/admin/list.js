const _ = require('lodash');
const expect = require('chai').expect;

const API = require('../../index');

let userId;
let orgId;
let sm;
let session;
let listId = '5e553471f0c1ed539e97519c';
let apiKey = '38bd15aa-6418-4d4f-812a-e7ed5b3bfcde';

describe('Start API lists', function () {
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

  it('Get list by ID', async function () {
    try {
      const params = {id: listId, orgId};
      const retData = await sm.admin.list.findById(params, session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData._id).equal(listId);
      expect(retData.list).to.not.be.empty;
      expect(retData.list).to.be.an('array');
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Get all lists', async function () {
    try {

      const params = {orgId};
      const retData = await sm.admin.list.find(params, session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('array');
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

