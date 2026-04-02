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

## Two Pointers
## Sliding Window
## Binary Search