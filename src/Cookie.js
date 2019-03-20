import { JSONParse } from './utils'

export default class Cookie {
  static get size() {
    return Cookie.keys().length
  }

  static keys() {
    return document.cookie.match(/[^\s=;]+(?==)/g)
  }

  static values() {
    return Cookie.keys().map(key => Cookie.get(key))
  }

  static entries() {
    return Cookie.keys().map(key => ([key, Cookie.get(key)]))
  }

  static forEach(callback) {
    Cookie.keys.forEach(key => callback(Cookie.get(key), key, Cookie))
  }

  static set(key, val, { maxAgeMs = 'Infinity', domain, secure, path } = {}) {
    const value = JSON.stringify(typeof val === 'string' ? encodeURIComponent(val) : val)
    let cookie = `${key}=${value}`

    const isSessionLevel = !maxAgeMs

    if (!isSessionLevel) {
      const exp = new Date()
      // Expired after {ms}ms
      const ms = maxAgeMs === 'Infinity' ? 365 * 24 * 60 * 60 * 1000 : +maxAgeMs
      exp.setTime(exp.getTime() + ms)
      const expires = exp.toUTCString()

      // set expires, path, domain and secure of cookie
      cookie += `;expires=${expires}`
    }

    cookie += `;path=${path || '/'}`
    if (domain) cookie += `;domain=${domain}`
    if (secure) cookie += `;secure=${secure ? 'secure' : ''}`
    document.cookie = cookie
  }

  static get(key) {
    const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`)
    const arr = document.cookie.match(reg)
    if (arr) {
      const val = JSONParse(arr[2])
      return typeof val === 'string' ? decodeURIComponent(val) : val
    }
    return null
  }

  static has(key) {
    return Cookie.keys().some(k => k === key)
  }

  static delete(key) {
    Cookie.set(key, Cookie.get(key), { maxAgeMs: -1 })
  }

  static clear() {
    Cookie.keys().forEach((key) => {
      Cookie.delete(key)
    })
  }
}
