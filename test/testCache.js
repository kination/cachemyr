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
    assert.equal(cache.get('key'), '')
  })

  it ('Test timeout', (done) => {
    cache.put('key-timeout', 'value-timeout', 3000)
    assert.equal(cache.get('key-timeout'), 'value-timeout')
    setTimeout(() => {
      assert.equal(cache.get('key-timeout'), '')
      done()
    }, 4000)

  })
  

  it('Test performance', () => {
    const hrstart = process.hrtime()
    console.log('\nTest heap status ====== ')
    let total = process.memoryUsage().heapTotal / 1024 / 1024
    console.log('total:' + total)
    let used = process.memoryUsage().heapUsed / 1024 / 1024
    console.log('used:' + used)

    for (let a = 0; a < 2; a++) {
      for (let i = 0; i < 1000000; i++) {
        cache.put(`key-${i}`, `val-${i}`)
      }

      console.log('\nAfter fill cache ====== ')
      console.log('demo cache:' + cache.get('key-1'))
      total = process.memoryUsage().heapTotal / 1024 / 1024
      console.log('total:' + total)
      used = process.memoryUsage().heapUsed / 1024 / 1024
      console.log('used:' + used)

      cache.drop()

      console.log('\nAfter drop cache ====== ')
      console.log('demo cache:' + cache.get('key-1'))
      total = process.memoryUsage().heapTotal / 1024 / 1024
      console.log('total:' + total)
      used = process.memoryUsage().heapUsed / 1024 / 1024
      console.log('used:' + used)
    }

    const hrend = process.hrtime(hrstart)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
  })

})
