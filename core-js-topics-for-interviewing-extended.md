# Core JavaScript Topics (Interview-Focused)

This is an interview-focused JavaScript reference for:
- LeetCode
- backend interviews
- writing clean, correct code under pressure

It focuses on the JavaScript behaviors and patterns that show up often in coding interviews.

How to use this file:
- read the explanation first
- run the example mentally
- then try to write the pattern from memory

---

# 1. Arrays

## Creation patterns

```js
Array(n)
// Creates an array with length n, but with empty slots
// Example:
const arr = Array(3)
console.log(arr.length) // 3
console.log(arr) // [ <3 empty items> ]

Array(n).fill(0)
// Creates an array with real values in every slot
// Example:
const nums = Array(3).fill(0)
console.log(nums) // [0, 0, 0]
```

Why this matters:
- `Array(n)` is useful when you plan to fill values later by index
- `Array(n).fill(0)` is better when you want a usable initialized array right away

---

## Critical gotcha: shared references

```js
Array(3).fill([]) // wrong for independent inner arrays
// Create array of empty arrays
Array(3).fill(null).map(() => []) // correct
```

Why:
- `fill([])` puts the exact same inner array reference in every slot
- if you mutate one, all of them appear to change

Wrong:

```js
const arr = Array(3).fill([])
arr[0].push(1)
console.log(arr) // [[1], [1], [1]]
```

What happened:
- all 3 positions point to the same inner array

Correct:

```js
const arr = Array(3).fill(null).map(() => [])
arr[0].push(1)
console.log(arr) // [[1], [], []]
```

What changed:
- `map(() => [])` creates a brand new inner array each time

---

## Iteration patterns

```js
for (let i = 0; i < arr.length; i++) {
  // use when you need the index
  // example: compare arr[i] with arr[i - 1]
}

for (const value of arr) {
  // use when you only need the value
  // cleaner than indexing
}

arr.forEach((value, index) => {
  // similar to for...of, but uses a callback
  // good for simple iteration, not ideal when you need break/continue
})
```

Use:
- indexed `for` loop for two pointers, DP, and neighbor comparisons
- `for...of` for clean iteration
- `forEach` for simple side effects like logging

---

## Common methods

```js
let arr = [1, 2, 3, 4]

// === ADD / REMOVE (MUTATES array) ===

arr.push(5)
// Adds value to end
// arr is now [1, 2, 3, 4, 5]

arr.pop()
// Removes last value and returns it
// returns 5
// arr is now [1, 2, 3, 4]

arr.shift()
// Removes first value and returns it
// returns 1
// arr is now [2, 3, 4]

arr.unshift(1)
// Adds value to beginning
// arr is now [1, 2, 3, 4]

// === ITERATION / TRANSFORMATION (DOES NOT mutate) ===

const doubled = arr.map(x => x * 2)
// map = transform every element into a new value
// [2, 4, 6, 8]
// original arr is still [1, 2, 3, 4]

const filtered = arr.filter(x => x > 2)
// filter = keep only elements that pass the condition
// [3, 4]
// original arr is still [1, 2, 3, 4]

const sum = arr.reduce((acc, x) => {
  // acc = accumulator, the running result so far
  // x = current array element
  return acc + x
}, 0)
// reduce = combine array into one final value
// result is 10
//
// step by step:
// acc = 0, x = 1 -> 1
// acc = 1, x = 2 -> 3
// acc = 3, x = 3 -> 6
// acc = 6, x = 4 -> 10

// === ORDERING (MUTATES array) ===

arr.sort((a, b) => b - a)
// Sort numbers descending
// arr becomes [4, 3, 2, 1]

arr.reverse()
// Reverses array in place
// arr becomes [1, 2, 3, 4]

// === COPYING / MODIFYING ===

const subArray = arr.slice(1, 3)
// slice(start, end)
// start is included, end is not
// returns [2, 3]
// original arr stays [1, 2, 3, 4]

arr.splice(1, 2)
// splice(start, deleteCount)
// remove 2 elements starting at index 1
// removes [2, 3]
// arr becomes [1, 4]

arr.splice(1, 0, 99)
// splice(start, deleteCount, itemsToInsert)
// deleteCount = 0 means remove nothing
// inserts 99 at index 1
// arr becomes [1, 99, 4]

arr.splice(1, 1, 50)
// remove 1 element at index 1, then insert 50
// arr becomes [1, 50, 4]
```

