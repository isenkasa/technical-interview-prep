# JavaScript Interview Fundamentals Assignment

This assignment is designed to validate the core JavaScript knowledge from your interview reference sheet.

## How to use this assignment

1. Open `starter.js`
2. Implement each function
3. Run:

```bash
node validate.js
```

4. Fix any failing tests until all tasks pass

---

# Rules

- Use plain JavaScript
- Keep solutions clean and readable
- Do not install packages
- Prefer simple loops and built-in methods unless the task asks otherwise
- Do not edit function names
- Return values exactly as requested

---

# Tasks

## 1. `doubleNumbers(nums)`
Return a new array with every number doubled.

Example:

```js
[1, 2, 3] -> [2, 4, 6]
```

Concepts:
- `map`
- non-mutating transformations

---

## 2. `filterEvenNumbers(nums)`
Return only even numbers.

Example:

```js
[1, 2, 3, 4, 5, 6] -> [2, 4, 6]
```

Concepts:
- `filter`

---

## 3. `sumArray(nums)`
Return the sum of all numbers.

Example:

```js
[1, 2, 3, 4] -> 10
```

Concepts:
- `reduce`
- accumulator

---

## 4. `buildFrequencyMap(nums)`
Return a `Map` where the key is the number and the value is how many times it appears.

Example:

```js
[1, 2, 2, 3, 3, 3]
// Map(3) {
//   1 => 1,
//   2 => 2,
//   3 => 3
// }
```

Concepts:
- `Map`
- frequency counting

---

## 5. `buildFrequencyObject(chars)`
Return a plain object counting the frequency of each character.

Example:

```js
['a', 'b', 'a'] -> { a: 2, b: 1 }
```

Concepts:
- objects
- truthy/falsy with counters

---

## 6. `removeDuplicates(nums)`
Return a new array with duplicates removed.

Example:

```js
[1, 2, 2, 3, 1] -> [1, 2, 3]
```

Concepts:
- `Set`

---

## 7. `sortNumbersAscending(nums)`
Return a new sorted array in ascending order.
Do not mutate the original input.

Example:

```js
[10, 2, 5] -> [2, 5, 10]
```

Concepts:
- numeric `sort`
- copying arrays
- mutation vs non-mutation

---

## 8. `sliceMiddle(arr, start, end)`
Return a shallow copy from `start` to `end` (end not included).
Do not mutate the original.

Example:

```js
sliceMiddle([1, 2, 3, 4], 1, 3) -> [2, 3]
```

Concepts:
- `slice`

---

## 9. `spliceReplace(arr, start, deleteCount, ...items)`
Return a new array where you simulate using `splice` to replace or insert elements, but do not mutate the original input array.

Example:

```js
spliceReplace([1, 2, 3, 4], 1, 2, 99, 100) -> [1, 99, 100, 4]
```

Concepts:
- `splice`
- copying before mutation

---

## 10. `createGrid(rows, cols, fillValue)`
Create a 2D array with independent rows.

Example:

```js
createGrid(2, 3, 0)
// [
//   [0, 0, 0],
//   [0, 0, 0]
// ]
```

Concepts:
- 2D array creation
- shared reference bug avoidance

---

## 11. `flattenOneLevel(arr)`
Flatten a nested array by one level.

Example:

```js
[[1, 2], [3, 4]] -> [1, 2, 3, 4]
```

Concepts:
- `flat`

---

## 12. `isAlphanumericPalindrome(s)`
Return `true` if the string is a palindrome after:
- converting to lowercase
- removing all non-alphanumeric characters

Example:

```js
'A man, a plan, a canal: Panama' -> true
'race a car' -> false
```

Concepts:
- strings
- regex cleanup
- palindrome logic

---

## 13. `reverseWords(sentence)`
Reverse the order of words in a string.
Trim extra outer spaces and collapse multiple inner spaces into a single separator in the output.

Example:

```js
'  hello   world  ' -> 'world hello'
```

Concepts:
- `trim`
- `split`
- `filter`
- `reverse`
- `join`

---

## 14. `groupByParity(nums)`
Return an object with:

```js
{
  even: [...],
  odd: [...]
}
```

Example:

```js
[1, 2, 3, 4] -> { even: [2, 4], odd: [1, 3] }
```

Concepts:
- object building
- iteration

---

## 15. `longestWord(words)`
Return the longest word in the array.
If there is a tie, return the first one.

Example:

```js
['cat', 'banana', 'dog'] -> 'banana'
```

Concepts:
- loops
- comparison logic

---

## 16. `createCounter(start)`
Return a function that returns the current count and then increments it each time it is called.

Example:

```js
const counter = createCounter(5)
counter() -> 5
counter() -> 6
counter() -> 7
```

Concepts:
- closures

---

## 17. `safeGetUserCity(user)`
Safely return `user.profile.address.city`.
If it does not exist, return `'Unknown'`.

Example:

```js
safeGetUserCity({ profile: { address: { city: 'Chicago' } } }) -> 'Chicago'
safeGetUserCity({}) -> 'Unknown'
```

Concepts:
- optional chaining
- nullish coalescing

---

## 18. `queueGame(players, count)`
Simulate a queue game:
- start with an array of players
- move the front player to the back `count - 1` times
- then remove and return the eliminated player
- continue until one player remains
- return the winner

Example:

```js
queueGame(['A', 'B', 'C', 'D'], 2) -> 'A'
```

Explanation for `count = 2`:
- move one player to back
- eliminate next player
- repeat

Concepts:
- queue behavior
- `shift`
- `push`

---

## 19. `asyncDoubleAfterDelay(num)`
Return a Promise that resolves to `num * 2` after a short timeout.

Concepts:
- Promises
- async behavior

---

## 20. `prefixSums(nums)`
Return a prefix sum array of length `nums.length + 1`, where:
- first value is `0`
- each next value is the running sum so far

Example:

```js
[1, 2, 3] -> [0, 1, 3, 6]
```

Concepts:
- prefix sums
- array initialization

---

# Stretch goals

If you finish everything comfortably, try doing the following without looking anything up:

- rewrite `sumArray` using a `for...of` loop instead of `reduce`
- rewrite `removeDuplicates` without using `Set`
- rewrite `isAlphanumericPalindrome` with two pointers and no cleaned copy string
- rewrite `queueGame` using a front pointer instead of repeated `shift()`

---

# What passing this assignment means

If you can complete this assignment cleanly, you are demonstrating working comfort with:

- arrays
- strings
- mutation vs non-mutation
- objects, maps, and sets
- closures
- sorting
- frequency counting
- 2D arrays
- optional chaining
- async basics
- queue behavior
- interview-style utility coding
