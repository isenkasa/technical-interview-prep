# Security Concepts

This guide covers the security concepts that come up often in backend, web, and system design interviews.

The goal is to be able to:
- explain the concept clearly
- understand the risk it addresses
- describe common protections
- connect it to real backend systems

Security interview answers are strongest when you explain:
- what the threat is
- why it matters
- how to reduce the risk
- what tradeoffs exist

---

## Core security mindset

A few security principles show up everywhere:
- never trust client input
- least privilege
- defense in depth
- secure by default
- protect data in transit and at rest
- assume failures and misuse will happen

Interview takeaway:
- security is not one feature
- it is a set of practices across auth, validation, storage, networking, logging, and operations

---

## Authentication vs authorization

This is one of the most common interview distinctions.

### Authentication

Authentication answers:
- who are you?

Examples:
- login with username/password
- OAuth login
- API key identification
- session cookie proving a logged-in user

Good interview definition:

> Authentication verifies the identity of the caller.

### Authorization

Authorization answers:
- what are you allowed to do?

Examples:
- admin can delete users
- normal user can only edit their own profile
- service A can read one resource but not another

Good interview definition:

> Authorization decides whether an authenticated user or system is allowed to perform a specific action.

### Easy example

- user logs in with email/password: authentication
- user tries to delete another user’s account: authorization check

Interview reminder:
- do not use these terms interchangeably

---

## Common authentication methods

### Username and password

Classic login flow:
1. user submits credentials
2. server verifies them
3. server creates session or token
4. future requests include proof of authentication

### OAuth

OAuth lets a user grant an application limited access through a third-party identity provider.

Example:
- "Sign in with Google"

Important clarification:
- OAuth is mainly about delegated authorization
- OpenID Connect is the identity layer commonly used on top of OAuth for login

For many interviews, saying "OAuth/OIDC for third-party login" is good enough unless they ask deeper.

### API keys

API keys identify callers, usually system-to-system or developer-to-API usage.

Common uses:
- internal services
- third-party developer platforms

Important note:
- API keys identify the caller
- by themselves, they are often weaker than full user auth systems

---

## Sessions vs tokens

### Sessions

With sessions:
- server stores session state
- client stores only a session identifier, usually in a cookie

Pros:
- easy to revoke centrally
- simple for traditional web apps

Cons:
- requires shared session storage across multiple servers if the app is scaled out

### Tokens

With tokens:
- client stores a signed token
- server verifies token on each request

Pros:
- often works well for stateless APIs
- easy to use across multiple clients and services

Cons:
- harder to revoke
- storage/security choices matter a lot

Interview answer:
- sessions are often simpler for browser-based apps
- tokens are common for APIs and distributed architectures
- neither is "always better"

---

## JWT basics

JWT stands for JSON Web Token.

It is a compact signed token often used for authentication and authorization flows.

### JWT structure

A JWT has three parts:
- header
- payload
- signature

#### Header

Contains metadata such as:
- signing algorithm
- token type

#### Payload

Contains claims such as:
- user id
- role
- expiration

#### Signature

Used to verify integrity.

If the payload changes, the signature check fails.

### JWT flow

1. user logs in
2. server verifies credentials
3. server creates signed JWT
4. client stores token
5. client sends token on future requests
6. server verifies signature and claims
7. server authorizes the request

Common header usage:

```txt
Authorization: Bearer <token>
```

### JWT pros

- stateless verification
- convenient for APIs
- scalable across multiple app servers

### JWT cons

- revocation is harder
- insecure storage can expose token
- people sometimes put too much trust in token payload
- expiration/refresh logic adds complexity

### JWT best practices

- use short-lived access tokens
- use refresh tokens carefully
- do not store sensitive secrets in payload
- validate expiration and issuer/audience when relevant
- sign tokens securely

Important note:
- signed does not mean encrypted
- JWT payload is usually readable if someone gets the token

Interview takeaway:
- JWTs are useful, but they are not automatically the best choice for every system

---

## TLS basics

TLS stands for Transport Layer Security.

It protects data in transit between client and server.

Used by:
- HTTPS
- secure APIs
- encrypted service-to-service communication

TLS provides:
- encryption
- integrity
- server authentication through certificates

### Rough TLS handshake