Quick mental rule:
- `map`, `filter`, `slice` return new arrays
- `push`, `pop`, `shift`, `unshift`, `sort`, `reverse`, `splice` change the original array

---

## Important behaviors

- `sort()` mutates the array
- `reverse()` mutates the array
- `slice()` does not mutate
- `splice()` mutates
- `map()` returns a new array
- `filter()` returns a new array
- `reduce()` returns a single accumulated value

Common mistake:

```js
const arr = [5, 6, 7]

arr.filter(x => x > 6)
console.log(arr) // [5, 6, 7]
```

Why:
- `filter()` returned a new array, but you never stored it

Correct:

```js
const filtered = arr.filter(x => x > 6)
console.log(filtered) // [7]
```

Or:

```js
arr = arr.filter(x => x > 6)
```

---

## Useful interview array patterns

### Build frequency array

Use this when:
- numbers are small and fixed range
- example: digits `0-9`
- example: lowercase letters after converting char to index

```js
const nums = [1, 3, 3, 5]
const freq = Array(10).fill(0)
// Index = number
// Value at that index = how many times it appears
// Starts as:
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

for (const num of nums) {
  freq[num]++
}

console.log(freq)
// [0, 1, 0, 2, 0, 1, 0, 0, 0, 0]
//
// Meaning:
// 1 appears once
// 3 appears twice
// 5 appears once
```

Why this is useful:
- lookup and update are O(1)
- often faster and simpler than `Map` when range is small

### Two-dimensional array

Use this for:
- grids
- matrix BFS/DFS
- dynamic programming tables

```js
const rows = 2
const cols = 3

const grid = Array.from({ length: rows }, () => Array(cols).fill(0))

console.log(grid)
// [
//   [0, 0, 0],
//   [0, 0, 0]
// ]
```

Why `Array.from`:
- it creates a new row each time

Wrong:

```js
const badGrid = Array(rows).fill(Array(cols).fill(0))
badGrid[0][0] = 9
console.log(badGrid)
// [
//   [9, 0, 0],
//   [9, 0, 0]
// ]
```

The bug:
- both rows point to the same inner array

### Flattening

Use this when you have nested arrays and want one level of values.

```js
const arr = [[1, 2], [3, 4]]
const flat = arr.flat()

console.log(flat) // [1, 2, 3, 4]
```

By default:
- `flat()` removes one nesting level

More examples:

```js
const nested = [1, [2, [3, 4]]]

console.log(nested.flat()) // [1, 2, [3, 4]]
console.log(nested.flat(2)) // [1, 2, 3, 4]
console.log(nested.flat(Infinity)) // [1, 2, 3, 4]
```

### Copy array

Use this when:
- you want to avoid mutating original input
- you need to sort safely
- you want a quick shallow copy

```js
const arr = [1, 2, 3]

const copy = [...arr]
const copy2 = arr.slice()

copy.push(4)

console.log(arr) // [1, 2, 3]
console.log(copy) // [1, 2, 3, 4]
console.log(copy2) // [1, 2, 3]
```

Important:
- these are shallow copies

```js
const arr = [{ value: 1 }]
const copy = [...arr]

copy[0].value = 99

console.log(arr) // [{ value: 99 }]
console.log(copy) // [{ value: 99 }]
```

Why:
- the outer array is copied
- the inner object reference is still shared

---

# 2. Objects vs Map

## Object

```js
const obj = {}
obj['key'] = 123
console.log(obj['key']) // 123
```

Use object when:
- keys are simple strings
- you want lightweight syntax
- you are doing basic counting or grouping

Example: count characters

```js
const count = {}

for (const ch of 'banana') {
  count[ch] = (count[ch] || 0) + 1
}

console.log(count)
// { b: 1, a: 3, n: 2 }
```

## Map

```js
const map = new Map()
map.set('key', 123)
console.log(map.get('key')) // 123
```

Use `Map` when:
- keys are not guaranteed to be strings
- you want cleaner hash map semantics
- you want to avoid object key coercion

Example:

```js
const map = new Map()
map.set(10, 'ten')
map.set(true, 'yes')

console.log(map.get(10)) // 'ten'
console.log(map.get(true)) // 'yes'
```

