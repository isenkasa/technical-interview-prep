# Core JavaScript Topics (Interview-Focused)

This is an interview-focused JavaScript reference for:
- LeetCode
- backend interviews
- writing clean, correct code under pressure

It is focused on the language behaviors and patterns that commonly matter in coding interviews.

---

# 1. Arrays

## Creation patterns

```js
Array(n) // empty slots, not real values yet
Array(n).fill(0)
Array.from({ length: n }, () => 0)
Array.from({ length: n }, () => [])
```

## Critical gotcha: shared references

```js
Array(3).fill([]) // wrong for independent inner arrays
Array(3).fill(null).map(() => []) // correct
```

Why:
- `fill([])` puts the same array reference in every slot
- mutating one inner array mutates all of them

Example:

```js
const arr = Array(3).fill([])
arr[0].push(1)
console.log(arr) // [[1], [1], [1]]
```

Correct:

```js
const arr = Array(3).fill(null).map(() => [])
arr[0].push(1)
console.log(arr) // [[1], [], []]
```

## Iteration patterns

```js
for (let i = 0; i < arr.length; i++) {}

for (const value of arr) {}

arr.forEach((value, index) => {})
```

## Common methods

```js
arr.push(x)
arr.pop()
arr.shift()
arr.unshift(x)

arr.map(fn)
arr.filter(fn)
arr.reduce(fn, initialValue)

arr.sort((a, b) => a - b)
arr.reverse()

arr.slice(start, end) // non-mutating copy
arr.splice(start, deleteCount) // mutates
```

## Important behaviors

- `sort()` mutates the array
- `reverse()` mutates the array
- `slice()` does not mutate
- `splice()` mutates
- `map()` returns a new array
- `filter()` returns a new array
- `reduce()` returns a single accumulated value

## Useful interview array patterns

### Build frequency array

```js
const freq = Array(10).fill(0)
for (const num of nums) {
  freq[num]++
}
```

### Two-dimensional array

```js
const grid = Array.from({ length: rows }, () => Array(cols).fill(0))
```

### Flattening

```js
const flat = arr.flat()
```

### Copy array

```js
const copy = [...arr]
const copy2 = arr.slice()
```

---

# 2. Objects vs Map

## Object

```js
const obj = {}
obj["key"] = 123
console.log(obj["key"])
```

## Map

```js
const map = new Map()
map.set("key", 123)
console.log(map.get("key"))
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
map.set(key, value)
map.get(key)
map.has(key)
map.delete(key)
map.size
```

## Iterating over a Map

```js
for (const [key, value] of map.entries()) {}
for (const [key, value] of map) {}
```

## Interview note

For many LeetCode-style problems, `Map` is preferred over plain objects because it is more explicit and avoids some key coercion issues.

---

# 3. Strings

## Basics

```js
const s = "hello"
console.log(s.length)
console.log(s[0])
```

## Important property

Strings are immutable.
You cannot modify a character in place.

```js
let s = "abc"
s[0] = "z"
console.log(s) // still "abc"
```

## Common methods

```js
s.slice(start, end)
s.substring(start, end)
s.split(",")
arr.join(",")
s.includes("he")
s.indexOf("l")
s.toLowerCase()
s.toUpperCase()
s.trim()
```

## Common interview patterns

### Reverse string

```js
const reversed = s.split("").reverse().join("")
```

### Frequency count of characters

```js
const map = new Map()

for (const ch of s) {
  map.set(ch, (map.get(ch) || 0) + 1)
}
```

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

## Objects and arrays copy by reference

```js
const a = []
const b = a
b.push(1)

console.log(a) // [1]
console.log(b) // [1]
```

## Why this matters

This affects:
- `fill([])`
- copying arrays and objects
- mutating nested structures
- passing data around in interviews

## Copying objects and arrays safely

```js
const arrCopy = [...arr]
const objCopy = { ...obj }
```

Note:
These are shallow copies, not deep copies.

---

# 5. Set

## Basics

```js
const set = new Set()
set.add(1)
set.add(2)
console.log(set.has(1))
set.delete(2)
```

## Why Set is useful

Use `Set` for:
- uniqueness
- fast membership checks
- visited tracking in graph problems

## Example: remove duplicates

```js
const unique = [...new Set(nums)]
```

## Example: visited set

```js
const visited = new Set()

if (!visited.has(node)) {
  visited.add(node)
}
```

