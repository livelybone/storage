/* eslint-disable no-param-reassign */
import Cookie from './Cookie'
import LocalStorage from './LocalStorage'
import * as StorageUtils from './utils'

export { Cookie, LocalStorage, StorageUtils }

/**
 * @class Storage
 * */
export class Storage {
  /**
   * @typedef   { Function }          ExceededCallback
   * @param     { Error }             error
   * @param     { Array }             params              params[0] => key; params[1] => value
   * @param     { Storage }           storage
   * */
  /**
   * @param     { Boolean }           useCookie           Use cookie or not
   * @param     { ExceededCallback }  [exceededCallback]  Callback of QUOTA_EXCEEDED_ERROR,
   * */
  constructor(useCookie, exceededCallback) {
    const getStorage = () => {
      if (StorageUtils.storageAvailable()) {
        return LocalStorage
      }

      if (typeof window !== 'undefined') {
        console.warn(
          '(Storage) The Object localStorage isn\'t supported in your client,'
          + ' methods `addHandler` and `removeHandler` will do nothing when you call it',
        )
      }

      // Fallback to use Cookie if useCookie is true
      if (useCookie) {
        const $cookieAvailable = StorageUtils.cookieAvailable()
        if ($cookieAvailable) {
          return Cookie
        }
      }

      // Fallback to use Map
      return new Map()
    }
    this.storage = getStorage()
    if (exceededCallback instanceof Function) {
      this.exceededCallback = exceededCallback
    }
  }

  get size() {
    return this.storage.size
  }

  keys() {
    return this.storage.keys()
  }

  values() {
    return this.storage.values()
  }

  entries() {
    return this.storage.entries()
  }

  forEach(callback) {
    this.storage.forEach(callback)
  }

  set(key, val) {
    try {
      this.storage.set(key, val)
    } catch (e) {
      if (StorageUtils.isExceeded(e) && this.exceededCallback) {
        this.exceededCallback(e, [key, val], this)
      } else throw e
    }
  }

  get(key) {
    return this.storage.get(key)
  }

  has(key) {
    return this.storage.has(key)
  }

  delete(key) {
    return this.storage.delete(key)
  }

  clear() {
    this.storage.clear()
  }

  addHandler(storageHandler) {
    if (this.storage.addHandler) {
      return this.storage.addHandler(storageHandler)
    }
    return null
  }

  removeHandler(handlers) {
    if (this.storage.removeHandler) this.storage.removeHandler(handlers)
  }
}