## When to use Object

Use object when:
- keys are simple strings
- you want a lightweight plain structure

## When to use Map

Use `Map` when:
- keys are not guaranteed to be strings
- you want predictable insertion and iteration behavior
- you want cleaner interview code for hash map problems

## Map methods

```js
map.set(key, value)   // insert or update
map.get(key)          // read value
map.has(key)          // check existence
map.delete(key)       // remove key
map.size              // number of entries
```

## Iterating over a Map

```js
for (const [key, value] of map.entries()) {
  // key and value pair
}

for (const [key, value] of map) {
  // same thing, because default iterator gives entries
}
```

## Interview note

For many LeetCode-style problems, `Map` is preferred over plain objects because it is more explicit and avoids some key coercion issues.

---

# 3. Strings

## Basics

```js
const s = 'hello'
console.log(s.length) // 5
console.log(s[0]) // 'h'
```

## Important property

Strings are immutable.
You cannot modify a character in place.

```js
let s = 'abc'
s[0] = 'z'
console.log(s) // still 'abc'
```

If you want to change a string:
- build a new string
- or convert it to an array, modify, and join back

## Common methods

```js
const s = 'hello world'

s.slice(0, 5)       // 'hello'
s.substring(0, 5)   // 'hello'
s.split(' ')        // ['hello', 'world']
['a', 'b'].join('-') // 'a-b'
s.includes('he')    // true
s.indexOf('l')      // 2
s.toLowerCase()     // 'hello world'
s.toUpperCase()     // 'HELLO WORLD'
'  hi  '.trim()     // 'hi'
```

## Common interview patterns

### Reverse string

```js
const s = 'abc'
const reversed = s.split('').reverse().join('')

console.log(reversed) // 'cba'
```

How it works:
- `split('')` -> `['a', 'b', 'c']`
- `reverse()` -> `['c', 'b', 'a']`
- `join('')` -> `'cba'`

### Frequency count of characters

```js
const map = new Map()

for (const ch of 'banana') {
  map.set(ch, (map.get(ch) || 0) + 1)
}

console.log(map)
// Map { 'b' => 1, 'a' => 3, 'n' => 2 }
```

### Remove non-alphanumeric characters

Common in palindrome problems.

```js
const cleaned = 'A man, a plan, a canal: Panama'
  .toLowerCase()
  .replace(/[^a-z0-9]/g, '')

console.log(cleaned) // 'amanaplanacanalpanama'
```

Meaning of the regex:
- `[a-z0-9]` = allowed characters
- `^` inside brackets means “not”
- `g` means do it globally across the whole string

---

# 4. References vs Values

This is one of the most important JS concepts for interviews.

## Primitive values copy by value

Primitives:
- number
- string
- boolean
- null
- undefined
- bigint
- symbol

```js
let a = 5
let b = a
b = 10

console.log(a) // 5
console.log(b) // 10
```

Why:
- `b` got its own copy of the primitive value

## Objects and arrays copy by reference

```js
const a = []
const b = a
b.push(1)

console.log(a) // [1]
console.log(b) // [1]
```

Why:
- `a` and `b` point to the same array in memory

## Why this matters

This affects:
- `fill([])`
- copying arrays and objects
- mutating nested structures
- passing data around in interviews

## Copying objects and arrays safely

```js
const arr = [1, 2, 3]
const arrCopy = [...arr]

const obj = { x: 1, y: 2 }
const objCopy = { ...obj }
```

Note:
These are shallow copies, not deep copies.

```js
const original = { nested: { value: 1 } }
const copy = { ...original }

copy.nested.value = 99

console.log(original.nested.value) // 99
```

---

# 5. Set

## Basics

```js
const set = new Set()

set.add(1)
set.add(2)
set.add(2) // duplicate, ignored

console.log(set.has(1)) // true
console.log(set.has(3)) // false

set.delete(2)
console.log(set) // Set { 1 }
```

## Why Set is useful

Use `Set` for:
- uniqueness
- fast membership checks
- visited tracking in graph problems

## Example: remove duplicates

```js
const nums = [1, 2, 2, 3, 3]
const unique = [...new Set(nums)]

console.log(unique) // [1, 2, 3]
```

## Example: visited set

