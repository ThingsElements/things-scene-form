import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import graphql from 'rollup-plugin-graphql'

import path from 'path'

let pkg = require('./package.json')
let externalID = path.resolve(__dirname, '@hatiolab/things-scene')
// let external = [externalID] // Object.keys(pkg.dependencies)
let external = ['@hatiolab/things-scene'] // Object.keys(pkg.dependencies)
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
    external: Object.keys(pkg.dependencies),
    output: [
      {
        file: pkg.main,
        name: 'things-scene-form',
        format: 'umd',
        globals: {
          '@hatiolab/things-scene': 'scene'
        }
      }
    ]
  },
  {
    input: 'src/index.js',
    plugins,
    external,
    output: [
      {
        file: pkg.module,
        format: 'esm'
      }
    ]
  }
]
