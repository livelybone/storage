export interface CookieSetOptions {
  /**
   * Default: 'Infinity'
   * */
  maxAgeMs?: 'Infinity' | number

  domain?: string

  /**
   * 'secure' or ''
   *
   * Default: ''
   * */
  secure?: string

  /**
   * Default: '/'
   * */
  path?: string
}

export type ForEachCb<T> = (val: any, key: string, ctx: T) => void

export interface StorageEv {
  key: string | null
  oldValue: any
  newValue: any
  event: StorageEvent
}

export type StorageEvHandler = (ev: StorageEv) => void

export type ExceededCb<T> = (
  err: Error & { [k in any]: any },
  currKeyValue: [string, any],
  ctx: T,
) => void
