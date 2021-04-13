const _ = require('lodash');
const expect = require('chai').expect;

const API = require('../../index');

let userId;
let orgId;
let sm;
let session;
let apiKey = '38bd15aa-6418-4d4f-812a-e7ed5b3bfcde';

describe('Start API policy', function () {
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

  it('Search process: Context recruiter', async function () {
    try {
      const setParams = {
        orgProcessId: {value: '5f57d4f3b8fe3d0d22fc99be'},
        initParams: [
          {
            value: '5f67651a7dae1a260eb92625',
            name: 'initParams.jobId',
          },
          {
            value: 'remote',
            name: 'initParams.type',
          },
          {
             value: '23/09/2020 13:00',
             type: 'date_time',
             oper: '>=',
             name: 'initParams.startDateTime'
          },
          {
             value: '23/09/2020 15:00',
             type: 'date_time',
             oper: '<=',
             name: 'initParams.endDateTime'
          },
        ],
        orgId
      };
      const retData = await sm.admin.processes.search(setParams, session);

      expect(retData.items).to.not.be.empty;
      expect(retData.items).to.be.an('array');
      expect(retData.items[0]).to.include.all.keys('history', 'properties');
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Search process: Context professional', async function () {
    try {
      const setParams = {
        orgProcessId: {value: '5f57d4f3b8fe3d0d22fc99be'},
        initParams: [
          {
            value: [{id: '5f677fa16d92486104823bcb'}],
            name: 'initParams.candidates.id',
          },
        ],
        orgId
      };
      const retData = await sm.admin.processes.search(setParams, session);

      expect(retData.items).to.not.be.empty;
      expect(retData.items).to.be.an('array');
      expect(retData.items[0]).to.include.all.keys('history', 'properties');
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



