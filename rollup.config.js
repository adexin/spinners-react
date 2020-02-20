import glob from 'glob';
import commonjs from 'rollup-plugin-commonjs';
import del from 'rollup-plugin-delete';
import copy from 'rollup-plugin-copy-glob';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-ts';
import path from 'path';
import { promisify } from 'util';

const globAsync = promisify(glob);
const terse = terser({ output: { comments: false } });
const shared = {
  plugins: [
    typescript(),
    commonjs(),
    resolve(),
    postcss({
      inject: true,
      minimize: true,
    }),
  ],
  external: [
    'react',
    'react-dom',
  ],
  output: {
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
};

export default (args) => globAsync(path.join('src', '*.tsx'))
  .then((files) => {
    const inputs = args.configProd
      ? files.reduce((acc, f) => ({
        ...acc,
        [path.basename(f, path.extname(f))]: f,
      }), { index: 'src/index.ts' })
      : [];

    return [
      ...Object.values(inputs).map((input) => ({
        input,
        output: [{
          dir: 'lib/css',
          format: 'es',
        }],
        external: shared.external,
        plugins: [
          typescript({ tsconfig: (resolvedConfig) => ({ ...resolvedConfig, declaration: false }) }),
          commonjs(),
          resolve(),
          postcss({ extract: true }),
        ],
      })),
      ...Object.values(inputs).map((input) => ({
        input,
        output: [{
          file: `lib/css/${path.basename(input, path.extname(input))}.min${path.extname(input)}`,
          format: 'es',
        }],
        external: shared.external,
        plugins: [
          typescript({ tsconfig: (resolvedConfig) => ({ ...resolvedConfig, declaration: false }) }),
          commonjs(),
          resolve(),
          postcss({
            extract: true,
            minimize: true,
          }),
          copy([{ files: 'lib/css/*.css', dest: 'lib' }]),
        ],
      })),
      {
        input: {
          index: 'src/index.ts',
          ...inputs,
        },
        ...shared,
        output: [{
          dir: 'lib/esm',
          format: 'es',
        }, {
          dir: 'lib/cjs',
          format: 'cjs',
        }],
      },
      ...Object.keys(inputs).map((name) => ({
        input: inputs[name],
        ...shared,
        output: {
          file: `lib/umd/${name}.js`,
          format: 'umd',
          name: 'SpinnersReact',
          esModule: false,
          globals: shared.output.globals,
        },
      })),
      ...Object.keys(inputs).map((name) => ({
        input: inputs[name],
        output: {
          file: `lib/umd/${name}.min.js`,
          format: 'umd',
          name: 'SpinnersReact',
          esModule: false,
          sourcemap: true,
          globals: shared.output.globals,
        },
        external: shared.external,
        plugins: [
          ...shared.plugins,
          terse,
          del({ targets: 'lib/css' }),
        ],
      })),
    ];
  });
