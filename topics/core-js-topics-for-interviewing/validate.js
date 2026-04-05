const {
  doubleNumbers,
  filterEvenNumbers,
  sumArray,
  buildFrequencyMap,
  buildFrequencyObject,
  removeDuplicates,
  sortNumbersAscending,
  sliceMiddle,
  spliceReplace,
  createGrid,
  flattenOneLevel,
  isAlphanumericPalindrome,
  reverseWords,
  groupByParity,
  longestWord,
  createCounter,
  safeGetUserCity,
  queueGame,
  asyncDoubleAfterDelay,
  prefixSums
} = require('./starter')

function test(name, fn) {
  try {
    fn()
    console.log('PASS:', name)
  } catch (e) {
    console.log('FAIL:', name)
  }
}

// ================================
// TESTS
// ================================

test('doubleNumbers', () => {
  const res = doubleNumbers([1,2,3])
  if (JSON.stringify(res) !== JSON.stringify([2,4,6])) throw ''
})

test('filterEvenNumbers', () => {
  const res = filterEvenNumbers([1,2,3,4])
  if (JSON.stringify(res) !== JSON.stringify([2,4])) throw ''
})

test('sumArray', () => {
  if (sumArray([1,2,3]) !== 6) throw ''
})

test('buildFrequencyMap', () => {
  const map = buildFrequencyMap([1,2,2])
  if (map.get(2) !== 2) throw ''
})

test('buildFrequencyObject', () => {
  const obj = buildFrequencyObject(['a','a','b'])
  if (obj.a !== 2 || obj.b !== 1) throw ''
})

test('removeDuplicates', () => {
  const res = removeDuplicates([1,1,2])
  if (JSON.stringify(res) !== JSON.stringify([1,2])) throw ''
})

test('sortNumbersAscending', () => {
  const res = sortNumbersAscending([10,2,5])
  if (JSON.stringify(res) !== JSON.stringify([2,5,10])) throw ''
})

test('sliceMiddle', () => {
  const res = sliceMiddle([1,2,3,4],1,3)
  if (JSON.stringify(res) !== JSON.stringify([2,3])) throw ''
})

test('spliceReplace', () => {
  const res = spliceReplace([1,2,3,4],1,2,99,100)
  if (JSON.stringify(res) !== JSON.stringify([1,99,100,4])) throw ''
})

test('createGrid', () => {
  const grid = createGrid(2,3,0)
  if (grid.length !== 2 || grid[0].length !== 3) throw ''
})

test('flattenOneLevel', () => {
  const res = flattenOneLevel([[1,2],[3,4]])
  if (JSON.stringify(res) !== JSON.stringify([1,2,3,4])) throw ''
})

test('isAlphanumericPalindrome', () => {
  if (!isAlphanumericPalindrome('A man, a plan, a canal: Panama')) throw ''
})

test('reverseWords', () => {
  const res = reverseWords('  hello   world ')
  if (res !== 'world hello') throw ''
})

test('groupByParity', () => {
  const res = groupByParity([1,2,3,4])
  if (JSON.stringify(res.even) !== JSON.stringify([2,4])) throw ''
})

test('longestWord', () => {
  if (longestWord(['cat','banana','dog']) !== 'banana') throw ''
})

test('createCounter', () => {
  const counter = createCounter(5)
  if (counter() !== 5 || counter() !== 6) throw ''
})

test('safeGetUserCity', () => {
  if (safeGetUserCity({}) !== 'Unknown') throw ''
})

test('queueGame', () => {
  if (queueGame(['A','B','C','D'],2) !== 'A') throw ''
})

test('prefixSums', () => {
  const res = prefixSums([1,2,3])
  if (JSON.stringify(res) !== JSON.stringify([0,1,3,6])) throw ''
})

// async test
asyncDoubleAfterDelay(5).then(res => {
  if (res === 10) {
    console.log('PASS: asyncDoubleAfterDelay')
  } else {
    console.log('FAIL: asyncDoubleAfterDelay')
  }
})