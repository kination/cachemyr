
let cacheObject = new Object()

export function put(key: string, value: any) {
  cacheObject[key] = value
}

export function get(key: string) {
  return cacheObject[key]
}

export function print() {
  console.log(JSON.stringify(cacheObject))
}
