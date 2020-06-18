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
     * @description Add an recruiter
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
            funcName: `${self.parent.options.callPrefix}.user.add`,
            params: { userData: data },
            cb,
            debug: self.parent.options.debug
        };
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'post',
                url: `${self.parent.options.uri}/user`,
                data,
                headers: self.parent.header
            };
            return self._returnData(await Axios(options));
        });
    }

    /**
     * @description Remove an recruiter
     * @param {object} context Process (SM) or Domain (MS)
     * @param {string} id of the user
     * @param {function} cb Callback function
     * @async
     */
    async findByIdAndRemove(context = null, id, cb = null) {
        const self = this;
        let promiseOptions = {
            context,
            funcName: `${self.parent.options.callPrefix}.user.findByIdAndRemove`,
            params: { id },
            cb,
            debug: self.parent.options.debug
        };
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'delete',
                url: `${self.parent.options.uri}/user/${id}`,
                headers: self.parent.header
            };
            return self._returnData(await Axios(options), {});
        });
    }

    /**
     * @description Updates an recruiter
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
            funcName: `${self.parent.options.callPrefix}.user.findByIdAndUpdate`,
            params: { id, userData },
            cb,
            debug: self.parent.options.debug
        };
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'put',
                url: `${self.parent.options.uri}/user/${id}`,
                data: userData,
                headers: self.parent.header
            };
            return await self._returnData(await Axios(options));
        });
    }

    /**
     * @description Finds an recruiter by its id
     * @param {object} context Process (SM) or Domain (MS)
     * @param {string} id of the user
     * @param {function} cb Callback function
     * @async
     */
    async findById(context = null, id, cb = null) {
        const self = this;
        const promiseOptions = {
            context,
            funcName: `${self.parent.options.callPrefix}.user.findById`,
            params: { id },
            cb,
            debug: self.parent.options.debug
        };
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'get',
                url: `${self.parent.options.uri}/user/${id}`,
                json: true,
                headers: self.parent.header
            };
            return await self._returnData(await Axios(options));
        });
    }

    /**
     * @description Finds an recruiter by its id
     * @param {object} context Process (SM) or Domain (MS)
     * @param {object} params Data for search is unique
     * @param {string} params.field field for search is unique
     * @param {string} params.query query for search is unique
     * @param {function} cb Callback function
     * @async
     */
    async isunique(context = null, params = {}, cb = null) {

        Joi.assert(params, Joi.object().required());
        Joi.assert(params.field, Joi.string().required());
        Joi.assert(params.query, Joi.string().required());

        const self = this;
        const promiseOptions = {
            context,
            funcName: `${self.parent.options.callPrefix}.user.isunique`,
            params,
            cb,
            debug: self.parent.options.debug
        };
        const { field, query } = params;
        return await ThePromise.exec(promiseOptions, async () => {
            const options = {
                method: 'get',
                url: `${self.parent.options.uri}/isunique/${field}?query=${query}`,
                json: true,
                headers: self.parent.header
            };
            try {
                return await self._returnData(await Axios(options));
            } catch (err) {
                const oi = 123;
            }
        });
    }
}

module.exports = Recruiter;
