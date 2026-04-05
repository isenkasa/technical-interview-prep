## JS / TS / Node Fundamentals

This guide is meant to make you interview-ready for:
- JavaScript coding rounds
- TypeScript/backend interviews
- Node.js API and production questions

How to use it:
- read the explanation
- study the example
- try to explain the topic out loud in your own words
- connect the concept to real backend work, not just syntax

---

## JavaScript fundamentals

### Scope

Scope defines where a variable can be accessed.

Main types of scope in JavaScript:
- global scope
- function scope
- block scope

`var` is function-scoped.
`let` and `const` are block-scoped.

Example:

```js
if (true) {
  var a = 1
  let b = 2
  const c = 3
}

console.log(a) // 1
console.log(b) // ReferenceError
console.log(c) // ReferenceError
```

Why:
- `a` was declared with `var`, so it escapes the block
- `b` and `c` only exist inside the `if` block

Interview takeaway:
- prefer `let` and `const`
- avoid `var` in modern code unless you have a specific reason

Common bug:

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}

// 3
// 3
// 3
```

Because the same `i` is shared across iterations.

With `let`:

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}

// 0
// 1
// 2
```

---

### Hoisting

Hoisting means declarations are processed before code executes.

Important nuance:
- function declarations are hoisted with their implementation
- `var` declarations are hoisted and initialized to `undefined`
- `let` and `const` are hoisted too, but they stay in the temporal dead zone until their declaration line

Example with `var`:

```js
console.log(x) // undefined
var x = 10
```

Rough mental model:

```js
var x
console.log(x)
x = 10
```

Example with `let`:

```js
console.log(y) // ReferenceError
let y = 20
```

Example with function declarations:

```js
sayHi() // works

function sayHi() {
  console.log('hi')
}
```

Function expression:

```js
sayBye() // TypeError: sayBye is not a function

var sayBye = function () {
  console.log('bye')
}
```

Why:
- `var sayBye` is hoisted as `undefined`
- the function value is assigned later

Interview takeaway:
- hoisting explains many JS bugs
- do not summarize it as "JavaScript moves code to the top"
- the real point is how declarations are initialized before execution

---

### Closures

A closure is when a function remembers variables from the scope where it was created, even after that outer function has finished running.

Example:

```js
function createCounter() {
  let count = 0

  return function () {
    count++
    return count
  }
}

const counter = createCounter()
console.log(counter()) // 1
console.log(counter()) // 2
console.log(counter()) // 3
```

Why this works:
- the inner function still has access to `count`
- `count` remains alive because the returned function still references it

Real uses:
- data privacy
- factories
- memoization
- callbacks
- event handlers

Interview explanation:

> A closure is a function plus the lexical environment it was created in. That lets it access outer variables later, even after the outer function has returned.

Common interview example:

```js
function makeAdder(x) {
  return function (y) {
    return x + y
  }
}

const add5 = makeAdder(5)
console.log(add5(3)) // 8
```

Common mistake:
- closures capture variables, not frozen values

Example:

```js
let value = 1

function printValue() {
  console.log(value)
}

value = 5
printValue() // 5
```

---

### `this`

`this` refers to the object that a function is called on, not where the function is defined.

This is one of the most common JavaScript interview topics.

Example:

```js
const user = {
  name: 'Sam',
  greet() {
    console.log(this.name)
  }
}

user.greet() // Sam
```

But:

```js
const fn = user.greet
fn() // undefined in strict mode behavior for this pattern
```

Why:
- the function lost its object context

Rules to remember:
- regular function call: `this` depends on how it was called
- method call: `obj.method()` means `this === obj`
- constructor call: `new User()` means `this` is the new instance
- arrow functions do not have their own `this`; they capture surrounding `this`

Example with arrow function:

```js
const user = {
  name: 'Sam',
  greet: () => {
    console.log(this.name)
  }
}

user.greet() // usually undefined here
```

Why:
- arrow functions use lexical `this`
- they are usually a bad choice for object methods

Common fixes:

```js
const bound = user.greet.bind(user)
bound()
```

Interview takeaway:
- `this` is determined by call site for normal functions
- arrow functions capture outer `this`

---

### Prototypes and prototype chain

JavaScript objects can inherit properties from other objects through the prototype chain.

Example:

```js
const animal = {
  speak() {
    return 'sound'
  }
}

const dog = Object.create(animal)
dog.bark = function () {
  return 'bark'
}

console.log(dog.bark()) // bark
console.log(dog.speak()) // sound
```

Why `dog.speak()` works:
- JS looks on `dog`
- if not found, it looks on `dog`'s prototype
- then continues up the chain

Classes are syntax over prototypes:

```js
class Animal {
  speak() {
    return 'sound'
  }
}

class Dog extends Animal {}
```

