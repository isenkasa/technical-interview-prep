# Java / Spring Boot Fundamentals for Web APIs and REST

This guide is meant to make you interview-ready for:
- Java backend interviews
- Spring Boot interviews
- REST API design discussions
- practical Java backend work

The focus is on the parts of Java and Spring that matter most for building APIs:
- Java fundamentals
- build tools and CLI basics
- Spring Boot Web APIs
- REST principles
- JPA / Hibernate
- testing, security, logging, and production basics

How to use this file:
- read the explanation
- study the example
- explain it out loud in your own words
- connect it to how a real API would be built

---

# 1. WHAT IS JAVA? WHAT IS SPRING BOOT?

Java is a statically typed, object-oriented language commonly used for backend systems.

Spring Boot is a framework built on top of the Spring ecosystem that helps you build:
- REST APIs
- web applications
- background services
- enterprise backend systems

When people say "Java backend" in interviews, they often mean:
- Java as the language
- Spring Boot as the web framework
- Spring MVC for controllers
- Spring Data JPA / Hibernate for database access
- Maven or Gradle for build tooling

Good interview definition:

> Java is the language, and Spring Boot is the framework commonly used to build production-ready Java web applications and APIs quickly.

---

# 2. JAVA BASICS

## Variables and types

Java is statically typed.

```java
String name = "Ava";
int age = 30;
boolean isAdmin = true;
double score = 95.5;
```

Common primitive types:
- `int`
- `long`
- `double`
- `boolean`
- `char`

Common reference types:
- `String`
- `Integer`
- `Long`
- `List<T>`
- `Map<K, V>`
- custom classes

Interview note:
- primitives are not objects
- wrapper types like `Integer` and `Long` are objects

---

## Classes and objects

```java
public class User {
    private int id;
    private String name;

    public User(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
```

Usage:

```java
User user = new User(1, "Ava");
System.out.println(user.getName());
```

---

## Access modifiers

Common access modifiers:
- `public`
- `private`
- `protected`
- package-private

Interview reminder:
- encapsulation matters a lot in Java

---

## Constructors

```java
public class Product {
    private String name;

    public Product(String name) {
        this.name = name;
    }
}
```

---

## Methods

```java
public int add(int a, int b) {
    return a + b;
}
```

Static method:

```java
public static int multiply(int a, int b) {
    return a * b;
}
```

---

## Interfaces

Interfaces define contracts.

```java
public interface UserService {
    UserDto getById(Long id);
}
```

Why interfaces matter:
- abstraction
- easier testing
- cleaner architecture

---

## Inheritance

```java
public class Animal {
    public String speak() {
        return "sound";
    }
}

public class Dog extends Animal {
    @Override
    public String speak() {
        return "bark";
    }
}
```

Use inheritance carefully.
In backend work, composition is often better than deep hierarchies.

---

## Generics

```java
public class ApiResponse<T> {
    private T data;
    private boolean success;

    public ApiResponse(T data, boolean success) {
        this.data = data;
        this.success = success;
    }
}
```

Why generics matter:
- reusable type-safe code
- common in collections, services, wrappers, and repositories

---

## Collections

Common Java collections:
- `List<T>`
- `Set<T>`
- `Map<K, V>`
- `Queue<T>`

Examples:

```java
List<String> names = new ArrayList<>();
names.add("Ava");

Set<Integer> ids = new HashSet<>();
ids.add(1);

Map<Long, String> users = new HashMap<>();
users.put(1L, "Ava");
```

Interview reminder:
- know basic behavior of `List`, `Set`, and `Map`

---

## Exceptions

```java
try {
    throw new RuntimeException("Something went wrong");
} catch (Exception ex) {
    System.out.println(ex.getMessage());
}
```

Checked vs unchecked:
- checked exceptions must be handled or declared
- unchecked exceptions extend `RuntimeException`

Interview note:
- in Spring apps, unchecked exceptions are very common

---

## Optional

`Optional<T>` is used to model possible absence of a value.

```java
Optional<String> name = Optional.of("Ava");
name.ifPresent(System.out::println);
```

Common in repositories:

```java
Optional<User> findById(Long id);
```

Interview note:
- `Optional` is useful, but do not overuse it in fields/entities

---

## Streams

Java Streams are common for collection processing.

```java
List<String> names = List.of("Ava", "Sam", "Kai");

List<String> filtered = names.stream()
    .filter(name -> name.startsWith("A"))
    .toList();
```

Common stream operations:
- `filter`
- `map`
- `sorted`
- `collect`
- `anyMatch`
- `findFirst`

Why this matters:
- modern Java code uses streams heavily
- interviewers may expect familiarity

---

# 3. BUILD TOOLS AND CLI BASICS

Common Java build tools:
- Maven
- Gradle

