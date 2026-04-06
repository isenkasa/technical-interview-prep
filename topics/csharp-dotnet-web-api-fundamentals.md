# C# / .NET Fundamentals for Web APIs and REST

This guide is meant to make you interview-ready for:
- C# backend interviews
- ASP.NET Core Web API interviews
- REST API design discussions
- practical .NET backend work

The focus is on the parts of C# and .NET that matter most for building APIs:
- C# fundamentals
- .NET CLI and tooling
- ASP.NET Core Web APIs
- REST principles
- Entity Framework Core
- testing, authentication, logging, and production basics

How to use this file:
- read the explanation
- study the example
- explain it out loud in your own words
- connect it to how a real API would be built

---

# 1. WHAT IS .NET?

.NET is a development platform from Microsoft for building:
- web APIs
- web apps
- background services
- desktop apps
- cloud services
- mobile apps through related tooling

When people say ".NET" in backend interviews, they usually mean:
- C# as the language
- ASP.NET Core for web APIs
- Entity Framework Core for database access
- `dotnet` CLI for tooling

Good interview definition:

> .NET is a runtime and development platform, and C# is the primary language commonly used with it for building backend services and web APIs.

---

# 2. C# BASICS

## Variables and types

C# is statically typed.

Example:

```csharp
string name = "Ava";
int age = 30;
bool isAdmin = true;
decimal price = 19.99m;
```

Common basic types:
- `int`
- `long`
- `double`
- `decimal`
- `bool`
- `string`
- `DateTime`
- `Guid`

Why `decimal` matters:
- use `decimal` for money values
- avoid `float`/`double` for currency because of precision issues

---

## `var`

`var` lets the compiler infer the type.

```csharp
var name = "Ava";     // string
var age = 30;         // int
var users = new List<string>();
```

Interview note:
- `var` is still strongly typed
- it is not like JavaScript `var`

Use `var` when:
- the type is obvious
- it improves readability

---

## Nullable types

Reference types can be nullable, and value types can be nullable with `?`.

```csharp
string? middleName = null;
int? age = null;
```

Why this matters:
- modern C# pushes you to model nullability more explicitly
- this reduces null reference bugs

---

## Conditionals and loops

```csharp
if (age >= 18)
{
    Console.WriteLine("Adult");
}

for (int i = 0; i < 3; i++)
{
    Console.WriteLine(i);
}

foreach (var user in users)
{
    Console.WriteLine(user);
}
```

---

## Methods

```csharp
public int Add(int a, int b)
{
    return a + b;
}
```

Expression-bodied method:

```csharp
public int Add(int a, int b) => a + b;
```

---

## Classes and objects

```csharp
public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
}
```

Usage:

```csharp
var user = new User
{
    Id = 1,
    Name = "Ava"
};
```

---

## Records

Records are useful for immutable data and DTO-like shapes.

```csharp
public record UserDto(int Id, string Name);
```

Why records matter:
- concise syntax
- value-based equality
- good for request/response models

---

## Properties

Properties are the standard way to expose object state in C#.

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
}
```

---

## Access modifiers

Common access modifiers:
- `public`
- `private`
- `protected`
- `internal`

Interview reminder:
- encapsulation matters in C# just like in Java

---

## Interfaces

Interfaces define contracts.

```csharp
public interface IUserService
{
    Task<UserDto?> GetByIdAsync(int id);
}
```

Why interfaces matter:
- abstraction
- testing/mocking
- cleaner architecture

---

## Inheritance

```csharp
public class Animal
{
    public virtual string Speak() => "sound";
}

