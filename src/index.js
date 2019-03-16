import Cookie from './Cookie'
import LocalStorage from './LocalStorage'
import { cookieAvailable, storageAvailable } from './utils'

export { Cookie, LocalStorage }

export class Storage {
  constructor(useCookie) {
    let storage = null
    if (storageAvailable()) {
      storage = LocalStorage
    } else {
      const $cookieAvailable = cookieAvailable()
      if ($cookieAvailable) {
        console.warn(
          'The Object localStorage isn\'t supported in your client,'
          + ' methods `addHandler` and `removeHandler` will do nothing when you call it',
        )
      }
      storage = useCookie && $cookieAvailable ? Cookie : new Map()
      storage.addHandler = () => null
      storage.removeHandler = () => null
    }
    return storage
  }
}
