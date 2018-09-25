# @livelybone/localStorage
[![NPM Version](http://img.shields.io/npm/v/@livelybone/localStorage.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/localStorage)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/localStorage.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/localStorage)
![gzip with dependencies: 1kb](https://img.shields.io/badge/gzip--with--dependencies-1kb-brightgreen.svg "gzip with dependencies: 1kb")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

A module for localStorage, when it is not supported by browser, it will be degrading to use Cookie or Map

> You may need a polyfill for Map like babel-polyfill if you use it in `ie` browser

## repository
https://github.com/livelybone/localStorage.git

## Demo
http://livelybone.github.io/@livelybone/localStorage/

## Installation
```bash
npm i -S @livelybone/localStorage
```

## Global name
`Storage`

## Usage
```js
import * as Storage from '@livelybone/localStorage';
```

when you want to set this module as external while you are developing another module, you should import it like this:
```js
import * as Storage from '@livelybone/localStorage'

// then use it by need
```

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/@livelybone/localStorage/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/@livelybone/localStorage/lib/umd/<--module-->.js"></script>
```
