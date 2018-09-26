import Cookie from './Cookie'
import LocalStorage from './LocalStorage'
import { storageAvailable } from './utils'

export { Cookie, LocalStorage }

export class Storage {
  constructor(useCookie) {
    let storage = null
    if (storageAvailable()) {
      storage = LocalStorage
    } else {
      console.warn('The Object localStorage isn\'t supported in your browser, methods `addHandler` and `removeHandler` will do nothing when you call it')
      storage = useCookie ? Cookie : new Map()
      storage.addHandler = () => null
      storage.removeHandler = () => null
    }
    return storage
  }
}
