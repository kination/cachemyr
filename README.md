# cachemyr
Cachemyr[/kaʃˈmɪə,ˈkaʃmɪə/]] is simple in-memory cache storage module for node.

__This is pre-alpha state module. Don't use it for production!!__

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
console.log(mc.get('key-1')) // ''

mc.put('key-1', 1, 6000, () => {
    // only being called when nodejs memory is overflowed...default is 1Gb
})


```

### API
#### put: void
Put key-value data to storage

Variable | Type | Description
--- | --- | ---
key | string | Key of KV(key-value) data
value | any  | Value of KV data
duration | number(optional) | Length of duration(ms) to keep this data
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

