# Object-Oriented Programming (Interview Guide)
JavaScript + Java | Interview + Real World

---

# 1. WHAT IS OOP?

Object-Oriented Programming (OOP) is a way to organize code around **objects**.

An object usually combines:
- state (data, fields, properties)
- behavior (methods)

Why teams use OOP:
- model real entities or system components
- group related logic together
- make code easier to extend and maintain
- create clearer boundaries between parts of a system

Simple example:
- a `BankAccount` has data like `balance`
- it also has behavior like `deposit()` and `withdraw()`

Good interview definition:

> OOP is a design style where data and the operations on that data are grouped together into objects. It helps manage complexity through encapsulation, abstraction, composition, and polymorphism.

Important clarification:
- OOP is a tool, not a rule
- not every problem should be solved with classes
- for small transformations, utility functions or functional patterns can be simpler

---

# 2. WHEN OOP IS A GOOD FIT

OOP works well when:
- the system has clear entities with state and behavior
- objects need to evolve over time
- you want strong boundaries between components
- you are designing a larger system, not just solving a one-off algorithm problem

Examples:
- user/account/order systems
- game entities
- payment methods
- file systems
- parking lot / elevator / library management interview questions

OOP is usually a weaker fit when:
- the problem is mostly data transformation
- behavior is simple and stateless
- classes would add ceremony without adding clarity

Examples:
- formatting data
- array/object transformations
- simple helper functions

---

# 3. CORE OOP CONCEPTS

## Encapsulation

**Definition:** Bundle data and the methods that operate on it together, while restricting direct access to internal state.

Why it matters:
- protects invariants
- prevents invalid state changes
- reduces accidental misuse
- makes debugging easier because updates happen through known methods

JavaScript:
```js
class BankAccount {
  #balance = 0

  deposit(amount) {
    if (amount <= 0) throw new Error('Amount must be positive')
    this.#balance += amount
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error('Insufficient funds')
    this.#balance -= amount
  }

  getBalance() {
    return this.#balance
  }
}
```

Java:
```java
class BankAccount {
  private int balance = 0;

  void deposit(int amount) {
    if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
    balance += amount;
  }

  void withdraw(int amount) {
    if (amount > balance) throw new IllegalArgumentException("Insufficient funds");
    balance -= amount;
  }

  int getBalance() {
    return balance;
  }
}
```

Interview explanation:
- the important part is not just "hiding data"
- the real goal is controlling how state changes

Bad design:
```js
account.balance = -1000
```

Better design:
```js
account.withdraw(100)
```

That lets the class enforce rules.

---

## Abstraction

**Definition:** Expose a simple interface while hiding internal complexity.

Why it matters:
- callers use the object without needing implementation details
- internal implementation can change without breaking outside code
- reduces cognitive load

JavaScript:
```js
class CoffeeMachine {
  makeCoffee() {
    this.#heatWater()
    this.#grindBeans()
    this.#brew()
    return 'coffee ready'
  }

  #heatWater() {}
  #grindBeans() {}
  #brew() {}
}
```

Java:
```java
class CoffeeMachine {
  public String makeCoffee() {
    heatWater();
    grindBeans();
    brew();
    return "coffee ready";
  }

  private void heatWater() {}
  private void grindBeans() {}
  private void brew() {}
}
```

The caller only needs:
```js
machine.makeCoffee()
```

The caller does not need:
- heating details
- brew order details
- hardware details

Interview explanation:
- abstraction is about **what** an object does
- implementation details are about **how** it does it

---

## Inheritance

**Definition:** A child class reuses or extends behavior from a parent class.

Why it can help:
- reuse common behavior
- represent an "is-a" relationship
- reduce duplication when the hierarchy is stable

JavaScript:
```js
class Animal {
  speak() {
    return 'sound'
  }
}

class Dog extends Animal {
  speak() {
    return 'bark'
  }
}
```

Java:
```java
class Animal {
  String speak() {
    return "sound";
  }
}

class Dog extends Animal {
  @Override
  String speak() {
    return "bark";
  }
}
```

Interview warning:
- inheritance is easy to overuse
- deep hierarchies become rigid and hard to change
- if the child class does not truly satisfy the parent contract, the design is probably wrong

Good fit:
- `Dog` is an `Animal`
- `AdminUser` is a `User`

Suspicious fit:
- `Car` extends `Engine`
- `Report` extends `EmailSender`

Those are usually "has-a", not "is-a", relationships.

---

## Polymorphism

**Definition:** Different objects can be used through the same interface, but each provides its own behavior.

Why it matters:
- reduces conditional logic
- makes systems easier to extend
- supports open/closed style design

JavaScript:
```js
class Animal {
  speak() {
    return 'sound'
  }
}

class Dog extends Animal {
  speak() {
    return 'bark'
  }
}

class Cat extends Animal {
  speak() {
    return 'meow'
  }
}

const animals = [new Dog(), new Cat()]
animals.forEach(animal => console.log(animal.speak()))
```

