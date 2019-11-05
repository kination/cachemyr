
export interface CacheConfig {
  /**
   * Interface for setup configuration
   * 
   * @param  {number} commonExpiry - Default expiration time for key-value set, if not set on `put` method
   * @param  {boolean} monitorHeap - Monitor heap size of node. This could effect performance.
   * @param  {number} traceHeapByLength - Check heap size everytime when unit of key-value size has reached to this value.
   *                                      It is to make duration for checking heap, to reduce performance lowering.
   *                                      This only works when `monitorHeap` is `true`.
   * @param  {number} maxHeap - Maximum heap size to be allowed. This only works when `monitorHeap` is `true`.
   * 
   */
  commonExpiry: number
  monitorHeap: boolean
  traceHeapByLength: number
  maxHeap: number
}

export const defaultConfig: CacheConfig = {
  commonExpiry: 6000,
  monitorHeap: false,
  traceHeapByLength: 10000,
  maxHeap: 1024 * 1024 * 1024
}
