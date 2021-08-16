const _ = require('lodash');
const expect = require('chai').expect;

const API = require('../../index');

let sm;
let docId = '60c7c5b849f54c763a527499';
let apiKey = '346cf019-6127-448e-971f-b0ad6801dbf2';

describe('Start API Documents', function () {
  before(function (done) {

    try {
      sm = new API();
      done();
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Get signed url, method get', async function () {
    try {
      const retData = await sm.admin.document.signedUrl({ docId, methodType: 'get' }, apiKey);
      expect(retData).to.not.be.empty;
      expect(retData.signedUrl).to.not.be.empty;
      expect(retData.document).to.not.be.empty;
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Get signed url, method get', async function () {
    try {
      const retData = await sm.admin.document.signedUrl({ docId, methodType: 'put' }, apiKey);
      expect(retData).to.not.be.empty;
      expect(retData.signedUrl).to.not.be.empty;
      expect(retData.areaId).to.not.be.empty;
      expect(retData.type).to.not.be.empty;
      expect(retData.name).to.not.be.empty;
      expect(retData.filename).to.not.be.empty;
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });
});
