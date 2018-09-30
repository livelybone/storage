# @livelybone/storage
[![NPM Version](http://img.shields.io/npm/v/@livelybone/storage.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/storage)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/storage.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/storage)
![gzip with dependencies: 1kb](https://img.shields.io/badge/gzip--with--dependencies-1kb-brightgreen.svg "gzip with dependencies: 1kb")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

A module for localStorage, when it is not supported by browser, it will be degrading to use Cookie or Map

> You may need a polyfill for Map like babel-polyfill if you use it in `ie` browser

## repository
https://github.com/livelybone/localStorage.git

## Demo
http://livelybone.github.io/@livelybone/storage/

## Installation
```bash
npm i -S @livelybone/storage
```

## Global name
`Storage`

## Usage
```js
/**
 * @import Cookie, a purely wrapper of Cookie
 * @import Storage, a wrapper of HTML5 localStorage dealt with Cookie or Map (Map default)
 * @import LocalStorage, a purely wrapper of  HTML5 localStorage
 * */
import {Cookie, Storage, LocalStorage} from '@livelybone/storage';
```

when you want to set this module as external while you are developing another module, you should import it like this:
```js
import * as Storage from '@livelybone/storage'

// then use it by need
```

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/@livelybone/storage/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/@livelybone/storage/lib/umd/<--module-->.js"></script>
```

## Methods
> `get` `(key)=>[Number, String, Object, Boolean]`

> `set` `(key,value:[Number, String, Object, Boolean])=>void`

> `delete` `(key)=>void`

> `clear` `()=>void`

> `has` `(key)=>Boolean`

> `keys` `()=>Array<String>`

> `values` `()=>Array<Number, String, Object, Boolean>`

> `entries` `()=>Array<{key, value}>`

> `forEach` `(callback:(key, value, instance|class)=>void)=>void`

### Storage | LocalStorage
> `addHandler` `(handler)=>wrappedHandler>`

> `removeHandler` `(handlers: Array<wrappedHandler>)=>void`

## Attributes

> `size`
