# System Design Concepts

This guide covers the system design concepts you need for technical interviews, especially for mid-to-senior backend and full-stack roles.

The goal is not to memorize definitions.
The goal is to be able to:
- explain the concept clearly
- know when to use it
- understand tradeoffs
- connect it to real systems

Good system design answers usually follow this structure:
- clarify requirements
- estimate scale
- identify bottlenecks
- design the high-level architecture
- drill into data flow and storage
- discuss tradeoffs and failure handling

---

## How to answer system design questions

A strong interview flow is:

1. clarify functional requirements
2. clarify non-functional requirements
3. estimate rough scale
4. identify core entities and APIs
5. draw the high-level design
6. discuss database, caching, and scaling
7. cover reliability, security, and observability
8. explain tradeoffs and future improvements

Examples of functional requirements:
- users can post messages
- users can upload images
- users can search products

Examples of non-functional requirements:
- low latency
- high availability
- strong consistency for payments
- support for millions of users
- low cost

Interview reminder:
- do not jump into random components too early
- first align on the problem and what matters most

---

## Scalability

### What is scalability?

Scalability is the ability of a system to handle increasing load without becoming too slow, too expensive, or unreliable.

Increased load may mean:
- more users
- more requests
- more data
- more background jobs
- more third-party integrations

A scalable system continues to perform reasonably as demand grows.

### Vertical scaling

Vertical scaling is also called **scaling up**.

You make one machine stronger by adding:
- CPU
- RAM
- disk

Pros:
- simple
- easy early on
- minimal architecture changes

Cons:
- hardware limit exists
- becomes expensive
- single point of failure
- does not distribute load

### Horizontal scaling

Horizontal scaling is also called **scaling out**.

You add more machines and spread traffic across them.

Example:
- instead of 1 app server, run 5 app servers behind a load balancer

Pros:
- handles more traffic
- better fault tolerance
- standard for modern distributed systems
- easier long-term growth

Cons:
- more operational complexity
- coordination across nodes is harder
- state management becomes harder
- requires load balancing and distributed data strategy

### Diagonal scaling

Diagonal scaling means:
- scale up first
- then scale out later

This is common in real systems.

Interview takeaway:
- early-stage systems often scale vertically first because it is simpler
- larger systems usually need horizontal scaling eventually

### Important scalability dimensions

#### Read scaling

Can your system handle lots of reads?

Common solutions:
- caching
- read replicas
- CDN
- denormalized read models

#### Write scaling

Can your system handle lots of writes?

Common solutions:
- partitioning
- sharding
- batching
- queues

#### Data scaling

Can your system handle increasing data volume?

Common solutions:
- indexing
- partitioning
- archival
- sharding

#### Compute scaling

Can your business logic keep up?

Common solutions:
- more app servers
- worker queues
- background jobs
- serverless/autoscaling for some workloads

### Common scalability bottlenecks

When a system fails to scale well, it is usually because one part is under pressure:
- overloaded database
- single app server taking all traffic
- too much synchronous work in request path
- repeated expensive queries
- poor indexing
- large file delivery from origin
- shared in-memory session state
- CPU-heavy work in request cycle
- network latency

Interview reminder:
- find the bottleneck first
- do not blindly say "add Redis and Kafka" to every problem

---

## Load balancing basics

A load balancer distributes incoming traffic across multiple servers so that no single server gets overwhelmed.

Basic flow:
- client sends request
- request hits load balancer
- load balancer forwards to one of several backend servers

Benefits:
- better availability
- improved fault tolerance
- better horizontal scaling
- smoother traffic distribution

Without load balancing:
- one server can become overloaded
- one server failure can cause downtime
- horizontal scaling is hard

With load balancing:
- traffic is spread out
- unhealthy instances can be removed
- new instances can be added more easily

### Common load balancing algorithms

#### Round robin

Requests go to servers in order.

Best when:
- servers are similar
- traffic is relatively even

#### Least connections

Sends requests to the server with the fewest active connections.

Best when:
- request durations vary
- some requests are much heavier than others

#### Weighted round robin

Servers get traffic based on capacity.

Example:
- one stronger server gets 2x the traffic of a weaker one

Best when:
- server capacity differs

#### IP hash / sticky sessions

The same client tends to go to the same server.

Useful when:
- session affinity is required

Drawbacks:
- uneven traffic distribution
- reduces flexibility
- less ideal than stateless app design

### Health checks

A good load balancer performs health checks.

This means it can:
- detect dead or unhealthy instances
- stop routing traffic to them
- improve availability

