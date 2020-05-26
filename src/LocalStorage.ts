import { ForEachCb, StorageEvHandler } from './type'
import { parseJSON, stringifyJSON } from './utils'

export default class LocalStorage {
  static get size() {
    return LocalStorage.keys().length
  }

  static keys() {
    return Object.keys(localStorage)
  }

  static values() {
    return LocalStorage.keys().map(key => LocalStorage.get(key))
  }

  static entries() {
    return LocalStorage.keys().map(key => [key, LocalStorage.get(key)])
  }

  static forEach(callback: ForEachCb<LocalStorage>) {
    LocalStorage.keys().forEach(key =>
      callback(LocalStorage.get(key), key, LocalStorage),
    )
  }

  static set(key: string, val: any) {
    const value = stringifyJSON(val)
    localStorage.setItem(key, value)
  }

  static get(key: string) {
    return parseJSON(localStorage.getItem(key)!)
  }

  static has(key: string) {
    return localStorage.getItem(key) !== null
  }

  static delete(key: string) {
    const has = LocalStorage.has(key)
    if (has) {
      localStorage.removeItem(key)
      return true
    }
    return false
  }

  static clear() {
    localStorage.clear()
  }

  static addHandler(storageHandler: StorageEvHandler) {
    if (window.addEventListener) {
      const handler = (e: StorageEvent) => {
        storageHandler({
          key: e.key,
          oldValue: parseJSON(e.oldValue!),
          newValue: parseJSON(e.newValue!),
          event: e,
        })
      }
      window.addEventListener('storage', handler)
      return handler
    }
    return null
  }

  static removeHandler(handlers: EventHandlerNonNull | EventHandlerNonNull[]) {
    if (window.removeEventListener) {
      const remove = (handler: EventHandlerNonNull) => {
        if (handler instanceof Function)
          window.removeEventListener('storage', handler)
      }
      if (handlers instanceof Array) {
        handlers.forEach(remove)
      } else {
        remove(handlers)
      }
    }
  }
}
