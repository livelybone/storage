export function isJSON(val) {
  try {
    const value = JSON.parse(val)
    return { value }
  } catch (e) {
    return false
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
