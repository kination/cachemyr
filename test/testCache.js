const assert = require('assert')
const cache = require('../dist/index')

describe('Test module', () => {
  
  it('Test read/write', () => {
    cache.put('key', 1)
    assert.equal(cache.get('key'), 1)
  })

  it('Test remove', () => {
    cache.put('key', 1)
    assert.equal(cache.get('key'), 1)
    cache.remove('key')
    assert.equal(cache.get('key'), '')
  })

  it ('Test timeout expiration', (done) => {
    cache.put('key-timeout', 'value-timeout', 3000)
    assert.equal(cache.get('key-timeout'), 'value-timeout')
    setTimeout(() => {
      assert.equal(cache.get('key-timeout'), '')
      done()
    }, 4000)
  })
})