Interview explanation:
- JavaScript uses prototype-based inheritance
- `class` syntax makes it feel class-based, but it still works through prototypes underneath

Why this matters:
- method lookup
- inheritance behavior
- memory efficiency since methods can live on the prototype rather than each object instance

---

### Event loop

The event loop is how JavaScript handles asynchronous work while running on a single call stack.

High-level model:
- synchronous code runs first
- completed async callbacks are queued
- the event loop moves eligible tasks onto the call stack when it is empty

JavaScript itself runs one frame of JS code at a time, but the runtime environment helps with timers, network I/O, file I/O, and other asynchronous operations.

Good interview explanation:

> The event loop lets JavaScript handle asynchronous operations by taking completed tasks from queues and pushing them onto the call stack when the stack is empty.

---

### Call stack

The call stack tracks which functions are currently executing.

Example:

```js
function one() {
  two()
}

function two() {
  three()
}

function three() {
  console.log('done')
}

one()
```

Call stack flow:
- `one`
- `two`
- `three`
- back out as functions return

Why this matters:
- stack traces
- recursion
- understanding event loop questions

Stack overflow example:

```js
function recurse() {
  recurse()
}

recurse() // Maximum call stack size exceeded
```

---

### Microtasks vs macrotasks

This topic appears very often in interviews.

Common macrotasks:
- `setTimeout`
- `setInterval`
- I/O callbacks
- `setImmediate` in Node

Common microtasks:
- `Promise.then`
- `catch`
- `finally`
- `queueMicrotask`

Rule:
- after the current synchronous code finishes, microtasks run before the next macrotask

Example:

```js
console.log('start')

setTimeout(() => console.log('timeout'), 0)

Promise.resolve().then(() => console.log('promise'))

console.log('end')
```

Output:

```js
start
end
promise
timeout
```

Why:
- synchronous code first
- then microtasks
- then macrotasks

Interview takeaway:
- promises do not run "instantly"
- they schedule microtasks

---

### Promises

A Promise represents a future value.

States:
- pending
- fulfilled
- rejected

Example:

```js
const promise = new Promise((resolve, reject) => {
  const success = true

  if (success) {
    resolve('done')
  } else {
    reject(new Error('failed'))
  }
})

promise
  .then(result => console.log(result))
  .catch(err => console.error(err.message))
```

Why promises matter:
- cleaner async composition than deeply nested callbacks
- easier error handling
- standard abstraction for async results

Key behavior:
- `then` returns a new promise
- thrown errors inside `then` become rejected promises

Example:

```js
Promise.resolve(5)
  .then(x => x * 2)
  .then(x => {
    throw new Error('boom')
  })
  .catch(err => console.log(err.message)) // boom
```

Useful helpers:
- `Promise.all`: fail fast if one rejects
- `Promise.allSettled`: wait for all results
- `Promise.race`: settle with the first one that settles
- `Promise.any`: fulfill with the first successful promise

Example:

```js
const [user, orders] = await Promise.all([
  fetchUser(),
  fetchOrders()
])
```

Use this when the operations are independent and can run in parallel.

---

### `async` / `await`

`async` / `await` is syntax built on top of promises.

Example:

```js
async function getUserData() {
  try {
    const user = await fetchUser()
    const orders = await fetchOrders(user.id)
    return { user, orders }
  } catch (err) {
    console.error('Failed to load user data', err)
    throw err
  }
}
```

Important details:
- an `async` function always returns a promise
- `await` pauses only inside that async function, not the whole program
- `await` on a non-promise wraps the value in a resolved promise

Common mistake:

```js
const a = await fetchA()
const b = await fetchB()
```

If `fetchA()` and `fetchB()` are independent, this is slower than:

```js
const [a, b] = await Promise.all([fetchA(), fetchB()])
```

Interview takeaway:
- `async` / `await` improves readability
- it does not make code synchronous under the hood

---

### Error handling

In JavaScript, errors can happen:
- synchronously with `throw`
- asynchronously through promise rejection

Synchronous example:

```js
try {
  throw new Error('Something went wrong')
} catch (err) {
  console.error(err.message)
}
```

Async example:

```js
async function run() {
  try {
    await fetchUser()
  } catch (err) {
    console.error('Request failed', err)
  }
}
```

Important rule:
- `try/catch` only catches awaited async errors inside that async function
- if you forget to `await`, the rejection may escape

Bad:

```js
try {
  fetchUser()
} catch (err) {
  // usually will not catch async rejection
}
```

Better:

```js
try {
  await fetchUser()
} catch (err) {
  // catches rejection
}
```

Good practices:
- include context in error messages
- do not swallow errors silently
- use custom error classes when needed

Example:

```js
class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NotFoundError'
  }
}
```

---

### Array methods like `map`, `filter`, `reduce`

These show up constantly in interviews.

`map` transforms each element into a new value:

