const _ = require('lodash');
const expect = require('chai').expect;

const API = require('../../index');

let session;
let userId;
let sm;
let updatePass = {id: userId, oldPassword: '123456', newPassword: '123456789'};
let apiKey = '38bd15aa-6418-4d4f-812a-e7ed5b3bfcde';
let emailExist = 'emailisunique@gmail.com';

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
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Get profile', async function () {
    try {
      const retData = await sm.admin.user.findById(userId, session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData._id).equal(userId);
      expect(retData.name).equal('Automation SM');
      expect(retData.username).equal('en_automation');
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Update password', async function () {
    try {
      updatePass.userId = userId;
      const retData = await sm.admin.user.findByIdAndUpdatePassword(updatePass, session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData._id).equal(userId);
      expect(retData.name).equal('Automation SM');
      expect(retData.username).equal('en_automation');
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Rollback Update password', async function () {
    try {
      updatePass.oldPassword = '123456789';
      updatePass.newPassword = '123456';
      updatePass.id = userId;
      const retData = await sm.admin.user.findByIdAndUpdatePassword(updatePass, session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData._id).equal(userId);
      expect(retData.name).equal('Automation SM');
      expect(retData.username).equal('en_automation');
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Email is unique', async function () {
    try {
      const retData = await sm.admin.user.emailExist(emailExist, session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData.exist).to.be.false;
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Email is not unique', async function () {
    try {
      emailExist = 'ana.breda@gmail.com';
      const retData = await sm.admin.user.emailExist(emailExist, session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData.exist).to.be.true;
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
