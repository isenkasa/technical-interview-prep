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

## Two Pointers
## Sliding Window
## Binary Search