import { CacheConfig, defaultConfig } from './config'

interface CacheObject {
  value: any,
  expire: number
}

let cacheStore = new Map()

let config: CacheConfig = defaultConfig

export function configure(cfg: CacheConfig) {
  config = cfg
}

export function put(key: string, value: any, duration?: number, overflowCB?: Function): void {
  const exp = duration ? duration : config.commonExpiry
  cacheStore.set(key, {
    value,
    expire: exp + Date.now()
  })

  if (config.monitorHeap) {
    if (isHeapReachedToMax()) {
      if (overflowCB) {
        overflowCB()
      }
    }
  }
}

export function get(key: string): any {
  const cacheData = cacheStore.get(key)
  if (cacheData === undefined || deleteExpired(key)) {
    return ''
  }
  
  return cacheData.value
}

export function remove(key: string): void {
  cacheStore.delete(key)
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

function deleteExpired(key: string): boolean {
  let deleted = false
  if (cacheStore.get(key).expire <= Date.now()) {
    cacheStore.delete(key)
    deleted = true
  }

  return deleted
}

function isHeapReachedToMax(): boolean {
  const ht = process.memoryUsage().heapTotal
  console.log(ht + ' / ' + config.maxHeap)
  let isReached = false
  if (ht >= config.maxHeap) {
    isReached = true
  }

  return isReached
}
