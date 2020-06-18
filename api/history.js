const _ = require('lodash');
const Boom = require('@hapi/boom');
const ThePromise = require('./utils/promises');
const Joi = require('@hapi/joi');
const Axios = require('axios');

/**
 * Class for the recruiters MS
 * @class
 */
class Recruiter {
    constructor(options) {
        Joi.assert(options, Joi.object().required());
        Joi.assert(options.parent, Joi.object().required());

        const self = this;
        self.parent = options.parent;
    }

    /**
     * @description Get the return data and check for errors
     * @param {object} retData Response HTTP
     * @return {*}
     * @private
     */
    _returnData(retData, def) {
        if(retData.status !== 200) {
            throw Boom.badRequest(_.get(retData, 'message', 'No error message reported!'))
        } else {
            return _.get(retData, 'data.data', def);
        }
    }

    /**
     * @description Add an history
     * @param {object} context Context running System management "process", Microservices "domain"
     * @param {object} data Payload to add
     * @param {function} cb Callback function
     * @return {promise}
     * @async
     */
    async add(context = null, data, cb = null) {
        const self = this;
        const promiseOptions = {
            context,
            funcName: `${self.parent.options.callPrefix}.history.add`,
            params: { userData: data },
            cb,
            debug: self.parent.options.debug
        };
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'post',
                url: `${self.parent.options.uri}/history`,
                data,
                headers: self.parent.header
            };
            return self._returnData(await Axios(options));
        });
    }

    /**
     * @description Remove an history
     * @param {object} context Process (SM) or Domain (MS)
     * @param {string} id of the history
     * @param {function} cb Callback function
     * @async
     */
    async findByIdAndRemove(context = null, id, cb = null) {
        const self = this;
        let promiseOptions = {
            context,
            funcName: `${self.parent.options.callPrefix}.history.findByIdAndRemove`,
            params: { id },
            cb,
            debug: self.parent.options.debug
        };
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'delete',
                url: `${self.parent.options.uri}/history/${id}`,
                headers: self.parent.header
            };
            return self._returnData(await Axios(options), {});
        });
    }

    /**
     * @description Updates an history
     * @param {object} context Process (SM) or Domain (MS)
     * @param {string} id of the history
     * @param {object} userData of the history
     * @param {function} cb Callback function
     * @async
     */
    async findByIdAndUpdate(context = null, id, userData, cb = null) {
        const self = this;
        const promiseOptions = {
            context,
            funcName: `${self.parent.options.callPrefix}.history.findByIdAndUpdate`,
            params: { id, userData },
            cb,
            debug: self.parent.options.debug
        };
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'put',
                url: `${self.parent.options.uri}/history/${id}`,
                data: userData,
                headers: self.parent.header
            };
            return await self._returnData(await Axios(options));
        });
    }

    /**
     * @description Finds an history by its history id
     * @param {object} context Process (SM) or Domain (MS)
     * @param {string} id of the history
     * @param {function} cb Callback function
     * @async
     */
    async findById(context = null, id, cb = null) {
        const self = this;
        const promiseOptions = {
            context,
            funcName: `${self.parent.options.callPrefix}.history.findById`,
            params: { id },
            cb,
            debug: self.parent.options.debug
        };
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'get',
                url: `${self.parent.options.uri}/history/${id}`,
                json: true,
                headers: self.parent.header
            };
            return await self._returnData(await Axios(options));
        });
    }

    /**
     * @description Finds an history by its user id
     * @param {object} context Process (SM) or Domain (MS)
     * @param {string} id of the user
     * @param {function} cb Callback function
     * @async
     */
    async findByUserId(context = null, id, cb = null) {
        const self = this;
        const promiseOptions = {
            context,
            funcName: `${self.parent.options.callPrefix}.history.findByUserId`,
            params: { id },
            cb,
            debug: self.parent.options.debug
        };
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'get',
                url: `${self.parent.options.uri}/histories/recruiter/${id}`,
                json: true,
                headers: self.parent.header
            };
            return await self._returnData(await Axios(options));
        });
    }

    /**
     * @description Finds an history by its organization id
     * @param {object} context Process (SM) or Domain (MS)
     * @param {string} id of the organization
     * @param {function} cb Callback function
     * @async
     */
    async findByOrgId(context = null, id, cb = null) {
        const self = this;
        const promiseOptions = {
            context,
            funcName: `${self.parent.options.callPrefix}.history.findByOrgId`,
            params: { id },
            cb,
            debug: self.parent.options.debug
        };
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'get',
                url: `${self.parent.options.uri}/histories/organization/${id}`,
                json: true,
                headers: self.parent.header
            };
            return await self._returnData(await Axios(options));
        });
    }

    /**
     * @description Finds an history by its organization id
     * @param {object} context Process (SM) or Domain (MS)
     * @param {string} id of the organization
     * @param {function} cb Callback function
     * @async
     */
    async findByJobId(context = null, id, cb = null) {
        const self = this;
        const promiseOptions = {
            context,
            funcName: `${self.parent.options.callPrefix}.history.findByJobId`,
            params: { id },
            cb,
            debug: self.parent.options.debug
        };
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'get',
                url: `${self.parent.options.uri}/histories/job/${id}`,
                json: true,
                headers: self.parent.header
            };
            return await self._returnData(await Axios(options));
        });
    }

    /**
     * @description Delete an history by its user id
     * @param {object} context Process (SM) or Domain (MS)
     * @param {string} id of the user
     * @param {function} cb Callback function
     * @async
     */
    async deleteByUserId(context = null, id, cb = null) {
        const self = this;
        const promiseOptions = {
            context,
            funcName: `${self.parent.options.callPrefix}.history.deleteByUserId`,
            params: { id },
            cb,
            debug: self.parent.options.debug
        };
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'delete',
                url: `${self.parent.options.uri}/histories/recruiter/${id}`,
                json: true,
                headers: self.parent.header
            };
            return await self._returnData(await Axios(options));
        });
    }

    /**
     * @description Delete an history by its organization id
     * @param {object} context Process (SM) or Domain (MS)
     * @param {string} id of the organization
     * @param {function} cb Callback function
     * @async
     */
    async deleteByOrgId(context = null, id, cb = null) {
        const self = this;
        const promiseOptions = {
            context,
            funcName: `${self.parent.options.callPrefix}.history.deleteByOrgId`,
            params: { id },
            cb,
            debug: self.parent.options.debug
        };
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'delete',
                url: `${self.parent.options.uri}/histories/organization/${id}`,
                json: true,
                headers: self.parent.header
            };
            return await self._returnData(await Axios(options));
        });
    }

    /**
     * @description Delete an history by its job id
     * @param {object} context Process (SM) or Domain (MS)
     * @param {string} id of the job
     * @param {function} cb Callback function
     * @async
     */
    async deleteByJobId(context = null, id, cb = null) {
        const self = this;
        const promiseOptions = {
            context,
            funcName: `${self.parent.options.callPrefix}.history.deleteByJobId`,
            params: { id },
            cb,
            debug: self.parent.options.debug
        };
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'delete',
                url: `${self.parent.options.uri}/histories/job/${id}`,
                json: true,
                headers: self.parent.header
            };
            return await self._returnData(await Axios(options));
        });
    }
}

module.exports = Recruiter;
