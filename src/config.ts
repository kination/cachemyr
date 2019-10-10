
export interface CacheConfig {
  debugMode?: boolean
  limit?: number
}

export const defaultConfig: CacheConfig = {
  debugMode: false,
  limit: 600000
}
