# Microservices

Microservice architecture arranges an application as a collection of loosely
coupled services.

It's difficult to pin down a single definition for microservices but some
defining characteristics are:

- Services in a microservice architecture are often processes that communicate
over a network to fulfill a goal using technology-agnostic protocols (_e.g._ HTTP)
- Services are organized around business capabilities
- Services can be implement using different programming languages, databases,
hardware environment, software environment, depending on what works best
- Services are small in size, messaging-enabled, bounded by contexts, autonomously
developed (can function on its own), independently deployable, decentralized, and
built and released with automated processes

A very important technology that helps with microservices is a **service mesh**.
A service mesh is a dedicated infrastructure layer for service-to-service communication
between microservices. This is often done using a sidecar proxy. A sidecar proxy
(imagine the motorcycle analogy) extends the functionality of the application it
is attached to. They are usually a [reverse proxy server](https://en.wikipedia.org/wiki/Reverse_proxy).

The service instance and sidecar proxy share a container, and the containers
are managed by a container orchestration tool such as [Kubernetes](https://kubernetes.io/).

## Benefits

> _"Write programs that do one thing and do it well"_ - Unix proverb

Microservices are great for a continuous delivery software development process,
especially for small teams working together (_i.e._ distributed development).
A change to a small part of the application only requires rebuilding and
redeploying only one or a small number of services.

It is common for microservices architectures to be adopted for SaaS applications,
serverless computing, and applications using lightweight container deployment (_e.g._ Docker).

The advantage of microservices over the monolithic approach, is that individual
microservices can be individually scaled. This is not possible with a monolithic setup.

Another benefit of microservices is integration of heterogeneous and legacy systems.
It's a great way to modernize an existing monolithic software application by slowing
refactoring pieces of the monolith into smaller, manageable microservices.

## Downsides

What's the catch? Well, it is quite difficult to implement a microservice architecture.

Services can form information barriers. This means that a developer who has no
knowledge of a different service has to learn the inner workings of this new service.
Development/support of many services is more challenging if they are built with
different tools and technologies - this is especially a problem if developers
move between projects frequently.

Testing and deployment can become more complicated as the number of services increases.
Moving responsibilities between services can be quite a challenge as well.

The tech-comedy channel KRAZAM has a [hilarious video](https://youtu.be/y8OnoxKotPQ)
about the downsides of microservices.

## Useful Links

- [Service-oriented architecture - Wikipedia](https://en.wikipedia.org/wiki/Service-oriented_architecture)
- [Microservices - Wikipedia](https://en.wikipedia.org/wiki/Microservices)
- [What are Microservices? - AWS](https://aws.amazon.com/microservices/)
- [What are microservices? - microservices.io](https://microservices.io/)
- [Monolithic application - Wikipedia](https://en.wikipedia.org/wiki/Monolithic_application)
- [Monolithic Architecture - microservices.io](https://microservices.io/patterns/monolithic.html)
