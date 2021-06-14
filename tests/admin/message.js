const _ = require('lodash');
const expect = require('chai').expect;

const API = require('../../index');

let userId;
let orgId;
let sm;
let session;
let orgApiKey = '7f8fe8fc-7605-4082-bf83-ca338ecd2fd5';
let apiKey = '38bd15aa-6418-4d4f-812a-e7ed5b3bfcde';
let message = 'emprego.net: Código de validação do seu telefone: 76T5';
let recipient = '48996011188';

const paramsTosendEmail = {
  subject: 'Email de teste',
  message: 'Olá sou um teste <h5>sou um HTML</h5>',
  to: 'thiagoo.anselmoo@gmail.com'
};

describe('Start API forms', function () {
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

  it.skip('Send SMS', async function () {
    try {
      const paramsToSend = { apiKey: orgApiKey, message, recipient }
      const retData = await sm.admin.message.sendSMS(paramsToSend);

      expect(retData).to.not.be.empty;
      expect(retData).to.not.be.null;
      expect(retData.success).equal(true);
      expect(retData.send).equal(1);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Send Email', async function () {
    try {
      const retData = await sm.admin.message.sendEmail(paramsTosendEmail, session);

      expect(retData).to.not.be.empty;
      expect(retData).to.not.be.null;
      expect(retData.success).equal(true);
      expect(retData.sent.length).equal(1);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Logout user', async function () {
    try {
      const retData = await sm.login.logout(session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('boolean');
      expect(retData).to.not.be.empty;
      expect(retData).equal(true);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });
});
