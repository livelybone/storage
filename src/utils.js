/**
 * @typedef { undefined|null|String|Number|Boolean|Object|Array }  StorageValue
 * */

/**
 * @desc JSON stringify
 * @param { StorageValue } val
 * */
export function stringifyJSON(val) {
  if (typeof val === 'number') {
    if (isNaN(val)) return 'NaN'
    if (!isFinite(val)) return 'Infinity'
  }
  return JSON.stringify(val)
}

/**
 * @desc JSON parse
 * @param { String } val
 * */
export function parseJSON(val) {
  try {
    if (val === 'undefined') return undefined
    if (val === 'NaN') return NaN
    if (val === 'Infinity') return Infinity
    return JSON.parse(val)
  } catch (e) {
    return val
  }
}

export function isExceeded(err) {
  return err.code === 22 || err.name.toLowerCase().indexOf('quota') >= 0
}

export function storageAvailable() {
  try {
    const storage = window.localStorage
    const x = 'storage-available'
    storage.setItem(x, x)
    const isAvailable = storage.getItem(x) === x
    storage.removeItem(x)
    return isAvailable
  } catch (e) {
    // If it is QUOTA_EXCEEDED_ERROR, return true
    return isExceeded(e)
  }
}

export function cookieAvailable() {
  try {
    return document.cookie || true
  } catch (e) {
    return false
  }
}
