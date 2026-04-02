# Security Concepts

## Authentication
Verifies who you are

Examples:
- login with password
- OAuth
- API KEY

## Authorization
Determines what you can do

ExampleS:
- admin vs. user
- access permissions
- role-based access

## JWT Basics
JSON Web Token = a compact token used for authentication

JWT Structure

- Header
    - algorithm (e.g., HS256)
- Payload
    - user data (id, role, etc)
- Signature
    - verifies token integrity

**Flow:**
1. User logs in
2. Server creates JWT
3. Client stores token (cookie or local storage)
4. Client sends token with requests
5. Server verifies token
6. Grants access if valid

Pros:
- Stateless
- Scalable
- No session storage needed

Cons:
- Cannot easily revoke
- Must handle expiration carefully
- Risk if stored insecurely

Best Practices
- Use short TTL
- Store securely
- Do not store sensitive data in payload

## TLS
TLS (Transport Layer Security) encrypts data between client and server

Used by:
- HTTPS
- Secure APIs
- Secure connections

TLS Provides:
- Encryption
    - Data cannot be read by attackers
- Integrity
    - Data cannot be altered without detection
- Authentication
    - Client verifies server identity via certificate

### TLS Handshake
1. Client -> "hello" + supported algorithms
2. Server -> certificate + public key
3. Client verifies certificate
4. Shared secret established
5. Secure communication begins

Certificates are issued by trusted Certificate Authorities

They prove the srever is legitimate.

When a user hits your API:
- DNS resolves domain → IP
- TCP connection established
- TLS handshake (HTTPS)
- HTTP request sent
- Server authenticates user (JWT)
- Server authorizes request
- Response returned securely