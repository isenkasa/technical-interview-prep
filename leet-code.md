# LeetCode

## Arrays and Hashing

### Contains Duplicate
Given an integer array nums, return true if any value appears more than once in the array, otherwise return false.
```
hasDuplicate(nums) {
    const set = new Set();
    for (const num of nums) {
        if (set.has(num)) {
            return true;
        }
        set.add(num);
    }
    return false;
}
```

Solution: use HashMap (or Set)
Runtime: O(n)
Space: O(n)

Notes: Remember the difference between ```of ... ``` and ``` in ... ``` in Javascript.

``` in ... ``` is used to display the indeces
``` of ... ``` is used to display the values

Use Set → duplicates, membership, fast lookup
Use Map → when you need to associate data with keys

### Valid Anagram
Given two strings s and t, return true if the two strings are anagrams of each other, otherwise return false.

```
isAnagram(s, t) {
    if (s.length !== t.length) {
        return false;
    }

    const countS = {};
    const countT = {};
    for (let i = 0; i < s.length; i++) {
        countS[s[i]] = (countS[s[i]] || 0) + 1;
        countT[t[i]] = (countT[t[i]] || 0) + 1;
    }

    for (const key in countS) {
        if (countS[key] !== countT[key]) {
            return false;
        }
    }
    return true;
}
```

Solution: use HashMap
Runtime: O(n)
Space: O(n)

Notes: make sure to check length first. If the two strings are not the same length, then they can't be anagrams.
Also, make sure to ask about case sensitivity.

Other solutions include using an array to count. If we want to solve using O(1) space, we need to sort the strings and compare. In Javascript, we would need to do something like the following:
```
    let sSort = s.split('').sort().join();
    let tSort = t.split('').sort().join();
    return sSort == tSort;
```

### Two Sum
Given an array of integers nums and an integer target, return the indices i and j such that nums[i] + nums[j] == target and i != j.

You may assume that every input has exactly one pair of indices i and j that satisfy the condition.

Return the answer with the smaller index first.

```
twoSum(nums, target) {
    const prevMap = new Map();

    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (prevMap.has(diff)) {
            return [prevMap.get(diff), i];
        }

        prevMap.set(nums[i], i);
    }

    return [];
}
```

Solution: use HashMap
Runtime: O(n)
Space: O(n)

Notes: need to be familiar with the Map() functions - very useful for working with hashmaps.
Need to clarify with interviewer whether we can use the same element twice. Do we return values instead of indeces? There could be variations of this same problem.

### Group Anagrams

Given an array of strings strs, group all anagrams together into sublists. You may return the output in any order.

An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.

There are two possible solutions to this problem.

**Sorting**
```
groupAnagrams(strs) {
    const res = {};
    for (let s of strs) {
        const sortedS = s.split('').sort().join('');
        if (!res[sortedS]) {
            res[sortedS] = [];
        }
        res[sortedS].push(s);
    }
    return Object.values(res);
}
```
Time complexity: O(n*logn)
Space complexity: O(n)

**HashMap**
```
groupAnagrams(strs) {
    const res = {};
    for (let s of strs) {
        const count = new Array(26).fill(0);
        for (let c of s) {
            count[c.charCodeAt(0) - 'a'.charCodeAt(0)] += 1;
        }
        const key = count.join(',');
        if (!res[key]) {
            res[key] = [];
        }
        res[key].push(s);
    }
    return Object.values(res);
}
```
Time complexity: O(n)
Space complexity: O(n)

### Top K Frequent Elements
Given an integer array nums and an integer k, return the k most frequent elements within the array.

The test cases are generated such that the answer is always unique.

You may return the output in any order.
```
function topKFrequent(nums, k) {
  // Step 1: Count frequency of each number
  const freqMap = new Map()

  for (const num of nums) {
    // Increment count or initialize to 1
    freqMap.set(num, (freqMap.get(num) || 0) + 1)
  }

  // Step 2: Create buckets
  // Index = frequency, value = array of numbers with that frequency
  const buckets = Array(nums.length + 1)
    .fill(null)
    .map(() => [])

  // Step 3: Place numbers into corresponding frequency buckets
  for (const [num, freq] of freqMap.entries()) {
    buckets[freq].push(num)
  }

  // Step 4: Collect top k frequent elements
  const result = []

  // Iterate from highest possible frequency to lowest
  for (let freq = buckets.length - 1; freq >= 0 && result.length < k; freq--) {
    for (const num of buckets[freq]) {
      result.push(num)

      // Stop once we have k elements
      if (result.length === k) {
        return result
      }
    }
  }

  return result
}
```