```js
const visited = new Set()

if (!visited.has(node)) {
  visited.add(node)
}
```

## Example: longest consecutive sequence pattern

```js
const nums = [100, 4, 200, 1, 3, 2]
const numSet = new Set(nums)

console.log(numSet.has(4)) // true
console.log(numSet.has(5)) // false
```

This matters because membership checks are O(1) on average.

---

# 6. Frequency patterns

This is one of the most common interview patterns.

## Using Map

```js
const nums = [1, 1, 2, 3, 3, 3]
const map = new Map()

for (const num of nums) {
  map.set(num, (map.get(num) || 0) + 1)
}

console.log(map)
// Map { 1 => 2, 2 => 1, 3 => 3 }
```

## Using object

```js
const nums = [1, 1, 2, 3, 3, 3]
const count = {}

for (const num of nums) {
  count[num] = (count[num] || 0) + 1
}

console.log(count)
// { '1': 2, '2': 1, '3': 3 }
```

## When this shows up

- Top K Frequent Elements
- Valid Anagram
- Group Anagrams
- character counting
- majority element
- duplicate detection

---

# 7. Sorting

## Numbers

```js
const nums = [10, 2, 5]

nums.sort((a, b) => a - b)
// ascending
// [2, 5, 10]

nums.sort((a, b) => b - a)
// descending
// [10, 5, 2]
```

## Strings

```js
const words = ['banana', 'apple', 'cat']
words.sort()

console.log(words) // ['apple', 'banana', 'cat']
```

## Objects or pairs

```js
const arr = [
  { word: 'a', freq: 2 },
  { word: 'b', freq: 1 }
]

arr.sort((a, b) => a.freq - b.freq)
// sort by freq ascending
```

```js
const pairs = [[3, 'c'], [1, 'a'], [2, 'b']]
pairs.sort((a, b) => b[0] - a[0])
// sort by first value descending
```

## Important gotcha

Default `sort()` converts values to strings and sorts lexicographically.

```js
console.log([10, 2, 5].sort()) // [10, 2, 5]
```

Why that is wrong for numbers:
- it compares `'10'`, `'2'`, `'5'` as strings

Use a comparator for numbers.

---

# 8. Two-dimensional arrays

## Correct creation

```js
const rows = 3
const cols = 2

const grid = Array.from({ length: rows }, () => Array(cols).fill(0))

console.log(grid)
// [
//   [0, 0],
//   [0, 0],
//   [0, 0]
// ]
```

## Wrong creation

```js
const grid = Array(rows).fill(Array(cols).fill(0))
```

Wrong because each row points to the same inner array.

Proof:

```js
grid[0][0] = 9
console.log(grid)
// [
//   [9, 0],
//   [9, 0],
//   [9, 0]
// ]
```

---

# 9. Stack and queue patterns

## Stack (LIFO)

```js
const stack = []

stack.push(1)
stack.push(2)

const top = stack.pop()

console.log(top) // 2
console.log(stack) // [1]
```

Used for:
- DFS
- monotonic stack
- parentheses problems

## Queue (FIFO)

```js
const queue = []

queue.push(1)
queue.push(2)

const first = queue.shift()

console.log(first) // 1
console.log(queue) // [2]
```

Used for:
- BFS
- level-order traversal

## Performance note

`shift()` is not ideal for very large queues because it reindexes the array.
In interviews, it is often acceptable.
For more optimized queue usage, track an index:

```js
const queue = ['A']
let front = 0

while (front < queue.length) {
  const node = queue[front]
  front++
  console.log(node)
}
```

Why this helps:
- no expensive shifting of all remaining elements

---

# 10. Closures

A closure is when an inner function remembers variables from an outer scope.

```js
function outer() {
  let count = 0

  return function inner() {
    count++
    return count
  }
}

const fn = outer()
console.log(fn()) // 1
console.log(fn()) // 2
console.log(fn()) // 3
```

Why this works:
- `inner` keeps access to `count` even after `outer` finished running

## Why it matters

Closures are important for:
- interviews about JS fundamentals
- preserving state
- callbacks
- factory functions

---

# 11. Scope and hoisting

## Scope types

- global scope
- function scope
- block scope

## `var` vs `let` vs `const`

### `var`
- function-scoped
- hoisted
- can be redeclared