Java:
```java
class Animal {
  String speak() {
    return "sound";
  }
}

class Dog extends Animal {
  @Override
  String speak() {
    return "bark";
  }
}

class Cat extends Animal {
  @Override
  String speak() {
    return "meow";
  }
}

Animal[] animals = { new Dog(), new Cat() };
for (Animal animal : animals) {
  System.out.println(animal.speak());
}
```

Without polymorphism, people often write code like:
```js
if (type === 'dog') {
  ...
} else if (type === 'cat') {
  ...
}
```

With polymorphism, each object owns its own behavior.

Interview sound bite:

> Polymorphism lets me write code against an interface or base type, and new implementations can plug in without changing the calling code.

---

# 4. COMPOSITION VS INHERITANCE

This is one of the most important OOP interview discussions.

## Composition

**Definition:** Build objects by combining smaller objects that each have a clear responsibility.

This is a "has-a" relationship.

JavaScript:
```js
class Engine {
  start() {
    return 'engine started'
  }
}

class Car {
  constructor() {
    this.engine = new Engine()
  }

  drive() {
    return this.engine.start()
  }
}
```

`Car` has an `Engine`.

Why composition is often better:
- more flexible
- easier to test
- easier to replace parts
- avoids fragile class hierarchies

Interview rule:

> Prefer composition over inheritance unless the inheritance relationship is truly natural and stable.

Use inheritance when:
- there is a real subtype relationship
- the parent contract is meaningful
- the hierarchy is unlikely to change often

Use composition when:
- behavior can vary independently
- you want plug-and-play components
- different features should be mixed together

Common interview example:
- instead of `FlyingDuck extends Duck`
- prefer a duck object that can be given a flying strategy

That leads into strategy pattern style design.

---

# 5. JAVASCRIPT-SPECIFIC OOP NOTES

JavaScript supports OOP, but it is not the same as Java.

## Classes in JavaScript are syntax over prototypes

```js
class User {
  login() {
    return 'logged in'
  }
}
```

This looks like classical OOP, but under the hood JavaScript uses prototypes.

Interview-ready explanation:
- Java uses class-based inheritance
- JavaScript uses prototype-based inheritance
- `class` syntax in JS is cleaner and easier to read, but it still builds on prototypes

## `#privateField` is real privacy

```js
class Counter {
  #count = 0

  increment() {
    this.#count++
  }
}
```

This is different from older "private by convention" approaches like `_count`.

## Be careful with `this`

In JavaScript, method context can be lost.

```js
class Timer {
  constructor() {
    this.seconds = 0
  }

  tick() {
    this.seconds++
  }
}

const timer = new Timer()
const fn = timer.tick
fn() // `this` is not the timer instance
```

Why this matters:
- OOP design in JS often interacts with function binding rules
- in interviews, mentioning `this` shows language depth

Common fixes:
- bind the method
- wrap it in an arrow function
- call it through the instance

## Do not force classes everywhere in JavaScript

Sometimes this is cleaner:
```js
function formatUserName(user) {
  return `${user.firstName} ${user.lastName}`
}
```

than this:
```js
class UserFormatter {
  formatUserName(user) {
    return `${user.firstName} ${user.lastName}`
  }
}
```

Interview message:
- choose the simplest design that fits the problem
- OOP is useful, but not every helper needs a class

---

# 6. REAL-WORLD EXAMPLE: LRU CACHE

This is a good example because it combines:
- state
- encapsulation
- public methods
- internal implementation details

JavaScript:
```js
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.cache = new Map()
  }

  get(key) {
    if (!this.cache.has(key)) return -1

    const value = this.cache.get(key)

    // Refresh the key so it becomes most recently used
    this.cache.delete(key)
    this.cache.set(key, value)

    return value
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    }

    this.cache.set(key, value)

    if (this.cache.size > this.capacity) {
      const leastRecentlyUsedKey = this.cache.keys().next().value
      this.cache.delete(leastRecentlyUsedKey)
    }
  }
}
```

How OOP appears here:
- encapsulation: cache state is managed through `get` and `put`
- abstraction: callers do not care how recency is tracked
- class responsibility: the cache owns its own eviction policy

Good interview explanation:

> This class exposes a simple cache API while hiding the implementation details of how the least recently used entry is tracked and evicted.

Follow-up discussion you may get:
- what is the time complexity of `get` and `put`?
- how would you make it thread-safe?
- how would you support expiration with TTL?
- how would you implement it in a language without ordered maps?

---

# 7. MINI SYSTEM DESIGN EXAMPLE

## Parking Lot

This is a classic OOP interview prompt.

Possible classes:
- `ParkingLot`
- `ParkingSpot`
- `Vehicle`
- `Car`
- `Motorcycle`
- `Truck`
- `Ticket`

