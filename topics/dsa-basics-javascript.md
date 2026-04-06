# Data Structures and Algorithms Basics (JavaScript)

This guide is meant to cover the core DSA topics you need for coding interviews in JavaScript.

The goal is not to memorize random problems.
The goal is to understand:
- the main data structures
- the common algorithm patterns
- when to use each one
- common JavaScript-specific gotchas

How to use this file:
- read the explanation
- study the example
- try to write the pattern from memory
- solve a few problems for each section

---

## How to think about DSA interviews

Most coding interviews are testing a combination of:
- problem-solving
- pattern recognition
- ability to choose the right data structure
- ability to reason about time and space complexity
- communication under pressure

A strong interview answer usually does this:

1. restate the problem
2. ask clarifying questions if needed
3. discuss brute force first
4. improve it using a better data structure or pattern
5. explain time and space complexity
6. walk through an example

---

## Big-O basics

Big-O describes how runtime or memory grows as input size grows.

Common time complexities:
- `O(1)` constant
- `O(log n)` logarithmic
- `O(n)` linear
- `O(n log n)` common for efficient sorting
- `O(n^2)` quadratic
- `O(2^n)` exponential

Common space complexity:
- `O(1)` constant extra memory
- `O(n)` extra memory proportional to input size

Examples:

```js
// O(1)
function first(arr) {
  return arr[0]
}

// O(n)
function sum(arr) {
  let total = 0
  for (const num of arr) total += num
  return total
}

// O(n^2)
function printPairs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j])
    }
  }
}
```

Interview reminder:
- drop constants
- keep the dominant term
- talk about both time and space

---

## JavaScript DSA essentials

Before the data structures, you should be comfortable with these JS tools:
- arrays
- objects
- `Map`
- `Set`
- loops
- destructuring
- `Math.floor`
- string indexing

### `Map` vs object

Use `Map` when:
- keys are not just strings
- you want clearer intent
- you want consistent insertion-order behavior

Example:

```js
const freq = new Map()
freq.set('a', (freq.get('a') || 0) + 1)
```

### `Set`

Use `Set` when:
- you need uniqueness
- fast membership checks matter

```js
const seen = new Set([1, 2, 3])
console.log(seen.has(2)) // true
```

### Array gotcha

```js
Array(3).fill([])
```

This creates the same inner array reference in every slot.

Better:

```js
Array(3).fill(null).map(() => [])
```

---

## Arrays

Arrays are the most common interview data structure.

They are good for:
- indexed access
- iteration
- sliding window
- two pointers
- prefix sums

### Key operations

- access by index: `O(1)`
- append with `push`: usually `O(1)`
- remove from end with `pop`: `O(1)`
- insert/remove at beginning with `shift`/`unshift`: `O(n)`

### Example

```js
const nums = [10, 20, 30]
console.log(nums[1]) // 20
nums.push(40)
```

### Common interview patterns with arrays

- two pointers
- sliding window
- binary search
- prefix sum
- sorting
- frequency counting

---

## Strings

Strings behave a lot like arrays of characters, but they are immutable.

Useful operations:
- `s.length`
- `s[i]`
- `s.slice(...)`
- `s.split(...)`
- `s.join(...)`

Example:

```js
const s = 'hello'
console.log(s[1]) // e
console.log(s.slice(1, 4)) // ell
```

Interview reminder:
- repeated string concatenation in loops can be costly
- sometimes building an array and joining is cleaner

---

## Hash maps / frequency maps

Hash maps are used constantly in interviews.

In JavaScript, use:
- `Map`
- or plain object for simple string keys

Use cases:
- counting frequency
- fast lookup
- duplicate detection
- caching values by key

Example:

```js
function countLetters(s) {
  const freq = new Map()

  for (const ch of s) {
    freq.set(ch, (freq.get(ch) || 0) + 1)
  }

  return freq
}
```

Why it matters:
- many `O(n^2)` brute force solutions become `O(n)` with a hash map

Classic example:

```js
function hasDuplicate(nums) {
  const seen = new Set()

  for (const num of nums) {
    if (seen.has(num)) return true
    seen.add(num)
  }

  return false
}
```

Time: `O(n)`
Space: `O(n)`

---

## Set

`Set` is great when the only thing that matters is whether a value exists.

Common uses:
- duplicate detection
- visited nodes in graph traversal
- fast membership checks

Example:

```js
function intersection(nums1, nums2) {
  const set1 = new Set(nums1)
  const result = new Set()

  for (const num of nums2) {
    if (set1.has(num)) result.add(num)
  }

  return [...result]
}
```

---

## Stack

A stack is LIFO: last in, first out.

In JavaScript, arrays are often used as stacks.