### `let`
- block-scoped
- hoisted but in temporal dead zone
- can be reassigned

### `const`
- block-scoped
- cannot be reassigned
- object contents can still be mutated

Example:

```js
if (true) {
  let a = 1
  const b = 2
  var c = 3
}

console.log(c) // 3
// console.log(a) // ReferenceError
// console.log(b) // ReferenceError
```

`a` and `b` are not available outside the block.

Hoisting note:
- declarations are processed before execution
- but `let` and `const` cannot be accessed before their declaration line

---

# 12. Event loop

Important for Node and JS interviews.

## Key concepts

- call stack
- Web APIs / runtime APIs
- callback queue
- microtask queue

## Microtasks vs macrotasks

```js
console.log('start')

setTimeout(() => {
  console.log('timeout')
}, 0)

Promise.resolve().then(() => {
  console.log('promise')
})

console.log('end')
```

Output:

```txt
start
end
promise
timeout
```

Why:
- synchronous code runs first
- microtasks (`Promise.then`) run before macrotasks (`setTimeout`)

## Why this matters

This explains:
- async behavior
- promise scheduling
- Node / JS runtime questions

---

# 13. Promises and async/await

## Promise basics

A Promise represents a future value.

```js
const p = new Promise((resolve, reject) => {
  resolve(123)
})
```

## Using `.then()`

```js
p.then(value => {
  console.log(value) // 123
})
```

## `async` / `await`

```js
async function getData() {
  const result = await fetchSomething()
  return result
}
```

Important:
- `await` pauses inside the async function until promise settles
- `async` functions always return a Promise

## Error handling

```js
async function run() {
  try {
    const result = await fetchSomething()
    console.log(result)
  } catch (err) {
    console.log(err)
  }
}
```

## Common interview points

- `await` only works inside `async` functions
- `async` functions always return a Promise
- use `try/catch` around awaited operations

---

# 14. Destructuring

## Array destructuring

```js
const arr = [10, 20]
const [a, b] = arr

console.log(a) // 10
console.log(b) // 20
```

Useful when:
- a function returns a pair
- you are iterating over `[key, value]`

## Object destructuring

```js
const obj = { x: 1, y: 2 }
const { x, y } = obj

console.log(x) // 1
console.log(y) // 2
```

Useful when:
- reading properties cleanly
- unpacking config objects

---

# 15. Spread and rest

## Spread

```js
const arr = [1, 2]
const arr2 = [...arr, 3]

console.log(arr2) // [1, 2, 3]

const obj = { x: 1 }
const obj2 = { ...obj, y: 2 }

console.log(obj2) // { x: 1, y: 2 }
```

## Rest

```js
function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0)
}

console.log(sum(1, 2, 3)) // 6
```

## Important note

Spread creates shallow copies.

---

# 16. Common loop patterns

## Standard indexed loop

```js
for (let i = 0; i < arr.length; i++) {
  // use when you need the index
}
```

Use when:
- you need index access
- two-pointer logic
- dynamic programming arrays

## `for...of`

```js
for (const value of arr) {
  // value only
}
```

Use when:
- you only need values
- cleaner iteration

## `for...in`

```js
for (const key in obj) {
  console.log(key, obj[key])
}
```

Use mostly for objects, not arrays.

Interview note:
Avoid `for...in` for arrays in most cases because it iterates keys, not values.

---

# 17. Common array/string interview patterns

## Two pointers

```js
let left = 0
let right = arr.length - 1

while (left < right) {
  // do work with arr[left] and arr[right]
  left++
  right--
}
```

Use for:
- palindrome checks
- sorted array problems
- reversing

## Sliding window

```js
let left = 0

for (let right = 0; right < arr.length; right++) {
  while (someCondition) {
    left++
  }
}
```

Use for:
- longest substring
- subarray sum constraints
- window optimization problems

## Fast lookup

```js
const set = new Set()
const map = new Map()
```

Use when:
- you need O(1) membership or counts

## Prefix sum

```js
const nums = [2, 4, 6]
const prefix = Array(nums.length + 1).fill(0)

for (let i = 0; i < nums.length; i++) {
  prefix[i + 1] = prefix[i] + nums[i]
}

console.log(prefix) // [0, 2, 6, 12]
```

