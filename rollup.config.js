import cleanup from 'rollup-plugin-cleanup';
import { uglify } from "rollup-plugin-uglify";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import autoExternal from 'rollup-plugin-auto-external';

export default {
  input: './index.js',
  output: [
    {
      file: 'dist/bundle.cjs',
      format: 'cjs'
    },
    {
      file: 'dist/bundle.mjs',
      format: 'esm'
    }
  ],
  plugins: [
    autoExternal(),
    nodeResolve(),
    // cleanup(),
    // uglify()
  ]
}