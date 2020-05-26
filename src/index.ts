import { singletonObj } from '@livelybone/singleton'
import Cookie from './Cookie'
import LocalStorage from './LocalStorage'
import * as StorageUtils from './utils'
import { ExceededCb, ForEachCb, StorageEvHandler } from './type'

export { Cookie, LocalStorage, StorageUtils }
export * from './type'

/**
 * @class Storage
 * */
export class Storage {
  storage: any

  exceededCallback?: ExceededCb<Storage>

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
  constructor(useCookie?: boolean, exceededCallback?: ExceededCb<Storage>) {
    const getStorage = () => {
      if (StorageUtils.storageAvailable()) {
        return LocalStorage
      }

      if (typeof window !== 'undefined') {
        console.warn(
          new Error(
            "(Storage) The Object localStorage isn't supported in your client," +
              ' methods `addHandler` and `removeHandler` will do nothing when you call it',
          ),
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
    if (exceededCallback) this.exceededCallback = exceededCallback
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

  forEach(callback: ForEachCb<any>) {
    this.storage.forEach(callback)
  }

  set(key: string, val: any) {
    try {
      this.storage.set(key, val)
    } catch (e) {
      if (StorageUtils.isStorageExceeded(e) && this.exceededCallback) {
        this.exceededCallback(e, [key, val], this)
      } else throw e
    }
  }

  get(key: string) {
    return this.storage.get(key)
  }

  has(key: string) {
    return this.storage.has(key)
  }

  delete(key: string) {
    return this.storage.delete(key)
  }

  clear() {
    this.storage.clear()
  }

  addHandler(storageHandler: StorageEvHandler) {
    if (this.storage.addHandler) {
      return this.storage.addHandler(storageHandler)
    }
    return null
  }

  removeHandler(handlers: EventHandlerNonNull | EventHandlerNonNull[]) {
    if (this.storage.removeHandler) this.storage.removeHandler(handlers)
  }
}

export class StorageItem<Value = string> {
  static StorageOptions: {
    useCookie?: boolean
    exceededCallback?: (
      error: Error,
      [key, value]: [string, any],
      instance: Storage,
    ) => void
  } = { useCookie: true }

  private readonly key: string = ''

  private readonly storage: any

  constructor(key: string, isCookie?: boolean) {
    this.key = key
    this.storage = isCookie
      ? Cookie
      : singletonObj(
          'storage',
          () =>
            new Storage(
              StorageItem.StorageOptions.useCookie,
              StorageItem.StorageOptions.exceededCallback,
            ),
        )
  }

  set(val: Value) {
    this.storage.set(this.key, val)
  }

  get(): Value | null {
    return this.storage.get(this.key)
  }

  del() {
    return this.storage.delete(this.key)
  }
}