public class Dog : Animal
{
    public override string Speak() => "bark";
}
```

Use inheritance carefully.
In .NET backend work, composition is often better than deep inheritance trees.

---

## Generics

```csharp
public class ApiResponse<T>
{
    public T? Data { get; set; }
    public bool Success { get; set; }
    public string? Error { get; set; }
}
```

Why generics matter:
- reusable code
- strong typing
- common in repositories, services, wrappers, and collections

---

## Collections

Common collections:
- `List<T>`
- `Dictionary<TKey, TValue>`
- `HashSet<T>`
- `Queue<T>`
- `Stack<T>`

Examples:

```csharp
var numbers = new List<int> { 1, 2, 3 };
var map = new Dictionary<int, string>
{
    [1] = "one",
    [2] = "two"
};
var unique = new HashSet<int> { 1, 2, 2, 3 };
```

---

## Exceptions

```csharp
try
{
    throw new InvalidOperationException("Something went wrong");
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}
```

Interview note:
- use exceptions for exceptional cases
- do not use exceptions as normal control flow

---

## Async / await

Async programming is essential for APIs.

```csharp
public async Task<UserDto?> GetUserAsync(int id)
{
    await Task.Delay(10);
    return new UserDto(id, "Ava");
}
```

Why it matters:
- non-blocking I/O
- scalable web APIs
- database and HTTP calls are commonly async

Common return types:
- `Task`
- `Task<T>`
- `ValueTask<T>` in more specialized cases

Interview reminder:
- async helps throughput for I/O-bound work
- it does not make CPU-heavy work magically free

---

## LINQ

LINQ is one of the most important C# features for working with collections and queries.

Example:

```csharp
var users = new List<User>
{
    new User { Id = 1, Name = "Ava" },
    new User { Id = 2, Name = "Sam" }
};

var names = users
    .Where(u => u.Id > 0)
    .Select(u => u.Name)
    .ToList();
```

Common LINQ operations:
- `Where`
- `Select`
- `OrderBy`
- `GroupBy`
- `Any`
- `FirstOrDefault`
- `Count`

Why it matters:
- clean data querying
- very common in EF Core

Interview note:
- LINQ is powerful, but with EF Core you should think about what SQL it turns into

---

# 3. .NET CLI AND TOOLING

The `dotnet` CLI is central to .NET development.

## Create a project

```bash
dotnet new webapi -n MyApi
```

Other useful templates:
- `dotnet new console`
- `dotnet new classlib`
- `dotnet new xunit`

## Build

```bash
dotnet build
```

## Run

```bash
dotnet run
```

## Restore packages

```bash
dotnet restore
```

## Add package

```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

## Run tests

```bash
dotnet test
```

## Publish

```bash
dotnet publish -c Release
```

Interview takeaway:
- you do not need every CLI command memorized
- but you should know that `dotnet` handles project creation, restore, build, run, test, and publish

---

# 4. PROJECT STRUCTURE FOR WEB APIs

A common API project structure:

```txt
src/
  Controllers/
  Models/
  DTOs/
  Services/
  Repositories/
  Data/
  Middleware/
  Validators/
Program.cs
appsettings.json
```

Why this helps:
- separation of concerns
- clearer boundaries
- easier testing

---

# 5. ASP.NET CORE WEB API BASICS

ASP.NET Core is the main framework for building APIs in .NET.

## Minimal API example

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/health", () => Results.Ok(new { ok = true }));

app.Run();
```

Why minimal APIs matter:
- fast to start
- good for small services and demos
- less boilerplate

## Controller-based API example

```csharp
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet("{id}")]
    public ActionResult<UserDto> GetById(int id)
    {
        var user = new UserDto(id, "Ava");
        return Ok(user);
    }
}
```

Why controllers matter:
- common in larger APIs
- better organization for many endpoints
- familiar enterprise pattern

Interview note:
- you should know both minimal APIs and controllers

---

# 6. DEPENDENCY INJECTION

ASP.NET Core has built-in dependency injection.

Register service:

```csharp
builder.Services.AddScoped<IUserService, UserService>();
```

Consume in controller:

```csharp
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetById(int id)
    {
        var user = await _userService.GetByIdAsync(id);
        if (user is null) return NotFound();
        return Ok(user);
    }
}
```

Common service lifetimes:
- `AddSingleton`
- `AddScoped`
- `AddTransient`

Rule of thumb:
- `Scoped` is common for request-based services and EF Core DbContext

---

# 7. CONFIGURATION

Configuration often comes from:
- `appsettings.json`
- `appsettings.Development.json`
- environment variables
- secret managers

Example `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=MyApiDb;Trusted_Connection=True;"
  },
  "Jwt": {
    "Key": "super-secret-key",
    "Issuer": "MyApi"
  }
}
```

Read config:

```csharp
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
```

Interview reminder:
- do not hardcode secrets in source code

---

# 8. REST API FUNDAMENTALS

REST APIs are usually designed around resources.

Examples of resources:
- users
- orders
- products
- payments

## Common HTTP methods

- `GET` read
- `POST` create
- `PUT` replace
- `PATCH` partial update
- `DELETE` remove

Example endpoints:

```txt
GET    /api/users
GET    /api/users/123
POST   /api/users
PUT    /api/users/123
PATCH  /api/users/123
DELETE /api/users/123
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
- `422 Unprocessable Entity`
- `500 Internal Server Error`

