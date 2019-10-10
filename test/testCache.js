const assert = require('assert')
const cache = require('../dist/index')

describe('Test cache', () => {
  it('Test read/write cache', () => {
    cache.put('key', 1)
    assert.equal(cache.get('key'), 1)
  })

  it('Test remove', () => {
    cache.put('key', 1)
    assert.equal(cache.get('key'), 1)
    cache.remove('key')
    assert.equal(cache.get('key'), undefined)
  })

  it('Test config', () => {
    cache.put('key', 1)
    cache.print()
    cache.configure({
      debugMode: true
    })
    cache.print()
    
  })
})
