
export interface CacheConfig {
  debugMode: boolean
  commonExpiry: number
  monitorHeap: boolean
  ssHeapByLength: number
  maxHeap: number
}

export const defaultConfig: CacheConfig = {
  debugMode: false,
  commonExpiry: 6000,
  monitorHeap: false,
  ssHeapByLength: 10000,
  maxHeap: 1024 * 1024 * 1024
}
