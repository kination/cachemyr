
export interface CacheConfig {
  debugMode?: boolean
  commonExpiry?: number
}

export const defaultConfig: CacheConfig = {
  debugMode: false,
  commonExpiry: 1000
}
