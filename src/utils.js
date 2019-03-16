export function JSONParse(val) {
  try {
    return JSON.parse(val)
  } catch (e) {
    return val
  }
}

export function storageAvailable() {
  try {
    const storage = window.localStorage
    const x = 'key'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return false
  }
}

export function cookieAvailable() {
  try {
    return document.cookie || true
  } catch (e) {
    return false
  }
}
