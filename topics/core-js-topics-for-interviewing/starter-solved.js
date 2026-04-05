// ================================
// TASK IMPLEMENTATIONS
// ================================

function doubleNumbers(nums) {
  return nums.map((num) => num * 2)
}

function filterEvenNumbers(nums) {
  return nums.filter((num) => num % 2 === 0)
}

function sumArray(nums) {
  let total = 0
  for (let num of nums) {
    total += num;
  }
  return total
}

function buildFrequencyMap(nums) {
  let map = new Map()
  for (let num of nums) {
    map.set(num, (map.get(num) || 0) + 1)
  }
  return map
}

function buildFrequencyObject(chars) {
  let obj = {}
  for (let ch of chars) {
    obj[ch] = (obj[ch] || 0) + 1
  }
  return obj
}

function removeDuplicates(nums) {
  let arr = [... new Set(nums)]
  return arr
}

function sortNumbersAscending(nums) {
  return nums.sort((a,b) => a - b)
}

function sliceMiddle(arr, start, end) {
  return arr.slice(start, end)
}

function spliceReplace(arr, start, deleteCount, ...items) {
  const copy = [...arr] // create copy (non-mutating)
  copy.splice(start, deleteCount, ...items)
  return copy
}

function createGrid(rows, cols, fillValue) {
  let grid = Array.from({ length: rows}, () => Array(cols).fill(fillValue))
  return grid
}

function flattenOneLevel(arr) {
  return arr.flat(1)
}

function isAlphanumericPalindrome(s) {
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '')
  const reversed = s.split('').reverse().join('')
  return s === reversed
}

function reverseWords(sentence) {
  return sentence
    .trim()               // remove outer spaces
    .split(/\s+/)         // split by 1+ spaces
    .reverse()            // reverse words
    .join(' ')            // join with single space
}

function groupByParity(nums) {
  let obj = {
    even: [],
    odd: []
  }
  for (let num of nums) {
    if (num % 2 === 0) {
      obj.even.push(num)
    } else obj.odd.push(num)
  }
  return obj;
}

function longestWord(words) {
  let max = 0
  let str = ""

  for (const word of words) {
    if (word.length > max) {
      max = word.length
      str = word
    }
  }
  return str
}

function createCounter(start) {
  return function () {
    const current = start
    start++
    return current
  }
}

function safeGetUserCity(user) {
  return user?.profile?.address?.city ?? 'Unknown'
}

function queueGame(players, count) {
  const queue = [...players]

  while (queue.length > 1) {
    // move front to back count - 1 times
    for (let i = 0; i < count - 1; i++) {
      queue.push(queue.shift())
    }

    // remove eliminated player
    queue.shift()
  }

  return queue[0]
}

function asyncDoubleAfterDelay(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * 2)
    }, 100)
  })
}

function prefixSums(nums) {
  const result = [0]

  for (let num of nums) {
    result.push(result[result.length - 1] + num)
  }

  return result
}

module.exports = {
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
}