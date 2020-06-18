const _ = require('lodash');
const expect = require('chai').expect;
const API = require('../index');
const {basic} = require('./payload/payload_recruiter');

let recruiter;
let retData;

let _id = '5b7f31d5a78c94506f331909';
let setPayloadUser = () => ({_id, ...basic});

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

const isunique = {field: 'cpf', query: '008.506.229-48'};

describe('empregonet recruiter test', function () {
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
      await recruiter.user.findByIdAndRemove(process, _id);
    } catch (ex) {
    }
  });

  it('add', async function () {
    try {
      const payloadToSend = setPayloadUser();
      const retData = await recruiter.user.add(process, payloadToSend);

      expect(retData).to.not.be.empty;
      expect(retData._id.toString()).to.equal(payloadToSend._id);
      expect(retData.name).to.equal(payloadToSend.name);
      expect(retData.email).to.equal(payloadToSend.email);
      expect(retData.idcard).to.equal(payloadToSend.idcard);
      expect(retData.zipCode).to.equal(payloadToSend.zipCode);
      expect(retData.birthDate).to.equal(payloadToSend.birthDate);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('idcard is not unique', async function () {
    try {
      const payloadToSend = setPayloadUser();
      const retData = await recruiter.user.isunique(process, isunique);

      expect(retData).to.not.be.empty;
      expect(retData.exist).to.be.true;
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findByIdAndUpdate', async function () {
    try {
      const payloadToUpdate = {
        name: 'Emprego.net',
        zipCode: '8897-874',
        email: 'tdd@empregonet.com',
      };

      const retData = await recruiter.user.findByIdAndUpdate(domain, _id, payloadToUpdate);
      expect(retData).to.not.be.empty;
      expect(retData._id.toString()).to.equal(_id);
      expect(retData.name).to.equal(payloadToUpdate.name);
      expect(retData.zipCode).to.equal(payloadToUpdate.zipCode);
      expect(retData.email).to.equal(payloadToUpdate.email);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findById', async function () {
    try {
      const retData = await recruiter.user.findById(domain, _id);
      expect(retData).to.not.be.empty;
      expect(retData._id.toString()).to.equal(_id);
      expect(retData.name).to.equal(payloadToUpdate.name);
      expect(retData.zipCode).to.equal(payloadToUpdate.zipCode);
      expect(retData.email).to.equal(payloadToUpdate.email);
      expect(retData.idcard).to.equal(payloadToSend.idcard);
      expect(retData.birthDate).to.equal(payloadToSend.birthDate);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findByIdAndRemove', async function () {
    try {
      const retData = await recruiter.user.findByIdAndRemove(process, _id);
      expect(retData).to.not.be.empty;
      expect(retData._id.toString()).to.equal(_id);
      expect(retData.name).to.equal(payloadToUpdate.name);
      expect(retData.zipCode).to.equal(payloadToUpdate.zipCode);
      expect(retData.email).to.equal(payloadToUpdate.email);
      expect(retData.idcard).to.equal(payloadToSend.idcard);
      expect(retData.birthDate).to.equal(payloadToSend.birthDate);
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('idcard is unique', async function () {
    try {
      const payloadToSend = setPayloadUser();
      const retData = await recruiter.user.isunique(process, isunique);

      expect(retData).to.not.be.empty;
      expect(retData.exist).to.be.false;
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });

  it('findById', async function () {
      try {
          const retData = await recruiter.user.findById(domain, _id);
          expect(retData).to.be.empty;
      } catch (ex) {
          expect(ex.data).to.be.null;
          expect(ex.output.statusCode).to.equal(404);
      }
  });
});
