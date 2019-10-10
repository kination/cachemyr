import { CacheConfig, defaultConfig } from './config'

let cacheObject = new Object()
let config: CacheConfig = defaultConfig

export function configure(cfg: CacheConfig) {
  config = cfg
}

export function put(key: string, value: any): void {
  cacheObject[key] = value
}

export function get(key: string): any {
  return cacheObject[key]
}

export function remove(key: string): void {
  delete cacheObject[key];
}

export function print(): void {
  if (config.debugMode) {
    console.log('Cache: ' + JSON.stringify(cacheObject))
  } else {
    console.log('Unable to print')
  }
}
