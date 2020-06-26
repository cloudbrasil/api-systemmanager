const _ = require('lodash');
const expect = require('chai').expect;

const API = require('../index');
const login = require('./payload/payload_login');

let session;
let userId;
let sm;
let retData;
let setPayloadLogin = () => ({...login});
let updatePass = {id: userId, oldPassword: '123456', newPassword: '123456789'};


describe('Start API users', function () {
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
      retData = await sm.access.loginSU();

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

  it('Get profile', async function () {
    try {
      retData = await sm.users.getProfile(userId);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData._id).equal(userId);
      expect(retData.name).equal('Ana Breda');
      expect(retData.username).equal('ana.breda');
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Update password', async function () {
    try {
      updatePass.id = userId;
      retData = await sm.users.updatePassword(updatePass);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData._id).equal(userId);
      expect(retData.name).equal('Ana Breda');
      expect(retData.username).equal('ana.breda');
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Rollback Update password', async function () {
    try {
      updatePass.oldPassword = '123456789';
      updatePass.newPassword = '123456';
      updatePass.id = userId;
      retData = await sm.users.updatePassword(updatePass);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData._id).equal(userId);
      expect(retData.name).equal('Ana Breda');
      expect(retData.username).equal('ana.breda');
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Email is unique', async function () {
    try {
      const params = {field: 'email', query: 'emailisunique@gmail.com'};
      retData = await sm.users.isunique(params);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData.exist).to.be.false;
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Email is not unique', async function () {
    try {
      const params = {field: 'email', query: 'ana.breda@gmail.com'};
      retData = await sm.users.isunique(params);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData.exist).to.be.true;
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Logout user', async function () {
    try {
      retData = await sm.access.logoutUser(session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData.response).to.not.be.empty;
      expect(retData.response).equal('OK');
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });
});