### L4 vs L7 load balancing

#### Layer 4

Routes based on:
- IP
- port

Pros:
- faster
- simpler

#### Layer 7

Routes based on:
- URL path
- headers
- cookies
- HTTP method

Pros:
- more flexible
- useful for web applications and API routing

Interview takeaway:
- L4 is lower-level and faster
- L7 is more application-aware and flexible

### Stateless app servers

Load balancing works best when app servers are stateless.

That means:
- no required session state stored only in one server’s memory
- important state lives in a shared system like Redis or a database

If you need state:
- use Redis/session store
- use signed tokens like JWT when appropriate

---

## Caching fundamentals

Caching means storing frequently accessed data in a faster layer so future requests can be served more quickly.

Caching helps:
- reduce latency
- reduce database load
- reduce repeated computation
- improve user experience
- lower cost

Basic cache flow:
- request arrives
- app checks cache
- if hit, return cached result
- if miss, fetch from source of truth
- store result in cache
- return result

### Important terms

#### Cache hit

Requested data was found in cache.

#### Cache miss

Requested data was not found in cache.

#### TTL

Time to live.
How long cached data remains valid before expiring.

#### Eviction

Removing data from cache when:
- it expires
- memory is full
- the system decides less useful entries should be removed

### Redis

Redis is an in-memory data store commonly used for:
- caching
- session storage
- rate limiting
- distributed locks
- pub/sub
- queues

Because it stores data in memory, it is usually much faster than a traditional database.

Typical Redis cache flow:
- app checks Redis for key
- if key exists, return value
- otherwise query DB
- save result in Redis with TTL
- return result

Example:
- key: `user:123`
- value: serialized user profile
- TTL: 300 seconds

Good Redis use cases:
- user profile lookups
- product details
- dashboard summaries
- expensive query results
- session lookup
- rate limiting counters

Risks:
- stale data
- invalidation complexity
- memory cost
- cache stampede when many requests miss at once

### CDN

A CDN (Content Delivery Network) is a globally distributed set of edge servers that cache content closer to users.

Useful for:
- images
- CSS
- JavaScript files
- videos
- documents
- some cacheable API responses

Benefits:
- lower latency
- lower origin server load
- better spike handling
- better experience for global users

Typical CDN flow:
1. user requests asset
2. edge server checks local cache
3. if cached, serve immediately
4. if not cached, fetch from origin, cache it, and serve it

Best use cases:
- static assets
- public media
- downloadable files
- global traffic

### Types of caching

#### Client-side cache

Stored in browser or mobile app.

Good for:
- static assets
- previously fetched resources

#### CDN / edge cache

Stored close to users globally.

Good for:
- static assets
- public content
- cacheable responses

#### Application cache

Stored in Redis or app memory.

Good for:
- DB query results
- computed values
- session data

#### Database cache / buffer cache

Managed internally by the database engine.

Good to know it exists, but it is usually not the main interview focus.

### Common caching strategies

#### Cache-aside

Most common strategy.

Flow:
- app checks cache
- on miss, app fetches from DB
- app writes to cache
- app returns result

Pros:
- simple
- only caches requested data

Cons:
- first request after miss is slower
- stale data risk after writes

#### Write-through

When app writes to DB, it also updates cache immediately.

Pros:
- cache stays fresher

Cons:
- extra write overhead
- may cache unused data

#### Write-back / write-behind

Write to cache first, persist to DB later.

Pros:
- very fast writes

Cons:
- higher complexity
- risk of data loss if cache fails before persistence

Use carefully.

#### Refresh-ahead

Hot keys are refreshed before they expire.

Useful for:
- heavily accessed keys
- predictable hot content

### When to cache vs not cache

You should cache when data is:
- read-heavy
- expensive to compute
- slow to fetch
- stable enough
- tolerant of some staleness

Avoid or limit caching when data is:
- highly dynamic
- consistency-critical
- user-specific and sensitive
- rarely requested
- cheap to compute and fetch

Examples of risky cache targets:
- bank balances
- payment state
- rapidly changing inventory counts
- fast-moving real-time state

### Cache invalidation

One of the hardest parts of caching is keeping data fresh.

Common strategies:

#### TTL-based expiration

Let data expire after a set time.

Example:
- user profile cached for 5 minutes

Pros:
- simple
- predictable

Cons:
- stale until expiry

#### Explicit invalidation

When data changes, delete or update the related cache key.

Example:
- user updates profile
- app deletes `user:123`

Pros:
- fresher cache

Cons:
- more logic
- easier to forget invalidation path

