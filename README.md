# @livelybone/storage
[![NPM Version](http://img.shields.io/npm/v/@livelybone/storage.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/storage)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/storage.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/storage)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

A module for localStorage, support custom solution of quota exceeded. When localStorage is not supported by browser, it will be degrading to use Cookie or Map

You can store Objects directly like
> 1. Object `{ a: 1, b: '1' }`
> 2. Number `1`
> 3. String `'true'`
> 4. Boolean `true`
> 5. undefined `undefined`
> 6. null `null`
> 7. Array `[1, 2]`

Before store, this module will stringify the value you set (use `stringifyJSON`).
Before return, it will parse(use `parseJSON`) the value which you want get

> You may need a polyfill for `Map` like babel-polyfill if you use it in `ie` browser

## repository
https://github.com/livelybone/storage.git

## Demo
http://livelybone.github.io/tool/storage/

## Run Example
you can see the usage by run the example of the module, here is the step:

1. Clone the library `git clone https://github.com/livelybone/storage.git`
2. Go to the directory `cd your-module-directory`
3. Install npm dependencies `npm i`(use taobao registry: `npm i --registry=http://registry.npm.taobao.org`)
4. Open service `npm run dev`
5. See the example(usually is `http://127.0.0.1:3000/examples/test.html`) in your browser

## Installation
```bash
npm i -S @livelybone/storage
```

## Global name - The variable the module exported in `umd` bundle
`Storage`

## Interface
See what method or params you can use in [index.d.ts](./index.d.ts)

## Usage
```js
/**
 * @property Cookie, a purely wrapper of Cookie
 * @property Storage, a wrapper of HTML5 localStorage dealt with Cookie or Map (Map default)
 * @property LocalStorage, a purely wrapper of  HTML5 localStorage
 * @property StorageUtils, some tool function about storage
 * */
import {Cookie, Storage, LocalStorage, StorageUtils} from '@livelybone/storage';

Cookie.set('key', 'value')
Cookie.get('key')
Cookie.keys()
Cookie.forEach(callback)
// ...

LocalStorage.set('key', 'value')
LocalStorage.get('key')
LocalStorage.keys()
LocalStorage.forEach(callback)
// ...

const useCookie = true
const exceededCallback = null

/**
 * @typedef   { Function }          ExceededCallback
 * @param     { Error }             error
 * @param     { Array }             params              params[0] => key; params[1] => value
 * @param     { Storage }           storage
 * */
/**
 * @class                           Storage
 * @param     { Boolean }           useCookie           Use cookie or not
 * @param     { ExceededCallback }  [exceededCallback]  Callback of QUOTA_EXCEEDED_ERROR,
 * */
const storage = new Storage(useCookie, exceededCallback)
storage.set('key', 'value')
storage.get('key')
storage.keys()
storage.forEach(callback)
// ...
```

when you want to set this module as external while you are developing another module, you should import it like this:
```js
import * as Storage from '@livelybone/storage'

// then use it by need
```

## CDN
Use in html, see what you can use in [CDN: unpkg](https://unpkg.com/@livelybone/storage/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/@livelybone/storage/lib/umd/<--module-->.js"></script>
```

Or，see what you can use in [CDN: jsdelivr](https://cdn.jsdelivr.net/npm/@livelybone/storage/lib/umd/)
```html
<script src="https://cdn.jsdelivr.net/npm/@livelybone/storage/lib/umd/<--module-->.js"></script>
```

## Shared methods
`StorageValue: undefined|null|String|Number|Boolean|Object|Array`

> `get`: `(key: String) => StorageValue`

> `set`: `(key: String, value: StorageValue) => void`

> `delete`: `(key: String) => void`

> `clear`: `() => void`

> `has`: `(key: String) => Boolean`

> `keys`: `() => Array<String>|MapIterator`

> `values`: `() => Array<StorageValue>|MapIterator`

> `entries`: `() => Array<Object{key, value}>|MapIterator`

> `forEach`: `(callback: (value: StorageValue, key: String, source: LocalStorage|Cookie|new Map())) => void) => void`

## Particular methods of Storage, LocalStorage
> `addHandler`: `(handler: ({
    event: StorageEvent,
    key: String,
    oldValue: StorageValue,
    newValue: StorageValue,
  }) => any) => wrappedHandler`

> `removeHandler`: `(handlers: Array<wrappedHandler>) => void`

## Attributes

> `size: Number`

## StorageUtils
```js
const {
  stringifyJSON,
  parseJSON,
  isStorageExceeded,
  storageAvailable,
  cookieAvailable,
} = StorageUtils
```

> `stringifyJSON`: `(val: StorageValue) => String`

> `parseJSON`: `(val: String) => StorageValue`

> `isStorageExceeded`: `(err: Error) => Boolean`

> `storageAvailable`: `() => Boolean`

> `cookieAvailable`: `() => Boolean`