Solution is to use Bucket Sort. 
Time: O(n)
Space: O(n)

### Encode and Decode Strings
Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.

Implement the encode and decode methods.

```
function encode (strs) {
let encodedString = ''

for (const word of strs) {
    // Append length + delimiter + actual string
    encodedString += word.length + '#' + word
}

return encodedString
}

/**
* Decodes a single string back into a list of strings
* @param {string} str
* @returns {string[]}
*/
function decode (str) {
const decodedStrings = []
let currentIndex = 0

while (currentIndex < str.length) {
    let delimiterIndex = currentIndex

    // Find the '#' that separates length and word
    while (str[delimiterIndex] !== '#') {
    delimiterIndex++
    }

    // Extract length of the next word
    const wordLength = Number(str.slice(currentIndex, delimiterIndex))

    // Extract the word using the known length
    const wordStart = delimiterIndex + 1
    const wordEnd = wordStart + wordLength
    const word = str.slice(wordStart, wordEnd)

    decodedStrings.push(word)

    // Move pointer to the start of the next encoded segment
    currentIndex = wordEnd
}

return decodedStrings
}
```
Note: String operations are essential to come up with a solution for this one
Time: O(n)
Space: O(n)

### Products of Array Except Self
Given an integer array nums, return an array output where output[i] is the product of all the elements of nums except nums[i].

Each product is guaranteed to fit in a 32-bit integer.
```
function productExceptSelf (nums) {
const n = nums.length
const prefix = new Array(n).fill(1)
const postfix = new Array(n).fill(1)
const result = new Array(n)

// Build prefix products
for (let i = 1; i < n; i++) {
    prefix[i] = prefix[i - 1] * nums[i - 1]
}

// Build postfix products
for (let i = n - 2; i >= 0; i--) {
    postfix[i] = postfix[i + 1] * nums[i + 1]
}

// Build result
for (let i = 0; i < n; i++) {
    result[i] = prefix[i] * postfix[i]
}

return result
}
```
Time: O(n)
Space: O(n)

### Valid Sudoku
```
class Solution {
  /**
   * @param {character[][]} board
   * @return {boolean}
   */
  isValidSudoku (board) {
    // Create 9 sets for rows, columns, and 3x3 squares
    const rows = Array.from({ length: 9 }, () => new Set())
    const cols = Array.from({ length: 9 }, () => new Set())
    const squares = Array.from({ length: 9 }, () => new Set())

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const value = board[row][col]

        // Skip empty cells
        if (value === '.') continue

        // Determine which 3x3 square this cell belongs to
        // Formula maps (row, col) → index 0–8
        const squareIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3)

        // Check if value already exists in row, column, or square
        if (rows[row].has(value)) return false
        if (cols[col].has(value)) return false
        if (squares[squareIndex].has(value)) return false

        // Add value to corresponding row, column, and square sets
        rows[row].add(value)
        cols[col].add(value)
        squares[squareIndex].add(value)
      }
    }

    // If no duplicates found, board is valid
    return true
  }
}
```
Time: O(n^2)
Space: O(n^2)

### Longest Consecutive Sequence
```
class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  longestConsecutive (nums) {
    // Convert array to Set for O(1) lookups
    const numSet = new Set(nums)

    // Track longest consecutive sequence found
    let longest = 0

    // Iterate through unique numbers
    for (const num of numSet) {
      // Only start counting if this is the beginning of a sequence
      // (i.e., no number exists before it)
      if (!numSet.has(num - 1)) {
        let length = 1

        // Keep expanding the sequence forward
        while (numSet.has(num + length)) {
          length++
        }

        // Update longest sequence length
        longest = Math.max(longest, length)
      }
    }

    return longest
  }
}
```
Time: O(n)
Space: O(n)

## Two Pointers
## Sliding Window
## Binary Search