import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import graphql from 'rollup-plugin-graphql'

let pkg = require('./package.json')
let external = Object.keys(pkg.dependencies)
let plugins = [
  graphql(),
  resolve(),
  babel(),
  commonjs(),
  terser({
    sourcemap: true
  })
]

export default [
  {
    input: 'src/index.js',
    plugins,
    external,
    output: [
      {
        file: 'dist/things-scene-form.js',
        name: 'things-scene-form',
        format: 'umd',
        globals: {
          '@hatiolab/things-scene': 'scene',
          'hls.js': 'Hls'
        }
      }
    ]
  },
  {
    input: 'src/index.js',
    plugins,
    external: ['@hatiolab/things-scene'], // hls.js는 빌드에 포함.
    output: [
      {
        file: pkg.module,
        format: 'esm'
      }
    ]
  }
]