#### Versioned keys

Put a version into the key so old values stop being used.

Example:
- `product:123:v2`

Useful when:
- invalidation coordination is difficult

### Common cache problems

#### Cache stampede

Many requests miss the same hot key at once and all hit the database.

Possible fixes:
- request coalescing
- locking
- refresh-ahead
- jittered TTLs

#### Stale reads

Cache returns old data after the source of truth changed.

Fixes:
- shorter TTL
- explicit invalidation
- write-through strategies in some flows

#### Hot keys

One cache key gets massive traffic and becomes a bottleneck.

Fixes:
- replication
- local caching layer
- better key distribution

Interview takeaway:
- caching improves speed but adds consistency and operational complexity
- treat the database as source of truth unless the design specifically says otherwise

---

## Database replication

Replication means copying data from one database instance to other database instances.

Common model:
- one primary
- one or more replicas

The primary usually handles writes.
Replicas often handle reads.

Benefits:
- read scaling
- better availability
- backup/disaster recovery benefits

Tradeoffs:
- replication lag
- stale reads on replicas
- failover complexity

Interview example:
- heavy read traffic system can send writes to primary and reads to replicas

Important concept:
- replication improves read scale more naturally than write scale

### Synchronous vs asynchronous replication

#### Synchronous

Primary waits for replica acknowledgment before confirming the write.

Pros:
- stronger consistency

Cons:
- higher write latency
- reduced availability in some failure cases

#### Asynchronous

Primary confirms write before replicas fully catch up.

Pros:
- lower latency
- often easier operationally

Cons:
- replication lag
- stale reads
- possible data loss during failover

---

## Sharding basics

Sharding means splitting data across multiple databases or partitions so one database does not hold everything.

Why shard:
- data too large for one DB
- write throughput too high for one DB
- want to distribute load

Examples of shard keys:
- `userId`
- geographic region
- tenant/company id

### Common sharding strategies

#### Range-based sharding

Shard based on ranges.

Example:
- users 1-1,000,000 on shard A
- users 1,000,001-2,000,000 on shard B

Risk:
- uneven distribution if one range gets hot

#### Hash-based sharding

Shard based on hash of key.

Pros:
- more even data distribution

Cons:
- range queries are harder

#### Directory-based sharding

Use a lookup service to map entity to shard.

Pros:
- flexible

Cons:
- extra complexity

### Sharding tradeoffs

Benefits:
- higher write scale
- better data distribution
- allows growth beyond one machine

Costs:
- cross-shard joins become harder
- transactions become harder
- rebalancing is hard
- operational complexity increases

Interview takeaway:
- do not jump to sharding early
- first use indexing, query optimization, and replication where possible

---

## CAP theorem

CAP theorem says that in the presence of a network partition, a distributed system can choose at most two of:
- consistency
- availability
- partition tolerance

Definitions:

#### Consistency

Every read gets the latest write, or an error.

#### Availability

Every request gets a response, even if it may not be the latest data.

#### Partition tolerance

The system continues operating despite network failures between nodes.

Important clarification:
- in real distributed systems, partition tolerance is usually not optional
- so the real tradeoff is often between consistency and availability during partitions

Interview explanation:

> When nodes cannot communicate reliably, you often must choose whether to reject some requests to preserve consistency or continue serving requests with possible stale data.

---

## Strong vs eventual consistency

### Strong consistency

After a write completes, future reads return the latest value.

Useful for:
- payments
- bank balances
- critical account state

Tradeoffs:
- higher latency
- lower availability during some failure scenarios

### Eventual consistency

Reads may temporarily return older data, but the system converges over time.

Useful for:
- feeds
- analytics
- social counters
- replicated caches

Tradeoffs:
- better availability and scalability
- temporary stale reads

Interview takeaway:
- choose consistency level based on business requirements
- not every system needs strong consistency everywhere

---

## SQL vs NoSQL tradeoffs

### SQL databases

Strengths:
- strong relational modeling
- joins
- transactions
- mature tooling
- great for structured data and consistency-heavy workflows

Good fit:
- payments
- orders
- inventory
- core transactional systems

### NoSQL databases

Strengths:
- flexible schemas
- horizontal scaling patterns
- often good for high throughput or specific access patterns

Types include:
- document databases
- key-value stores
- wide-column stores
- graph databases

Good fit:
- large-scale content storage
- rapidly evolving schemas
- cache/session stores
- specialized high-scale use cases

Interview answer:
- SQL vs NoSQL is not about "old vs modern"
- it is about data model, consistency needs, query patterns, and scale requirements