```js
const nums = [1, 2, 3]
const doubled = nums.map(n => n * 2)
console.log(doubled) // [2, 4, 6]
```

`filter` keeps only elements that match a condition:

```js
const nums = [1, 2, 3, 4]
const evens = nums.filter(n => n % 2 === 0)
console.log(evens) // [2, 4]
```

`reduce` combines all elements into one result:

```js
const nums = [1, 2, 3, 4]
const sum = nums.reduce((acc, n) => acc + n, 0)
console.log(sum) // 10
```

Practical backend example:

```js
const orders = [
  { id: 1, total: 30, paid: true },
  { id: 2, total: 50, paid: false },
  { id: 3, total: 20, paid: true }
]

const paidTotal = orders
  .filter(order => order.paid)
  .reduce((sum, order) => sum + order.total, 0)

console.log(paidTotal) // 50
```

Interview note:
- know which methods mutate and which do not
- `map`, `filter`, and `reduce` return new values

---

### Object destructuring and spread

Destructuring lets you pull values out of arrays or objects.

Example:

```js
const user = { id: 1, name: 'Ava', role: 'admin' }
const { name, role } = user

console.log(name) // Ava
console.log(role) // admin
```

Rename and default:

```js
const { name: userName, department = 'engineering' } = user
```

Array destructuring:

```js
const [first, second] = [10, 20]
```

Spread copies enumerable properties into a new object or array:

```js
const original = { id: 1, name: 'Ava' }
const updated = { ...original, role: 'admin' }
```

Array example:

```js
const nums = [1, 2]
const more = [...nums, 3, 4]
```

Important caveat:
- spread does a shallow copy, not a deep copy

Example:

```js
const a = { nested: { x: 1 } }
const b = { ...a }
b.nested.x = 99

console.log(a.nested.x) // 99
```

---

### Modules: CommonJS vs ES Modules

These are two module systems you need to know.

CommonJS:

```js
const fs = require('fs')

module.exports = {
  readFile() {}
}
```

ES Modules:

```js
import fs from 'fs'

export function readFile() {}
```

Key differences:
- CommonJS uses `require` and `module.exports`
- ES Modules use `import` and `export`
- CommonJS is historically the default in Node
- ES Modules are the standard modern JS module system

Interview note:
- know both
- modern frontend and most new JS tooling prefer ESM
- Node supports both, but configuration matters

---

## TypeScript fundamentals

### Basic types

TypeScript adds static types on top of JavaScript.

Common basic types:
- `string`
- `number`
- `boolean`
- `null`
- `undefined`
- `object`
- `array`
- `tuple`
- `void`
- `never`

Example:

```ts
const name: string = 'Ava'
const age: number = 30
const isAdmin: boolean = true

const tags: string[] = ['node', 'ts']
const point: [number, number] = [10, 20]
```

Why TypeScript helps:
- catches bugs before runtime
- improves editor autocomplete
- makes large codebases safer to refactor

---

### Interfaces

Interfaces describe object shapes.

Example:

```ts
interface User {
  id: number
  name: string
  email?: string
}

const user: User = {
  id: 1,
  name: 'Ava'
}
```

Why interfaces are useful:
- define expected structure
- improve consistency across functions/classes
- commonly used for API responses, request payloads, and service contracts

---

### Type aliases

Type aliases let you name any type, not just object shapes.

Example:

```ts
type UserId = string

type Status = 'idle' | 'loading' | 'success' | 'error'

type User = {
  id: UserId
  name: string
}
```

Simple distinction:
- interfaces are great for object contracts and extension
- type aliases are more flexible for unions, intersections, primitives, and more complex compositions

In practice:
- both are used heavily
- teams often choose one style for consistency

---

### Union and intersection types

Union means "one of several possible types".

```ts
type Id = string | number

function printId(id: Id) {
  console.log(id)
}
```

Intersection means "combine multiple types into one".

```ts
type Timestamped = {
  createdAt: Date
}

type User = {
  id: string
  name: string
}

type TimestampedUser = User & Timestamped
```

Interview takeaway:
- union = either/or
- intersection = both

---

### Generics

Generics let you write reusable code that works with different types while preserving type safety.

Example:

```ts
function identity<T>(value: T): T {
  return value
}

const a = identity<string>('hello')
const b = identity<number>(42)
```

Generic interface:

```ts
interface ApiResponse<T> {
  data: T
  success: boolean
  error?: string
}

const response: ApiResponse<{ id: number; name: string }> = {
  data: { id: 1, name: 'Ava' },
  success: true
}
```

Why generics matter:
- reusable functions
- reusable containers/wrappers
- strongly typed APIs and repositories

---

### Utility types

TypeScript includes useful built-in helpers.

