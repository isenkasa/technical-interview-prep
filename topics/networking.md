# Networking Concepts

## HTTP vs HTTPS

HTTP = protocol for communication between client and server
- Stateless
- Plain text
- Runs over TCP
- Default port: 80

HTTPS = HTTP + TLS encryption
- Encrypted
- Secure
- Prevents interception/tampering
- Default port: 443

Without HTTPS:
- Data can be intercepted
- Passwords, tokens exposed
- Responses can be modified

With HTTPS:
- Data is encrypted
- Server identity is verified
- Integrity is ensured

HTTPS is HTTP + TLS, providing encryption, integrity, authentication - prevents eavesdropping and tampering

## TCP vs UDP

### TCP (Transmission Control Protocol)
TCP is a core internet protocol that ensures reliable, ordered and error-checked delivery of data between applications. It breaks data into packets, manages flow control, and retransmits lost packets - guaranteed communication.

Features:
- Connection-oriented
- Reliable
- Ordered delivery
- Error checking
- Retransmissions

Use cases:
- HTTP/HTTPS
- Databases
- APIs
- File transfers

In Nodejs (or any other framework), a TCP server is running in the background. Whenever we make a request, it goes through the TCP server in the background, wrapped in a high-level HTTP module or framework like Express.

### UDP (User Datagram Protocol)
UDP is the "fast and loose" alternative to TCP. If TCP is like a registered letter that requires a signature, UDP is like a postcard: you write the dadress, drop it in the mail, and hope it gets there.

Features:
- Connectionless
- No guarantee of delivery
- No ordering
- Faster, lower overhead

Use cases:
- Video streaming
- Gaming
- VoIP
- DNS queries

Examples:
- Online Gaming: If you're in a match and one "position update" packet is lost, you don't want the game to freeze for 500ms while it's resent. You just want the next update immediately.
- Live Video/Voice (VoIP): If a tiny bit of data drops in a Zoom call, you might hear a small "pop" or see a pixelated frame for a split second. This is better than the whole video freezing to wait for a "perfect" frame that is now 2 seconds old.
- DNS Queries: When you type a URL, your computer sends a tiny UDP request to find the IP address because it needs to be nearly instantaneous. 

### Usage
TCP is used when reliability matters, UDP when speed matters and occasional loss is acceptable. 

## DNS Resolution Flow
A DNS converts
``` google.com -> IP address ```

Think of DNS like asking for directions.
- You -> "Where is google.com?"
- DNS -> "Let me ask around..."

Flow:
1. User enters URL
2. Browser checks cache
3. OS checks local DNS cache
4. If not found -> query resolver (ISP or public DNS)
5. Resolver queries
    - Root server
    - TLD server (.com)
    - Authoritative server
6. Gets IP address
7. Returns to client
8. Browser connects to server via IP

Key components:
- Resolver -> your DNS provider
- Root server -> knows TLD servers
- TLD server -> knows domain servers
- Authoritative server -> has actual IP

DNS resolves a domain name to an IP address through a hierarchical lookup involving root, TLD, and authoritative servers.