1. client connects and proposes supported cryptographic options
2. server sends certificate
3. client validates certificate
4. both sides establish shared session keys
5. encrypted communication begins

Interview reminder:
- TLS protects data in transit
- it does not protect insecure application logic or insecure storage at rest

### Certificates

Certificates are issued by trusted certificate authorities.

They help the client verify:
- the server is who it claims to be

Why this matters:
- reduces man-in-the-middle risk

---

## Encryption in transit vs encryption at rest

### Encryption in transit

Protects data while moving over the network.

Example:
- HTTPS using TLS

### Encryption at rest

Protects stored data.

Examples:
- encrypted database storage
- encrypted disks
- encrypted backups

Interview answer:
- strong systems often use both

---

## Password security

Passwords should never be stored in plain text.

Good practice:
- hash passwords with a strong password hashing algorithm
- use salt

Important concept:
- password hashing is different from encryption

Why:
- hashes are meant for verification, not recovery

Good password-handling practices:
- hash passwords
- enforce reasonable password policy
- rate limit login attempts
- support MFA where appropriate

Interview note:
- if you say "encrypt passwords," many interviewers will want you to correct that to "hash passwords"

---

## SQL injection

SQL injection happens when untrusted input is treated as part of a SQL query.

Bad example:

```js
const query = `SELECT * FROM users WHERE email = '${email}'`
```

If input is malicious, the attacker may:
- bypass auth
- read unauthorized data
- modify or delete data

### Why it happens

Because user input is being concatenated directly into SQL.

### Main defense

Use parameterized queries / prepared statements.

Safer idea:

```js
SELECT * FROM users WHERE email = ?
```

Or the equivalent placeholder syntax for your DB library.

### Other protections

- validate input
- use least-privilege DB accounts
- avoid dynamic SQL unless necessary
- use ORM/query builders carefully, but do not blindly trust them

Interview takeaway:

> The main protection against SQL injection is parameterized queries, not manual string sanitization.

---

## Cross-site scripting (XSS)

XSS happens when malicious script runs in another user’s browser.

This usually happens because untrusted input is rendered into HTML/JS without proper escaping or protection.

### Why it matters

An attacker may:
- steal session tokens
- perform actions as the user
- modify page behavior
- inject fake UI

### Common XSS categories

#### Stored XSS

Malicious input is saved and later shown to other users.

Example:
- attacker posts a malicious script in a comment field

#### Reflected XSS

Malicious input is immediately reflected in the response.

Example:
- unsafe rendering of query string input in a page

#### DOM-based XSS

Client-side JavaScript inserts untrusted input into the page unsafely.

### Defenses

- escape untrusted output
- sanitize rich HTML if you must allow it
- avoid unsafe DOM APIs for untrusted content
- use Content Security Policy (CSP) where appropriate
- use frameworks safely instead of bypassing their protections

Interview takeaway:
- input validation helps, but output encoding is critical for XSS prevention

---

## Input validation strategies

Never trust input from:
- request body
- query params
- route params
- headers
- uploaded files
- third-party webhooks

### Why validation matters

Validation helps with:
- security
- correctness
- better error handling
- simpler downstream logic

### What to validate

- required fields
- type
- format
- allowed values
- range/length
- business rules

Examples:
- email has valid format
- age is a number within allowed bounds
- role is one of allowed values
- uploaded file type and size are allowed

### Validation principles

- validate at system boundaries
- reject invalid input early
- use allowlists where possible
- treat client-side validation as convenience, not security

Interview reminder:
- client-side validation improves UX
- server-side validation is the real security boundary

---

## Authentication and authorization patterns

### RBAC

RBAC stands for Role-Based Access Control.

Access is granted based on roles like:
- admin
- editor
- user

Pros:
- simple
- common

Cons:
- can become too coarse for complex systems

### ABAC

ABAC stands for Attribute-Based Access Control.

Access depends on attributes such as:
- user role
- resource owner
- department
- time of day

More flexible than RBAC, but more complex.

### Ownership checks

Common real-world rule:
- users can edit only their own resources

Interview takeaway:
- real authorization is often more than "is admin?"

---

## Principle of least privilege

Least privilege means:
- users and systems should get only the permissions they actually need