Most Spring Boot interviews assume you know at least one.

## Maven

Common commands:

```bash
mvn spring-boot:run
mvn test
mvn clean package
```

Dependencies live in `pom.xml`.

## Gradle

Common commands:

```bash
./gradlew bootRun
./gradlew test
./gradlew build
```

Dependencies live in `build.gradle` or `build.gradle.kts`.

Interview takeaway:
- you do not need every command memorized
- but you should know Maven/Gradle handle dependency management, build, test, and packaging

---

# 4. SPRING BOOT PROJECT STRUCTURE

A common Spring Boot API structure:

```txt
src/main/java/com/example/app
  controller/
  service/
  repository/
  entity/
  dto/
  config/
  exception/
src/main/resources
  application.properties
```

Why this helps:
- separation of concerns
- cleaner ownership
- easier maintenance

---

# 5. SPRING BOOT BASICS

Main application class:

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

What `@SpringBootApplication` gives you:
- component scanning
- auto-configuration
- Spring Boot startup behavior

Interview answer:
- Spring Boot reduces configuration boilerplate and helps you get production-ready apps running quickly

---

# 6. SPRING MVC / CONTROLLERS

Controllers define API endpoints.

```java
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/{id}")
    public UserDto getById(@PathVariable Long id) {
        return new UserDto(id, "Ava", "ava@example.com");
    }
}
```

Why `@RestController` matters:
- combines `@Controller` and `@ResponseBody`
- response is serialized as JSON by default for API use cases

Common annotations:
- `@RestController`
- `@RequestMapping`
- `@GetMapping`
- `@PostMapping`
- `@PutMapping`
- `@PatchMapping`
- `@DeleteMapping`
- `@PathVariable`
- `@RequestParam`
- `@RequestBody`

---

# 7. REST API FUNDAMENTALS

REST APIs are usually designed around resources.

Examples:
- users
- orders
- products
- payments

Common endpoints:

```txt
GET    /api/users
GET    /api/users/{id}
POST   /api/users
PUT    /api/users/{id}
PATCH  /api/users/{id}
DELETE /api/users/{id}
```

## Common status codes

- `200 OK`
- `201 Created`
- `204 No Content`
- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `409 Conflict`
- `500 Internal Server Error`

## Example create endpoint

```java
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@PostMapping
@ResponseStatus(HttpStatus.CREATED)
public UserDto create(@RequestBody CreateUserRequest request) {
    return new UserDto(1L, request.name(), request.email());
}
```

Interview note:
- use meaningful status codes
- design around resources rather than verbs in endpoint names

---

# 8. DTOs AND REQUEST MODELS

Do not expose entities directly by default.

Use DTOs for API contracts.

```java
public record CreateUserRequest(String name, String email) {}

public record UserDto(Long id, String name, String email) {}
```

Why this matters:
- better separation between API contract and database model
- avoid leaking internal fields
- easier versioning

---

# 9. DEPENDENCY INJECTION

Spring has built-in dependency injection through the IoC container.

Example service:

```java
import org.springframework.stereotype.Service;

@Service
public class UserService {
    public UserDto getById(Long id) {
        return new UserDto(id, "Ava", "ava@example.com");
    }
}
```

Inject into controller:

```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public UserDto getById(@PathVariable Long id) {
        return userService.getById(id);
    }
}
```

Interview takeaway:
- prefer constructor injection
- it is easier to test and clearer than field injection

---

# 10. COMMON SPRING ANNOTATIONS

You should know these:
- `@SpringBootApplication`
- `@RestController`
- `@RequestMapping`
- `@GetMapping`
- `@PostMapping`
- `@Service`
- `@Repository`
- `@Component`
- `@Configuration`
- `@Bean`
- `@Autowired`
- `@PathVariable`
- `@RequestParam`
- `@RequestBody`
- `@Valid`

Interview note:
- understand what the annotation does
- do not just memorize names

---

# 11. CONFIGURATION

Spring Boot commonly uses:
- `application.properties`
- `application.yml`
- environment variables

Example `application.yml`:

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: postgres
    password: secret
```

Read config:

```java
import org.springframework.beans.factory.annotation.Value;