Common ones:
- `Partial<T>`: makes all properties optional
- `Required<T>`: makes all properties required
- `Pick<T, K>`: choose specific properties
- `Omit<T, K>`: remove specific properties
- `Record<K, T>`: map keys to values
- `Readonly<T>`: prevent reassignment

Example:

```ts
interface User {
  id: string
  name: string
  email: string
}

type UserUpdate = Partial<User>
type PublicUser = Omit<User, 'email'>
type UserSummary = Pick<User, 'id' | 'name'>
```

Practical backend example:

```ts
type CreateUserInput = Omit<User, 'id'>
type UpdateUserInput = Partial<CreateUserInput>
```

---

### Type narrowing

Type narrowing means TypeScript refines a broader type into a more specific one after checks.

Example:

```ts
function printId(id: string | number) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase())
  } else {
    console.log(id.toFixed(0))
  }
}
```

Other narrowing techniques:
- `typeof`
- `instanceof`
- `'property' in object`
- discriminated unions

Discriminated union example:

```ts
type Success = { status: 'success'; data: string }
type Failure = { status: 'error'; message: string }
type Result = Success | Failure

function handleResult(result: Result) {
  if (result.status === 'success') {
    console.log(result.data)
  } else {
    console.log(result.message)
  }
}
```

This is very common in real applications.

---

### Optional vs required properties

Optional property:

```ts
interface User {
  id: string
  name: string
  email?: string
}
```

Meaning:
- `email` may be missing

Required property:

```ts
interface User {
  id: string
  name: string
}
```

Why this matters:
- API inputs often have optional fields
- persisted entities often have stricter required fields

Common mistake:
- assuming an optional property always exists

Example:

```ts
function sendEmail(user: User) {
  if (user.email) {
    console.log(user.email.toLowerCase())
  }
}
```

---

### `unknown` vs `any`

`any` disables type safety.
`unknown` forces you to check the value before using it.

Example:

```ts
let a: any = 'hello'
console.log(a.toUpperCase()) // allowed, even if unsafe
```

```ts
let b: unknown = 'hello'

if (typeof b === 'string') {
  console.log(b.toUpperCase()) // safe
}
```

Interview answer:
- use `unknown` when the input type is not known yet
- avoid `any` unless absolutely necessary

Common example:
- parsing third-party JSON

---

### Enums vs string literal unions

Enum example:

```ts
enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}
```

String literal union:

```ts
type Role = 'ADMIN' | 'USER'
```

Why many teams prefer string unions:
- simpler
- works well with plain JS values
- often easier with APIs and serialization

When enums may be useful:
- when a codebase already uses them heavily
- when you want a namespaced set of constants

Interview takeaway:
- know both
- string literal unions are often more lightweight and ergonomic

---

### Function typing

Example:

```ts
function add(a: number, b: number): number {
  return a + b
}
```

Function type alias:

```ts
type Compare = (a: number, b: number) => number

const compare: Compare = (a, b) => a - b
```

Async function typing:

```ts
async function fetchUser(id: string): Promise<{ id: string; name: string }> {
  return { id, name: 'Ava' }
}
```

Why this matters:
- clearer contracts
- better maintainability
- especially useful for service and controller layers

---

### Extending interfaces and composing types

Interface extension:

```ts
interface User {
  id: string
  name: string
}

interface AdminUser extends User {
  permissions: string[]
}
```

Type composition:

```ts
type User = {
  id: string
  name: string
}

type WithTimestamps = {
  createdAt: Date
  updatedAt: Date
}

type UserRecord = User & WithTimestamps
```

Use extension/composition when:
- building layered domain models
- adding metadata
- building request/response shapes from shared building blocks

---

## Node.js fundamentals

### Node runtime basics

Node.js is a JavaScript runtime built on the V8 engine.

It lets you run JavaScript outside the browser, especially for:
- servers
- CLIs
- automation
- build tools

Node gives you runtime APIs like:
- file system access
- networking
- streams
- process information

Interview takeaway:
- JavaScript language and Node runtime are different concepts

---

### Single-threaded model

Node executes JavaScript on a single main thread.

This means:
- one JS call stack
- one piece of JS code executing at a time on that thread

But this does not mean Node can only do one thing overall.

It still handles concurrency through:
- the event loop
- OS async operations
- libuv thread pool for certain tasks

Good interview explanation:

> Node runs JavaScript on a single main thread, but it can still handle many concurrent I/O operations by delegating work to the runtime and operating system.

---

### Non-blocking I/O

Node is strong at I/O-heavy workloads because file, network, and database operations can be handled asynchronously.

Example:

```js
const fs = require('fs')

fs.readFile('notes.txt', 'utf8', (err, data) => {
  if (err) throw err
  console.log(data)
})

console.log('reading file...')
```

Output order:
- `reading file...`
- file contents later

Why:
- file read is delegated
- callback runs when it completes

Good fit for Node:
- APIs
- chat services
- proxy/gateway services
- real-time apps
- services doing lots of network/database work

