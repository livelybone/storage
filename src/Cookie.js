import { JSONParse } from './utils'

export default class Cookie {
  static get size() {
    return this.keys().length
  }

  static keys() {
    return document.cookie.match(/[^\s=;]+(?==)/g)
  }

  static values() {
    return this.keys().map(key => this.get(key))
  }

  static entries() {
    return this.keys().map(key => ({ key, value: this.get(key) }))
  }

  static forEach(callback) {
    this.keys.forEach(key => callback(key, this.get(key), this))
  }

  static set(key, val, isSessionLevel) {
    const exp = new Date()
    const value = JSON.stringify(typeof val === 'string' ? encodeURIComponent(val) : val)
    let cookie = `${key}=${value}`
    if (!isSessionLevel) { // 如果不是会话级（会话级的cookie，关闭浏览器则过期），则设置过期时间
      const Days = 1
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000) // 一天之后过时，失效
      cookie += `;expires=${exp.toUTCString()}`
    }
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
    return this.keys().some(k => k === key)
  }

  static delete(key) {
    const exp = new Date()
    exp.setTime(exp.getTime() - 1)
    const val = Cookie.get(key)
    if (val !== null) {
      document.cookie = `${key}=${val};expires=${exp.toUTCString()}`
    }
  }

  static clear() {
    this.keys().forEach((key) => {
      this.delete(key)
    })
  }
}