---

## Rate limiting

Rate limiting controls how many requests a client can make in a given time window.

Why it matters:
- protect services from abuse
- prevent brute force attacks
- control costs
- improve fairness

Common dimensions:
- per IP
- per user
- per API key
- per endpoint

### Common algorithms

#### Fixed window

Example:
- 100 requests per minute

Pros:
- simple

Cons:
- burstiness near window boundaries

#### Sliding window

Tracks requests in a rolling window.

Pros:
- smoother control

Cons:
- more state/complexity

#### Token bucket

Tokens refill at a fixed rate.
Requests consume tokens.

Pros:
- allows controlled bursts
- common real-world choice

#### Leaky bucket

Requests are processed at a steady rate.

Pros:
- smooth traffic

Useful when:
- steady output rate matters

### Distributed rate limiting

In multi-server systems, counters usually need shared storage.

Common choice:
- Redis

Interview note:
- local in-memory counters do not work well across multiple app servers

---

## Queues and asynchronous processing

Queues let you move work out of the request-response path.

Use cases:
- sending emails
- video/image processing
- report generation
- retrying external API calls
- background notifications

Basic flow:
1. request comes in
2. app writes job to queue
3. worker consumes job later
4. worker processes and stores result

Benefits:
- faster user-facing responses
- better reliability
- natural retry model
- decouples producers from consumers

Tradeoffs:
- eventual consistency
- harder debugging
- retries and duplicate handling become important

### Kafka vs SQS style mental model

#### Kafka

Commonly used for:
- event streams
- high-throughput pipelines
- replayable logs

#### SQS-style queues

Commonly used for:
- background jobs
- simple async task processing

Interview takeaway:
- not every async system needs Kafka
- many systems just need a reliable queue

---

## Event-driven architecture

In event-driven architecture, services publish events when something happens, and other services react to those events.

Example:
- order service emits `OrderCreated`
- email service sends confirmation
- analytics service records event
- inventory service reserves stock

Benefits:
- loose coupling
- extensibility
- easier fan-out to multiple consumers

Tradeoffs:
- harder debugging
- eventual consistency
- ordering guarantees can be tricky
- duplicate event handling matters

Interview reminder:
- event-driven systems need idempotent consumers

---

## Monolith vs microservices

### Monolith

A monolith is a single deployable application.

Pros:
- simpler development and deployment
- easier local testing
- fewer distributed system concerns
- simpler transactions

Cons:
- can become hard to scale organizationally
- larger blast radius if poorly structured

### Microservices

Microservices split a system into independently deployable services.

Pros:
- team autonomy
- independent scaling
- service boundaries can improve ownership

Cons:
- operational complexity
- network failures
- distributed tracing/debugging challenges
- data consistency becomes harder

Interview answer:
- start with monolith unless scale, team structure, or independent scaling truly justify microservices

---

## Idempotency

An operation is idempotent if doing it multiple times has the same effect as doing it once.

Examples:
- `GET` should be idempotent
- `PUT` is usually idempotent
- `POST` often is not unless designed carefully

Why it matters:
- retries happen in distributed systems
- clients may resend requests after timeouts

Critical example:
- payment API
- request times out
- client retries
- without idempotency, customer may be charged twice

Common fix:
- idempotency key stored server-side

---

## Retry strategies and backoff

Retries help recover from transient failures such as:
- network glitches
- short upstream outages
- temporary throttling

Good retry practices:
- exponential backoff
- jitter
- retry caps
- retry only safe operations unless otherwise designed

Bad retry pattern:
- instant repeated retries forever

Why bad:
- can amplify overload
- can create retry storms

Interview note:
- retries and idempotency often belong together

---

## Circuit breakers

A circuit breaker prevents repeated calls to a failing dependency.

Basic idea:
- if downstream service keeps failing
- stop sending requests to it temporarily
- fail fast instead

States:
- closed: normal traffic flows
- open: requests fail fast
- half-open: allow limited test requests to see if dependency recovered

Benefits:
- protects system resources
- prevents cascading failure
- improves resilience

---

## Observability

Observability is the ability to understand what is happening inside a system by looking at its outputs.

Three core pillars:
- logs
- metrics
- tracing

### Logs

Useful for:
- detailed events
- debugging specific failures

Good logs are:
- structured
- contextual
- consistent

### Metrics

Useful for:
- request rate
- error rate
- latency
- CPU
- memory
- queue depth

Metrics help you see trends and alert on problems.

### Tracing

