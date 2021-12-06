import * as  rollup from 'rollup';

import nodePolyfills from 'rollup-plugin-node-polyfills';
import cleanup from 'rollup-plugin-cleanup';
import {uglify} from "rollup-plugin-uglify";

import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import {nodeResolve} from '@rollup/plugin-node-resolve';

import moment from 'moment';

/**
 * @description Class to bukld munti file type (CJS and MJS)
 */
class BuildRollup {

  /**
   * @description Alist to change modules to esm for use in frontend
   * @type {({find: string, replacement: string}|{find: string, replacement: string}|{find: string, replacement: string}|{find: string, replacement: string})[]}
   */
  #aliasList = [
    {
      find: 'lodash',
      replacement: 'lodash-es'
    },
    {
      find: 'moment',
      replacement: 'dayjs/esm'
    },
    {
      find: 'axios',
      replacement: 'axios-esm'
    },
    {
      find: 'joi',
      replacement: 'joi/dist/joi-browser.min.js'
    }
  ];

  /**
   * @description Not add in bundle bellow module, install external to use.
   * @type {string[]}
   */
  #externalPlugins = ['lodash', 'axios', '@hapi/boom', 'joi', 'moment'];

  /**
   * @description Mount list of plugin backend and frontend
   * @type {{mjs: (*)[], cjs: [*, *, *, *]}}
   */
  #pluginList = {
    cjs: [
      commonjs(),
      nodePolyfills(),
      json(),
      nodeResolve(),
    ],

    mjs: [
      alias({entries: this.#aliasList}),

      commonjs(),
      nodePolyfills(),
      json(),
      nodeResolve(),
      cleanup(),
      uglify()
    ]
  };

  /**
   * @description Mount configuration to build
   * @type {{mjs: {output: {file: string, format: string}, entry: {input: string, plugins: *[]}}, cjs: {output: {file: string, format: string}, entry: {input: string, external: [], plugins: (*)[]}}}}
   */
  #rollupConfig = {
    cjs: {
      entry: {
        input: './index.js',
        external: this.#externalPlugins,
        plugins: this.#pluginList.cjs,
      },
      output: {
        file: 'dist/bundle.cjs',
        format: 'cjs'
      }
    },

    mjs: {
      entry: {
        input: './index.js',
        plugins: this.#pluginList.mjs,
      },
      output: {
        file: 'dist/bundle.mjs',
        format: 'esm'
      }
    }
  }

  /**
   * @see https://rollupjs.org/guide/en/#rolluprollup
   * @description Build all types (CJS backend 'require' | MJS Frontend 'import')
   */
  async #rollupBuild(config) {
    const self = this;

    try {
      const bundle = await rollup.rollup(config.entry);
      self.log('Bundle generated');

      await bundle.write(config.output);
      self.log('Bundle writen');

      await bundle.close();
      self.log('Bundle finished\n');

    } catch (ex) {
      throw ex;
    }
  }

  /**
   * @description Log in terminal process
   * @param {string} text - text to log in terminal
   */
  log(text, type = 'log') {
    const dateNow = moment().format('DD/MM/YYYY HH:mm:ss');
    console[type](`${dateNow}\t ${text}`);
  }

  async init() {
    const self = this;

    try {
     self.log('Start process to bundle files');

     for await (const bundleType of Object.keys(self.#rollupConfig)) {
       self.log(`Start process to bundle type ${bundleType}`);

       const bundleConfig = self.#rollupConfig[bundleType];
       await self.#rollupBuild(bundleConfig);
     }

     self.log('Done! All to bundle generated with success');

    } catch (ex) {
      throw ex;
    }
  }
}

// ------------ //
// START BUNDLE //
// ------------ //

const buildRollup = new BuildRollup();
buildRollup.init();
