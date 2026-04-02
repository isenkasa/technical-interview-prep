# Backend Concepts

## SQL Joins
A JOIN combines rows from multiple tables based on a related column

### Inner Join
Returns only matching rows in both tables
```
SELECT *
FROM users u
INNER JOIN orders o ON u.id = o.user_id
```
Returns only users with orders.

### Left Join
Returns all rows from the left table + matching rows from the right
If no match -> NULL
```
SELECT *
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
```
Returns all users, even if they have no orders.

### Right Join
Opposite of LEFT JOIN

### Full Outer Join
Returns all rows from both tables (rare)

### Use Case
Use INNER JOIN -> when you only care about matches
Use LEFT JOIN -> when you want everything from the main table

## Indexing Basics
An index is a data structure that makes lookups faster

Without index:
- DB scans entire table (very slow)

With index:
- DB jumps directly to rows (fast)

Indeces improve WHERE queries, JOIN performance, ORDER BY

Downsides:
- Slower writes
- extra storage

Composite index is when you create an index based on two columns ```INDEX(user_id, created_at)```

**Key Rule**
Index columns that are:
- frequently filtered
- used in joins
- high cardinality (many unique values)

Don't index:
- everything (kills write performance)
- low-cardinality columns (e.g. boolean)

### Key optimization tactics
- Use indexes
- Use JOIN instead of multiple queries
- Select only needed columns
- Avoid large OFFSET
- Use pagination properly
- Analyze query plans (EXPLAIN keyword)

## Rest API Design Principles

The core idea behind REST: Design APIs around resources

Example:
- users
- orders
- products

### HTTP Methods

- GET - used for READ
- POST - used for CREATE
- PUT - used for REPLACE
- PATCH - used for UPDATE
- DELETE - used for DELETE

### Status Codes
- 200 OK
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 404 Not Found
- 500 Internal Error

