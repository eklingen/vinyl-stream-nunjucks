
# Small vinyl-stream wrapper -aka Gulp plugin- for nunjucks

Run nunjucks within your streams.

TODO:

- Write a more detailed readme
- Include some common used template tag functions

> *NOTE:* No tests have been written yet!

## Installation

`yarn install`. Or `npm install`. Or just copy the files to your own project.

## Usage

```javascript
const nunjucksWrapper = require('@eklingen/vinyl-stream-nunjucks')
stream.pipe(nunjucksWrapper())
```

## Options

Both the `nunjucks` option and the `envOptions` will be passe to `nunjucks`. See the ["nunjucks"](https://www.npmjs.com/package/nunjucks) documentation for more information.

### `nunjucks`

```javascript
nunjucksWrapper({
  nunjucks: {
    path: '.',
    ext: '.html',
    data: {},
    manageEnv: null,
    loaders: []
  }
})
```

### `envOptions`

```javascript
nunjucksWrapper({
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
    tags: null
  }
})
```

## Dependencies

This package requires ["nunjucks"](https://www.npmjs.com/package/nunjucks) and ["deepmerge"](https://www.npmjs.com/package/deepmerge).

---

Copyright (c) 2019 Elco Klingen. MIT License.
