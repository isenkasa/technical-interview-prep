# JavaScript Interview Cheat Sheet

## Arrays / Strings / Data Access

```js
arr.length
arr[i]
s.length
s[i]

const copy = [...arr]
const copy2 = arr.slice()

nums.sort((a, b) => a - b)
nums.sort((a, b) => b - a)

arr.reverse()

s.slice(start, end)

arr.push(x)
arr.pop()
arr.shift()
arr.unshift(x)

arr.map(x => x * 2)
arr.filter(x => x > 0)
arr.reduce((acc, x) => acc + x, 0)

s.split('')
arr.join('')

s.replace(/[^a-z0-9]/gi, '')
```

## Set / Map / Object

```js
const set = new Set()
set.add(x)
set.has(x)
set.delete(x)

const map = new Map()
map.set(key, val)
map.get(key)
map.has(key)
map.delete(key)

const obj = {}
obj[key] = (obj[key] || 0) + 1
```

## Binary Search

```js
let l = 0
let r = nums.length - 1

while (l <= r) {
  const mid = Math.floor((l + r) / 2)

  if (nums[mid] === target) return mid
  if (nums[mid] < target) l = mid + 1
  else r = mid - 1
}
```

## Two Pointers

```js
let l = 0
let r = arr.length - 1

while (l < r) {
  if (condition) l++
  else r--
}
```

## Sliding Window

```js
let left = 0

for (let right = 0; right < arr.length; right++) {
  // add arr[right]

  while (window invalid) {
    // remove arr[left]
    left++
  }

  // update result
}
```

## Intervals

```js
intervals.sort((a, b) => a[0] - b[0])

const res = []

for (const interval of intervals) {
  if (!res.length || interval[0] > res[res.length - 1][1]) {
    res.push(interval)
  } else {
    res[res.length - 1][1] = Math.max(
      res[res.length - 1][1],
      interval[1]
    )
  }
}
```

## Linked List

```js
class ListNode {
  constructor(val, next = null) {
    this.val = val
    this.next = next
  }
}
```

Reverse:
```js
let prev = null
let curr = head

while (curr) {
  const next = curr.next
  curr.next = prev
  prev = curr
  curr = next
}
```

Fast/Slow:
```js
let slow = head
let fast = head

while (fast && fast.next) {
  slow = slow.next
  fast = fast.next.next
}
```

## DFS / BFS

DFS:
```js
function dfs(node) {
  if (!node) return
  dfs(node.left)
  dfs(node.right)
}
```

BFS:
```js
const queue = [root]

while (queue.length) {
  const node = queue.shift()
  if (node.left) queue.push(node.left)
  if (node.right) queue.push(node.right)
}
```

## Backtracking

```js
function backtrack(path, start) {
  for (let i = start; i < nums.length; i++) {
    path.push(nums[i])
    backtrack(path, i + 1)
    path.pop()
  }
}
```

## Grid BFS/DFS

```js
const directions = [
  [1, 0],   // down
  [-1, 0],  // up
  [0, 1],   // right
  [0, -1]   // left
]
```

DFS
```js
function dfs(row, col, grid, visited) {
  const numRows = grid.length
  const numCols = grid[0].length

  // out of bounds
  if (
    row < 0 || col < 0 ||
    row >= numRows || col >= numCols
  ) return

  // already visited or invalid cell
  const key = `${row},${col}`
  if (visited.has(key) || grid[row][col] === '0') return

  // mark visited
  visited.add(key)

  // explore neighbors
  for (const [rowOffset, colOffset] of directions) {
    dfs(row + rowOffset, col + colOffset, grid, visited)
  }
}
```

BFS
```js
function bfs(startRow, startCol, grid, visited) {
  const numRows = grid.length
  const numCols = grid[0].length

  const queue = [[startRow, startCol]]
  visited.add(`${startRow},${startCol}`)

  while (queue.length) {
    const [currentRow, currentCol] = queue.shift()

    for (const [rowOffset, colOffset] of directions) {
      const newRow = currentRow + rowOffset
      const newCol = currentCol + colOffset
      const key = `${newRow},${newCol}`

      if (
        newRow >= 0 && newCol >= 0 &&
        newRow < numRows && newCol < numCols &&
        grid[newRow][newCol] === '1' &&
        !visited.has(key)
      ) {
        queue.push([newRow, newCol])
        visited.add(key)
      }
    }
  }
}
```

## Common Triggers

- sorted → binary search
- substring → sliding window
- duplicates → set/map
- intervals → sort + merge
- tree → dfs/bfs
- combinations → backtracking
