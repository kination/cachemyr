import { CacheConfig, defaultConfig } from './config'

interface CacheObject {
  value: any,
  expire: number
}

let cacheStore = new Map()
let kvSize = 0

let config: CacheConfig = defaultConfig

/**
 * Setup configuration for cache storage
 * 
 * @param  {CacheConfig} cfg - Config value
 */
export function configure(cfg: CacheConfig) {
  config = cfg
}

/**
 * Put key-value dataset into storage
 * 
 * @param  {string} key - Key of data
 * @param  {any} value - Value of data
 * @param  {number} duration? - Length of duration(ms) to keep this data
 * @param  {Function} overflowCB? - Callback function when memory usage of storage has 
 *                                  overrun the value defined in configuration
 * @returns void
 */
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

/**
 * Get key-value data from storage
 * 
 * @param  {string} key - Key of data to get from storage
 * @param  {boolean} instantRemoval? - (Optional) Remove after get when set to true
 * @returns any | null
 */
export function get(key: string, instantRemoval?: boolean): any | null {
  const cacheData = cacheStore.get(key)
  if (cacheData === undefined || deleteExpired(key)) {
    return null
  }

  if (instantRemoval) {
    deleteKV(key)
  }
  
  return cacheData.value
}

/**
 * Remove key-value data from storage
 * 
 * @param  {string} key - Key of data to remove from storage
 * @returns void
 */
export function remove(key: string): void {
  deleteKV(key)
}

/**
 * Drop cache storage
 * 
 * @returns void
 */
export function drop(): void {
  cacheStore = new Map()
  kvSize = 0
}

/**
 * Get number of key-value set in storage
 * 
 * @returns number
 */
export function getLength(): number {
  return kvSize
}

/**
 * TODO
 */
function print(): void {
  console.log('Cache: ' + JSON.stringify(cacheStore))
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
  if (config.monitorHeap && (kvSize % config.traceHeapByLength === 0)) {
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
