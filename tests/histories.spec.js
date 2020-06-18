const _ = require('lodash');
const expect = require('chai').expect;
const API = require('../index');
const {job, user, organization} = require('./payload/payload_histories');

let recruiter;

let lastIdUser;
let lastIdOrg;
let lastIdJob;

const userId = '5b7f31d5a78c94506f3316a8';
const userSMId = '1a8a31d5a78c94506f3316a4';
const orgId = '378a31d5a78c94506f3316a8';
const jobId = '456789d5a78c94506f3316a8';

const _id = '5b7f31d5a78c94506f331909';
const setPayloadUser = () => ({userId, userSMId, ...user});
const setPayloadJob = () => ({jobId, ...job});
const setPayloadOrg = () => ({orgId, ...organization});

const setPayloadUpdateUser = () => ({fieldDescription: 'Empregonet', value: 'RJ'});
const setPayloadUpdateJob = () => ({fieldDescription: 'Recrutador', value: 'RC'});
const setPayloadUpdateOrg = () => ({fieldDescription: 'Profissional', value: 'PF'});

const process = {
  logger: () => {
    return {
      trace: (msg, data) => {
        console.log(msg, data);
      }
    }
  }
};

const domain = {
  log: () => {
    return {
      info: (msg, data) => {
        console.log(msg, data);
      }
    }
  }
};

