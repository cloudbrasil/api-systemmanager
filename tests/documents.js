const _ = require('lodash');
const expect = require('chai').expect;

const API = require('../index');
const login = require('./payload/payload_login');

let docCreateId;
let docIdAttr;
let sm;
let docs;
let setPayloadLogin = () => ({...login});

const index = 'extraCityname';
const txtToSearch = 'Palhoça';
const docId = '5e5945f650b526150f651717';
const docAreaId = '5db06b51f833e1047a27fd8b';
const projection = 'extraCityname,extraStateabbreviation';
const tag = 'Nome da cidade';
const paramsSignedUrlPut = {
  methodType: 'put',
  docId: '5edf86fbe896b817e45b8da6',
  fileName: 'foto',
  docAreaId: '5edf9f8ee896b817e45b8dac',
  type: 'image/png',
};

const paramsSignedUrlGet = {
  methodType: 'get',
  document: 'foto'
}

describe('Start API documents', function () {
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

  it('Get attribuites of the document', async function () {
    try {
      const retData = await sm.documents.getById(docIdAttr);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData).to.include.all.keys('_id', 'docTypeFields', 'docTypeFieldsData');
      expect(retData.docTypeFields).to.not.be.empty;
      expect(retData.docTypeFields).to.be.an('array');
      expect(retData.docTypeFieldsData).to.not.be.empty;
      expect(retData.docTypeFieldsData).to.be.an('object');
      expect(retData._id).equal(docIdAttr)
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Get signedURL PUT', async function () {
    try {
      const retData = await sm.documents.getSignedUrl(paramsSignedUrlPut);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData.docs).to.not.be.empty;
      expect(retData.docs).to.be.an('array');
      expect(retData.docs[0].signedUrl.indexOf('https://s3.amazonaws.com')).above(-1);

      docs = {...retData.docs[0], bytes: 123456};
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Get signedURL GET', async function () {
    try {
      const retData = await sm.documents.getSignedUrl(paramsSignedUrlGet);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData.docs).to.not.be.empty;
      expect(retData.docs).to.be.an('array');
      expect(retData.docs[0].signedUrl.indexOf('https://s3.amazonaws.com')).above(-1);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Add document CV', async function () {
    try {
      docs.userId = '5739d4c6ccb0ebc61f2a9557';
      docs.docTypeId = '5edf9f8ee896b817e45b8dac';
      const retData = await sm.documents.createCV(docs);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData._id).to.not.be.empty;
      expect(retData._id).to.be.an('string');
      expect(retData.orgname).equal('emprego.net');
      expect(retData.name).equal('foto');
      expect(retData.type).equal('image/png');
      expect(retData.docTypeId).equal(docs.docTypeId);
      docCreateId = retData._id;
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Remove document CV', async function () {
    try {
      const retData = await sm.documents.removeCV(docCreateId);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData.removed).equal(1);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });
});
