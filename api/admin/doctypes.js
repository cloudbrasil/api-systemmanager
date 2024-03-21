import _ from 'lodash';
import Boom from '@hapi/boom';
import Joi from 'joi';

class AdminDocTypes {
    constructor(options) {
        Joi.assert(options, Joi.object().required());
        Joi.assert(options.parent, Joi.object().required());

        const self = this;
        self.parent = options.parent;
        self._client = self.parent.dispatch.getClient();
    }

    /**
     * @author Myndware <augusto.pissarra@myndware.com>
     * @description Get the return data and check for errors
     * @param {object} retData Response HTTP
     * @return {*}
     * @private
     */
    _returnData(retData, def = {}) {
        if (retData.status !== 200) {
            return Boom.badRequest(_.get(retData, 'message', 'No error message reported!'))
        } else {
            return _.get(retData, 'data', def);
        }
    }

    /**
     * @author Myndware <augusto.pissarra@myndware.com>
     * @description Set header with new session
     * @param {string} session Session, token JWT
     * @return {object} header with new session
     * @private
     */
    _setHeader(session) {
        return {
            headers: {
                authorization: session,
            }
        };
    }

    /**
     * @author Myndware <augusto.pissarra@myndware.com>
     * @description Request profile by userId
     * @param {object} params The params
     * @param {string} params.id The organization document type id (_id database)
     * @param {string} params.orgId The organization id (_id database)
     * @param {string} session The JWT token
     * @return {Promise<object>} The document
     * @public
     * @async
     * @example
     *
     * const API = require('@docbrasil/api-systemmanager');
     * const api = new API();
     * const id = '55e4a3bd6be6b45210833fae';
     * const session = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
     * const retDocType = await api.admin.doctypes.findById(id, session);
     */
    async findById(params, session) {
        const self = this;
        Joi.assert(params, Joi.object().required());
        Joi.assert(params.id, Joi.string().required());
        Joi.assert(params.orgId, Joi.string().required());
        Joi.assert(session, Joi.string().required());

        const {id, orgId} = params;
        const apiCall = self._client.get(`/admin/organizations/${orgId}/orgdoctypes/${id}`, self._setHeader(session));
        return self._returnData(await apiCall);
    }
}

export default AdminDocTypes;
