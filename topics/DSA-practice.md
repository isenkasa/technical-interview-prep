# Coding Patterns Cheat Sheet

## 1. Two Pointers

**Use when:**
- Sorted array
- Pairs / triplets
- Working from both ends

**Keywords:**
- pair sum
- sorted
- remove duplicates

**Mental model:**
start + end → move inward

**Examples:**
- Two Sum (sorted)
- 3Sum
- Container With Most Water

---

## 2. Sliding Window

**Use when:**
- Subarray / substring
- Contiguous range
- Longest / shortest conditions

**Keywords:**
- substring
- window
- at most k
- no duplicates

**Mental model:**
expand right → shrink left

**Examples:**
- Longest Substring Without Repeating Characters
- Minimum Window Substring

---

## 3. HashMap / Set

**Use when:**
- Fast lookup needed
- Tracking duplicates
- Counting frequency

**Keywords:**
- find duplicate
- count
- exists

**Mental model:**
store → check → update

**Examples:**
- Two Sum
- Contains Duplicate

---

## 4. Binary Search

**Use when:**
- Sorted data
- Searching efficiently
- Minimizing or maximizing

**Keywords:**
- sorted
- search
- log n

**Mental model:**
cut search space in half

**Examples:**
- Binary Search
- Search in Rotated Sorted Array

---

## 5. Monotonic Stack

**Use when:**
- Next greater/smaller element
- Nearest element problems

**Keywords:**
- next greater
- warmer day
- span

**Mental model:**
resolve previous elements when condition breaks

**Examples:**
- Daily Temperatures
- Next Greater Element

---

## 6. Heap / Priority Queue

**Use when:**
- Top K problems
- Repeated smallest/largest selection

**Keywords:**
- k largest
- k smallest
- priority

**Mental model:**
keep best k elements

**Examples:**
- Kth Largest Element
- Top K Frequent Elements

---

## 7. Backtracking

**Use when:**
- Generating all combinations or permutations
- Exploring all possibilities

**Keywords:**
- all subsets
- generate
- combinations

**Mental model:**
choose → explore → undo

**Examples:**
- Subsets
- Permutations

---

## 8. Dynamic Programming (DP)

**Use when:**
- Overlapping subproblems
- Optimization problems

**Keywords:**
- maximum
- minimum
- number of ways

**Mental model:**
reuse previous results

**Examples:**
- Climbing Stairs
- House Robber

---

## 9. Graph / BFS / DFS

**Use when:**
- Traversing grids or graphs
- Connectivity problems

**Keywords:**
- island
- connected
- shortest path

**Mental model:**
explore neighbors

**Examples:**
- Number of Islands
- Clone Graph

---

## 10. Greedy

**Use when:**
- Local optimal choice leads to global solution
- No need to revisit decisions

**Keywords:**
- maximum
- minimum
- intervals

**Mental model:**
take best now → trust it works globally

**Examples:**
- Jump Game
- Container With Most Water

---

## Pattern Recognition Checklist

Ask yourself:

1. Is the data sorted?
   → Binary Search or Two Pointers

2. Is it a subarray or substring?
   → Sliding Window

3. Do I need fast lookup?
   → HashMap or Set

4. Is it about next greater/smaller?
   → Stack

5. Is it asking for top K?
   → Heap

6. Is it generating all combinations?
   → Backtracking

7. Is it optimization (max/min)?
   → Dynamic Programming or Greedy

8. Is it a graph or grid?
   → BFS or DFS

---

## Quick Reference

Sorted → Binary Search / Two Pointers  
Subarray → Sliding Window  
Lookup → HashMap  
Next greater → Stack  
Top K → Heap  
All combinations → Backtracking  
Optimization → DP / Greedy  
Graph → BFS / DFS

# Spiral Matrix

You’re peeling the matrix layer by layer:

top row → done, so top++
right col → done, so right--
bottom row → done, so bottom--
left col → done, so left++

That’s the whole pattern.

```js
class Solution {
  /**
   * @param {number[][]} matrix
   * @return {number[]}
   */
  spiralOrder (matrix) {
    const res = []
    let left = 0
    let top = 0
    let right = matrix[0].length - 1
    let bottom = matrix.length - 1

    while (left <= right && top <= bottom) {
      // left -> right
      for (let i = left; i <= right; i++) {
        res.push(matrix[top][i])
      }
      top++

      // top -> bottom
      for (let i = top; i <= bottom; i++) {
        res.push(matrix[i][right])
      }
      right--

      // make sure we still have a row and column left
      if (top <= bottom) {
        // right -> left
        for (let i = right; i >= left; i--) {
          res.push(matrix[bottom][i])
        }
        bottom--
      }

      if (left <= right) {
        // bottom -> top
        for (let i = bottom; i >= top; i--) {
          res.push(matrix[i][left])
        }
        left++
      }
    }

    return res
  }
}
```

