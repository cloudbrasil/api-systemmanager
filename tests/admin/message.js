const _ = require('lodash');
const expect = require('chai').expect;

const API = require('../../index');

let sm;
let orgApiKey = '7f8fe8fc-7605-4082-bf83-ca338ecd2fd5';
let message = 'emprego.net: Código de validação do seu telefone: 76T5';
let recipient = '48996011188';

describe('Start API forms', function () {
  before(function (done) {

    try {
      sm = new API();
      done();
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Send SMS', async function () {
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
});
