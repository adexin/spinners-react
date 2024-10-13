import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { glob } from 'glob';
import path from 'path';
import copy from 'rollup-plugin-copy-glob';
import del from 'rollup-plugin-delete';
import postcss from 'rollup-plugin-postcss';

const externals = ['react', 'react-dom'];
const outputGlobals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};
const getPlugins = (declarationDir, isMinified) => [
  typescript({
    declaration: true,
    declarationMap: true,
    ...(declarationDir ? { declarationDir } : {}),
    exclude: ['jest.config.ts', 'jest-config/*'],
  }),
  commonjs(),
  resolve(),
  postcss({ inject: true, minimize: true }),
  ...(isMinified
    ? [terser({ output: { comments: false } }), del({ targets: 'lib/css' })]
    : []),
];

export default (args) => glob(path.join('src', '*.tsx')).then((files) => {
  const inputs = args.configProd
    ? files.reduce(
      (acc, f) => ({
        ...acc,
        [path.basename(f, path.extname(f))]: f,
      }),
      { index: 'src/index.ts' },
    )
    : [];

  return [
    ...Object.values(inputs).map((input) => ({
      input,
      output: [
        {
          dir: 'lib/css',
          sourcemap: true,
          format: 'es',
        },
      ],
      external: externals,
      plugins: [
        typescript({ declaration: false }),
        commonjs(),
        resolve(),
        postcss({ extract: true }),
      ],
    })),
    ...Object.values(inputs).map((input) => ({
      input,
      output: [
        {
          file: `lib/css/${path.basename(
            input,
            path.extname(input),
          )}.min${path.extname(input)}`,
          sourcemap: true,
          format: 'es',
        },
      ],
      external: externals,
      plugins: [
        typescript({ declaration: false }),
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
      plugins: getPlugins('lib/esm'),
      external: externals,
      output: [
        {
          dir: 'lib/esm',
          sourcemap: true,
          format: 'es',
        },
      ],
    },
    {
      input: {
        index: 'src/index.ts',
        ...inputs,
      },
      plugins: getPlugins('lib/cjs'),
      external: externals,
      output: [
        {
          dir: 'lib/cjs',
          sourcemap: true,
          format: 'cjs',
        },
      ],
    },
    ...Object.keys(inputs).map((name) => ({
      input: inputs[name],
      plugins: getPlugins('lib/umd'),
      external: externals,
      output: {
        file: `lib/umd/${name}.js`,
        format: 'umd',
        name: 'SpinnersReact',
        esModule: false,
        sourcemap: true,
        globals: outputGlobals,
      },
    })),
    ...Object.keys(inputs).map((name) => ({
      input: inputs[name],
      plugins: getPlugins('lib/umd', true),
      external: externals,
      output: {
        file: `lib/umd/${name}.min.js`,
        format: 'umd',
        name: 'SpinnersReact',
        esModule: false,
        sourcemap: true,
        globals: outputGlobals,
      },
    })),
  ];
});
