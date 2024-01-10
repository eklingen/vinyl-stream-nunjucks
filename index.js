// Small vinyl-stream wrapper -aka Gulp plugin- for nunjucks.
//
// TODO:
// - BUG: The filepath is wrong in error stack straces (it gives either unknown or the original entrypoint). Not sure how to fix this. Both .renderString() and .render() have the same bug.
// - BUG: On error the onComplete callback is called multiple times.
// - Remove dependency on deepmerge
// - Fix Nunjucks losing file path when macro errors out.

const { resolve } = require('path')
const { Transform } = require('stream')

const DEFAULT_OPTIONS = {
  nunjucks: {
    path: '.',
    ext: '.html',
    data: {},
    manageEnv: null,
    loaders: [],
  },
  envOptions: {
    autoescape: false,
    throwOnUndefined: true,
    trimBlocks: false,
    lstripBlocks: false,
    watch: false,
    noCache: false,
    useCache: true,
    async: false,
    express: null,
    tags: null,
  },
}

function nunjucksWrapper(options = {}) {
  const merge = require('deepmerge')
  const nunjucks = require('nunjucks')

  let compiler

  options = { ...DEFAULT_OPTIONS, ...options }
  options.nunjucks = { ...DEFAULT_OPTIONS.nunjucks, ...options.nunjucks }
  options.envOptions = { ...DEFAULT_OPTIONS.envOptions, ...options.envOptions }

  nunjucks.configure(options.envOptions)

  if (!options.nunjucks.loaders || !options.nunjucks.loaders.length) {
    options.nunjucks.loaders = [new nunjucks.FileSystemLoader(options.nunjucks.path)]
  }

  function onComplete(error, result, file, callback) {
    if (error) {
      console.error(error.toString())
      return callback(new Error(error, { fileName: file.path }))
    }

    file.contents = Buffer.from(result)

    return callback(null, file)
  }

  function transform(file, encoding, callback) {
    if (!compiler) {
      compiler = new nunjucks.Environment(options.nunjucks.loaders, options.envOptions)

      if (options.nunjucks.manageEnv) {
        options.nunjucks.manageEnv.call(null, compiler)
      }
    }

    // TODO: The filepath is wrong in error stack straces (it gives either unknown or the original entrypoint). Not sure how to fix this. Both .renderString() and .render() have the same bug.
    // TODO: On error the onComplete callback is called multiple times
    compiler.renderString(file.contents.toString(), merge(file.data || {}, options.nunjucks.data), { path: resolve(file.path) }, (error, result) => onComplete(error, result, file, callback))
    // compiler.render(file.path, merge(file.data || {}, options.nunjucks.data), (error, result) => onComplete(error, result, file))
  }

  return new Transform({ transform, readableObjectMode: true, writableObjectMode: true })
}

module.exports = nunjucksWrapper
