const _ = require('lodash');
const expect = require('chai').expect;

const API = require('../../index');

let session;
let userId;
let sm;
let retData;
let login = {username: 'ana.breda', password: '123456'};
let idCardExist = '94422089000128';
let orgId = '5dadd01dc4af3941d42f8c5c'; // Orgname Empregonet

describe('Start API users', function () {
  before(function (done) {

    try {
      sm = new API();
      done();
    } catch (ex) {
      expect(ex).to.be.null;
    }
  });

  it('Login User', async function () {
    try {
      retData = await sm.login.userPass(login);

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
      expect(ex).to.be.null;
    }
  });

  it('Id Card Exist', async function () {
    try {
      retData = await sm.user.organization.idCardExist(idCardExist, session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData.exist).to.be.true;
    } catch (ex) {
      expect(ex).to.be.null;
    }
  });

  it('Id Card Not Exist', async function () {
    try {
      idCardExist = '94422089000129';
      retData = await sm.user.organization.idCardExist(idCardExist, session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData.exist).to.be.false;
    } catch (ex) {
      expect(ex).to.be.null;
    }
  });

  it('Get org by id - OK', async function () {
    try {
      retData = await sm.user.organization.findById(orgId, session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData._id).to.equal(orgId);
      expect(retData.orgname).to.equal('empregonet');
      expect(retData.name).to.equal('emprego.net');
    } catch (ex) {
      expect(ex).to.be.null;
    }
  });

  it('Get org by id - NOT FOUND', async function () {
    try {
      retData = await sm.user.organization.findById('012345678901234567891234', session);
    } catch (ex) {
      expect(ex.output.statusCode).to.equal(404);
      expect(ex.message).to.equal('Organization not found with informed id!');
    }
  });

  it('Fetch URL', async function () {
    try {
      const setParams = {
        method: 'POST',
        url: 'http://localhost:8080/organizations/5dadd01dc4af3941d42f8c5c/process/b32ab980f21811ea8879bbc12d8d05a7/task/candidateAccepted/end/44e4ef2bfbe5d41c94141370345529e1'
      }
      retData = await sm.user.organization.callFetch(setParams, session);
      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData.response).to.not.be.empty;
      expect(retData.response).equal('OK');
    } catch (ex) {
      expect(ex.output.statusCode).to.equal(404);
      expect(ex.message).to.equal('Organization not found with informed id!');
    }
  });

  it('Logout user', async function () {
    try {
      retData = await sm.login.logout(session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData.response).to.not.be.empty;
      expect(retData.response).equal('OK');
    } catch (ex) {
      expect(ex).to.be.null;
    }
  });
});
