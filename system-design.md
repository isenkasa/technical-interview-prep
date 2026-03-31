# System Design Concepts

This section covers the system design concepts needed for technical interviews

## Scalability

What is Scalability?

**Scalability** is the ability of a system to handle increasing load without breaking or becoming too slow.

Increased load is:
- more users
- more requests
- more data
- more jobs
- more integrations

A scalable system continues to perform well as demand grows.

There are two types of scaling:
##### Vertical Scaling
Is also called **scaling up**. You "scale up" one machine, by adding CPU, RAM, disk.

Pros:
- Simple
- No major architecture change
- Easy early on

Cons:
- There is a hardware limit
- Expensive at higher levels
- Single point of failure
- Does not distribute load

##### Horizontal Scaling
Is also called **scaling out**. You add more machines to the mix and spread traffic across the machines.

Instead of 1 app server, you run 5 app servers behind a load balancer.

Pros:
- Handles more load
- Better Fault Tolerance
- Easier to keep growing
- Standard for modern distributed systems

Cons:
- More complexity
- Requires coordination across servers
- Shared state becomes harder
- Needs load balancing and distributed data strategy

Summary: For small systems, vertical scaling is fine at first. For growing systems, horizontal scaling is usually the long term answer.

#### Important scalability dimensions
##### Read Scaling
Can you system handle lots of reads?
Common solutions:
- caching
- read replicas
- CDN
- denormalized read models

##### Write Scaling
Can your system handle lots of writes?
Common solutions:
- queues
- partitioning
- batching
- sharding

##### Data Scaling
Can your database handle increasing volume?
Common solutions:
- indexing
- partitioning
- archival
- sharding

##### Compute Scaling
Can your business logic keep up?
Common solutions:
- more app servers
- worker queues
- background jobs
- serverless or autoscaling

So the solution depends on the problem we are trying to solve. Do we need to scale for read, write, data or compute?

### Common scalability bottlenecks
When a system does not scale well, it is often because of one of these:
- database becomes overloaded
- one server handles all traffic
- too much synchronous work
- repeated expensive queries
- large file delivery from origin server
- shared session state on one machine
- poor indexing
- network latency
- CPU-heavy work inside request cycle

First, we need to identify the bottleneck. Then we need to scale the part under pressure, rather than blindly adding capacity everywhere.

## Load balancing basics
A load balancer distributes incoming traffic across multiple servers so no single server gets overwhelmed.

Example:
- user requests hit a load balancer
- load balancer forwards requests to servers A, B or C

This improves availability, performance, fault tolerance, scalability.

Without load balancing:
- one server can become overloaded
- failure of that server causes downtime
- scaling horizontally is harder

With load balancing:
- traffic is spread out
- failed instances can be removed
- new servers can be added more easily

How does the load balancer know which server to send the request to? There are several common load balancing algorithms

#### Round Robin
Requests go to servers in order. It's good when servers are similar and workload is even.

#### Least connections
Sends requests to server with fewest active connections.
Good when requests vary in duration and some requests are heavier than others.

#### Weighted round robin
Some servers get more traffic based on capacity.
Example: stronger server gets 2x the traffic of weaker server. It is good when server sizes differ.

#### IP hash/sticky routing
The same client tends to go to the same server.
It's good when session affinity is needed. It is not ideal when one server gets too many "sticky" users, and you want stateless architecture.

A good load balancer performs health checks to see whether a server is alive. This is critical for high availability.

#### L4 vs L7 load balancing
Layer 4 - routes based on IP and port. It's faster and lower level.

Layer 7 - Routes based on HTTP details like: URL path, header, cookies, request type. Used in web apps.

Load balancing works best when app servers are stateless. That means: no local session dependency and no important state stored in memory of one server. If state is needed, we need to store it in Redis, database, or use signed tokens like JWT.

## Caching fundamentals (Redis, CDN)

Caching means storing frequently accessed items in a "fast" memory so that they can be retrieved quickly in the future.

You are saving the result in a temporary cache. Instead of having to run the query again, you return the saved result.

Caching helps:
- reduce latency
- reduce database load
- reduce repeated computation
- improve user experience
- lower cost

Without a cache: the user makes a request -> app queries the database -> returns the result

With a cache: the user makes a request -> app checks cache first -> if the result is found -> returns the result

##### Important terms
**Cache hit**
Requested data was found in cache

**Cache miss**
Requested data was not found in cache

**TTL** (Time to live)
How long cached data stays before expiring

**Eviction**
Removing items from cache when space is needed or data expires

##### Redis
Redis is an in-memory data store used for:
- caching
- session storage
- rate limiting
- distributed locks
- pub/sub
- queues

Because it stores data in memory, it is much faster than a typical database.

Typical Redis cache flow:
- app checks Redis for key
- if key exists, return value
- if not, query DB
- save result in Redis with TTL
- return result

Example:
key: user:123
value: serialized user profile
TTL: 300 seconds

Good use cases for Redis:
- user profiles that are read often
- product details
- dashboard summaries
- expensive query results
- session lookup
- auth tokens or short-lived data
- rate limiting counters

Risks of Redis caching:
- stale data
- invalidation complexity
- memory cost
- cache stampede if many requests miss at once
// TODO: Focus more here

##### CDN
A CDN (Content Delivery Network) is a distributed network of edge servers that cache static or cacheable content closer to users geographically.

Examples of content a CDN helps with:
- images
- CSS
- JavaScript files
- videos
- documents
- cacheable API responses

If your origin server is in one region and users are worldwide, latency increases. A CDN stores copies closer to users, resulting in:
- faster content loading
- reducing traffic to origin server
- reduced bandwidth use
- spike resiliency

Typical CDN flow:
1. user requests image
2. CDN edge checks if it has cached version
3. IF yes, return the image
4. IF no, fetch from origin, cache it, then serve it

Best use cases for CDN
- static assets
- public media
- downloadable files
- geographically distributed users
- high traffic websites

CDNs are best known for static content, but can also help with some dynamic content if the repsonse is cacheable and TTL and cache headers are well controlled.

**Types of caching**

**Client-side cache**
Stored in browser or app
Good for:
- static assets
- previously fetched resources

**CDN/edge cache**
Stored close to users globally
Good for:
- static assets
- public content
- cacheable responses

**Application cache**
Stored in Redis or memory
Good for:
- DB query results
- computed values
- session data

**Database cache / buffer cache**
Managed internally by database engine
Good to know exists, but usually not your main interview focus

## When to cache vs not cache