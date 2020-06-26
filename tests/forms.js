const _ = require('lodash');
const expect = require('chai').expect;

const API = require('../index');
const login = require('./payload/payload_login');

let formId;
let docIdAttr;
let sm;
let setPayloadLogin = () => ({...login});


describe('Start API forms', function () {
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

  it('Get form by ID', async function () {
    try {
      formId = '5e834cf792207e480d6a879c';
      const retData = await sm.forms.getById(formId);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData._id).equal(formId);
      expect(retData.form).to.not.be.empty;
      expect(retData.form).to.be.an('object');
      expect(retData.form.form).to.not.be.empty;
      expect(retData.form.form).to.be.an('array');
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });
});