How to think about it:

### Step 1: Identify core entities
- parking lot
- vehicles
- spots
- tickets/payments if needed

### Step 2: Assign responsibilities
- `ParkingLot`: manages available spots and parking operations
- `ParkingSpot`: knows whether it is free and what type it supports
- `Vehicle`: base type for shared behavior/data
- specific vehicle classes: define size/type requirements

### Step 3: Decide relationships
- `ParkingLot` has many `ParkingSpot` objects
- a `Vehicle` parks in a `ParkingSpot`
- this is mostly composition, with limited inheritance for vehicle types

Interview insight:
- a strong answer is not about creating many classes
- it is about assigning responsibilities clearly

---

# 8. COMMON OOP INTERVIEW QUESTIONS

## "What are the four pillars of OOP?"

Expected answer:
- encapsulation
- abstraction
- inheritance
- polymorphism

Better answer:
- define each one briefly
- then give a small example
- then mention that composition is also extremely important in real design

## "What is the difference between abstraction and encapsulation?"

Good answer:
- abstraction hides complexity and exposes a simple interface
- encapsulation protects internal state and controls access

Short version:
- abstraction = hide implementation details
- encapsulation = protect object state and behavior boundaries

## "Inheritance vs composition?"

Good answer:
- inheritance models an "is-a" relationship
- composition models a "has-a" relationship
- composition is usually more flexible and less fragile

## "What is polymorphism in practice?"

Good answer:
- multiple classes implement the same interface or base method differently
- the caller can treat them uniformly

Example:
- different payment methods all expose `pay()`

## "Does JavaScript really support OOP?"

Good answer:
- yes
- JavaScript supports objects, encapsulation patterns, polymorphism, and inheritance
- its inheritance model is prototype-based rather than class-based under the hood

---

# 9. HOW TO ANSWER OOP QUESTIONS WELL

In interviews, do not just define terms mechanically.

A stronger pattern is:

1. define the concept simply
2. give a small example
3. explain why it helps
4. mention tradeoffs

Example for encapsulation:

> Encapsulation means an object manages its own state and exposes controlled methods to update it. For example, a bank account should not let outside code set `balance` directly. Instead, methods like `deposit` and `withdraw` enforce rules. That protects invariants and keeps the object valid.

That is much better than:

> Encapsulation means wrapping data and methods together.

Why?
- it is more practical
- it shows engineering judgment
- it sounds like someone who has built systems, not memorized flashcards

---

# 10. COMMON MISTAKES

- creating classes with no clear responsibility
- using inheritance just to reuse code
- exposing internal state too freely
- making god objects that do too much
- confusing data containers with domain models
- over-engineering simple problems

Red flag example:
- one `UserManager` class handles auth, billing, email, logging, and persistence

Better:
- split responsibilities into focused components

---

# 11. OOP TRADEOFFS

Benefits:
- good organization for complex systems
- clearer ownership of behavior
- easier to extend in many domains
- good fit for many design interviews

Costs:
- can introduce too much boilerplate
- bad class design becomes hard to change
- deep inheritance trees become fragile
- sometimes a simpler functional approach is better

Interview-ready tradeoff statement:

> OOP is helpful when I need clear boundaries, stateful entities, and extensibility. But I try not to force classes into problems that are really just straightforward data transformation.

---

# 12. QUICK REVIEW SHEET

## One-line definitions

- Encapsulation: protect state by controlling how it is accessed and modified
- Abstraction: expose a simple interface and hide implementation details
- Inheritance: derive a child type from a parent type to reuse/extend behavior
- Polymorphism: use different implementations through the same interface
- Composition: build objects from smaller collaborating objects

## Best practice

- prefer composition over inheritance
- keep classes focused on one responsibility
- design around clear interfaces
- protect invariants
- choose OOP when it adds clarity, not ceremony

---

# 13. PRACTICE PROMPTS

## Basics

- design a `BankAccount`
- design `User` and `AdminUser`
- model animals with polymorphism
- design a `Counter` with private state

## Intermediate

- build an `LRUCache`
- design a task manager system
- design a logger with different output strategies
- design a payment system with multiple payment types

## System design style

- parking lot
- library management system
- elevator system
- food delivery system

When practicing, always answer:
- what are the main classes?
- what is each class responsible for?
- where should inheritance be used?
- where is composition better?
- what state should be private?
- how would this design change if requirements grow?

---

# 14. FINAL INTERVIEW REMINDERS

- explain concepts in plain English first
- use a small example quickly
- talk about tradeoffs, not just definitions
- mention composition even if the interviewer asks about inheritance
- for JavaScript interviews, mention prototypes and `this` when relevant
- focus on responsibility and design quality, not just class count

If you can define the concept, give an example, explain why it matters, and discuss tradeoffs, you are giving a strong interview answer.
