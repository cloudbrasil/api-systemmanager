const _ = require('lodash');
const expect = require('chai').expect;

const API = require('../../index');
const notificationTotal = 10;

let userId;
let orgId;
let sm;
let session;
let notificationId;
let apiKey = '38bd15aa-6418-4d4f-812a-e7ed5b3bfcde';

describe('Start API Notification', function () {
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

  it('Delete notifications by userId', async function () {
    try {
      const params = { id: userId, orgId };
      await sm.admin.notification.findByIdAndRemove(params, session);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it(`Create ${notificationTotal} notification`, async function () {
    try {
      const params = {
        userId,
        orgId,
        message: {
          text: 'Teste',
          date: new Date()
        }
      };

      for await (let [idx, count] of new Array(notificationTotal).entries()) {
        params.message.text = `Teste ${idx}`;

        const retData = await sm.admin.notification.add(params, session);

        expect(retData).to.not.be.empty;
        expect(retData).to.be.an('object');
        expect(retData).to.include.all.keys('_id', 'userId', 'message', 'created');
        expect(retData._id).to.not.null;
        expect(retData._id).to.not.be.empty;
        expect(retData._id).to.be.an('string');

        expect(retData.message.text).to.be.an('string');
        expect(retData.message.date).to.be.an('string');

        notificationId = retData._id;
      }
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Get notifications by userId', async function () {
    try {
      const params = {
        id: userId,
        orgId
      };
      const retData = await sm.admin.notification.findById(params, session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData).to.include.all.keys('results', 'total');
      expect(retData.total).to.equal(notificationTotal);
      expect(retData.results).to.not.be.empty;
      expect(retData.results).to.be.an('array');
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Get notifications by notificationId', async function () {
    try {
      const params = {
        id: notificationId,
        orgId
      };
      const retData = await sm.admin.notification.findById(params, session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData).to.include.all.keys('results', 'total');
      expect(retData.total).to.equal(1);
      expect(retData.results).to.not.be.empty;
      expect(retData.results).to.be.an('array');
      expect(retData.results[0].message.text).to.equal('Teste 9');
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Update read all notifications by userId', async function () {
    try {
      const params = {
        id: userId,
        orgId,
        read: true
      };
      const retData = await sm.admin.notification.findByIdAndUpdate(params, session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData).to.include.all.keys('nModified');
      expect(retData.nModified).to.equal(notificationTotal);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Delete notifications by notificationId', async function () {
    try {
      const params = { id: notificationId, orgId };
      const retData = await sm.admin.notification.findByIdAndDelete(params, session);

      expect(retData).to.not.be.empty;
      expect(retData).to.be.an('object');
      expect(retData).to.include.all.keys('ok', 'deletedCount');
      expect(retData.deletedCount).to.equal(1);
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