---

### Streams

Streams process data piece by piece instead of loading everything into memory at once.

Main stream types:
- readable
- writable
- duplex
- transform

Why streams matter:
- memory efficiency
- better for large files
- supports piping between sources and destinations

Example:

```js
const fs = require('fs')

const readStream = fs.createReadStream('input.txt')
const writeStream = fs.createWriteStream('output.txt')

readStream.pipe(writeStream)
```

Interview use case:
- large file processing
- log processing
- uploads/downloads
- compression pipelines

---

### Buffers

Buffers represent raw binary data in Node.

Example:

```js
const buf = Buffer.from('hello')

console.log(buf) // raw bytes
console.log(buf.toString()) // hello
```

Why buffers matter:
- file data
- network packets
- binary protocols
- image/video processing

Interview takeaway:
- strings are text
- buffers are raw bytes

---

### File system basics

Node provides file APIs through `fs`.

Modern async example:

```js
import { promises as fs } from 'fs'

const content = await fs.readFile('notes.txt', 'utf8')
console.log(content)
```

Basic operations:
- read file
- write file
- append file
- list directories
- delete/move files

Important backend note:
- avoid blocking file operations in request handlers when possible

Bad:

```js
const fs = require('fs')
const data = fs.readFileSync('big-file.txt', 'utf8')
```

That can block the event loop.

---

### Process and environment variables

`process` gives information about the current Node process.

Examples:
- `process.env`
- `process.argv`
- `process.exit()`
- signal handling

Environment variable example:

```js
const port = process.env.PORT || 3000
console.log(`Server running on ${port}`)
```

Why this matters:
- environment-specific config
- secrets and runtime settings
- CI/CD and containerized deployments

Interview note:
- do not hardcode secrets into source code

---

### CommonJS vs ESM in Node

Node supports both module systems.

CommonJS:

```js
const express = require('express')
module.exports = { app }
```

ESM:

```js
import express from 'express'
export { app }
```

Real-world issue:
- syntax, tooling, and package configuration must align
- mixing systems can cause import/export confusion

Interview takeaway:
- know what your project uses
- understand how imports differ

---

### EventEmitter

`EventEmitter` is Node’s built-in publish/subscribe pattern.

Example:

```js
const EventEmitter = require('events')

const emitter = new EventEmitter()

emitter.on('userCreated', user => {
  console.log('Send welcome email to', user.email)
})

emitter.emit('userCreated', { email: 'a@example.com' })
```

Why it matters:
- internal app events
- loose coupling between components
- useful for lifecycle hooks or notifications

Be careful:
- too many hidden event chains can become hard to debug

---

### Error-first callbacks

Older Node APIs often use this pattern:

```js
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  console.log(data)
})
```

Convention:
- first argument is the error
- second is the result

Why you still need to know it:
- legacy codebases
- many libraries still expose it
- helpful for understanding Node history and callback patterns

---

### When Node is a good fit and when it is not

Node is a good fit for:
- APIs
- I/O-heavy services
- real-time apps
- streaming
- edge/backend-for-frontend services

Node is not the best fit when:
- the workload is heavily CPU-bound
- you are doing intense image/video processing in-process
- you need long-running heavy computation on the main thread

Examples of CPU-heavy tasks:
- large compression jobs
- ML inference
- complex data transformations at high scale

Better options:
- worker threads
- separate job workers
- a different language/runtime for the heavy compute part

---

## Backend / API concepts in Node

### Express fundamentals

Express is a minimal web framework for Node.

Basic example:

```js
import express from 'express'

const app = express()
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ ok: true })
})

app.listen(3000, () => {
  console.log('Server started')
})
```

Core ideas:
- app receives HTTP requests
- routes decide which handler should run
- handlers return responses
- middleware can run before route handlers

---

### Middleware flow

Middleware is code that runs during the request-response cycle.

Example:

```js
app.use((req, res, next) => {
  console.log(req.method, req.path)
  next()
})
```

Flow:
- request enters app
- middleware runs in order
- route handler runs
- response is sent
- error middleware runs if something fails

Common middleware responsibilities:
- logging
- auth
- validation
- parsing JSON
- rate limiting

Interview note:
- middleware order matters

---

### Request lifecycle

Typical lifecycle:

1. client sends request
2. Node server receives it
3. middleware runs
4. validation/auth checks happen
5. route/controller logic runs
6. service layer may call DB or external APIs
7. response is returned
8. logging/metrics may be recorded

Good interview answers often separate:
- controller
- service
- data access

This keeps responsibilities clear.

---

### Route organization

Bad:
- all routes and business logic in one giant file

Better:
- routes define endpoints
- controllers handle HTTP-level concerns
- services contain business logic
- repositories/data layer talk to DB

Example structure:

