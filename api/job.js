const _ = require('lodash');
const Boom = require('@hapi/boom');
const ThePromise = require('./utils/promises');
const Joi = require('@hapi/joi');
const Axios = require('axios');

/**
 * Class for the recruiters MS
 * @class
 */
class Job {
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
     * @description Add an job
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
            funcName: `${self.parent.options.callPrefix}.job.add`,
            params: { userData: data },
            cb,
            debug: self.parent.options.debug
        };
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'post',
                url: `${self.parent.options.uri}/job`,
                data,
                headers: self.parent.header
            };
            return self._returnData(await Axios(options));
        });
    }

    /**
     * @description Remove an job
     * @param {object} context Process (SM) or Domain (MS)
     * @param {string} id of the user
     * @param {function} cb Callback function
     * @async
     */
    async findByIdAndRemove(context = null, id, cb = null) {
        const self = this;
        let promiseOptions = {
            context,
            funcName: `${self.parent.options.callPrefix}.job.findByIdAndRemove`,
            params: { id },
            cb,
            debug: self.parent.options.debug
        };
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'delete',
                url: `${self.parent.options.uri}/job/${id}`,
                headers: self.parent.header
            };
            return self._returnData(await Axios(options), {});
        });
    }

    /**
     * @description Updates an job
     * @param {object} context Process (SM) or Domain (MS)
     * @param {string} id of the user
     * @param {object} userData of the user
     * @param {function} cb Callback function
     * @async
     */
    async findByIdAndUpdate(context = null, id, userData, cb = null) {
        const self = this;
        const promiseOptions = {
            context,
            funcName: `${self.parent.options.callPrefix}.job.findByIdAndUpdate`,
            params: { id, userData },
            cb,
            debug: self.parent.options.debug
        };
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'put',
                url: `${self.parent.options.uri}/job/${id}`,
                data: userData,
                headers: self.parent.header
            };
            return await self._returnData(await Axios(options));
        });
    }

    /**
     * @description Finds an job by its user id
     * @param {object} context Process (SM) or Domain (MS)
     * @param {string} id of the user
     * @param {function} cb Callback function
     * @async
     */
    async findById(context = null, id, cb = null) {
        const self = this;
        const promiseOptions = {
            context,
            funcName: `${self.parent.options.callPrefix}.job.findById`,
            params: { id },
            cb,
            debug: self.parent.options.debug
        };
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'get',
                url: `${self.parent.options.uri}/job/${id}`,
                json: true,
                headers: self.parent.header
            };
            return await self._returnData(await Axios(options));
        });
    }

    /**
     * @description Finds an job by its org id
     * @param {object} context Process (SM) or Domain (MS)
     * @param {string} id of the user
     * @param {function} cb Callback function
     * @async
     */
    async findByOrgId(context = null, id, cb = null) {
        const self = this;
        const promiseOptions = {
            context,
            funcName: `${self.parent.options.callPrefix}.job.findById`,
            params: { id },
            cb,
            debug: self.parent.options.debug
        };
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'get',
                url: `${self.parent.options.uri}/jobs/organization/${id}`,
                json: true,
                headers: self.parent.header
            };
            return await self._returnData(await Axios(options));
        });
    }

    /**
     * @description Remove an jobs by orgId
     * @param {object} context Process (SM) or Domain (MS)
     * @param {string} id of the user
     * @param {function} cb Callback function
     * @async
     */
    async deleteByOrgId(context = null, id, cb = null) {
        const self = this;
        let promiseOptions = {
            context,
            funcName: `${self.parent.options.callPrefix}.job.deleteByOrgId`,
            params: { id },
            cb,
            debug: self.parent.options.debug
        };
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'delete',
                url: `${self.parent.options.uri}/jobs/organization/${id}`,
                headers: self.parent.header
            };
            return self._returnData(await Axios(options), {});
        });
    }
}

module.exports = Job;
