const _ = require('lodash');
const Boom = require('@hapi/boom');

class ThePromise {

  /**
   * @description Logger call api professional
   * @param {object} context Process or Domain
   * @param {string} message Message to log
   * @param {object} data Object to show log
   * @private
   */
  _logger({context = null, message, data}) {
    try {

      if (context) {
        data = _.isObject(data) ? data : {data};

        const logSystemMager = _.hasIn(context, 'logger')
          && _.isFunction(context.logger)
          && _.hasIn(context.logger(), 'trace')
          && _.isFunction(context.logger().trace);

        const logMicroservices = _.hasIn(context, 'log')
          && _.isFunction(context.log)
          && _.hasIn(context.log(), 'info')
          && _.isFunction(context.log().info);

        if (logSystemMager) {
          context.logger().trace(message, data);
        } else if (logMicroservices) {
          context.log().info(message, data);
        }
      }
    } catch (ex) {
      const message = _.hasIn(ex, 'message') ? ex.message : `Fail logger action: ${message}`;
      throw new Error(message);
    }
  }

  /**
   * @description Clean process, when call API in process
   * @param {object} params
   * @private
   */
  _cleanParams(params) {
    if (_.hasIn(params, 'process')) {
      delete params.process;
    }
  }

  /**
   * @description Calls to execute a promise or a callback, so we can support promises and callbacks at the same time
   *  NOTE: This promise is focused on the process area.
   * @param {object} options
   *  - process || domain (optional): if you want to log into the process || Domain
   *  - funcName (optional): the name of the function you are calling
   *  - params (optional): parameters to log
   *  - cb (optional): the callback, if we have one
   *  - debug: Show or hide debug
   * @param func: the function to call to execute
   * @return {*}
   */
  exec(options, func) {
    const self = this;

    return new Promise(async (resolve, reject) => {
      const {debug, cb, context, funcName, params} = options || {};
      const {success: debugForSuccess, error: debugForError} = debug;

      let err;
      let retData;

      // Ensure we remove it, since we do not have it. It can cause circular referenfe on JSON stringify.
      self._cleanParams(params);

      try {
        if (debugForSuccess) {
          self._logger({context, message: `START: ${funcName} executed successfully`, data: params});
        }
        retData = await func();
      } catch (ex) {
        err = ex;

      } finally {

        if (retData === null) {
          err = Boom.notFound(`ERROR: ${funcName} cannot find item`);
          if (debugForError) {
            self._logger({context, message: `ERROR: ${funcName} cannot find item`, data: params});
          }
        }
        if (_.isFunction(cb)) {

          if (debugForError) {
            self._logger({context, message: `ERROR: ${funcName}`, data: params});
          }
          cb(err, retData);
        }
        if (err) {
          if (debugForError) {
            self._logger({context, message: `ERROR: ${funcName}`, data: params});
          }
          reject(err);
        } else {
          if (debugForSuccess) {
            self._logger({context, message: `END: ${funcName} executed successfully`, data: {params, retData}});
          }
          resolve(retData);
        }
      }
    });
  }
}

const thePromise = new ThePromise();

module.exports = thePromise;
