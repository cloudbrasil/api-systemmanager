const _ = require('lodash');
const expect = require('chai').expect;

const API = require('../index');
const login = require('./payload/payload_login');

let docIdAttr;
let sm;
let setPayloadLogin = () => ({...login});

const index = 'extraCityname';
const txtToSearch = 'Palhoça';
const docId = '5e5945f650b526150f651717';
const docAreaId = '5db06b51f833e1047a27fd8b';
const projection = 'extraCityname,extraStateabbreviation';
const tag = 'Nome da cidade';

describe('Start API proccess', function () {
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

  it('Search autocomplete', async function () {
    try {
      const params = {
        index,
        txtToSearch,
        docId,
        docAreaId,
        tag,
        projection
      };
      const retData = await sm.documents.autoComplete(params);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData.count).equal(1);
      expect(retData.page).equal(1);
      expect(retData.items).to.be.an('array');
      expect(retData.items).to.not.be.empty;
      expect(retData.items.length).equal(1);

      docIdAttr = retData.items[0]._id;
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });
});
