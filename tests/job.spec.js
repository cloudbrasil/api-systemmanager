const _ = require('lodash');
const expect = require('chai').expect;
const API = require('../index');
const {professional} = require('./payload/payload_job');

let _id;
let retData;

let userSMId = '5b7f31d5a78c94506f331909';
let orgId = '6a7f31d5a78c94506f331910';
let setPayloadProfessional = () => ({userSMId, orgId, ...professional});

const payloadToUpdate = {
  companyName: 'Emprego.net',
  jobName: 'Job TDD',
  status: 'job:approved',
};

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

describe('empregonet job test', function () {
  before(async function () {
    // runs before all tests in this block
    try {
      recruiter = new API();
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findByIdAndRemove First', async function () {
    try {
      await recruiter.job.findByIdAndRemove(process, _id);
    } catch (ex) {
    }
  });

  it('add', async function () {
    try {
      const payloadToSend = setPayloadProfessional();
      const retData = await recruiter.job.add(process, payloadToSend);

      expect(retData).to.not.be.empty;
      expect(retData._id.toString().length).to.equal(24);
      expect(retData.name).to.equal(payloadToSend.name);
      expect(retData.email).to.equal(payloadToSend.email);
      expect(retData.idcard).to.equal(payloadToSend.idcard);
      expect(retData.zipCode).to.equal(payloadToSend.zipCode);
      expect(retData.birthDate).to.equal(payloadToSend.birthDate);

      _id = retData._id.toString();
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findByIdAndUpdate', async function () {
    try {
      const retData = await recruiter.job.findByIdAndUpdate(domain, _id, payloadToUpdate);
      expect(retData).to.not.be.empty;
      expect(retData._id.toString()).to.equal(_id);
      expect(retData.companyName).to.equal(payloadToUpdate.companyName);
      expect(retData.jobName).to.equal(payloadToUpdate.jobName);
      expect(retData.status).to.equal(payloadToUpdate.status);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findById', async function () {
    try {
      const retData = await recruiter.job.findById(domain, _id);
      expect(retData).to.not.be.empty;
      expect(retData.results[0]._id.toString()).to.equal(_id);
      expect(retData.results[0].companyName).to.equal(payloadToUpdate.companyName);
      expect(retData.results[0].status).to.equal(payloadToUpdate.status);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findByIdAndRemove', async function () {
    try {
      const retData = await recruiter.job.findByIdAndRemove(process, _id);
      expect(retData).to.not.be.empty;
      expect(retData._id.toString()).to.equal(_id);
      expect(retData.companyName).to.equal(payloadToUpdate.companyName);
      expect(retData.status).to.equal(payloadToUpdate.status);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findById', async function () {
    try {
      const retData = await recruiter.job.findById(domain, _id);
      expect(retData).to.be.empty;
    } catch (ex) {
      expect(ex.response.data).to.not.be.empty;
      expect(ex.response.data.statusCode).to.equal(404);
    }
  });

  it('add 10 jobs', async function () {
    try {
      const payloadToSend = setPayloadProfessional();

      for await (let i of [1,2,3,4,5,6,7,8,9,10]) {
        const retData = await recruiter.job.add(process, payloadToSend);

        expect(retData).to.not.be.empty;
        expect(retData._id.toString().length).to.equal(24);
        expect(retData.name).to.equal(payloadToSend.name);
        expect(retData.email).to.equal(payloadToSend.email);
        expect(retData.idcard).to.equal(payloadToSend.idcard);
        expect(retData.zipCode).to.equal(payloadToSend.zipCode);
        expect(retData.birthDate).to.equal(payloadToSend.birthDate);

        _id = retData._id.toString();
      }
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Request jobs by orgId', async function () {
    try {
      const retData = await recruiter.job.findByOrgId(process, orgId);
      expect(retData).to.not.be.empty;
      expect(retData.total).to.equal(10);
      expect(retData.results.length).to.equal(10);
      expect(retData.offset).to.equal(1);
      expect(retData.limit).to.equal(20);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('Delete jobs by orgId', async function () {
    try {
      const retData = await recruiter.job.deleteByOrgId(process, orgId);
      expect(retData).to.not.be.empty;
      expect(retData.deletedCount).to.equal(10);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });
});
