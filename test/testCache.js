const assert = require('assert')
const cache = require('../dist/index')

describe('Test cache', () => {
  it('Test read/write cache', () => {
    cache.put('key', 1)
    assert.equal(cache.get('key'), 1)
  })
})
