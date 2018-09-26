export function JSONParse(val) {
  try {
    return JSON.parse(val)
  } catch (e) {
    return val
  }
}

export function storageAvailable() {
  const storage = window.localStorage
  try {
    const x = 'key'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return false
  }
}