## Example controller actions

```csharp
[HttpPost]
public ActionResult<UserDto> Create(CreateUserRequest request)
{
    var created = new UserDto(1, request.Name);
    return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
}

[HttpDelete("{id}")]
public IActionResult Delete(int id)
{
    return NoContent();
}
```

Interview reminder:
- APIs should use meaningful status codes
- `CreatedAtAction` is a common REST-friendly pattern in ASP.NET Core

---

# 9. REQUEST AND RESPONSE MODELS

Do not expose EF entities directly by default.

Use DTOs and request models.

```csharp
public record CreateUserRequest(string Name, string Email);

public record UserDto(int Id, string Name, string Email);
```

Why:
- better control over API contract
- avoid leaking internal fields
- easier versioning and validation

---

# 10. MODEL VALIDATION

Validation is critical for APIs.

Example with data annotations:

```csharp
using System.ComponentModel.DataAnnotations;

public class CreateUserRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = "";

    [Required]
    [StringLength(100)]
    public string Name { get; set; } = "";
}
```

With `[ApiController]`, invalid models often automatically return `400 Bad Request`.

Why validation matters:
- correctness
- security
- better error responses

Other validation options:
- FluentValidation
- custom validators

---

# 11. MIDDLEWARE

Middleware runs in the request pipeline.

Examples:
- exception handling
- logging
- authentication
- authorization
- CORS
- rate limiting

Example:

```csharp
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
```

Custom middleware example:

```csharp
public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        _logger.LogInformation("Handling {Method} {Path}", context.Request.Method, context.Request.Path);
        await _next(context);
    }
}
```

Interview note:
- middleware order matters

---

# 12. ERROR HANDLING

Good APIs return consistent error responses.

Example:

```csharp
app.UseExceptionHandler("/error");
```

Controller example:

```csharp
[ApiController]
public class ErrorController : ControllerBase
{
    [Route("/error")]
    public IActionResult HandleError()
    {
        return Problem("An unexpected error occurred.");
    }
}
```

Why this matters:
- consistent responses
- cleaner controllers
- easier debugging and observability

---

# 13. LOGGING

ASP.NET Core has built-in logging.

```csharp
private readonly ILogger<UsersController> _logger;

public UsersController(ILogger<UsersController> logger)
{
    _logger = logger;
}

_logger.LogInformation("Fetching user {UserId}", id);
```

Good logging practices:
- use structured logs
- include important context
- avoid logging secrets

Common logging tools in .NET:
- built-in `ILogger`
- Serilog
- NLog

---

# 14. ENTITY FRAMEWORK CORE (ORM)

Entity Framework Core (EF Core) is the most common ORM in modern .NET backend work.

ORM means Object-Relational Mapper.

It maps C# objects to relational database tables.

## Entity example

```csharp
public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
}
```

## DbContext example

```csharp
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
}
```

## Register DbContext

```csharp
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
```

## Query data

```csharp
public class UserService : IUserService
{
    private readonly AppDbContext _db;

    public UserService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<UserDto?> GetByIdAsync(int id)
    {
        var user = await _db.Users.FirstOrDefaultAsync(x => x.Id == id);
        return user is null ? null : new UserDto(user.Id, user.Name);
    }
}
```

### Common EF Core features

- LINQ queries
- change tracking
- migrations
- relationships
- async database calls

### EF Core pros

- fast development
- strong integration with .NET
- migrations
- good for standard CRUD and business apps

### EF Core cons

- can hide inefficient queries
- developers may forget what SQL is generated
- some advanced queries are easier with raw SQL

Interview takeaway:
- EF Core is powerful, but you still need database fundamentals

---

# 15. EF CORE MIGRATIONS

Migrations track schema changes over time.

Install tool if needed:

```bash
dotnet tool install --global dotnet-ef
```

Add migration:

```bash
dotnet ef migrations add InitialCreate
```

