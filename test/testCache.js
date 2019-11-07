const assert = require('assert')
const cache = require('../dist/index')

describe('Cachemyr Test', () => {
  
  beforeEach(() => {
    // clean-up cache before every test
    cache.drop()
  })

  it('Test read/write number', () => {
    cache.put('rw-key', 1)
    assert.equal(cache.get('rw-key'), 1)
  })

  it('Test read/write obj', () => {
    const testObj = {
      name: 'cachemyr',
      id: 27
    }

    cache.put('rw-obj-key', testObj)
    assert.equal(cache.get('rw-obj-key'), testObj)
    assert.equal(cache.get('rw-obj-key').name, 'cachemyr')
    assert.equal(cache.get('rw-obj-key').id, 27)
  })

  it('Test remove', () => {
    cache.put('rm-key', 1)
    assert.equal(cache.get('rm-key'), 1)
    cache.remove('rm-key')
    assert.equal(cache.get('rm-key'), null)
  })

  it('Test instant removal', () => {
    cache.put('irm-key', 'will removed')
    assert.equal(cache.get('irm-key', true), 'will removed')
    assert.equal(cache.get('irm-key'), null)
  })

  it ('Test get length', () => {
    [1, 2, 3, 4, 5].forEach((val) => {
      cache.put(`size-key-${val}`, `value-${val}`)
    })

    assert.equal(cache.getLength(), 5)
  })

  it ('Test timeout expiration', (done) => {
    cache.put('key-timeout', 'value-timeout', 2000)
    assert.equal(cache.get('key-timeout'), 'value-timeout')
    setTimeout(() => {
      assert.equal(cache.get('key-timeout'), null)
      done()
    }, 3000)
  })

  it('Test timeout callback', (done) => {
    const TEST_KEY = 'tocb-key'
    const TEST_VAL = 'check timeout'
    setTimeout(() => {
      cache.put(TEST_KEY, TEST_VAL, 1000, (k, v) => {
        assert.equal(k, TEST_KEY)
        assert.equal(v, TEST_VAL)
        assert.equal(cache.get(TEST_KEY), null)
        done()
      })
    }, 2000)
  })
})
