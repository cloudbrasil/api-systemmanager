const _ = require('lodash');
const expect = require('chai').expect;

const API = require('../index');
const login = require('./payload/payload_login');

let sm;
let retData;
let setPayloadLogin = () => ({...login});

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

describe('Start API system manager', function () {
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
      const login = await sm.access.loginSU();
      const logout = await sm.access.logoutSU();

      const stop = 0;
    } catch (ex) {
      expect(ex).to.be.empty;
    }
  });
});