Meaning:
- sum of `nums[0..i]` is stored using previous prefix values

---

# 18. Mutation vs non-mutation

Know which methods mutate and which do not.

## Mutating methods

- `push`
- `pop`
- `shift`
- `unshift`
- `sort`
- `reverse`
- `splice`

## Non-mutating methods

- `map`
- `filter`
- `reduce`
- `slice`
- `concat`

This matters in interviews because accidental mutation can cause bugs.

Example:

```js
const nums = [3, 1, 2]
const sorted = [...nums].sort((a, b) => a - b)

console.log(nums) // [3, 1, 2]
console.log(sorted) // [1, 2, 3]
```

---

# 19. Equality basics

## Strict equality

```js
a === b
```

Preferred almost always.

## Loose equality

```js
a == b
```

Avoid in interview code because of type coercion.

Example:

```js
0 == false // true
0 === false // false
'' == 0 // true
'' === 0 // false
```

Use `===`.

---

# 20. Truthy and falsy values

Falsy values:
- `false`
- `0`
- `''`
- `null`
- `undefined`
- `NaN`

Truthy values include most other values, such as:
- non-empty strings
- non-zero numbers
- arrays
- objects

Important example:

```js
count[num] = (count[num] || 0) + 1
```

This works because missing value is `undefined`, which is falsy.

Be careful when `0` is a valid stored value and you need to distinguish it.

---

# 21. Parsing and numeric conversion

## Convert string to number

```js
Number('42') // 42
parseInt('42', 10) // 42
```

Difference:
- `Number('42abc')` -> `NaN`
- `parseInt('42abc', 10)` -> `42`

## Common place it matters

When using object keys:

```js
const obj = { 1: 3 }
console.log(Object.entries(obj)) // [['1', 3]]
```

Keys come back as strings, so you may need:

```js
parseInt(num, 10)
```

---

# 22. Template literals

```js
const name = 'Alex'
const s = `Hello ${name}`

console.log(s) // 'Hello Alex'
```

Useful for:
- readable string building
- dynamic cache keys
- debug output

Example:

```js
const row = 1
const col = 2
const key = `${row},${col}`
```

Useful when you want to simulate tuple-like keys in JavaScript.

---

# 23. Optional chaining and nullish coalescing

## Optional chaining

```js
obj?.a?.b
```

Avoids crashing when a property is missing.

Example:

```js
const user = {}
console.log(user?.profile?.name) // undefined
```

## Nullish coalescing

```js
const value = input ?? defaultValue
```

Uses default only when value is `null` or `undefined`.

Different from `||`, which also treats `0`, `false`, and `''` as missing.

Example:

```js
console.log(0 || 100) // 100
console.log(0 ?? 100) // 0
```

---

# 24. Common interview-ready snippets

## Frequency map

```js
const map = new Map()

for (const num of nums) {
  map.set(num, (map.get(num) || 0) + 1)
}
```

## Count chars

```js
const count = {}

for (const ch of s) {
  count[ch] = (count[ch] || 0) + 1
}
```

## Build independent buckets

```js
const buckets = Array(n).fill(null).map(() => [])
```

## Create visited set

```js
const visited = new Set()
```

## Numeric sort

```js
nums.sort((a, b) => a - b)
```

---

# 25. What you should be able to do without hesitation

You should be able to:
- create arrays correctly
- avoid shared-reference bugs
- use `Map` and `Set` confidently
- count frequencies quickly
- sort numbers correctly
- know which methods mutate
- explain references vs values
- explain the event loop at a basic level
- use `async` / `await` with `try/catch`
- create 2D arrays correctly
- write two-pointer and sliding-window loops comfortably

---

# 26. Fast rules to remember

- Prefer `Map` over object for many interview hash map problems
- Prefer `Set` for membership checks and visited tracking
- Never use `fill([])` for independent inner arrays
- Use `===` instead of `==`
- Use numeric comparators in `sort()`
- Know which array methods mutate
- Use shallow copies carefully with spread
- Keep interview code simple and readable

---

# 27. Practical mindset for interviews

Do not try to be clever.
Aim for:
- clear variable names
- simple loops
- predictable behavior
- correctness first
- optimization second

If you know these JS fundamentals well, you remove a huge source of avoidable mistakes in coding interviews.
