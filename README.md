## Technical Interview Prep

### OOP
Object-oriented programming (OOP) is a method of structuring a program by bundling related properties and behaviors into individual objects.

Classes are used to create user-defined data structures. Classes define functions called methods, which identify the behaviors and actions that an object created from the class can perform with its data.

A class is a blueprint for how something should be defined. It doesn’t actually contain any data.

An instance is an object that is built from a class and contains real data.

Encapsulation describes the idea of bundling data and methods that work on that data within one unit, like a class in Java. This concept is also often used to hide the internal representation, or state of an object from the outside. This is called information hiding.

Inheritance is the process by which one class takes on the attributes and methods of another. Newly formed classes are called child classes, and the classes that child classes are derived from are called parent classes.

Polymorphism refers to a subclass's ability to adapt a method that already exists in its superclass to meet its needs. To put it another way, a subclass can use a method from its superclass as is or modify it as needed.

Method overloading refers to the use of many methods with the same name that take various numbers of arguments within a single class.

Method overriding is a feature that allows a subclass or child class to provide a specific implementation of a method that is already provided by one of its superclasses or parent classes.

### Cloud-native Applications
Cloud-native applications are a collection of small, independent, and loosely coupled services. AWS custom lambdas can be considered cloud-native applications. Cloud-native apps follow a microservices architecture and often require containers.

### Microservices
Microservices are both an architecture and an approach to writing software. With microservices, applications are broken down into their smallest components, independent from each other. Instead of a traditional, monolithic, approach to apps, where everything is built into a single piece, microservices are all separated and work together to accomplish the same tasks. Each of these components, or processes, is a microservice. This approach to software development values granularity, being lightweight, and the ability to share similar process across multiple apps. It is a major component of optimizing application development towards a cloud-native model.

### Relational Databases
A relational database is a digital database based on the relational model of data.

Normalization is the process of eliminating redundant data and maintaining data dependencies.

Denormalization is the process of improving the performance of the database by adding redundant data.

#### Database ACID Properties:
- Atomicity: It ensures all-or-none rule for database modifications.
- Consistency: Data values are consistent across the database.
- Isolation: Two transactions are said to be independent of one another.
- Durability: Data is not lost even at the time of server failure.

#### Clustered Index vs non-clustered index
- A clustered index is a special type of index that reorders the way records in the table are physically stored. Therefore table can have only one clustered index. The leaf nodes of a clustered index contain the data pages.
- A non clustered index is a special type of index in which the logical order of the index does not match the physical stored order of the rows on disk. The leaf node of a non clustered index does not consist of the data pages. Instead, the leaf nodes contain index rows.

### SQL vs. NoSQL
NoSQL is better than RDBMS because of the following reasons/properities of NoSQL:
- It supports semi-structured data and volatile data
- It does not have schema
- Read/Write throughput is very high
- Horizontal scalability can be achieved easily
- Will support Bigdata in volumes of Terra Bytes & Peta Bytes
- Provides good support for Analytic tools on top of Bigdata
- Can be hosted in cheaper hardware machines
- In-memory caching option is available to increase the performance of queries
- Faster development life cycles for developers

Still, RDBMS is better than NoSQL for the following reasons/properties of RDBMS:
- Transactions with ACID properties - Atomicity, Consistency, Isolation & Durability
- Adherence to Strong Schema of data being written/read
- Real time query management ( in case of data size < 10 Tera bytes )
- Execution of complex queries involving join & group by clauses

### CI/CD and Release process
CI/CD is a method to frequently deliver apps to customers by introducing automation into the stages of app development. The main concepts attributed to CI/CD are continuous integration, continuous delivery, and continuous deployment.

The "CI" in CI/CD always refers to continuous integration, which is an automation process for developers. Successful CI means new code changes to an app are regularly built, tested, and merged to a shared repository. It’s a solution to the problem of having too many branches of an app in development at once that might conflict with each other.

The "CD" in CI/CD refers to continuous delivery and/or continuous deployment, which are related concepts that sometimes get used interchangeably.

Continuous delivery usually means a developer’s changes to an application are automatically bug tested and uploaded to a repository (like GitHub or a container registry), where they can then be deployed to a live production environment by the operations team. It’s an answer to the problem of poor visibility and communication between dev and business teams. To that end, the purpose of continuous delivery is to ensure that it takes minimal effort to deploy new code.

Continuous deployment (the other possible "CD") can refer to automatically releasing a developer’s changes from the repository to production, where it is usable by customers. It addresses the problem of overloading operations teams with manual processes that slow down app delivery. It builds on the benefits of continuous delivery by automating the next stage in the pipeline.

