import { CacheConfig, defaultConfig } from './config'

interface CacheObject {
  value: any,
  expire: number,
  timeoutFunc?: any
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
 * @param  {Function} timeoutCB? - Callback function to be called when added data has been expired
 * @param  {Function} overflowCB? - Callback function when memory usage of storage has 
 *                                  overrun the value defined in configuration
 * @returns void
 */
export function put(key: string, value: any, duration?: number, timeoutCB?: Function, overflowCB?: Function): void {
  let exp = duration ? duration : config.commonExpiry
  const valSet: CacheObject = {
    value,
    expire: exp + Date.now()
  }

  if (timeoutCB) {
    valSet.timeoutFunc = setTimeout(() => {
      timeoutCB(key, value)
    }, exp)
  }

  cacheStore.set(key, valSet)

  kvSize += 1

  if (isNeedToCheckHeap()) {
    if (isHeapReachedToMax()) {
      if (overflowCB) {
        overflowCB()
      }
    }
  }
}

function timeoutAction(k: string, v:any, timeoutCB: Function) {
  timeoutCB(k, v)
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
