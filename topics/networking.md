# Networking Concepts

This guide covers the networking concepts that come up often in backend, web, and system design interviews.

The goal is to be able to:
- explain the concept clearly
- understand why it matters
- connect it to real API/backend behavior

---

## How to think about networking in interviews

Networking questions are usually not asking you to become a network engineer.

They usually test whether you understand:
- how clients and servers communicate
- what happens between browser and backend
- why systems are slow or fail
- where security and reliability fit into the request path

A strong answer usually:
- defines the concept simply
- gives a concrete example
- explains the tradeoff

---

## HTTP vs HTTPS

### HTTP

HTTP stands for Hypertext Transfer Protocol.

It is the application-layer protocol used for communication between clients and servers on the web.

Key properties:
- stateless
- request/response based
- typically runs over TCP
- default port: `80`

Stateless means:
- each request is independent
- the server does not automatically remember previous requests unless state is stored elsewhere

Example HTTP request:

```http
GET /users/123 HTTP/1.1
Host: example.com
```

### HTTPS

HTTPS is HTTP over TLS.

It adds:
- encryption
- integrity protection
- server authentication

Default port:
- `443`

Without HTTPS:
- traffic can be intercepted
- passwords and tokens can be exposed
- responses can be modified in transit

With HTTPS:
- data is encrypted
- server identity is verified with certificates
- tampering is harder because integrity is protected

Good interview definition:

> HTTPS is HTTP layered on top of TLS, which protects data in transit through encryption, integrity checks, and certificate-based authentication.

### Why HTTPS matters

HTTPS protects against:
- eavesdropping
- man-in-the-middle attacks
- token/password leakage on the network
- content tampering in transit

Interview takeaway:
- HTTPS protects data in transit
- it does not automatically protect bad application logic or insecure storage

---

## TLS basics

TLS stands for Transport Layer Security.

It is the protocol used to secure communication over the network.

What TLS provides:
- encryption
- integrity
- authentication of the server

### Rough TLS handshake idea

At a high level:
1. client connects to server
2. server presents certificate
3. client validates certificate
4. both sides agree on cryptographic parameters
5. secure session keys are established
6. encrypted HTTP traffic begins

You usually do not need to explain every cryptographic detail in interviews unless asked.

What interviewers usually care about:
- HTTPS uses TLS
- certificates help verify server identity
- encryption protects traffic in transit

---

## HTTP request/response model

HTTP is based on a request/response model.

Flow:
1. client sends request
2. server processes it
3. server returns response

Example:

```http
GET /products/10 HTTP/1.1
Host: api.example.com
```

