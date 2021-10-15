
const _ = require('lodash');
const CryptoJS = require('crypto-js');

class Cypher {

  constructor() {
    const self = this;
    self._registerKey = 'kduD^!r8sl5#Vb$OpsD4!xWY8z#QH#WWTc4mNpmzg*TnVnMCZ^';
  }

  get(info) {
    const self = this;
    try {
      const bytes = CryptoJS.AES.decrypt(info, self._registerKey);
      const bias = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(bias);
    } catch (ex) {
      return {};
    }
  }

  set(obj) {
    const self = this;
    let retData;
    try {
      const info = JSON.stringify(obj);
      retData = CryptoJS.AES.encrypt(info, self._registerKey).toString();
    } catch(ex) {
      retData = '';
    } finally {
      return retData;
    }
  }
}

const cypher = new Cypher();
module.exports = cypher;
