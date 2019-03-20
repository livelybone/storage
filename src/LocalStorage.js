import { JSONParse } from './utils'

export default class LocalStorage {
  static get size() {
    return this.keys().length
  }

  static addHandler(storageHandler) {
    if (!storageHandler) return null

    if (storageHandler instanceof Function) {
      const handler = (e) => {
        storageHandler({
          key: e.key,
          oldValue: JSONParse(e.oldValue),
          newValue: JSONParse(e.newValue),
          event: e,
        })
      }
      window.addEventListener('storage', handler)
      return handler
    }
    return console.warn('(LocalStorage) Handler add failed: Parameter `storageHandler` should be a function')
  }

  static removeHandler(handlers) {
    const remove = handler => (
      handler instanceof Function ? window.removeEventListener('storage', handler) : ''
    )
    if (handlers instanceof Array) {
      handlers.forEach(remove)
    } else {
      remove(handlers)
    }
  }

  static keys() {
    return Object.keys(localStorage)
  }

  static values() {
    return this.keys().map(key => this.get(key))
  }

  static entries() {
    return this.keys().map(key => ([key, this.get(key)]))
  }

  static forEach(callback) {
    this.keys.forEach(key => callback(this.get(key), key, this))
  }

  static set(key, val) {
    if (!val) this.delete(key)
    const value = JSON.stringify(val)
    localStorage.setItem(key, value)
  }

  static get(key) {
    return JSONParse(localStorage.getItem(key))
  }

  static has(key) {
    return localStorage.getItem(key) !== null
  }

  static delete(key) {
    localStorage.removeItem(key)
  }

  static clear() {
    localStorage.clear()
  }
}
