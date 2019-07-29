interface CustomStorageEvent {
  key: string
  oldValue: any
  newValue: any
  event: StorageEvent
}

type StorageEventHandler = (ev: CustomStorageEvent) => void

type HandlerForRemove = (ev: StorageEvent) => void

export class Storage {
  constructor(
    useCookie?: boolean,
    exceededCallback?: (
      error: Error,
      [key, value]: [string, any],
      instance: Storage,
    ) => void,
  )

  size(): number

  keys(): string[]

  values(): any[]

  entries(): [string, any][]

  forEach(cb: (value: any, key: string, instance: Storage) => any): void

  set(key: string, value: any): void

  get(key: string): any

  has(key: string): boolean

  delete(key: string): boolean

  clear(): void

  addHandler(handler: StorageEventHandler): HandlerForRemove

  removeHandler(handler: HandlerForRemove): void
}

export class Cookie {
  static size(): number

  static keys(): string[]

  static values(): any[]

  static entries(): [string, any][]

  static forEach(
    cb: (value: any, key: string, instance: Storage) => any,
  ): void

  static set(key: string, value: any): void

  static get(key: string): any

  static has(key: string): boolean

  static delete(key: string): boolean

  static clear(): void
}

export class LocalStorage {
  static size(): number

  static keys(): string[]

  static values(): any[]

  static entries(): [string, any][]

  static forEach(
    cb: (value: any, key: string, instance: Storage) => any,
  ): void

  static set(key: string, value: any): void

  static get(key: string): any

  static has(key: string): boolean

  static delete(key: string): boolean

  static clear(): void

  static addHandler(handler: StorageEventHandler): HandlerForRemove

  static removeHandler(handler: HandlerForRemove): void
}

export namespace StorageUtils {
  export function stringifyJSON(val: any): string
  export function parseJSON(jsonStr: string): any
  export function isStorageExceeded(err: Error): boolean
  export function storageAvailable(): boolean
  export function cookieAvailable(): boolean
}