RedHat link about CI/CD [https://www.redhat.com/en/topics/devops/what-is-ci-cd#:~:text=CI%2FCD%20is%20a%20method,continuous%20delivery%2C%20and%20continuous%20deployment.]

Jenkins is a great tool for CI/CD.

### API Development
API (Application Programming Interface) is nothing but a set of instructions, requirements, and standards that enable an app or software to employ features or services of some other application, device, or platform to offer better services.
In technical terms, it’s a set of programming code which allows data transmission between one software product with the other. It also consists of terms of this data exchange.

- Private APIs - internal organizational APIs
- Partner APIs - used to integrate pieces of software together
- Public APIs - used

Keywords:
#### API Key
It’s a unique code which is passed in the computer programs for authenticating user, developer, or calling program.

#### Endpoint
Interaction touchpoints between server and API are called Endpoint.

#### JSON
JSON (JavaScript Object Notion is a data format) is a data format which is used for APIs to interchange data. This interchange of data can occur between a web application and a server or two applications.

#### GET
It’s a method which is used for requesting data from the server at a specified resource.

#### POST
It’s a method used for sending data to the API server to update or create a resource.

#### OAuth
It’s an open-standard authorization or authorization framework for APIs. It offers secure and restricted access to the end-users’ data which is to be used by the application or third-party websites without accessing their password.

#### Latency
The time taken by the API to process a request and respond is called Latency.

#### Rate-limiting
The process of controlling the rate of incoming as well as outgoing traffic is called rate-limiting. It’s also defined as the total number of requests that a user hits to the API.

#### API Throttling
API throttling refers to the process in which the usage of APIs by consumers is controlled for a specific duration.

### Web Security
- Denial-of-Service (DOS) Attack
DoS attacks work by flooding systems, servers, and/or networks with traffic to overload resources and bandwidth. The result is rendering the system unable to process and fulfill legitimate requests. In addition to denial-of-service (DoS) attacks, there are also distributed denial-of-service (DDoS) attacks.
- SQL Injections
This occurs when an attacker inserts malicious code into a server using server query language (SQL) forcing the server to deliver protected information. This type of attack usually involves submitting malicious code into an unprotected website comment or search box. Secure coding practices such as using prepared statements with parameterized queries is an effective way to prevent SQL injections.
- Password Attack
Passwords are the most widespread method of authenticating access to a secure information system, making them an attractive target for cyber attackers. By accessing a person’s password, an attacker can gain entry to confidential or critical data and systems, including the ability to manipulate and control said data/systems.
- Cross-site Scripting
A cross-site scripting attack sends malicious scripts into content from reliable websites. The malicious code joins the dynamic content that is sent to the victim’s browser. Usually, this malicious code consists of Javascript code executed by the victim’s browser, but can include Flash, HTML, and XSS.

### Data Security
- Access Controls
This type of data security measures includes limiting both physical and digital access to critical systems and data. This includes making sure all computers and devices are protected with mandatory login entry, and that physical spaces can only be entered by authorized personnel.
- Authentication
Similar to access controls, authentication refers specifically to accurately identifying users before they have access to data. This usually includes things like passwords, PIN numbers, security tokens, swipe cards, or biometrics.
- Backups & Recovery
Good data security means you have a plan to securely access data in the event of system failure, disaster, data corruption, or breach. You’ll need a backup data copy, stored on a separate format such as a physical disk, local network, or cloud to recover if needed.
- Data Erasure
You’ll want to dispose of data properly and on a regular basis. Data erasure employs software to completely overwrite data on any storage device and is more secure than standard data wiping. Data erasure verifies that the data is unrecoverable and therefore won’t fall into the wrong hands.
- Data Masking
By using data masking software, information is hidden by obscuring letters and numbers with proxy characters. This effectively masks key information even if an unauthorized party gains access to it. The data changes back to its original form only when an authorized user receives it.
- Data Resiliency
Comprehensive data security means that your systems can endure or recover from failures. Building resiliency into your hardware and software means that events like power outages or natural disasters won’t compromise security.
- Encryption
A computer algorithm transforms text characters into an unreadable format via encryption keys. Only authorized users with the proper corresponding keys can unlock and access the information. Everything from files and a database to email communications can — and should — be encrypted to some extent.

There are three core elements to data security that all organizations should adhere to: Confidentiality, Integrity, and Availability. These concepts are also referred to as the CIA Triad, functioning as a security model and framework for top-notch data security.
- Confidentiality. Ensures that data is accessed only by authorized users with the proper credentials.
- Integrity. Ensure that all data stored is reliable, accurate, and not subject to unwarranted changes.
- Availability. Ensures that data is readily — and safely — accessible and available for ongoing business needs.

### Non-functional requirements
Non-Functional Requirements are the constraints or the requirements imposed on the system. They specify the quality attribute of the software. Non-Functional Requirements deal with issues like scalability, maintainability, performance, portability, security, reliability, and many more.

#### Observability
Observability is defined as the ability of the internal states of a system to be determined by its external outputs. With the unknown unknowns of our software's failure modes, we want to be able to figure out what's going on just by looking at the outputs: we want observability.
- Metrics are a central part of any monitoring process, but even when you have the right ones, you’re necessarily limited by the constraints of linear time.
- Tracing is really just a type of logging that’s designed to record the flow of a program’s execution.

#### Scalability
Software scalability is a measure of how easy it is to grow or shrink a piece of software. In many cases it refers to the software's ability to handle increased workloads while adding users and removing them with minimal cost impact.

- Vertical scaling (aka scaling up) describes adding additional resources to a system so that it meets demand.
- Horizontal scaling (aka scaling out) refers to adding additional nodes or machines to your infrastructure to cope with new demands
- Diagonal - both

#### Advantages of horizontal scaling
- Scaling is easier from a hardware perspective - All horizontal scaling requires you to do is add additional machines to your current pool. It eliminates the need to analyze which system specifications you need to upgrade.
- Fewer periods of downtime - Because you’re adding a machine, you don’t have to switch the old machine off while scaling. If done effectively, there may never be a need for downtime and clients are less likely to be impacted.
- Increased resilience and fault tolerance - Relying on a single node for all your data and operations puts you at a high risk of losing it all when it fails. Distributing it among several nodes saves you from losing it all. 
- Increased performance - If you are using horizontal scaling to manage your network traffic, it allows for more endpoints for connections, considering that the load will be delegated among multiple machines.     

#### Disadvantages of horizontal scaling
- Increased complexity of maintenance and operation - Multiple servers are harder to maintain than a single server is. Additionally, you will need to add software for load balancing and possibly virtualization. Backing up your machines may also become a little more complex. You will need to ensure that nodes synchronize and communicate effectively. 
- Increased Initial costs - Adding new servers is far more expensive than upgrading old ones.   

#### Advantages of vertical scaling
- Cost-effective - Upgrading a pre-existing server costs less than purchasing a new one. Additionally, you are less likely to add new backup and virtualization software when scaling vertically. Maintenance costs may potentially remain the same too.
- Less complex process communication - When a single node handles all the layers of your services, it will not have to synchronize and communicate with other machines to work. This may result in faster responses.
- Less complicated maintenance - Not only is maintenance cheaper but it is less complex because of the number of nodes you will need to manage. 
- Less need for software changes - You are less likely to change how the software on a server works or how it is implemented.         

#### Disadvantages of vertical scaling
- Higher possibility for downtime - Unless you have a backup server that can handle operations and requests, you will need some considerable downtime to upgrade your machine. 
- Single point of failure - Having all your operations on a single server increases the risk of losing all your data if a hardware or software failure was to occur. 
- Upgrade limitations - There is a limitation to how much you can upgrade a machine. Every machine has its threshold for RAM, storage, and processing power. 

#### Reliability
Software reliability is the probability of failure-free operation of a computer program for a specified period in a specified environment. Reliability is a customer-oriented view of software quality. It relates to operation rather than design of the program, and hence it is dynamic rather than static.

We can measure reliability as a combination of two important measurements: Mean Time Between Failures (MTBF) and Mean Time to Repair (MTTR).

- Mean Time Between Failures (MTBF) is the measurement of time between system breakdowns, but it only includes the time the system is working (and not being worked on). A system that had been running strong for a year may suddenly have two down times in a one-month period; this will drag down MTBF. It should also warrant discussion on what updates/patches may have been missed during those long stretches of uptime.

- Mean Time to Repair (MTTR) is the number you use to measure the average time it takes to fix a system. The following chart shows sample data on a given system and the mean time for repairs.

- One way to measure uptime/reliability is the nines approach. Vendors often sell their systems on a certain percentage of uptime. The nines here are the variations of 99% uptime. 99% is actually two nines, which is just under 4 days of downtime in a year. However, vendors like to sell the coveted five nines (99.999%) uptime (less than seven minutes per year of downtime).
