import { CacheConfig, defaultConfig } from './config'

interface CacheObject {
  value: any,
  expire: number
}

interface CacheStore {
  [key: string]: CacheObject
}

let cacheStore = new Map()

let config: CacheConfig = defaultConfig

export function configure(cfg: CacheConfig) {
  config = cfg
}

export function put(key: string, value: any, duration?: number): void {
  const exp = duration ? duration : config.commonExpiry
  cacheStore.set(key, {
    value,
    expire: exp + Date.now()
  })
}

export function get(key: string): any {
  const cacheData = cacheStore.get(key)
  if (cacheData === undefined || deleteExpired(key)) {
    return ''
  }
  
  return cacheData.value
}

function deleteExpired(key: string): boolean {
  let deleted = false
  if (cacheStore.get(key).expire <= Date.now()) {
    delete cacheStore[key]
    deleted = true
  }

  return deleted
}

export function remove(key: string): void {
  delete cacheStore[key];
}

export function drop(): void {
  cacheStore = new Map()
}

export function print(): void {
  if (config.debugMode) {
    console.log('Cache: ' + JSON.stringify(cacheStore))
  } else {
    console.log('Unable to print')
  }
}