---

# 6. Frequency patterns

This is one of the most common interview patterns.

## Using Map

```js
const map = new Map()

for (const num of nums) {
  map.set(num, (map.get(num) || 0) + 1)
}
```

## Using object

```js
const count = {}

for (const num of nums) {
  count[num] = (count[num] || 0) + 1
}
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
arr.sort((a, b) => a - b) // ascending
arr.sort((a, b) => b - a) // descending
```

## Strings

```js
arr.sort()
```

## Objects or pairs

```js
arr.sort((a, b) => a.freq - b.freq)
arr.sort((a, b) => b[0] - a[0])
```

## Important gotcha

Default `sort()` converts values to strings and sorts lexicographically.

```js
console.log([10, 2, 5].sort()) // [10, 2, 5] lexicographic behavior
```

Use a comparator for numbers.

---

# 8. Two-dimensional arrays

## Correct creation

```js
const grid = Array.from({ length: rows }, () => Array(cols).fill(0))
```

## Wrong creation

```js
const grid = Array(rows).fill(Array(cols).fill(0))
```

Wrong because each row points to the same inner array.

---

# 9. Stack and queue patterns

## Stack (LIFO)

```js
const stack = []
stack.push(1)
stack.push(2)
const top = stack.pop()
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
```

Used for:
- BFS
- level-order traversal

## Performance note

`shift()` is not ideal for very large queues because it reindexes the array.
In interviews, it is often acceptable.
For more optimized queue usage, track an index:

```js
const queue = [start]
let front = 0

while (front < queue.length) {
  const node = queue[front]
  front++
}
```

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
```

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
```

`a` and `b` are not available outside the block.

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
console.log("start")

setTimeout(() => {
  console.log("timeout")
}, 0)

Promise.resolve().then(() => {
  console.log("promise")
})

console.log("end")
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
  console.log(value)
})
```

## `async` / `await`

```js
async function getData() {
  const result = await fetchSomething()
  return result
}
```

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
```

## Object destructuring

```js
const obj = { x: 1, y: 2 }
const { x, y } = obj
```

## Why it matters

Very common in:
- clean JS interview code
- parsing pairs
- working with objects and arrays

---

# 15. Spread and rest

## Spread

```js
const arr2 = [...arr]
const obj2 = { ...obj }
```

## Rest

```js
function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0)
}
```

## Important note

Spread creates shallow copies.

---

# 16. Common loop patterns

## Standard indexed loop

```js
for (let i = 0; i < arr.length; i++) {}
```

Use when:
- you need index access
- two-pointer logic
- dynamic programming arrays

## `for...of`

```js
for (const value of arr) {}
```

Use when:
- you only need values
- cleaner iteration

## `for...in`

```js
for (const key in obj) {}
```

Use mostly for objects, not arrays.

Interview note:
Avoid `for...in` for arrays in most cases.

---

# 17. Common array/string interview patterns

## Two pointers

```js
let left = 0
let right = arr.length - 1

while (left < right) {
  left++
  right--
}
```

## Sliding window

```js
let left = 0

for (let right = 0; right < arr.length; right++) {
  while (someCondition) {
    left++
  }
}
```

## Fast lookup

```js
const set = new Set()
const map = new Map()
```

## Prefix sum

```js
const prefix = Array(nums.length + 1).fill(0)

for (let i = 0; i < nums.length; i++) {
  prefix[i + 1] = prefix[i] + nums[i]
}
```

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
```

Use `===`.

---

# 20. Truthy and falsy values

Falsy values:
- `false`
- `0`
- `""`
- `null`
- `undefined`
- `NaN`

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
Number("42")
parseInt("42", 10)
```

## Common place it matters

When using object keys:

```js
const obj = { 1: 3 }
Object.entries(obj) // keys come back as strings
```

So you may need:

```js
parseInt(num, 10)
```

---

# 22. Template literals

```js
const name = "Alex"
const s = `Hello ${name}`
```

Useful for:
- readable string building
- dynamic cache keys
- debug output

---

# 23. Optional chaining and nullish coalescing

## Optional chaining

```js
obj?.a?.b
```

Avoids crashing when a property is missing.

## Nullish coalescing

```js
const value = input ?? defaultValue
```

Uses default only when value is `null` or `undefined`.

Different from `||`, which also treats `0`, `false`, and `""` as missing.

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