Update database:

```bash
dotnet ef database update
```

Why migrations matter:
- repeatable schema changes
- team collaboration
- safer deployments

---

# 16. REPOSITORY AND SERVICE PATTERNS

Many .NET codebases use service and repository layers.

Typical layering:
- controllers handle HTTP concerns
- services handle business logic
- repositories or DbContext handle data access

Example service:

```csharp
public class UserService : IUserService
{
    private readonly AppDbContext _db;

    public UserService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<UserDto?> GetByIdAsync(int id)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == id);
        return user is null ? null : new UserDto(user.Id, user.Name);
    }
}
```

Interview note:
- some teams use repositories on top of EF Core
- some use DbContext directly in services
- either can be reasonable depending on the codebase

---

# 17. AUTHENTICATION AND AUTHORIZATION IN ASP.NET CORE

## JWT authentication

Common flow:
1. user logs in
2. server validates credentials
3. server issues JWT
4. client sends token in `Authorization` header
5. server validates token

Register JWT auth:

```csharp
builder.Services
    .AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        // token validation options go here
    });
```

Protect endpoint:

```csharp
[Authorize]
[HttpGet("me")]
public IActionResult Me()
{
    return Ok();
}
```

Role-based authorization:

```csharp
[Authorize(Roles = "Admin")]
[HttpDelete("{id}")]
public IActionResult DeleteUser(int id)
{
    return NoContent();
}
```

Interview takeaway:
- authentication answers who the caller is
- authorization answers what they can do

---

# 18. CORS

CORS controls which browser origins can call your API.

Example:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins("https://app.example.com")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
```

Use:

```csharp
app.UseCors("Frontend");
```

Interview note:
- CORS is a browser security rule
- it is not a replacement for auth

---

# 19. SWAGGER / OPENAPI

Swagger tooling is very common in .NET APIs.

Add services:

```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
```

Use in app:

```csharp
app.UseSwagger();
app.UseSwaggerUI();
```

Why it matters:
- API documentation
- easier testing
- better developer experience

---

# 20. HTTP CLIENT CALLS TO OTHER SERVICES

When your API calls another service, use `HttpClient`.

Better yet, use `IHttpClientFactory`.

Register:

```csharp
builder.Services.AddHttpClient();
```

Use:

```csharp
public class WeatherService
{
    private readonly HttpClient _httpClient;

    public WeatherService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string> GetForecastAsync()
    {
        return await _httpClient.GetStringAsync("https://example.com/forecast");
    }
}
```

Why `IHttpClientFactory` matters:
- better lifetime management
- avoids common `HttpClient` misuse
- integrates with resilience patterns

---

# 21. TESTING

Common .NET testing tools:
- xUnit
- NUnit
- MSTest
- Moq for mocking
- FluentAssertions for expressive assertions

## Unit test example with xUnit

```csharp
using Xunit;

public class MathTests
{
    [Fact]
    public void Add_ReturnsCorrectSum()
    {
        var result = 2 + 3;
        Assert.Equal(5, result);
    }
}
```

## Integration testing

For APIs, integration tests often check:
- status codes
- JSON responses
- auth behavior
- DB integration

Interview note:
- unit tests verify isolated logic
- integration tests verify components working together

---

# 22. BACKGROUND SERVICES

Not every .NET backend process is an HTTP API.

Background workers are common for:
- queue processing
- scheduled jobs
- email sending
- cleanup tasks

Example:

```csharp
using Microsoft.Extensions.Hosting;