```js
const stack = []
stack.push(1)
stack.push(2)
console.log(stack.pop()) // 2
```

Use cases:
- balanced parentheses
- DFS
- function call simulation
- monotonic stack problems

Classic example:

```js
function isValid(s) {
  const stack = []
  const pairs = {
    ')': '(',
    ']': '[',
    '}': '{'
  }

  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch)
    } else {
      if (stack.pop() !== pairs[ch]) return false
    }
  }

  return stack.length === 0
}
```

---

## Queue

A queue is FIFO: first in, first out.

Important JavaScript note:
- `shift()` is `O(n)`
- for serious queue use in interviews, prefer a pointer-based queue or deque simulation

Simple version:

```js
const queue = []
queue.push(1)
queue.push(2)
console.log(queue.shift()) // 1
```

Better queue pattern:

```js
class Queue {
  constructor() {
    this.data = []
    this.head = 0
  }

  enqueue(value) {
    this.data.push(value)
  }

  dequeue() {
    if (this.head === this.data.length) return undefined
    const value = this.data[this.head]
    this.head++
    return value
  }

  isEmpty() {
    return this.head === this.data.length
  }
}
```

Use cases:
- BFS
- task scheduling
- sliding window deque variants

---

## Linked list

A linked list is a sequence of nodes where each node points to the next node.

Types:
- singly linked list
- doubly linked list

Why linked lists matter in interviews:
- pointer manipulation
- reversing a list
- fast insertion/deletion when you already have the node

Node example:

```js
class ListNode {
  constructor(val, next = null) {
    this.val = val
    this.next = next
  }
}
```

Example list:

```js
const head = new ListNode(1, new ListNode(2, new ListNode(3)))
```

### Reverse a linked list

```js
function reverseList(head) {
  let prev = null
  let curr = head

  while (curr) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }

  return prev
}
```

Interview takeaway:
- linked list problems are usually about pointer movement, not fancy syntax

---

## Tree basics

A tree is a hierarchical data structure.

Most interview tree problems use binary trees.

Binary tree node:

```js
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}
```

Example:

```js
const root = new TreeNode(
  1,
  new TreeNode(2),
  new TreeNode(3)
)
```

### Common binary tree traversals

#### DFS: preorder

```js
function preorder(root) {
  if (!root) return
  console.log(root.val)
  preorder(root.left)
  preorder(root.right)
}
```

#### DFS: inorder

```js
function inorder(root) {
  if (!root) return
  inorder(root.left)
  console.log(root.val)
  inorder(root.right)
}
```

#### DFS: postorder

```js
function postorder(root) {
  if (!root) return
  postorder(root.left)
  postorder(root.right)
  console.log(root.val)
}
```

#### BFS / level order

```js
function levelOrder(root) {
  if (!root) return []

  const result = []
  const queue = [root]
  let head = 0

  while (head < queue.length) {
    const levelSize = queue.length - head
    const level = []

    for (let i = 0; i < levelSize; i++) {
      const node = queue[head++]
      level.push(node.val)

      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }

    result.push(level)
  }

  return result
}
```

### Common tree problems

- max depth
- same tree
- invert binary tree
- validate BST
- lowest common ancestor
- level order traversal

---

## Binary Search Tree (BST)

A BST is a binary tree where:
- left subtree values are smaller
- right subtree values are larger

This property helps with faster search on average.

Common operations are `O(log n)` on average, but can degrade to `O(n)` if the tree is unbalanced.

Search example:

```js
function searchBST(root, target) {
  let curr = root

  while (curr) {
    if (curr.val === target) return curr
    if (target < curr.val) curr = curr.left
    else curr = curr.right
  }

  return null
}
```

---

## Heap / priority queue

A heap is a tree-based structure used to efficiently access the min or max element.

Common interview use cases:
- top K elements
- kth largest/smallest
- scheduling
- merging sorted lists

Important JavaScript note:
- JavaScript does not have a built-in heap
- in interviews, you should know the concept and ideally know how to implement a simple one

### MinHeap skeleton

```js
class MinHeap {
  constructor() {
    this.data = []
  }

  peek() {
    return this.data[0]
  }

  push(value) {
    this.data.push(value)
    this.bubbleUp(this.data.length - 1)
  }

  pop() {
    if (this.data.length === 0) return undefined
    if (this.data.length === 1) return this.data.pop()

    const min = this.data[0]
    this.data[0] = this.data.pop()
    this.bubbleDown(0)
    return min
  }

  bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2)
      if (this.data[parent] <= this.data[index]) break
      ;[this.data[parent], this.data[index]] = [this.data[index], this.data[parent]]
      index = parent
    }
  }

  bubbleDown(index) {
    const n = this.data.length

    while (true) {
      let smallest = index
      const left = index * 2 + 1
      const right = index * 2 + 2

      if (left < n && this.data[left] < this.data[smallest]) smallest = left
      if (right < n && this.data[right] < this.data[smallest]) smallest = right
      if (smallest === index) break

      ;[this.data[index], this.data[smallest]] = [this.data[smallest], this.data[index]]
      index = smallest
    }
  }
}
```

