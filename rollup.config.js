import typescript from 'rollup-plugin-typescript2';
import sourceMaps from 'rollup-plugin-sourcemaps';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import clear from 'rollup-plugin-clear';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import json from 'rollup-plugin-json';
import pkg from './package.json';
import cleanup from 'rollup-plugin-cleanup';

let defaults = { compilerOptions: { declaration: true } };

const currentTime = () => {
  const now = new Date();
  const year = now.getFullYear(); //年
  const month = now.getMonth() + 1; //月
  const day = now.getDate(); //日
  const hh = now.getHours(); //时
  const mm = now.getMinutes(); //分
  let clock = year + '-';

  if (month < 10) clock += '0';
  clock += month + '-';

  if (day < 10) clock += '0';
  clock += day + ' ';

  if (hh < 10) clock += '0';
  clock += hh + ':';

  if (mm < 10) clock += '0';
  clock += mm;

  return clock;
};

export default {
  input: './src/index.ts',
  plugins: [
    // 解析node环境，配置axios使用browswer环境
    resolve({ jsnext: true, preferBuiltins: true, browser: true }),
    replace({ _BUILDVERSION_: pkg.version + ' - build on ' + currentTime() }),
    clear({ targets: ['lib'] }),
    typescript({
      exclude: 'node_modules/**',
      tsconfigDefaults: defaults
    }),
    babel({
      exclude: [/\/core-js\//, 'src/test/*', 'demo/**/*', 'node_modules/**'],
      runtimeHelpers: true,
      sourceMap: false,
      extensions: ['.ts', '.jsx', 'js']
    }),
    commonjs(),
    json({
      compact: true
    }),
    terser(),
    sourceMaps(),
    cleanup({ comments: 'none' })
  ],
  output: [
    {
      format: 'cjs',
      file: 'lib/index.cjs.js',
      sourcemap: false
    },
    {
      format: 'es',
      file: 'lib/index.js',
      sourcemap: false
    }
  ]
};
