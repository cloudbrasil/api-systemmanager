import _ from 'lodash';
import { expect } from 'chai';
import API from '../../index.js';

let sm;
let user;
let session;
const apiKey = '25c04b9a-0f6b-11ea-8d71-362b9e155667';

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
      const retData = await sm.login.apiKey(apiKey);

      expect(retData).to.not.be.empty;
      expect(retData.auth).to.be.true;
      expect(retData.user).to.be.an('object');
      expect(retData.user).to.be.an('object');
      expect(retData.user).to.not.be.empty;
      expect(retData.user.sessionId).to.not.be.empty;
      expect(retData.user.sessionId.split('.').length).equal(3);
      expect(retData.user.orgId.length).equal(24);
      user = retData.user;
      session = retData.user.sessionId;
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Get available tasks', async function () {
    try {
      const params = {
        query: {
          "s": [
            {
              "historyBegin": {
                "order": "desc"
              }
            }
          ],
          "i": 1,
          "p": 20
        },
        orgId: user.orgId
      };
      const retData = await sm.user.task.available.find(params, session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData.items).to.be.an('array');
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Logout user', async function () {
    try {
      const retData = await sm.login.logout(session);

      expect(retData).to.be,true;
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });
});