describe('empregonet histories test', function () {
  before(async function () {
    // runs before all tests in this block
    try {
      recruiter = new API();
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Clean data', async function () {
    await recruiter.history.deleteByUserId(domain, userSMId);
    await recruiter.history.deleteByOrgId(domain, orgId);
    await recruiter.history.deleteByJobId(domain, jobId);
  });

  it('add history of the user', async function () {
    try {
      const payloadToSend = setPayloadUser();
      const retData = await recruiter.history.add(process, payloadToSend);

      expect(retData).to.not.be.empty;
      expect(retData._id.toString().length).to.equal(24);
      expect(retData.type).to.equal(payloadToSend.type);
      expect(retData.field).to.equal(payloadToSend.field);
      expect(retData.fieldDescription).to.equal(payloadToSend.fieldDescription);
      expect(retData.originalValue).to.equal(payloadToSend.originalValue);
      expect(retData.value).to.equal(payloadToSend.value);

      lastIdUser = retData._id.toString();
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('add history of the organization', async function () {
    try {
      const payloadToSend = setPayloadOrg();
      const retData = await recruiter.history.add(process, payloadToSend);

      expect(retData).to.not.be.empty;
      expect(retData._id.toString().length).to.equal(24);
      expect(retData.type).to.equal(payloadToSend.type);
      expect(retData.field).to.equal(payloadToSend.field);
      expect(retData.fieldDescription).to.equal(payloadToSend.fieldDescription);
      expect(retData.originalValue).to.equal(payloadToSend.originalValue);
      expect(retData.value).to.equal(payloadToSend.value);

      lastIdOrg = retData._id.toString();
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('add history of the job', async function () {
    try {
      const payloadToSend = setPayloadJob();
      const retData = await recruiter.history.add(process, payloadToSend);

      expect(retData).to.not.be.empty;
      expect(retData._id.toString().length).to.equal(24);
      expect(retData.type).to.equal(payloadToSend.type);
      expect(retData.field).to.equal(payloadToSend.field);
      expect(retData.fieldDescription).to.equal(payloadToSend.fieldDescription);
      expect(retData.originalValue).to.equal(payloadToSend.originalValue);
      expect(retData.value).to.equal(payloadToSend.value);

      lastIdJob = retData._id.toString();
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findById history user', async function () {
    try {
      const payloadUser = setPayloadUser();
      const retData = await recruiter.history.findById(domain, lastIdUser);
      expect(retData).to.not.be.empty;
      expect(retData._id.toString()).to.equal(lastIdUser);
      expect(retData.type).to.equal(payloadUser.type);
      expect(retData.field).to.equal(payloadUser.field);
      expect(retData.fieldDescription).to.equal(payloadUser.fieldDescription);
      expect(retData.originalValue).to.equal(payloadUser.originalValue);
      expect(retData.value).to.equal(payloadUser.value);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findById history organization', async function () {
    try {
      const payloadOrg = setPayloadOrg();
      const retData = await recruiter.history.findById(domain, lastIdOrg);
      expect(retData).to.not.be.empty;
      expect(retData._id.toString()).to.equal(lastIdOrg);
      expect(retData.type).to.equal(payloadOrg.type);
      expect(retData.field).to.equal(payloadOrg.field);
      expect(retData.fieldDescription).to.equal(payloadOrg.fieldDescription);
      expect(retData.originalValue).to.equal(payloadOrg.originalValue);
      expect(retData.value).to.equal(payloadOrg.value);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findById history job', async function () {
    try {
      const payloadJob = setPayloadJob();
      const retData = await recruiter.history.findById(domain, lastIdJob);
      expect(retData).to.not.be.empty;
      expect(retData._id.toString()).to.equal(lastIdJob);
      expect(retData.type).to.equal(payloadJob.type);
      expect(retData.field).to.equal(payloadJob.field);
      expect(retData.fieldDescription).to.equal(payloadJob.fieldDescription);
      expect(retData.originalValue).to.equal(payloadJob.originalValue);
      expect(retData.value).to.equal(payloadJob.value);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findByIdAndUpdate history user', async function () {
    try {
      const payloadUser = {...setPayloadUser(), ...setPayloadUpdateUser()};
      const retData = await recruiter.history.findByIdAndUpdate(domain, lastIdUser, payloadUser);
      expect(retData).to.not.be.empty;
      expect(retData._id.toString()).to.equal(lastIdUser);
      expect(retData.type).to.equal(payloadUser.type);
      expect(retData.field).to.equal(payloadUser.field);
      expect(retData.fieldDescription).to.equal(payloadUser.fieldDescription);
      expect(retData.originalValue).to.equal(payloadUser.originalValue);
      expect(retData.value).to.equal(payloadUser.value);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findByIdAndUpdate history organization', async function () {
    try {
      const payloadOrg = {...setPayloadOrg(), ...setPayloadUpdateOrg()};
      const retData = await recruiter.history.findByIdAndUpdate(domain, lastIdOrg, payloadOrg);
      expect(retData).to.not.be.empty;
      expect(retData._id.toString()).to.equal(lastIdOrg);
      expect(retData.type).to.equal(payloadOrg.type);
      expect(retData.field).to.equal(payloadOrg.field);
      expect(retData.fieldDescription).to.equal(payloadOrg.fieldDescription);
      expect(retData.originalValue).to.equal(payloadOrg.originalValue);
      expect(retData.value).to.equal(payloadOrg.value);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findByIdAndUpdate history job', async function () {
    try {
      const payloadJob = {...setPayloadJob(), ...setPayloadUpdateJob()};
      const retData = await recruiter.history.findByIdAndUpdate(domain, lastIdJob, payloadJob);
      expect(retData).to.not.be.empty;
      expect(retData._id.toString()).to.equal(lastIdJob);
      expect(retData.type).to.equal(payloadJob.type);
      expect(retData.field).to.equal(payloadJob.field);
      expect(retData.fieldDescription).to.equal(payloadJob.fieldDescription);
      expect(retData.originalValue).to.equal(payloadJob.originalValue);
      expect(retData.value).to.equal(payloadJob.value);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findByIdAndRemove history user', async function () {
    try {
      const payloadUser = {...setPayloadUser(), ...setPayloadUpdateUser()};
      const retData = await recruiter.history.findById(domain, lastIdUser);
      expect(retData).to.not.be.empty;
      expect(retData._id.toString()).to.equal(lastIdUser);
      expect(retData.type).to.equal(payloadUser.type);
      expect(retData.field).to.equal(payloadUser.field);
      expect(retData.fieldDescription).to.equal(payloadUser.fieldDescription);
      expect(retData.originalValue).to.equal(payloadUser.originalValue);
      expect(retData.value).to.equal(payloadUser.value);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findByIdAndRemove history organization', async function () {
    try {
      const payloadOrg = {...setPayloadOrg(), ...setPayloadUpdateOrg()};
      const retData = await recruiter.history.findById(domain, lastIdOrg);
      expect(retData).to.not.be.empty;
      expect(retData._id.toString()).to.equal(lastIdOrg);
      expect(retData.type).to.equal(payloadOrg.type);
      expect(retData.field).to.equal(payloadOrg.field);
      expect(retData.fieldDescription).to.equal(payloadOrg.fieldDescription);
      expect(retData.originalValue).to.equal(payloadOrg.originalValue);
      expect(retData.value).to.equal(payloadOrg.value);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findByIdAndRemove history job', async function () {
    try {
      const payloadJob = {...setPayloadJob(), ...setPayloadUpdateJob()};
      const retData = await recruiter.history.findByIdAndRemove(domain, lastIdJob);
      expect(retData).to.not.be.empty;
      expect(retData._id.toString()).to.equal(lastIdJob);
      expect(retData.type).to.equal(payloadJob.type);
      expect(retData.field).to.equal(payloadJob.field);
      expect(retData.fieldDescription).to.equal(payloadJob.fieldDescription);
      expect(retData.originalValue).to.equal(payloadJob.originalValue);
      expect(retData.value).to.equal(payloadJob.value);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('add 10 histories to user', async function () {
    try {
      const payloadToSend = setPayloadUser();

      for await (let i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
        const retData = await recruiter.history.add(process, payloadToSend);
        expect(retData).to.not.be.empty;
        expect(retData._id.toString().length).to.equal(24);
        expect(retData.type).to.equal(payloadToSend.type);
        expect(retData.field).to.equal(payloadToSend.field);
        expect(retData.fieldDescription).to.equal(payloadToSend.fieldDescription);
        expect(retData.originalValue).to.equal(payloadToSend.originalValue);
        expect(retData.value).to.equal(payloadToSend.value);
      }
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('add 10 histories to organization', async function () {
    try {
      const payloadToSend = setPayloadOrg();

      for await (let i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
        const retData = await recruiter.history.add(process, payloadToSend);
        expect(retData).to.not.be.empty;
        expect(retData._id.toString().length).to.equal(24);
        expect(retData.type).to.equal(payloadToSend.type);
        expect(retData.field).to.equal(payloadToSend.field);
        expect(retData.fieldDescription).to.equal(payloadToSend.fieldDescription);
        expect(retData.originalValue).to.equal(payloadToSend.originalValue);
        expect(retData.value).to.equal(payloadToSend.value);
      }
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('add 10 histories to job', async function () {
    try {
      const payloadToSend = setPayloadJob();

      for await (let i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
        const retData = await recruiter.history.add(process, payloadToSend);
        expect(retData).to.not.be.empty;
        expect(retData._id.toString().length).to.equal(24);
        expect(retData.type).to.equal(payloadToSend.type);
        expect(retData.field).to.equal(payloadToSend.field);
        expect(retData.fieldDescription).to.equal(payloadToSend.fieldDescription);
        expect(retData.originalValue).to.equal(payloadToSend.originalValue);
        expect(retData.value).to.equal(payloadToSend.value);
      }
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findByUserId', async function () {
    try {
      const retData = await recruiter.history.findByUserId(domain, userSMId);
      expect(retData).to.not.be.empty;
      expect(retData.total).to.equal(11);
      expect(retData.results.length).to.equal(11);
      expect(retData.offset).to.equal(1);
      expect(retData.limit).to.equal(20);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findByOrgId', async function () {
    try {
      const retData = await recruiter.history.findByOrgId(domain, orgId);
      expect(retData).to.not.be.empty;
      expect(retData.total).to.equal(11);
      expect(retData.results.length).to.equal(11);
      expect(retData.offset).to.equal(1);
      expect(retData.limit).to.equal(20);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findByJobId', async function () {
    try {
      const retData = await recruiter.history.findByJobId(domain, jobId);
      expect(retData).to.not.be.empty;
      expect(retData.total).to.equal(10);
      expect(retData.results.length).to.equal(10);
      expect(retData.offset).to.equal(1);
      expect(retData.limit).to.equal(20);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('deleteByUserId', async function () {
    try {
      const retData = await recruiter.history.deleteByUserId(domain, userSMId);
      expect(retData).to.not.be.empty;
      expect(retData.deletedCount).to.equal(11);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('deleteByOrgId', async function () {
    try {
      const retData = await recruiter.history.deleteByOrgId(domain, orgId);
      expect(retData).to.not.be.empty;
      expect(retData.deletedCount).to.equal(11);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('deleteByJobId', async function () {
    try {
      const retData = await recruiter.history.deleteByJobId(domain, jobId);
      expect(retData).to.not.be.empty;
      expect(retData.deletedCount).to.equal(10);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });
});