```txt
src/
  routes/
  controllers/
  services/
  repositories/
  middleware/
```

Why this helps:
- testability
- readability
- easier scaling of the codebase

---

### Validation

Never trust incoming request data.

Validate:
- body
- params
- query string
- headers when needed

Example:

```js
app.post('/users', (req, res) => {
  const { email, name } = req.body

  if (!email || !name) {
    return res.status(400).json({ error: 'email and name are required' })
  }

  res.status(201).json({ ok: true })
})
```

In production, validation libraries are often better than manual checks.

Why validation matters:
- security
- correctness
- better error messages

---

### Centralized error handling

Instead of handling errors differently in every route, use centralized middleware.

Example:

```js
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
})
```

Benefits:
- consistent responses
- cleaner route handlers
- easier logging and monitoring

Good practice:
- distinguish operational errors from programmer bugs
- avoid leaking internal stack traces to clients

---

### Authentication and authorization

Authentication answers:
- who are you?

Authorization answers:
- what are you allowed to do?

Example:
- user logs in with email/password: authentication
- checking whether that user can delete another user: authorization

Interview takeaway:
- do not use the terms interchangeably

---

### JWT flow

Typical JWT auth flow:

1. user logs in
2. server verifies credentials
3. server signs a JWT
4. client sends JWT on future requests
5. server verifies JWT and extracts claims

Common usage:

```txt
Authorization: Bearer <token>
```

JWT usually contains claims like:
- user id
- role
- expiration

Important warning:
- JWT signature proves integrity, not that you should trust every claim blindly without validation rules

Common tradeoff:
- stateless and scalable
- but token revocation is harder than session invalidation

---

### Sessions vs tokens

Sessions:
- server stores session state
- client stores only a session identifier
- easier to revoke centrally

Tokens:
- often self-contained
- server may not need to store session state
- common for APIs and distributed systems

Interview tradeoff:
- sessions are simpler for traditional web apps
- tokens are convenient for stateless APIs and multiple clients

Be careful:
- "stateless" does not mean "no security complexity"

---

### File uploads

File upload concerns:
- multipart parsing
- file size limits
- storage location
- security validation
- virus scanning in serious systems

Typical flow:
- client uploads file
- server validates type/size
- file is stored locally or in object storage like S3
- metadata is saved in DB

Important note:
- do not trust file extension alone

---

### Rate limiting

Rate limiting protects your service from abuse and overload.

Common approaches:
- fixed window
- sliding window
- token bucket
- leaky bucket

Example policy:
- 100 requests per minute per IP

Why it matters:
- protect login endpoints
- reduce brute force attacks
- control usage costs

Interview note:
- in distributed systems, rate limiting often needs shared state like Redis

---

### Pagination

Pagination prevents returning huge datasets in one response.

Common approaches:
- offset pagination
- cursor pagination

Offset:

```txt
/users?page=2&limit=20
```

Cursor:

```txt
/users?cursor=abc123&limit=20
```

Tradeoffs:
- offset is simple but slower for large offsets
- cursor is more scalable and stable for changing datasets

---

### Filtering and sorting

APIs often support query features like:
- filtering by status
- sorting by created date
- searching by name

Example:

```txt
/orders?status=paid&sortBy=createdAt&order=desc
```

Best practices:
- validate allowed fields
- avoid raw interpolation into queries
- add indexes for common filter/sort patterns

---

### API versioning

Versioning helps you evolve APIs without breaking clients.

Common patterns:
- URL versioning: `/v1/users`
- header versioning

Why version:
- breaking response changes
- changed request formats
- migration over time

Interview note:
- version only when needed
- avoid constant churn

---

### Idempotency for endpoints

An operation is idempotent if repeating it has the same effect as doing it once.

Examples:
- `GET` should be idempotent
- `PUT` is usually idempotent
- `POST` is often not idempotent by default

Payment example:
- client retries a payment request due to timeout
- without idempotency, you may charge twice

Common fix:
- use an idempotency key

Example idea:
- client sends `Idempotency-Key: xyz`
- server stores the result for that key
- retries return the same result instead of repeating the side effect

---

## Performance and reliability

### Blocking vs non-blocking code

Blocking code stops the event loop from doing other work.

Example:

```js
const fs = require('fs')
const data = fs.readFileSync('big-file.txt', 'utf8')
```

This blocks the thread until the file is fully read.

Non-blocking version:

```js
fs.readFile('big-file.txt', 'utf8', (err, data) => {
  if (err) throw err
  console.log(data)
})
```

Interview takeaway:
- avoid blocking work in hot request paths

---

### CPU-bound vs I/O-bound work

CPU-bound:
- lots of computation
- hashing, image processing, heavy loops, compression

I/O-bound:
- waiting on DB, network, file system

Why the distinction matters:
- Node shines with I/O-bound work
- CPU-heavy work can block the event loop and hurt throughput

