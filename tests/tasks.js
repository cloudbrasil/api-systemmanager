const _ = require('lodash');
const expect = require('chai').expect;

const API = require('../index');
const login = require('./payload/payload_login');

let userId;
let sm;
let setPayloadLogin = () => ({...login});
let taskId = '5edf9f8ee8a2b117e45b8dac'
let processId = 'bedf9f8ee8a2b117e45b8dad'

describe('Start API tasks', function () {
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

      userId = retData.user._id;
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('List all task', async function () {
    try {
      const retData = await sm.tasks.listAll(userId);

      expect(retData).to.be.an('array');
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Get one task by id', async function () {
    try {
      const payload = {taskId, processId};
      const retData = await sm.tasks.getById(payload);

      expect(retData).to.be.an('array');
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Update task', async function () {
    try {
      const payload = {taskId, processId};
      const retData = await sm.tasks.getById(payload);

      expect(retData).to.be.an('array');
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });
});
