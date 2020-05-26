import { CookieSetOptions, ForEachCb } from './type'
import { parseJSON, stringifyJSON } from './utils'

export default class Cookie {
  static get size() {
    return Cookie.keys().length
  }

  static keys(): string[] {
    return document.cookie.match(/[^\s=;]+(?==)/g) || []
  }

  static values() {
    return Cookie.keys().map(key => Cookie.get(key))
  }

  static entries() {
    return Cookie.keys().map(key => [key, Cookie.get(key)])
  }

  static forEach(callback: ForEachCb<Cookie>) {
    Cookie.keys().forEach(key => callback(Cookie.get(key), key, Cookie))
  }

  /**
   * @param { String }          key
   * @param { StorageValue }    val
   * @param { String|Number }   [maxAgeMs]
   * @param { String }          [domain]
   * @param { String }          [secure]
   * @param { String }          [path]
   * */
  static set(
    key: string,
    val: any,
    { maxAgeMs = 'Infinity', domain, secure, path }: CookieSetOptions = {},
  ) {
    const value = encodeURIComponent(stringifyJSON(val))
    let cookie = `${key}=${value}`

    const isSessionLevel = !maxAgeMs

    if (!isSessionLevel) {
      const exp = new Date()
      // Expired after {ms}ms
      const ms = !isFinite(+maxAgeMs) ? 365 * 24 * 60 * 60 * 1000 : +maxAgeMs
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

  static get(key: string) {
    const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`)
    const arr = document.cookie.match(reg)
    if (arr) {
      return decodeURIComponent(parseJSON(arr[2]))
    }
    return null
  }

  static has(key: string) {
    return Cookie.keys().some(k => k === key)
  }

  static delete(key: string) {
    const has = Cookie.has(key)
    if (has) {
      Cookie.set(key, Cookie.get(key), { maxAgeMs: -1 })
      return true
    }
    return false
  }

  static clear() {
    Cookie.keys().forEach(key => {
      Cookie.delete(key)
    })
  }
}