Response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"id":10,"name":"Keyboard"}
```

Main parts of a request:
- method
- path
- headers
- body

Main parts of a response:
- status code
- headers
- body

### Common HTTP methods

#### GET

Used to read data.

Example:
- get user profile

#### POST

Used to create something or trigger a side effect.

Example:
- create order

#### PUT

Often used to fully replace a resource.

#### PATCH

Used to partially update a resource.

#### DELETE

Used to delete a resource.

Interview note:
- method semantics matter
- this often connects to idempotency questions

### Common status codes

#### 2xx

Success.

Examples:
- `200 OK`
- `201 Created`
- `204 No Content`

#### 4xx

Client-side error.

Examples:
- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `429 Too Many Requests`

#### 5xx

Server-side error.

Examples:
- `500 Internal Server Error`
- `502 Bad Gateway`
- `503 Service Unavailable`
- `504 Gateway Timeout`

---

## TCP vs UDP

These are transport-layer protocols.

### TCP

TCP stands for Transmission Control Protocol.

It provides:
- connection-oriented communication
- reliable delivery
- ordered delivery
- retransmission of lost packets
- flow control

Good fit when:
- correctness matters
- missing data is a problem
- order matters

Common use cases:
- HTTP/HTTPS
- databases
- file transfer
- most web APIs

Interview explanation:

> TCP is reliable and ordered, so it is used when applications need correct and complete delivery of data.

### UDP

UDP stands for User Datagram Protocol.

It provides:
- connectionless communication
- lower overhead
- no delivery guarantee
- no ordering guarantee
- no built-in retransmission

Good fit when:
- speed matters more than perfect reliability
- occasional packet loss is acceptable

Common use cases:
- live video/voice
- gaming
- DNS queries
- real-time streaming scenarios

Interview explanation:

> UDP is faster and lighter, but it does not guarantee delivery or ordering, so it is used when low latency matters more than perfect reliability.

### Easy mental model

TCP is like a tracked delivery that makes sure everything arrives in order.

UDP is like sending quick messages without waiting for confirmation.

### TCP vs UDP tradeoff

Use TCP when:
- reliability matters
- data must arrive in order
- you cannot tolerate loss

Use UDP when:
- latency matters more than perfection
- the application can tolerate some loss
- the app can handle recovery at a higher layer if needed

---

## DNS resolution flow

DNS stands for Domain Name System.

Its job is to translate a domain name into an IP address.

Example:

```txt
google.com -> 142.250.x.x
```

Humans prefer domain names.
Computers route network traffic using IP addresses.

### DNS lookup flow

1. user enters a URL
2. browser checks its cache
3. OS checks local DNS cache
4. if not found, request goes to recursive resolver
5. resolver asks root server where to find the TLD server
6. resolver asks TLD server where to find the authoritative server
7. resolver asks authoritative server for the IP
8. resolver returns IP to client
9. browser connects to server using that IP

### Key DNS components

#### Recursive resolver

Usually provided by:
- ISP
- public DNS provider like Google or Cloudflare

It performs the lookup on behalf of the client.

#### Root server

Knows where to find TLD servers.

#### TLD server

Knows where to find authoritative servers for domains like:
- `.com`
- `.org`
- `.net`

#### Authoritative server

Holds the actual DNS records for the domain.

### DNS records you should know

#### A record

Maps domain to IPv4 address.

#### AAAA record

Maps domain to IPv6 address.

#### CNAME record

Maps one domain name to another domain name.

#### MX record

Mail server record.

#### TXT record

Often used for verification, security policies, or metadata.

### DNS caching

DNS responses are cached at multiple layers:
- browser
- OS
- resolver

Why:
- lower latency
- fewer repeated lookups
- reduced DNS load

Tradeoff:
- changes can take time to propagate

Interview takeaway:
- DNS is hierarchical
- caching makes it faster
- DNS does not instantly reflect every change everywhere

---

## What happens when you type a URL

This is one of the most classic interview questions.

A good high-level answer:

1. browser parses the URL
2. browser checks cache and DNS resolution happens
3. browser gets server IP
4. TCP connection is established
5. if HTTPS, TLS handshake happens
6. browser sends HTTP request
7. load balancer / CDN / reverse proxy may receive it first
8. app server processes request
9. app may call DB/cache/other services
10. server sends HTTP response
11. browser receives response and renders content
12. browser may fetch additional resources like CSS, JS, images

Stronger answer:
- mention DNS
- mention TCP
- mention TLS for HTTPS
- mention CDN/load balancer/reverse proxy
- mention backend calls to cache/database

That is usually enough unless the interviewer wants deeper detail.

---

## Three-way handshake

TCP uses a handshake to establish a connection.

High-level flow:
1. client sends `SYN`
2. server replies `SYN-ACK`
3. client sends `ACK`

After that, the TCP connection is established.

Why it matters:
- both sides agree to communicate
- sequence numbers can be set up
- connection state is initialized

Interview note:
- you usually only need the high-level idea

---

## Connection termination

TCP also needs to close connections cleanly.

This usually involves FIN/ACK exchange.

Why it matters:
- resources get released
- half-open/broken connections can create issues

You do not usually need to go deep here unless asked.

---

## Latency vs throughput

### Latency

Latency is how long one request or packet takes.

Examples:
- API responds in `120ms`
- ping takes `40ms`

Low latency matters for:
- user experience
- gaming
- real-time systems
- interactive applications

### Throughput

Throughput is how much work can be handled per unit of time.

Examples:
- 10,000 requests per second
- 1 Gbps of traffic

High throughput matters for:
- batch systems
- large APIs
- streaming pipelines

Important:
- low latency and high throughput are related but not the same
- increasing one may hurt the other depending on design

Interview takeaway:
- ask which matters more for the system you are designing

---

## Bandwidth vs latency

These are often confused.

### Bandwidth

Bandwidth is the amount of data that can be transferred per unit time.

Example:
- 100 Mbps link

### Latency

Latency is the delay before data arrives.

Example:
- 100 ms round-trip time

Easy mental model:
- bandwidth = pipe width
- latency = time for water to start arriving

You can have:
- high bandwidth, high latency
- low bandwidth, low latency

---

## API bottlenecks

Many backend performance problems show up as networking or request-path issues.

Common API bottlenecks:
- slow database queries
- missing indexes
- large response payloads
- too many round trips between services
- synchronous calls to slow external APIs
- expensive serialization/deserialization
- network latency between services
- lack of caching
- connection pool exhaustion

How to reason about bottlenecks:
- identify where time is spent
- measure latency by layer
- check whether problem is CPU, I/O, DB, or network
- optimize the real bottleneck, not the loudest component

Possible fixes:
- caching
- pagination
- compression
- better indexes
- batching
- fewer network hops
- async processing
- connection reuse

---

## Load balancing strategies

Load balancing is covered more deeply in `system-design.md`, but it is also a networking concept worth understanding here.

A load balancer sits between clients and backend servers and distributes requests.

Common strategies:
- round robin
- least connections
- weighted round robin
- IP hash / sticky sessions

Why it matters:
- availability
- scaling
- traffic distribution

Good interview note:
- load balancing works best with stateless app servers

---

## Reverse proxy

A reverse proxy sits in front of backend servers and forwards client requests.

Common uses:
- SSL termination
- load balancing
- caching
- compression
- routing to different services

Examples:
- Nginx
- HAProxy
- cloud load balancers

Interview takeaway:
- many production systems do not expose app servers directly to the internet

---

## Keep-alive and connection reuse

Opening a new TCP connection for every request is expensive.

Connection reuse helps by:
- reducing handshake overhead
- lowering latency
- improving throughput

This is especially important for:
- high-traffic APIs
- service-to-service communication

Interview note:
- connection reuse is one reason persistent connections improve performance

---

## Timeouts

Timeouts are important network safety mechanisms.

Examples:
- request timeout
- connection timeout
- read timeout

Why they matter:
- prevent requests from hanging forever
- reduce resource waste
- avoid cascading failures

Interview takeaway:
- missing timeouts are a very common production problem

---

## Retries

Retries can help recover from transient network failures.

Good retry practices:
- retry only when appropriate
- use exponential backoff
- add jitter
- combine with idempotency for write operations

Bad retry behavior:
- infinite retries
- retrying non-idempotent operations carelessly

---

## Common networking interview comparisons

### HTTP vs HTTPS

- HTTP is unencrypted application-layer web communication
- HTTPS is HTTP over TLS

### TCP vs UDP

- TCP is reliable and ordered
- UDP is faster and lighter but unreliable

### Latency vs throughput

- latency is how long one request takes
- throughput is how much work gets done over time

### Bandwidth vs latency

- bandwidth is capacity
- latency is delay

---

## Quick interview answers

### "Why is HTTPS better than HTTP?"

HTTPS adds TLS, which encrypts traffic, verifies server identity, and protects integrity, so attackers on the network cannot easily read or tamper with data in transit.

### "Why does the web usually use TCP?"

Because web traffic usually needs reliable, ordered delivery. Losing or reordering pieces of an HTTP response would break the application behavior.

### "Why is DNS important?"

DNS maps human-readable domain names to IP addresses so clients can find the correct server on the network.

### "When would UDP be better than TCP?"

When low latency matters more than guaranteed delivery, like gaming, voice, and some streaming scenarios.

---

## Final review sheet

You should be able to explain:
- HTTP vs HTTPS
- TLS basics
- request/response model
- TCP vs UDP
- DNS resolution flow
- what happens when you type a URL
- latency vs throughput
- bandwidth vs latency
- load balancing basics
- reverse proxies
- timeouts and retries
- common API bottlenecks

If you can define these clearly, walk through one example, and explain the tradeoffs, you will sound strong in networking interview rounds.
