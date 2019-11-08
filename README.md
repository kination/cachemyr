[![CircleCI](https://circleci.com/gh/djKooks/cachemyr.svg?style=svg)](https://circleci.com/gh/djKooks/cachemyr)

# cachemyr
Cachemyr[/kaʃˈmɪə] is simple in-memory cache storage module for node.

__This is alpha state module. Some of APIs can be changed by update.__

## How to:
### Install
```
// for 'npm' user
$ npm i cachemyr

// for 'yarn' user
$ yarn add cachemyr
```

### Use 
#### // TODO:

This is example for user:
```javascript
const mc = require('cachemyr')

mc.put('key-1', 1)
console.log(mc.get('key-1')) // 1

mc.delete('key-1')
console.log(mc.get('key-1')) // null

mc.put('key-2', 2, 6000, (key, value) => {
    // called when data with key `key-2` has been expired (after 6 second)
})

console.log(mc.getLength()) // 1 (<'key-2', 2>)
```

### API
#### put: void
Put key-value data to storage

Variable | Type | Description
--- | --- | ---
key | string | Key of KV(key-value) data
value | any  | Value of KV data
duration | number(optional) | Length of duration(ms) to keep this data
timeoutCB | Function(optional) | Callback function to be called when added data has been expired
overflowCB | Function(optional) | Callback function when memory usage of storage has overrun the value defined in configuration


#### get: any | null
Get value of key from storage. Returns `null` when there is no key.

Variable | Type | Description
--- | --- | ---
key | string | Key of KV data
instantRemoval | boolean(optioanl) | Remove after get when set to true


#### remove: void
Remove key-value set from storage

Variable | Type | Description
--- | --- | ---
key | string | Key of KV data


#### drop: void
Remove all data in storage


#### getLength: number
Return number of key-value set in storage


## Contribution
Improvements, bug report & fix, document updates, and ideas are all welcome.

### Build command:
```
$ yarn build // build module

$ yarn test // test module
```

