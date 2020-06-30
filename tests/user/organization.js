const _ = require('lodash');
const expect = require('chai').expect;

const API = require('../../index');

let session;
let userId;
let sm;
let retData;
let login = {username: 'ana.breda', password: '123456'};
let idCardExist = '94422089000128';

describe('Start API users', function () {
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
      expect(ex).to.be.empty;
    }
  });

  it('Id Card Exist', async function () {
    try {
      retData = await sm.user.organization.idCardExist(idCardExist, session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData.exist).to.be.true;
    } catch (ex) {
      expect(ex).to.be.empty;
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
      expect(ex).to.be.empty;
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
      expect(ex).to.be.empty;
    }
  });
});
