
export interface CacheConfig {
  debugMode: boolean
  commonExpiry: number
  monitorHeap: boolean
  maxHeap: number
}

export const defaultConfig: CacheConfig = {
  debugMode: false,
  commonExpiry: 6000,
  monitorHeap: false,
  maxHeap: 1024 * 1024 * 1024
}