# 3Sum

1. Sort the array so I can use two pointers efficiently.

2. Fix one number at index i, then use two pointers (left and right) to search for two other numbers that make the total sum equal to 0.

3. If the sum is too small, move left forward. If the sum is too large, move right backward. If the sum is 0, save the triplet and move both pointers.

4. Skip duplicate values for i, left, and right so the result only contains unique triplets.

```js
class Solution {
  /**
   * @param {number[]} nums
   * @return {number[][]}
   */
  threeSum(nums) {
    // Step 1: sort the array so we can use two pointers
    nums.sort((a, b) => a - b)

    const result = []

    // Step 2: fix one number at a time
    for (let i = 0; i < nums.length - 2; i++) {
      // Skip duplicate values for i (avoid duplicate triplets)
      if (i > 0 && nums[i] === nums[i - 1]) continue

      let left = i + 1
      let right = nums.length - 1

      // Step 3: use two pointers to find pairs
      while (left < right) {
        const sum = nums[i] + nums[left] + nums[right]

        if (sum === 0) {
          // Found a valid triplet
          result.push([nums[i], nums[left], nums[right]])

          // Move both pointers inward
          left++
          right--

          // Skip duplicates on the left side
          while (left < right && nums[left] === nums[left - 1]) {
            left++
          }

          // Skip duplicates on the right side
          while (left < right && nums[right] === nums[right + 1]) {
            right--
          }

        } else if (sum < 0) {
          // Sum too small → increase it by moving left pointer
          left++
        } else {
          // Sum too big → decrease it by moving right pointer
          right--
        }
      }
    }

    return result
  }
}
```

# Daily Temperatures

Brute force solution
```js
class Solution {
  /**
   * @param {number[]} temperatures
   * @return {number[]}
   */
  dailyTemperatures(temperatures) {
    const res = new Array(temperatures.length).fill(0)

    for (let i = 0; i < temperatures.length; i++) {
      for (let j = i + 1; j < temperatures.length; j++) {
        if (temperatures[j] > temperatures[i]) {
          res[i] = j - i
          break
        }
      }
    }

    return res
  }
}
```

Stack
```js
class Solution {
    /**
     * @param {number[]} temperatures
     * @return {number[]}
     */
    dailyTemperatures(temperatures) {
        const res = new Array(temperatures.length).fill(0);
        const stack = []; // pair: [temp, index]

        for (let i = 0; i < temperatures.length; i++) {
            const t = temperatures[i];
            while (stack.length > 0 && t > stack[stack.length - 1][0]) {
                const [stackT, stackInd] = stack.pop();
                res[stackInd] = i - stackInd;
            }
            stack.push([t, i]);
        }
        return res;
    }
}
```

# Container With Most Water

```js
class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    maxArea(height) {
        let left = 0;
        let right = height.length;
        let maxArea = 0

        while (left < right) {
            let multiplier = right - left

            if (height[left] < height[right]) {
                let area = height[left] * multiplier
                if (area > maxArea) {
                    maxArea = area
                }
                left++
            } else {
                let area = height[right] * multiplier
                if (area > maxArea) {
                    maxArea = area
                }
                right--
            }
        }
        return maxArea
    };
}
```

# Top K Frequent Elements
```js
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    topKFrequent(nums, k) {
        const count = {};
        for (const num of nums) {
            count[num] = (count[num] || 0) + 1;
        }

        const arr = Object.entries(count).map(([num, freq]) => [
            freq,
            parseInt(num),
        ]);
        arr.sort((a, b) => b[0] - a[0]);

        return arr.slice(0, k).map((pair) => pair[1]);
    }
}
```
# Merge Intervals
```js
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number[][]}
     */
    merge(intervals) {
        intervals.sort((a, b) => a[0] - b[0]);
        const output = [];
        output.push(intervals[0]);

        for (const interval of intervals) {
            const start = interval[0];
            const end = interval[1];
            const lastEnd = output[output.length - 1][1];

            if (start <= lastEnd) {
                output[output.length - 1][1] = Math.max(lastEnd, end);
            } else {
                output.push([start, end]);
            }
        }
        return output;
    }
}
```