Tracing shows the flow of a request across services.

Useful for:
- identifying bottlenecks
- debugging distributed systems
- understanding cross-service latency

Interview takeaway:
- observability is how you debug production systems you cannot just step through locally

---

## Latency vs throughput

### Latency

How long one request takes.

Example:
- request completes in 120ms

### Throughput

How much work the system handles per unit of time.

Example:
- 5,000 requests per second

Important:
- a system can have low latency but limited throughput
- a system can have high throughput but poor latency under load

Interview note:
- always ask which one matters more for the system

---

## API bottlenecks

Common bottlenecks in APIs:
- slow DB queries
- missing indexes
- synchronous external API calls
- large payloads
- too many round trips
- expensive serialization
- CPU-heavy work in request cycle
- lack of caching

How to reason about API bottlenecks:
- find where time is spent
- check DB first for many backend systems
- inspect external dependencies
- measure before optimizing

---

## Object storage basics

Object storage systems like S3 are designed for storing large blobs such as:
- images
- videos
- backups
- documents
- logs

Good properties:
- durable
- scalable
- cost-effective for large files

Typical pattern:
- app stores metadata in DB
- actual file goes to object storage

Interview takeaway:
- do not store large media blobs directly in your main relational database unless there is a strong reason

---

## Managed databases

Managed databases like RDS-style services help by handling:
- backups
- patching
- failover tooling
- monitoring integrations

Benefits:
- lower operational burden
- quicker setup

Tradeoffs:
- less low-level control
- vendor/service constraints

Interview note:
- managed services are often the practical production choice unless special constraints require self-management

---

## Serverless basics

Serverless functions like Lambda-style systems run code without managing servers directly.

Good fit:
- event-driven workloads
- infrequent jobs
- bursty traffic
- lightweight APIs

Tradeoffs:
- cold starts
- runtime limits
- debugging complexity
- vendor-specific constraints

Interview takeaway:
- serverless is useful, but not a universal replacement for long-running services

---

## Docker fundamentals

Containers package an application with its environment and dependencies.

Benefits:
- consistent environments
- easier deployment
- reproducible builds

Why this matters in system design:
- deployment consistency affects reliability
- containerized apps are easier to move between environments

---

## CI/CD basics

CI/CD usually includes:
- build
- test
- lint
- package
- deploy

Why it matters:
- safer releases
- faster feedback
- more repeatable deployments

In senior-level interviews, deployment and release process can matter as much as architecture diagrams.

---

## Common system design patterns

### Read-heavy systems

Use:
- CDN
- Redis cache
- read replicas
- denormalized views

Examples:
- news feeds
- product catalog pages

### Write-heavy systems

Use:
- partitioning
- batching
- queues
- scalable storage strategy

Examples:
- logging pipelines
- analytics ingestion

### Real-time systems

Use:
- WebSockets or streaming
- pub/sub
- careful state management

Examples:
- chat
- multiplayer coordination

### File/media systems

Use:
- object storage
- CDN
- background processing

Examples:
- photo/video upload platforms

---

## Common interview system examples

Be ready to talk about:
- URL shortener
- rate limiter
- chat system
- news feed
- file storage service
- notification system
- scalable REST API

For each one, think through:
- read vs write pattern
- consistency needs
- latency requirements
- scale assumptions
- likely bottlenecks

---

## What to say when you get stuck

If you are unsure, say something like:

> I’d like to clarify the scale and the most important non-functional requirement first, because the design would differ a lot depending on whether we care most about low latency, strong consistency, or extreme scale.

That is much stronger than guessing blindly.

Another strong sentence:

> I’ll start with a simple design that works for moderate scale, then I’ll explain what I would add as traffic grows.

This shows maturity.

---

## Final review sheet

### Core concepts you should be able to explain clearly

- vertical vs horizontal scaling
- load balancers
- caching and cache invalidation
- replication
- sharding
- CAP theorem
- strong vs eventual consistency
- SQL vs NoSQL tradeoffs
- rate limiting
- queues
- event-driven architecture
- monolith vs microservices
- idempotency
- retries and circuit breakers
- observability
- latency vs throughput
- object storage

### Common rules of thumb

- keep app servers stateless when possible
- treat the database as source of truth
- cache read-heavy data, not everything
- use queues for slow or retryable background work
- choose consistency level based on business needs
- do not shard too early
- favor simple architecture before distributed complexity
- every distributed system needs failure handling and observability

If you can define these concepts, explain when to use them, and talk about tradeoffs confidently, you will be in strong shape for system design interviews.