public class Worker : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await Task.Delay(1000, stoppingToken);
        }
    }
}
```

---

# 23. CACHING

Common caching options in .NET:
- in-memory cache
- distributed cache
- Redis

Example with memory cache:

```csharp
builder.Services.AddMemoryCache();
```

Why caching matters:
- lower latency
- reduce DB load
- better performance on repeated reads

Interview reminder:
- caching improves speed but adds invalidation complexity

---

# 24. DATABASE TOOLS AND OPTIONS

Common relational databases used with .NET:
- SQL Server
- PostgreSQL
- MySQL

Common EF Core providers:
- `Microsoft.EntityFrameworkCore.SqlServer`
- `Npgsql.EntityFrameworkCore.PostgreSQL`
- Pomelo MySQL provider

Other data access tools:
- EF Core
- Dapper
- raw ADO.NET

## Dapper

Dapper is a lightweight micro-ORM.

Why teams use it:
- more control over SQL
- faster and lighter than full ORM in some cases

Interview answer:
- EF Core is common for productivity
- Dapper is common when teams want direct SQL control with less overhead

---

# 25. API VERSIONING

APIs often evolve over time.

Common approaches:
- URL versioning: `/api/v1/users`
- header versioning

Why version:
- support old clients
- evolve contracts safely

Interview note:
- version when needed
- avoid unnecessary churn

---

# 26. PAGINATION, FILTERING, SORTING

Real APIs commonly need:
- pagination
- filtering
- sorting

Example:

```txt
GET /api/users?page=1&pageSize=20&sortBy=name&order=asc
```

Why it matters:
- avoids giant payloads
- improves performance
- gives clients flexible querying

---

# 27. HEALTH CHECKS

Health endpoints are common in production.

Example:

```csharp
app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));
```

Why:
- monitoring
- container orchestration
- load balancer health checks

ASP.NET Core also has built-in health check support.

---

# 28. OBSERVABILITY

Production APIs need observability.

Core pieces:
- logs
- metrics
- tracing

What to watch:
- request rate
- error rate
- latency
- dependency failures
- DB performance

Common tooling:
- built-in logging
- Serilog
- OpenTelemetry
- Application Insights

---

# 29. PERFORMANCE AND RELIABILITY BASICS

Things that matter in real .NET APIs:
- async database and HTTP calls
- connection pooling
- caching
- timeouts
- retries
- rate limiting
- graceful shutdown

Interview reminder:
- API design is not just controllers and DTOs
- production readiness matters

---

# 30. SECURITY BASICS FOR .NET APIS

You should be comfortable with:
- HTTPS
- JWT validation
- input validation
- authorization
- secure secret handling
- hashing passwords instead of storing plain text
- not logging sensitive data

Common secret storage options:
- environment variables
- secret managers
- user secrets in development

Development secrets tool:

```bash
dotnet user-secrets init
dotnet user-secrets set "Jwt:Key" "super-secret"
```

---

# 31. COMMON INTERVIEW QUESTIONS

## "What is ASP.NET Core?"

It is the modern .NET web framework used to build APIs and web applications.

## "What is dependency injection and why does it matter?"

It is a way of supplying dependencies from outside a class, which improves modularity, testing, and maintainability.

## "What is EF Core?"

It is the main ORM in modern .NET used to map C# objects to relational database tables and query data with LINQ.

## "What is the difference between `IEnumerable`, `ICollection`, and `List`?"

At a high level:
- `IEnumerable<T>` is mainly for iteration
- `ICollection<T>` adds size and modification semantics
- `List<T>` is a concrete implementation

## "Why use async in a Web API?"

Because APIs spend a lot of time waiting on I/O like databases and HTTP calls, and async helps the server scale better during that waiting.

## "Minimal APIs vs controllers?"

- minimal APIs are lightweight and concise
- controllers are more structured and common in larger apps

---

# 32. CLI / TOOLING CHECKLIST

You should know these tools exist:
- `dotnet` CLI
- NuGet packages
- `dotnet ef`
- Swagger / OpenAPI
- xUnit / NUnit / MSTest
- EF Core
- Dapper
- Serilog
- OpenTelemetry

---

# 33. STUDY CHECKLIST

Make sure you can explain:
- C# classes, interfaces, async, LINQ, generics
- ASP.NET Core request flow
- minimal APIs vs controllers
- dependency injection
- configuration and `appsettings.json`
- model validation
- middleware
- exception handling
- logging
- REST methods and status codes
- DTOs vs entities
- EF Core basics
- migrations
- JWT auth
- CORS
- Swagger
- testing
- background services
- caching
- performance and security basics

---

# 34. FINAL INTERVIEW REMINDERS

- explain concepts in plain English first
- connect language features to API design
- use small code examples when helpful
- talk about tradeoffs, not just features
- remember that real backend work includes databases, auth, logging, validation, and deployment concerns

If you can explain C# basics, ASP.NET Core structure, REST conventions, EF Core, testing, tooling, and production concerns, you will be in strong shape for .NET Web API interviews.
