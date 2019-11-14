
# Small vinyl-stream wrapper -aka Gulp plugin- for nunjucks.

Run nunjucks within your streams.

TODO: Write a more detailed readme.

> *NOTE:* No tests have been written yet!

## Installation

`yarn install`. Or `npm install`. Or just copy the files to your own project.

## Usage

```
const nunjucksWrapper = require('@eklingen/vinyl-stream-nunjucks')
stream.pipe(nunjucksWrapper())
```

## Options

See the ["nunjucks"](https://www.npmjs.com/package/nunjucks) documentation.

## Dependencies

This package requires ["nunjucks"](https://www.npmjs.com/package/nunjucks) and ["deepmerge"](https://www.npmjs.com/package/deepmerge).

---

Copyright (c) 2019 Elco Klingen. MIT License.
