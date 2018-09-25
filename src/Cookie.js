export default class Cookie {
  static get size() {
    return document.cookie.match(/[^\s=;]+(?==)/g).length
  }

  static set(key, val, isSessionLevel) {
    const exp = new Date()
    const value = val instanceof Object ? JSON.stringify(val) : val
    let cookie = `${key}=${encodeURIComponent(value)}`
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
      return decodeURIComponent(arr[2])
    }
    return null
  }

  static has(key) {
    const keys = document.cookie.match(/[^\s=;]+(?==)/g)
    return keys.some(k => k === key)
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
    const keys = document.cookie.match(/[^\s=;]+(?==)/g)
    keys.forEach((key) => {
      this.delete(key)
    })
  }
}
