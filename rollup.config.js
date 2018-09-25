import fs from 'fs'
import path from 'path'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'

const formats = ['es', 'umd']

function getEntries() {
  const reg = /\.js$/
  return fs.readdirSync(path.resolve(__dirname, './src'))
    .filter(filename => reg.test(filename) && !fs.statSync(path.resolve(__dirname, './src', filename)).isDirectory())
    .map(filename => ({
      name: filename.replace(reg, ''),
      filename: path.resolve(__dirname, './src', filename),
      formats: formats.filter(f => f !== 'es'),
    }))
}

const conf = entry => ({
  input: entry.filename,
  output: entry.formats.map(format => ({
    file: `./lib/${format}/${entry.name}.js`,
    format,
    name: entry.name === 'index' ? 'Storage' : entry.name,
  })),
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelrc: false,
      runtimeHelpers: true,
      externalHelpers: false,
      presets: [
        ['env', { modules: false }],
        'stage-2',
      ],
      plugins: [
        'external-helpers',
      ],
    }),
    (entry.needUglify !== false && uglify()),
  ],
})

export default [
  { name: 'index', filename: './src/index.js', formats: ['es'], needUglify: false },
  ...getEntries(),
].map(conf)
