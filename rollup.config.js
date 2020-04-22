import { eslint } from 'rollup-plugin-eslint';
import path from 'path';
import ts from 'rollup-plugin-typescript2';

import codeframe from 'eslint/lib/cli-engine/formatters/codeframe';

const resolve = (p) => path.resolve(__dirname, p);
export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'umd',
      name: 'reduxModel',
      exports: 'named',
      globals: {
        redux: 'Redux',
        'redux-logger': 'reduxLogger',
      },
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      exports: 'named',
    },
    {
      file: 'dist/index.es.js',
      exports: 'named',
      format: 'esm',
    },
  ],
  cache: true,
  external: ['redux', 'redux-logger'],
  plugins: [
    eslint({
      cache: true,
      fix: true,
      include: [path.join(__dirname, '/src/')],
      formatter: codeframe,
    }),
    ts({
      check: true,
      tsconfig: resolve('tsconfig.json'),
      cacheRoot: resolve('node_modules/.rts2_cache'),
    }),
  ],
};