@Value("${server.port}")
private int port;
```

Better for grouped config:
- `@ConfigurationProperties`

Interview reminder:
- do not hardcode secrets in source

---

# 12. VALIDATION

Validation is critical for APIs.

Example:

```java
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CreateUserRequest(
    @NotBlank String name,
    @Email String email
) {}
```

Use with controller:

```java
@PostMapping
public UserDto create(@Valid @RequestBody CreateUserRequest request) {
    return new UserDto(1L, request.name(), request.email());
}
```

Why validation matters:
- correctness
- security
- better client error handling

Common validation annotations:
- `@NotNull`
- `@NotBlank`
- `@Size`
- `@Email`
- `@Min`
- `@Max`

---

# 13. EXCEPTION HANDLING

Spring Boot commonly uses global exception handling.

Example:

```java
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("An unexpected error occurred");
    }
}
```

Why this matters:
- consistent error responses
- cleaner controllers
- easier observability

---

# 14. SERVICE LAYER

A common Spring architecture:
- controller handles HTTP concerns
- service handles business logic
- repository handles database access

Example service:

```java
@Service
public class UserService {
    public UserDto create(CreateUserRequest request) {
        return new UserDto(1L, request.name(), request.email());
    }
}
```

Interview note:
- keeping business logic out of controllers is a common best practice

---

# 15. SPRING DATA JPA AND HIBERNATE

JPA is the Java persistence specification.
Hibernate is the most common implementation.
Spring Data JPA makes common data access much easier.

## Entity example

```java
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    public User() {}

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
}
```

## Repository example

```java
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
```

## Service using repository

```java
@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto getById(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserDto(user.getId(), user.getName(), user.getEmail());
    }
}
```

### JPA / Hibernate pros

- faster development
- less boilerplate CRUD code
- integrates well with Spring
- good for standard business applications

### JPA / Hibernate cons

- can hide slow queries
- lazy loading can surprise you
- complex queries may still need custom SQL

Interview takeaway:
- JPA is productive, but you still need SQL fundamentals

---

# 16. ENTITY RELATIONSHIPS

Common relationships:
- `@OneToOne`
- `@OneToMany`
- `@ManyToOne`
- `@ManyToMany`

Example:

```java
@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
```

Interview note:
- know how relationships map to database tables

---

# 17. LAZY LOADING, EAGER LOADING, N+1

This comes up often in Java backend interviews.

## Lazy loading

Related data is loaded only when accessed.

## Eager loading

Related data is loaded immediately.

## N+1 problem

Example:
- query 1 gets 100 users
- then 100 more queries fetch orders for each user

Why it is bad:
- too many DB round trips
- poor performance

Fixes:
- fetch joins
- entity graphs
- better query design
- projections / DTO queries

Interview takeaway:
- ORM convenience can create performance issues if you are not careful

---

# 18. TRANSACTIONS

Transactions ensure a group of operations succeeds or fails together.

Common annotation:

```java
import org.springframework.transaction.annotation.Transactional;

@Transactional
public void createOrder() {
    // multiple DB operations
}
```

Why it matters:
- consistency
- atomic updates
- prevents partial writes

Use cases:
- create order + payment record
- reserve inventory + write audit record

---

# 19. SPRING SECURITY BASICS

Spring Security is the main security framework in Spring apps.

It helps with:
- authentication
- authorization
- filter chain security
- JWT integration
- method and endpoint protection

Interview note:
- you do not need every configuration detail memorized
- but you should know its role

---

# 20. JWT AUTH WITH SPRING BOOT

Typical flow:
1. user logs in
2. server validates credentials
3. server creates JWT
4. client sends JWT in `Authorization` header
5. server validates JWT on future requests

Example header:

```txt
Authorization: Bearer <token>
```

Interview takeaway:
- authentication verifies identity
- authorization checks permissions

---

# 21. CORS

CORS controls which browser origins can access your API.

Example:

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("https://app.example.com");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
```

Interview note:
- CORS is a browser rule
- it is not a replacement for authentication

---

# 22. LOGGING

Java backend apps commonly use SLF4J with Logback.

Example:

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

private static final Logger logger = LoggerFactory.getLogger(UserController.class);

logger.info("Fetching user {}", id);
```

Good logging practices:
- structured, meaningful logs
- include useful identifiers
- do not log secrets

---

# 23. TESTING

Common testing tools:
- JUnit 5
- Mockito
- Spring Boot Test
- MockMvc

## Unit test example

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class MathTest {
    @Test
    void addReturnsCorrectSum() {
        assertEquals(5, 2 + 3);
    }
}
```

## Mocking with Mockito

```java
import static org.mockito.Mockito.*;

UserRepository repo = mock(UserRepository.class);
when(repo.findById(1L)).thenReturn(Optional.of(new User("Ava", "ava@example.com")));
```

## API testing with MockMvc

Useful for:
- status code testing
- JSON response testing
- controller behavior

Interview note:
- unit tests verify isolated logic
- integration tests verify components working together

---

# 24. SWAGGER / OPENAPI

OpenAPI documentation is common in Spring APIs.

Common use:
- document endpoints
- test APIs easily
- improve developer experience

Popular library:
- springdoc-openapi

Interview note:
- good API docs matter in real systems

---

# 25. HTTP CLIENTS AND CALLING OTHER SERVICES

Your API may need to call other APIs.

