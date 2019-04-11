/* eslint-disable no-param-reassign */
import Cookie from './Cookie'
import LocalStorage from './LocalStorage'
import { cookieAvailable, storageAvailable } from './utils'

export { Cookie, LocalStorage }

function convertStorage(storage) {
  storage.addHandler = () => null
  storage.removeHandler = () => null
  return storage
}

export class Storage {
  /**
   * @param {Boolean}   useCookie   Use cookie or not
   * */
  constructor(useCookie) {
    if (storageAvailable()) {
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
      const $cookieAvailable = cookieAvailable()
      if ($cookieAvailable) {
        return convertStorage(Cookie)
      }
    }

    // Fallback to use Map
    return convertStorage(new Map())
  }
}