---

## Graph basics

A graph is a collection of nodes and edges.

Graphs are used for:
- social networks
- routes/maps
- dependencies
- connected components

### Graph representations

#### Adjacency list

Most common in interviews.

```js
const graph = {
  A: ['B', 'C'],
  B: ['D'],
  C: [],
  D: []
}
```

Or with `Map`:

```js
const graph = new Map([
  ['A', ['B', 'C']],
  ['B', ['D']],
  ['C', []],
  ['D', []]
])
```

### DFS on graph

```js
function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return
  visited.add(node)

  for (const neighbor of graph[node]) {
    dfs(graph, neighbor, visited)
  }
}
```

### BFS on graph

```js
function bfs(graph, start) {
  const visited = new Set([start])
  const queue = [start]
  let head = 0

  while (head < queue.length) {
    const node = queue[head++]

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push(neighbor)
      }
    }
  }
}
```

### Common graph problems

- connected components
- shortest path in unweighted graph
- cycle detection
- topological sort
- number of islands

Interview reminder:
- for graph traversal, always think about `visited`

---

## Trie

A trie is a tree-like structure used for efficient prefix lookups.

Common use cases:
- autocomplete
- dictionary/prefix search
- word search problems

Basic node:

```js
class TrieNode {
  constructor() {
    this.children = new Map()
    this.isEnd = false
  }
}
```

High-level idea:
- each edge represents a character
- each path represents a prefix or word

---

## Prefix sum

Prefix sums help answer range sum questions quickly.

Example:

```js
function buildPrefix(nums) {
  const prefix = Array(nums.length + 1).fill(0)

  for (let i = 0; i < nums.length; i++) {
    prefix[i + 1] = prefix[i] + nums[i]
  }

  return prefix
}

function rangeSum(prefix, left, right) {
  return prefix[right + 1] - prefix[left]
}
```

Why it matters:
- repeated range sum queries become `O(1)` after preprocessing

---

## Two pointers

Two pointers is a pattern where two indices move through an array or string.

Useful for:
- sorted arrays
- palindrome checks
- pair problems
- removing duplicates in-place

Example: two sum on sorted array

```js
function twoSumSorted(nums, target) {
  let left = 0
  let right = nums.length - 1

  while (left < right) {
    const sum = nums[left] + nums[right]

    if (sum === target) return [left, right]
    if (sum < target) left++
    else right--
  }

  return [-1, -1]
}
```

Interview clue:
- sorted array often suggests two pointers or binary search

---

## Sliding window

Sliding window is used for subarray or substring problems.

Useful when the problem asks for:
- longest
- shortest
- max/min window
- contiguous segment

Example: max sum of subarray of size `k`

```js
function maxSumSubarray(nums, k) {
  let windowSum = 0

  for (let i = 0; i < k; i++) {
    windowSum += nums[i]
  }

  let maxSum = windowSum

  for (let right = k; right < nums.length; right++) {
    windowSum += nums[right]
    windowSum -= nums[right - k]
    maxSum = Math.max(maxSum, windowSum)
  }

  return maxSum
}
```

Variable-size window example:
- longest substring without repeating characters

Key idea:
- expand right pointer
- shrink left pointer when condition breaks

---

## Binary search

Binary search works on sorted search space.

Classic binary search:

```js
function binarySearch(nums, target) {
  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    if (nums[mid] === target) return mid
    if (nums[mid] < target) left = mid + 1
    else right = mid - 1
  }

  return -1
}
```

When to think binary search:
- array is sorted
- answer space is monotonic
- you are looking for first/last valid position

### Binary search on answer

Sometimes you do not search an array value.
You search the answer range.

Example idea:
- minimum speed to finish tasks
- smallest capacity that works

Pattern:
- guess a value
- check if it works
- shrink range based on monotonic property

---

## Recursion

Recursion means a function calls itself on a smaller subproblem.

You need:
- base case
- recursive case

Example:

```js
function factorial(n) {
  if (n === 0) return 1
  return n * factorial(n - 1)
}
```

Why recursion matters:
- trees
- DFS
- divide and conquer
- backtracking
- dynamic programming

Interview reminder:
- always identify base case first

---

## Backtracking

Backtracking explores possibilities, then undoes choices.