Fixes for CPU-heavy tasks:
- worker threads
- background jobs
- separate services

---

### Memory leaks in Node

A memory leak happens when memory that is no longer needed is still referenced and cannot be garbage collected.

Common causes:
- global caches that grow forever
- event listeners not removed
- timers never cleared
- storing large request data accidentally
- closures keeping references alive

Example:

```js
const cache = []

app.get('/users', async (req, res) => {
  const users = await getUsers()
  cache.push(users) // grows forever
  res.json(users)
})
```

Signs:
- process memory keeps growing
- restarts temporarily fix the issue
- eventual crashes or OOM kills

---

### Caching in Node apps

Caching can reduce latency and database load.

Common caching layers:
- in-memory cache
- Redis
- CDN for static assets

What to cache:
- expensive repeated reads
- computed results
- session data in some architectures

Tradeoffs:
- stale data
- cache invalidation complexity
- memory usage

Interview note:
- always discuss TTL and invalidation strategy

---

### Connection pooling

Database connections are expensive to create repeatedly.

A pool:
- reuses connections
- reduces connection overhead
- improves throughput

Why it matters:
- opening a new DB connection per request does not scale well

Interview note:
- tune pool size carefully
- too few hurts throughput
- too many can overload the database

---

### Retry logic

Retries help with transient failures.

Examples of transient issues:
- temporary network blip
- upstream timeout
- short-lived service overload

Good retry practices:
- use exponential backoff
- add jitter
- retry only safe/idempotent operations unless designed otherwise
- cap retry count

Bad idea:
- infinite immediate retries

---

### Timeouts

Timeouts stop requests from hanging forever.

You may need timeouts for:
- outbound HTTP calls
- DB queries
- job processing

Why timeouts matter:
- protects resources
- improves resilience
- avoids cascading failure

Interview note:
- a missing timeout is a common production bug

---

### Graceful shutdown

When a service is shutting down, it should:
- stop accepting new requests
- finish in-flight requests if possible
- close DB connections
- flush logs/metrics if needed

Why:
- prevents dropped work
- avoids corrupting in-progress operations

Common trigger:
- `SIGTERM` in containers/orchestrators

---

### Logging

Logs help you understand what happened in production.

Good logs are:
- structured
- contextual
- consistent

Useful fields:
- request id
- user id when appropriate
- route
- status code
- latency
- error code

Bad logging:
- vague messages
- logging secrets
- massive noisy debug output in production

---

### Observability basics

Observability usually includes:
- logs
- metrics
- tracing

Logs:
- individual events

Metrics:
- counts, latency, error rates, CPU, memory

Tracing:
- request flow across services

Interview answer:
- observability helps you detect, debug, and understand production behavior

---

## Database integration

### ORM vs raw SQL

ORM pros:
- faster development
- models and relationships
- abstraction over repetitive queries

ORM cons:
- hidden query complexity
- harder optimization in some cases
- can encourage accidental inefficiency

Raw SQL pros:
- more control
- easier to optimize critical queries
- explicit behavior

Raw SQL cons:
- more manual work
- more boilerplate

Interview takeaway:
- use the right tool for the job
- many teams use both depending on the query

---

### Transactions

A transaction groups multiple DB operations into one atomic unit.

If one part fails, the whole transaction can be rolled back.

Example use case:
- create order
- reserve inventory
- create payment record

Why transactions matter:
- keep data consistent
- prevent partial writes

Interview note:
- know the difference between business logic correctness and database atomicity

---

### Query optimization

Slow queries are a common backend bottleneck.

Ways to improve:
- fetch only needed columns
- avoid unnecessary joins
- use indexes
- paginate large result sets
- inspect query plans

Bad:
- `SELECT *` everywhere

Better:
- select only what the API needs

---

### Indexing

Indexes speed up lookups by making data easier to search.

Good for:
- frequently filtered columns
- join columns
- sorting columns

Tradeoffs:
- more storage
- slower writes
- too many indexes can hurt insert/update performance

Interview takeaway:
- indexes improve reads, but they are not free

---

### N+1 queries

N+1 happens when:
- one query fetches a list
- then another query runs once per item in the list

Example:
- fetch 100 users
- then fetch orders for each user individually
- total becomes 101 queries

Why it is bad:
- poor performance
- excessive DB round trips

Fixes:
- eager loading
- batching
- joins
- dataloader patterns in some architectures

---

### Connection management

Good connection management means:
- using pools
- closing connections properly
- not leaking idle connections

Why it matters:
- resource efficiency
- stability under load
- better performance

---

### Migrations

Migrations track schema changes over time.

Examples:
- add column
- create table
- backfill data
- add index

Why migrations matter:
- repeatable deployments
- team coordination
- safer schema evolution

Good practice:
- make migrations reversible when possible
- test them before production rollout

