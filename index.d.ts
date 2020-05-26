interface CookieSetOptions {
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

declare type ForEachCb<T> = (val: any, key: string, ctx: T) => void

interface StorageEv {
  key: string | null
  oldValue: any
  newValue: any
  event: StorageEvent
}

declare type StorageEvHandler = (ev: StorageEv) => void
declare type ExceededCb<T> = (
  err: Error &
    {
      [k in any]: any
    },
  currKeyValue: [string, any],
  ctx: T,
) => void

declare class Cookie {
  static get size(): number

  static keys(): string[]

  static values(): (string | null)[]

  static entries(): (string | null)[][]

  static forEach(callback: ForEachCb<Cookie>): void

  /**
   * @param { String }          key
   * @param { StorageValue }    val
   * @param { String|Number }   [maxAgeMs]
   * @param { String }          [domain]
   * @param { String }          [secure]
   * @param { String }          [path]
   * */
  static set(
    key: string,
    val: any,
    { maxAgeMs, domain, secure, path }?: CookieSetOptions,
  ): void

  static get(key: string): string | null

  static has(key: string): boolean

  static delete(key: string): boolean

  static clear(): void
}

declare class LocalStorage {
  static get size(): number

  static keys(): string[]

  static values(): any[]

  static entries(): any[][]

  static forEach(callback: ForEachCb<LocalStorage>): void

  static set(key: string, val: any): void

  static get(key: string): any

  static has(key: string): boolean

  static delete(key: string): boolean

  static clear(): void

  static addHandler(
    storageHandler: StorageEvHandler,
  ): ((e: StorageEvent) => void) | null

  static removeHandler(
    handlers: EventHandlerNonNull | EventHandlerNonNull[],
  ): void
}

declare namespace utils {
  /**
   * @typedef { undefined|null|String|Number|Boolean|Object|Array }  StorageValue
   * */
  /**
   * @desc JSON stringify
   * @param { StorageValue } val
   * */
  export declare function stringifyJSON(val: any): string

  /**
   * @desc JSON parse
   * @param { String } val
   * */
  export declare function parseJSON(val: string): any

  export declare function isStorageExceeded(err: any): boolean

  export declare function storageAvailable(): boolean

  export declare function cookieAvailable(): string | boolean
}

/**
 * @class Storage
 * */
declare class Storage {
  storage: any

  exceededCallback?: ExceededCb<Storage>

  /**
   * @typedef   { Function }          ExceededCallback
   * @param     { Error }             error
   * @param     { Array }             params              params[0] => key; params[1] => value
   * @param     { Storage }           storage
   * */
  /**
   * @param     { Boolean }           useCookie           Use cookie or not
   * @param     { ExceededCallback }  [exceededCallback]  Callback of QUOTA_EXCEEDED_ERROR,
   * */
  constructor(useCookie?: boolean, exceededCallback?: ExceededCb<Storage>)

  get size(): any

  keys(): any

  values(): any

  entries(): any

  forEach(callback: ForEachCb<any>): void

  set(key: string, val: any): void

  get(key: string): any

  has(key: string): any

  delete(key: string): any

  clear(): void

  addHandler(storageHandler: StorageEvHandler): any

  removeHandler(handlers: EventHandlerNonNull | EventHandlerNonNull[]): void
}

declare class StorageItem<Value = string> {
  static StorageOptions: {
    useCookie?: boolean
    exceededCallback?: (
      error: Error,
      [key, value]: [string, any],
      instance: Storage,
    ) => void
  }

  private readonly key

  private readonly storage

  constructor(key: string, isCookie?: boolean)

  set(val: Value): void

  get(): Value | null

  del(): any
}

export {
  Cookie,
  CookieSetOptions,
  ExceededCb,
  ForEachCb,
  LocalStorage,
  Storage,
  StorageEv,
  StorageEvHandler,
  StorageItem,
  utils as StorageUtils,
}
