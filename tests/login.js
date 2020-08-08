const _ = require('lodash');
const expect = require('chai').expect;
const API = require('../index');

let session;
let sm;

let facebookAccessToken = 'EAAKCTEy0o0UBACCX4ZB3WEdRVhjlS4ZArMf0QHOstZA4nul9PZB1HcnkngpLZCRnzCP3zUgCZBvrYlqnQFfkPU1FBEa4Lentj0YPTXJiOqkTmWZANCgsmZBr4aP3VEkatZB5usmkOxQuJ9aCPXy2PZARfdWzekBY3i1b8gtRA0c0YejQZDZD';
let apiKey = '25c04b9a-0f6b-11ea-8d71-362b9e155667';
let googleAccessToken = 'ya29.a0AfH6SMCB76tDDIekmlJALX3RIbdZNE-VBj3R2_83zUSJRnAZt_oxMBrRzgLwGSJQxyJU0tHkDVEjFsHmOTYMxYz2TL6QHwZtaXLL-mJUGJ8UqmbBLKz_BWHUh5U_y3C7UMtPCsM3JLsCevnWtuvcPWdYxfQ1yIRFfj4';
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

  it('Login facebook', async function () {
    try {
      const retData = await sm.login.facebook({ accessToken: facebookAccessToken });

      expect(retData).to.not.be.empty;
      expect(retData.auth).to.be.true;
      expect(retData.user).to.be.an('object');
      expect(retData.user).to.be.an('object');
      expect(retData.user).to.not.be.empty;
      expect(retData.user.sessionId).to.not.be.empty;
      expect(retData.user.sessionId.split('.').length).equal(3);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Login Google', async function () {
    try {
      const retData = await sm.login.google({ accessToken: googleAccessToken });

      expect(retData).to.not.be.empty;
      expect(retData.auth).to.be.true;
      expect(retData.user).to.be.an('object');
      expect(retData.user).to.be.an('object');
      expect(retData.user).to.not.be.empty;
      expect(retData.user.sessionId).to.not.be.empty;
      expect(retData.user.sessionId.split('.').length).equal(3);

      session = retData.user.sessionId;
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Login User and Pass', async function () {
    try {
      const retData = await sm.login.userPass(userpass);

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
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });
});
