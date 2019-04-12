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
    return LocalStorage.keys().map(key => ([key, LocalStorage.get(key)]))
  }

  static forEach(callback) {
    LocalStorage.keys.forEach(key => callback(LocalStorage.get(key), key, LocalStorage))
  }

  static set(key, val) {
    const value = stringifyJSON(val)
    localStorage.setItem(key, value)
  }

  static get(key) {
    return parseJSON(localStorage.getItem(key))
  }

  static has(key) {
    return localStorage.getItem(key) !== null
  }

  static delete(key) {
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

  static addHandler(storageHandler) {
    if (window.addEventListener) {
      if (storageHandler instanceof Function) {
        const handler = (e) => {
          storageHandler({
            key: e.key,
            oldValue: parseJSON(e.oldValue),
            newValue: parseJSON(e.newValue),
            event: e,
          })
        }
        window.addEventListener('storage', handler)
        return handler
      }

      console.warn(
        '(LocalStorage) Handler add failed:'
        + ' Parameter `storageHandler` should be a function',
      )
    }
    return null
  }

  static removeHandler(handlers) {
    if (window.removeEventListener) {
      const remove = handler => (
        handler instanceof Function
          ? window.removeEventListener('storage', handler) : ''
      )
      if (handlers instanceof Array) {
        handlers.forEach(remove)
      } else {
        remove(handlers)
      }
    }
  }
}