Common tools:
- `RestTemplate` historically
- `WebClient` in modern Spring apps

Example with `WebClient`:

```java
import org.springframework.web.reactive.function.client.WebClient;

WebClient client = WebClient.create("https://example.com");

String result = client.get()
    .uri("/forecast")
    .retrieve()
    .bodyToMono(String.class)
    .block();
```

Interview note:
- many teams prefer `WebClient` for modern code
- but you should know `RestTemplate` exists in older codebases

---

# 26. BACKGROUND JOBS AND SCHEDULING

Not every Spring service is a REST endpoint.

Common background work:
- scheduled cleanup
- email sending
- queue consumers
- report generation

Scheduled example:

```java
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class CleanupJob {
    @Scheduled(fixedRate = 60000)
    public void run() {
        System.out.println("Running cleanup");
    }
}
```

Requires scheduling to be enabled in the app.

---

# 27. CACHING

Caching reduces repeated work and database load.

Spring supports caching abstractions.

Example:

```java
import org.springframework.cache.annotation.Cacheable;

@Cacheable("users")
public UserDto getById(Long id) {
    return new UserDto(id, "Ava", "ava@example.com");
}
```

Common backing stores:
- in-memory cache
- Redis

Interview reminder:
- caching improves speed but introduces invalidation complexity

---

# 28. DATABASE TOOLS AND OPTIONS

Common tools in Java backend work:
- Spring Data JPA
- Hibernate
- Flyway
- Liquibase
- JDBC
- jOOQ in some teams

## Flyway / Liquibase

Used for database migrations.

Why they matter:
- repeatable schema changes
- safer deployments
- team collaboration

Interview takeaway:
- schema changes should be versioned, not done manually in production

---

# 29. APPLICATION PROFILES

Spring profiles let you vary config by environment.

Examples:
- local
- test
- staging
- production

Example:

```properties
spring.profiles.active=dev
```

Why it matters:
- different DBs
- different logging levels
- different external service configs

---

# 30. OBSERVABILITY

Production APIs need:
- logs
- metrics
- tracing

Common Java/Spring tooling:
- Micrometer
- Prometheus
- Grafana
- OpenTelemetry

What to monitor:
- request rate
- error rate
- latency
- DB performance
- dependency failures

---

# 31. PERFORMANCE AND RELIABILITY BASICS

Important production concerns:
- DB connection pooling
- efficient queries
- pagination
- caching
- timeouts
- retries
- graceful shutdown
- rate limiting

Interview reminder:
- real backend engineering is more than just controllers and entities

---

# 32. SECURITY BASICS FOR SPRING APIS

You should be comfortable with:
- HTTPS
- JWT auth
- validation
- authorization
- password hashing
- CORS
- secure secret handling

Interview note:
- security is part of API design, not an afterthought

---

# 33. COMMON INTERVIEW QUESTIONS

## "What is Spring Boot?"

It is a framework that simplifies building Spring applications with auto-configuration, embedded servers, and production-ready defaults.

## "What is dependency injection?"

It is a pattern where dependencies are provided from outside the class, improving modularity, testability, and maintainability.

## "What is the difference between Spring Boot and Spring?"

Spring is the broader framework ecosystem.
Spring Boot is the opinionated layer that makes Spring apps easier to configure and run quickly.

## "What is JPA?"

It is the Java persistence specification.
Hibernate is the most common implementation used with it.

## "Why use DTOs instead of returning entities directly?"

To control the API contract, avoid leaking internal fields, and decouple persistence models from API responses.

## "Why keep business logic out of controllers?"

Because controllers should handle HTTP concerns, while services should handle business logic for better organization and testability.

---

# 34. TOOLING CHECKLIST

You should know these tools exist:
- Spring Boot
- Spring MVC
- Spring Data JPA
- Hibernate
- Spring Security
- Maven
- Gradle
- JUnit
- Mockito
- MockMvc
- Flyway / Liquibase
- OpenAPI / Swagger

---

# 35. STUDY CHECKLIST

Make sure you can explain:
- Java classes, interfaces, generics, collections, streams, exceptions
- Spring Boot basics
- controllers and request mapping
- dependency injection
- DTOs and validation
- exception handling
- service and repository layers
- JPA / Hibernate basics
- entity relationships
- transactions
- Spring Security basics
- JWT auth
- CORS
- testing
- logging and observability
- caching
- migration tools

---

# 36. FINAL INTERVIEW REMINDERS

- explain concepts in plain English first
- connect Java language fundamentals to Spring API design
- talk about tradeoffs, not just annotations
- remember that real backend work includes database behavior, validation, testing, auth, and operations

If you can explain Java basics, Spring Boot structure, REST conventions, JPA/Hibernate, testing, tooling, and production concerns, you will be in strong shape for Java Spring Boot interviews.