# Longest Substring Without Repeating Characters
```js
class Solution {
  /**
   * @param {string} s
   * @return {number}
   */
  lengthOfLongestSubstring(s) {
    let max = 0

    for (let i = 0; i < s.length; i++) {
      const set = new Set()

      for (let j = i; j < s.length; j++) {
        if (!set.has(s[j])) {
          set.add(s[j])
          max = Math.max(max, set.size)
        } else {
          break
        }
      }
    }

    return max
  }
}
```

# Rotate Matrix

```js
function rotate (matrix) {
  const n = matrix.length

  for (let layer = 0; layer < Math.floor(n / 2); layer++) {
    let first = layer
    let last = n - 1 - layer

    for (let i = first; i < last; i++) {
      let offset = i - first

      // save top
      let top = matrix[first][i]

      // left -> top
      matrix[first][i] = matrix[last - offset][first]

      // bottom -> left
      matrix[last - offset][first] = matrix[last][last - offset]

      // right -> bottom
      matrix[last][last - offset] = matrix[i][last]

      // top -> right
      matrix[i][last] = top
    }
  }

  return matrix
}
```

# Longest Consecutive Sequence
```js
class Solution {
  longestConsecutive (nums) {
    if (nums.length === 0) return 0

    nums.sort((a, b) => a - b)

    let longest = 1
    let currentStreak = 1

    for (let i = 1; i < nums.length; i++) {
      if (nums[i] === nums[i - 1]) {
        // skip duplicates
        continue
      } else if (nums[i] === nums[i - 1] + 1) {
        // consecutive
        currentStreak++
      } else {
        // reset streak
        currentStreak = 1
      }

      longest = Math.max(longest, currentStreak)
    }

    return longest
  }
}
```

Optimal
```js
class Solution {
  longestConsecutive (nums) {
    const set = new Set(nums)
    let longest = 0

    for (const num of set) {
      // only start if it's the beginning of a sequence
      if (!set.has(num - 1)) {
        let current = num
        let streak = 1

        while (set.has(current + 1)) {
          current++
          streak++
        }

        longest = Math.max(longest, streak)
      }
    }

    return longest
  }
}
```

# Subarray Sum Equals K

Brute Force
```js
class Solution {
  subarraySum (nums, target) {
    let count = 0

    // start of subarray
    for (let start = 0; start < nums.length; start++) {
      let currentSum = 0

      // extend subarray from "start"
      for (let end = start; end < nums.length; end++) {
        currentSum += nums[end]

        // check if this subarray matches target
        if (currentSum === target) {
          count++
        }
      }
    }

    return count
  }
}
```

HashMap Solution
```js
class Solution {
  subarraySum (nums, target) {
    let count = 0
    let runningSum = 0

    // map: prefixSum -> how many times we've seen it
    const prefixCount = new Map()
    prefixCount.set(0, 1)

    for (const num of nums) {
      runningSum += num

      // we want: runningSum - previousSum = target
      // so previousSum = runningSum - target
      const needed = runningSum - target

      // if we've seen this before, it means a valid subarray exists
      count += prefixCount.get(needed) || 0

      // record current running sum
      prefixCount.set(
        runningSum,
        (prefixCount.get(runningSum) || 0) + 1
      )
    }

    return count
  }
}
```

# Kth Largest Element in an Array
```js
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    findKthLargest(nums, k) {
        nums = nums.sort((a,b) => b - a)
        return nums[k - 1]
    }
}
```

Using MinHeap
```js
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    findKthLargest(nums, k) {
        const minHeap = new MinPriorityQueue();
        for (let num of nums) {
            minHeap.push(num);
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }
        return minHeap.front();
    }
}
```

# Products Of Array Except Self

```js
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    productExceptSelf(nums) {
        const n = nums.length;
        const res = new Array(n);

        for (let i = 0; i < n; i++) {
            let prod = 1;
            for (let j = 0; j < n; j++) {
                if (i !== j) {
                    prod *= nums[j];
                }
            }
            res[i] = prod;
        }
        return res;
    }
}
```

# Contains Duplicate
```js
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    hasDuplicate(nums) {
        const seen = new Set();
        for (const num of nums) {
            if (seen.has(num)) {
                return true;
            }
            seen.add(num);
        }
        return false;
    }
}
```