Examples:
- read-only DB user for read service
- admin endpoints restricted to admin role
- worker only allowed to read from one queue

Why it matters:
- reduces blast radius if something is compromised

---

## CSRF basics

CSRF stands for Cross-Site Request Forgery.

It happens when a browser is tricked into making an unwanted authenticated request to another site.

This is especially relevant when authentication is cookie-based.

Example:
- user is logged into banking site
- malicious site triggers a transfer request using user’s browser

Common defenses:
- CSRF tokens
- same-site cookies
- origin/referer checks

Interview note:
- CSRF is different from XSS
- XSS runs attacker code in your page
- CSRF tricks browser into sending requests

---

## CORS basics

CORS stands for Cross-Origin Resource Sharing.

It is a browser security mechanism controlling whether one origin can access resources from another origin.

Example:
- frontend on `app.example.com`
- API on `api.example.com`

The browser checks whether cross-origin access is allowed.

Important note:
- CORS is a browser rule
- it is not a substitute for server-side authentication or authorization

Interview takeaway:
- misconfigured CORS can expose data to unwanted origins

---

## Secure cookies and token storage

How tokens are stored matters a lot.

### Cookies

Useful for:
- browser sessions

Helpful flags:
- `HttpOnly`
- `Secure`
- `SameSite`

Why:
- `HttpOnly` helps reduce JS access to cookie
- `Secure` sends cookie only over HTTPS
- `SameSite` helps reduce CSRF risk

### Local storage

Sometimes used for tokens in SPAs, but:
- accessible to JavaScript
- more exposed if XSS happens

Interview answer:
- there is no one-size-fits-all answer
- explain the tradeoff between XSS risk, CSRF risk, browser behavior, and architecture

---

## Rate limiting and brute force protection

Security is not only about code injection.

Rate limiting also protects:
- login endpoints
- password reset endpoints
- public APIs

Why:
- reduce brute force attacks
- reduce abuse
- reduce resource exhaustion

Common dimensions:
- per IP
- per user
- per API key

---

## Logging and secrets

Be careful what you log.

Never log:
- passwords
- full tokens
- secret keys
- raw sensitive personal data unless absolutely required and properly controlled

Good practice:
- log enough context to debug
- redact or mask secrets/sensitive values

Interview takeaway:
- insecure logging is a real security issue

---

## Secrets management

Secrets include:
- database passwords
- API keys
- JWT signing keys
- encryption keys

Bad practices:
- hardcoding secrets in source code
- committing real `.env` files
- sharing secrets loosely across environments

Better practices:
- use secret managers or secure environment injection
- rotate secrets
- limit access

---

## Secure API design reminders

When designing APIs, think about:
- authentication
- authorization
- validation
- rate limiting
- TLS
- audit logging
- least privilege
- secure secret handling

Good interview answer pattern:

> I would secure this API with HTTPS, validate all inputs server-side, authenticate requests, authorize by role and resource ownership, rate limit sensitive endpoints, and avoid exposing secrets or internal details in logs and errors.

---

## Common interview questions

### "Auth vs authorization?"

Authentication verifies identity.
Authorization decides permissions.

### "What are JWT drawbacks?"

Harder revocation, storage risks, expiration complexity, and people sometimes misuse payload data or store too much in it.

### "How do you prevent SQL injection?"

Use parameterized queries/prepared statements, validate inputs, and use least-privilege DB access.

### "How do you prevent XSS?"

Escape untrusted output, sanitize allowed HTML carefully, use safe framework patterns, and add defenses like CSP where appropriate.

### "Why is TLS important?"

It protects data in transit with encryption, integrity, and server authentication.

### "Why is server-side validation still needed if the frontend validates?"

Because the client is not trusted. Attackers can bypass or modify frontend validation entirely.

---

## Final review sheet

You should be able to explain clearly:
- authentication vs authorization
- sessions vs tokens
- JWT basics and tradeoffs
- TLS basics
- encryption in transit vs at rest
- password hashing
- SQL injection
- XSS
- input validation
- RBAC vs finer-grained authorization
- CSRF
- CORS
- secure cookie/token storage
- secrets management
- rate limiting as a security control

If you can define the threat, explain why it matters, and describe the main defenses and tradeoffs, you will sound strong in security interview rounds.
