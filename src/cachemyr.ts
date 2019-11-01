import { CacheConfig, defaultConfig } from './config'

interface CacheObject {
  value: any,
  expire: number
}

let cacheStore = new Map()
let kvSize = 0

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

  kvSize += 1

  if (isNeedToCheckHeap()) {
    if (isHeapReachedToMax()) {
      if (overflowCB) {
        overflowCB()
      }
    }
  }
}

export function get(key: string): any | null {
  const cacheData = cacheStore.get(key)
  if (cacheData === undefined || deleteExpired(key)) {
    return null
  }
  
  return cacheData.value
}

export function remove(key: string): void {
  deleteKV(key)
}

export function drop(): void {
  cacheStore = new Map()
  kvSize = 0
}

export function getLength(): number {
  return kvSize
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
    deleteKV(key)
    deleted = true
  }

  return deleted
}

function isNeedToCheckHeap(): boolean {
  let needToCheck = false
  if (config.monitorHeap && (kvSize % config.ssHeapByLength === 0)) {
    console.log('KV size:' + kvSize)
    needToCheck = true
  }

  return needToCheck
}

function deleteKV(key: string): void {
  cacheStore.delete(key)
  kvSize -= 1
}

function isHeapReachedToMax(): boolean {
  const ht = process.memoryUsage().heapTotal
  let isReached = false
  if (ht >= config.maxHeap) {
    isReached = true
  }

  return isReached
}