# Valid Palindrome
```js
class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */

    isPalindrome (s) {
    const formattedString = s
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')

    return formattedString === formattedString.split('').reverse().join('')
    }
}
```

# Longest Repeating Character Replacement
```js
class Solution {
  /**
   * @param {string} s
   * @param {number} k
   * @return {number}
   */
  characterReplacement(s, k) {
    let maxLength = 0

    // Try making the string all one character at a time
    const uniqueChars = new Set(s)

    for (const targetChar of uniqueChars) {
      let left = 0
      let matchingCount = 0 // how many chars already match targetChar

      for (let right = 0; right < s.length; right++) {
        // Expand window: include s[right]
        if (s[right] === targetChar) {
          matchingCount++
        }

        // If we need more than k replacements → shrink window
        while ((right - left + 1) - matchingCount > k) {
          // Remove s[left] from window
          if (s[left] === targetChar) {
            matchingCount--
          }
          left++
        }

        // Update max valid window size
        maxLength = Math.max(maxLength, right - left + 1)
      }
    }

    return maxLength
  }
}
```

# Insert Interval
```js
class Solution {
  /**
   * @param {number[][]} intervals
   * @param {number[]} newInterval
   * @return {number[][]}
   */
  insert(intervals, newInterval) {
    const result = []
    let i = 0

    // 1. Add all intervals that end before newInterval starts
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
      result.push(intervals[i])
      i++
    }

    // 2. Merge all overlapping intervals with newInterval
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
      newInterval[0] = Math.min(newInterval[0], intervals[i][0])
      newInterval[1] = Math.max(newInterval[1], intervals[i][1])
      i++
    }

    // 3. Add the merged newInterval
    result.push(newInterval)

    // 4. Add the remaining intervals
    while (i < intervals.length) {
      result.push(intervals[i])
      i++
    }

    return result
  }
}
```

# Summary Ranges
```js
/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function(nums) {
    const result = []
    let i = 0

    while (i < nums.length) {
      const start = nums[i]

      // extend range while next number is consecutive
      while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) {
        i++
      }

      const end = nums[i]

      if (start === end) {
        result.push(`${start}`)
      } else {
        result.push(`${start}->${end}`)
      }

      i++
    }

    return result
}
```

# Set Matrix Zeroes
```js
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {void}
     */
    setZeroes(matrix) {
        let ROWS = matrix.length;
        let COLS = matrix[0].length;
        let rows = new Array(ROWS).fill(false)
        let cols = new Array(COLS).fill(false)

        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                if (matrix[i][j] === 0) {
                    rows[i] = true
                    cols[j] = true
                }
            }
        }

        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                if (rows[i] === true || cols[j] === true) {
                    matrix[i][j] = 0
                }
            }
        }
    }
}
```

# Move Zeroes
```js
var moveZeroes = function(nums) {
    let count = 0
    let arr = []
    for (let num of nums) {
        if (num === 0) {
            count++
        } else {
            arr.push(num)
        }
    }

    for (let i = 0; i < count; i++) {
        arr.push(0)
    }

    // copy back into original array
    for (let i = 0; i < nums.length; i++) {
        nums[i] = arr[i]
    }
};
```

A better solution
```js
var moveZeroes = function(nums) {
  let insertPos = 0

  // move non-zero values forward
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[insertPos] = nums[i]
      insertPos++
    }
  }

  // fill rest with zeros
  while (insertPos < nums.length) {
    nums[insertPos] = 0
    insertPos++
  }
}
```

# Minimum Window Substring
```js
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {string}
     */
    minWindow(s, t) {
        if (t === '') return '';

        let countT = {};
        for (let c of t) {
            countT[c] = (countT[c] || 0) + 1;
        }

        let res = [-1, -1];
        let resLen = Infinity;

        for (let i = 0; i < s.length; i++) {
            let countS = {};
            for (let j = i; j < s.length; j++) {
                countS[s[j]] = (countS[s[j]] || 0) + 1;

                let flag = true;
                for (let c in countT) {
                    if ((countS[c] || 0) < countT[c]) {
                        flag = false;
                        break;
                    }
                }

                if (flag && j - i + 1 < resLen) {
                    resLen = j - i + 1;
                    res = [i, j];
                }
            }
        }

        return resLen === Infinity ? '' : s.slice(res[0], res[1] + 1);
    }
}
```