---

### Data modeling in backend apps

Data modeling means deciding how to represent business concepts in storage.

Questions to ask:
- what are the main entities?
- what relationships exist?
- what needs to be queried often?
- what consistency rules matter?

Good models balance:
- correctness
- query performance
- maintainability

Interview note:
- schema design should reflect access patterns, not just conceptual purity

---

## Testing

### Unit testing

Unit tests verify small isolated pieces of logic.

Examples:
- utility functions
- validators
- service methods with dependencies mocked

Good unit tests:
- are fast
- are deterministic
- focus on logic, not infrastructure

---

### Integration testing

Integration tests verify multiple pieces working together.

Examples:
- API route + DB
- service + repository
- auth middleware + endpoint behavior

Why it matters:
- catches wiring issues unit tests miss

---

### Mocking

Mocking replaces real dependencies with controlled test doubles.

Common things to mock:
- external APIs
- email services
- payment providers
- sometimes DB/repositories in unit tests

Be careful:
- too much mocking can make tests unrealistic

---

### API testing

API tests verify:
- status codes
- response body
- auth behavior
- validation errors
- edge cases

Example cases:
- valid request returns `201`
- invalid input returns `400`
- unauthenticated request returns `401`
- forbidden action returns `403`

---

### Testing async code

When testing async code:
- await promises
- assert rejected cases
- avoid flaky timing assumptions

Common bug:
- forgetting to await means the test may pass before async work completes

---

### What to test vs not test

Test:
- business rules
- validation
- edge cases
- failure paths
- auth/permission behavior

Usually do not over-test:
- framework internals
- trivial getters/setters
- implementation details that make refactors painful

Interview answer:
- test behavior, not just lines of code

---

## Architecture / production topics

### Monolith vs microservices in Node

Monolith pros:
- simpler deployment
- easier local development
- easier transactions across modules

Monolith cons:
- can become hard to scale organizationally
- larger blast radius if poorly structured

Microservices pros:
- independent deployment
- team autonomy
- scale specific components separately

Microservices cons:
- operational complexity
- distributed tracing/debugging challenges
- network failures and consistency concerns

Interview takeaway:
- do not claim microservices are automatically better

---

### Queues and background jobs

Queues help move work out of the request path.

Use cases:
- sending emails
- image processing
- report generation
- retries for external services

Why use queues:
- faster API response times
- better reliability
- retry and backpressure handling

Common pattern:
- API creates job
- worker consumes job
- status is stored and tracked

---

### Cron jobs

Cron jobs run tasks on a schedule.

Use cases:
- cleanup tasks
- billing jobs
- daily report generation
- cache warmup

Risks:
- duplicate execution in distributed environments
- long-running jobs overlapping
- poor visibility if not monitored

---

### Webhooks

A webhook is an HTTP callback sent when an event happens.

Example:
- Stripe sends a webhook when payment succeeds

Important concerns:
- signature verification
- retries
- idempotency
- event ordering

Interview note:
- webhook handlers must be resilient to duplicate delivery

---

### Third-party API integrations

When integrating external APIs, plan for:
- rate limits
- timeouts
- retries
- partial outages
- schema changes

Good practices:
- wrap third-party APIs in service modules
- log request IDs when available
- handle failures gracefully

---

### Environment configuration

Different environments usually need different config:
- local
- test
- staging
- production

Examples:
- DB URLs
- API base URLs
- feature flags
- log levels

Good practice:
- validate config at startup

Why:
- fail fast if required values are missing

---

### Secrets management

Secrets include:
- database passwords
- API keys
- JWT signing keys

Bad:
- hardcoding secrets in source
- committing `.env` with real values

Better:
- use secret managers or secure environment injection
- rotate secrets when needed

Interview takeaway:
- secrets handling is part of backend engineering, not an afterthought

---

### Dockerizing a Node app

Docker packages your app with its runtime dependencies.

Why teams use it:
- consistent environments
- easier deployment
- reproducible builds

High-level flow:
- define image in `Dockerfile`
- build image
- run container

Interview note:
- know why containers help, even if you do not memorize every Docker command

---

### CI/CD basics for backend services

CI/CD usually includes:
- install dependencies
- run linting
- run tests
- build artifacts
- deploy to target environment

Why it matters:
- faster feedback
- safer releases
- automation over manual steps

Good production mindset:
- do not treat deployment as an afterthought
- testing, config, migrations, and observability all matter

---

## Final interview reminders

- explain the concept in plain English first
- then give a small example
- then mention why it matters in real systems
- be precise about JavaScript behavior, especially `this`, closures, promises, and the event loop
- for TypeScript, focus on type safety and maintainability
- for Node, connect concepts back to APIs, databases, performance, and production reliability

If you can define the topic, walk through a short example, and explain where it matters in backend work, you will sound much stronger in interviews.
