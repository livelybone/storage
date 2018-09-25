import Cookie from './Cookie'
import { isJSON, storageAvailable } from './utils'

export { Cookie }

export class LocalStorage {
  constructor(useCookie, storageHandler) {
    if (typeof window !== 'undefined') {
      this.storage = useCookie ? Cookie : new Map()
      this.storageSupport = storageAvailable()
      if (storageHandler) {
        if (storageHandler instanceof Function) {
          this.listener = e => storageHandler(e)
          window.addEventListener('storage', this.listener)
        } else {
          throw new Error('Parameter `storageHandler` should be a function')
        }
      }
    }
  }

  set(key, val) {
    if (!val) this.delete(key)
    try {
      if (this.storageSupport) {
        const value = JSON.stringify(val)
        localStorage.setItem(key, value)
      } else {
        this.storage.set(key, val)
      }
    } catch (e) {
      console.error(e)
    }
  }

  get(key) {
    if (this.storageSupport) {
      const val = localStorage.getItem(key)
      const res = isJSON(val)
      return res ? res.value : val
    }
    return this.storage.get(key)
  }

  has(key) {
    if (this.storageSupport) {
      return localStorage.getItem(key) !== null
    }
    return this.storage.has(key)
  }

  delete(key) {
    if (this.storageSupport) {
      localStorage.removeItem(key)
    } else {
      this.storage.delete(key)
    }
  }

  clear() {
    if (this.storageSupport) {
      localStorage.clear()
    } else {
      this.storage.clear()
    }
  }

  removeHandler() {
    if (this.listener) window.removeEventListener('storage', this.listener)
  }
}