Common use cases:
- subsets
- permutations
- combination sum
- N-Queens
- word search

Example: generate subsets

```js
function subsets(nums) {
  const result = []
  const path = []

  function dfs(index) {
    if (index === nums.length) {
      result.push([...path])
      return
    }

    path.push(nums[index])
    dfs(index + 1)
    path.pop()

    dfs(index + 1)
  }

  dfs(0)
  return result
}
```

Key idea:
- choose
- explore
- un-choose

---

## Dynamic programming

Dynamic programming (DP) is used when a problem has:
- overlapping subproblems
- optimal substructure

Main styles:
- top-down memoization
- bottom-up tabulation

### Example: Fibonacci with memoization

```js
function fib(n, memo = new Map()) {
  if (n <= 1) return n
  if (memo.has(n)) return memo.get(n)

  const value = fib(n - 1, memo) + fib(n - 2, memo)
  memo.set(n, value)
  return value
}
```

### Bottom-up version

```js
function fibBottomUp(n) {
  if (n <= 1) return n

  const dp = Array(n + 1).fill(0)
  dp[1] = 1

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n]
}
```

How to think about DP:
1. define the state
2. write the recurrence
3. define base cases
4. decide memoization or tabulation

Common DP topics:
- climbing stairs
- house robber
- coin change
- longest increasing subsequence
- knapsack-style problems

---

## Greedy algorithms

Greedy algorithms make the best local choice at each step.

They work only when the problem has the right structure.

Example:
- interval scheduling
- jump game variants
- assigning resources optimally in some problems

Interview reminder:
- greedy is great when it works
- but you must be able to explain why local choice leads to global optimum

---

## Sorting

You should know the main idea and complexity of common sorts.

### Built-in sort

In JavaScript:

```js
const nums = [10, 2, 30]
nums.sort((a, b) => a - b)
```

Important:
- default `sort()` converts values to strings

Bad:

```js
[10, 2, 30].sort() // [10, 2, 30] as strings can behave unexpectedly
```

Use numeric comparator.

### Common sorting complexities

- merge sort: `O(n log n)`
- quicksort: average `O(n log n)`, worst `O(n^2)`
- heap sort: `O(n log n)`

For interviews, you usually need:
- know when sorting helps
- know it often costs `O(n log n)`

---

## Topological sort

Topological sort is used on directed acyclic graphs (DAGs).

Use cases:
- course schedule
- task dependency ordering
- build systems

Common approach:
- track indegree
- start with nodes that have indegree 0

High-level idea:
- remove nodes with no prerequisites
- reduce indegrees of neighbors

---

## Union Find / Disjoint Set Union

Union Find tracks connected components efficiently.

Useful for:
- connectivity problems
- cycle detection in undirected graphs
- grouping

Core operations:
- `find(x)`
- `union(a, b)`

Interview note:
- know the purpose, even if you do not memorize every detail immediately

---

## Common problem-solving patterns

These patterns matter more than memorizing isolated problems:

- frequency counter
- two pointers
- sliding window
- fast/slow pointers
- prefix sum
- binary search
- DFS
- BFS
- backtracking
- dynamic programming
- heap / priority queue
- union find
- greedy

When practicing, always ask:
- is fast lookup useful?
- is the input sorted?
- is it a contiguous subarray/substring problem?
- is this a traversal problem?
- is there overlapping subproblem structure?

---

## Time complexity cheatsheet

- Array access: `O(1)`
- Array search: `O(n)`
- Hash map lookup: average `O(1)`
- Set lookup: average `O(1)`
- Binary search: `O(log n)`
- DFS/BFS on tree: `O(n)`
- DFS/BFS on graph: `O(V + E)`
- Heap push/pop: `O(log n)`
- Sorting: `O(n log n)`

---

## Common JavaScript interview gotchas

- `sort()` needs a numeric comparator
- `shift()` is `O(n)`
- strings are immutable
- objects coerce keys to strings
- arrays created with `fill([])` share references
- recursion depth can be a practical issue in JavaScript for deep inputs

---

## What to practice first

Based on your plan, the best order is:

1. arrays
2. hash maps / sets
3. two pointers
4. sliding window
5. binary search
6. trees
7. BFS / DFS
8. heaps
9. graphs
10. dynamic programming

That order builds strong pattern recognition.

---

## Final interview reminders

- start with brute force, then optimize
- explain why the chosen data structure helps
- talk through time and space complexity
- test your solution with a small example
- watch for edge cases like empty input, duplicates, and single-element arrays
- in JavaScript, be especially careful with `sort`, `shift`, `Map`, `Set`, and reference sharing

If you know these data structures, algorithm patterns, and JavaScript gotchas well, you will be in strong shape for coding interviews.
