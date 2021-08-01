# A Philosophy of Software Design

> _By John Ousterhout (Stanford University)_

These are notes taken from the v1.0.1 edition of the book, printed in November 2018.

- [A Philosophy of Software Design](#a-philosophy-of-software-design)
  - [Preface](#preface)
  - [Chapter 1: Introduction (It's All About Complexity)](#chapter-1-introduction-its-all-about-complexity)
    - [The Waterfall Method](#the-waterfall-method)
    - [Agile Development](#agile-development)
  - [Chapter 2: The Nature of Complexity](#chapter-2-the-nature-of-complexity)

## Preface

There has been considerable discussion about agile development, debuggers, version control systems, test coverage tools, object-oriented programming, functional programming, design patterns, and algorithms. The core problem of software design has not been addressed, **_problem decomposition_** (_i.e._ reducing complexity).

> Further reading: [_On the Criteria To Be Used in Decomposing Systems into Modules_](./documents/criteria_david_parnas.pdf) by David Parnas (1971)

Problem decomposition is how to take a complex problem and divide it up into pieces that can be solved independently.

Many people assume that software design skill is an innate talent that cannot be taught. However, there is quite a bit of scientific evidence that outstanding performance in many fields is related more to high-quality practice than innate ability (_Talent is Overrated_ by Geoff Colvin).

John Ousterhout created a course at Stanford called [CS 190](https://web.stanford.edu/~ouster/cgi-bin/cs190-winter21/index.php) in order to teach software design.

Best way to reach John about the book is to send an email to software-design-book@googlegroups.com or check out [John's homepage](https://web.stanford.edu/~ouster/cgi-bin/book.php) about the book.

> I recommend that you take the suggestions in this book with a grain of salt. The overall goal is to reduce complexity; this is more important than any particular principle or idea you read here.

## Chapter 1: Introduction (It's All About Complexity)

> Writing computer software is one of the purest creative activities in the history of the human race. Programmers aren't bound by practical limitations such as the laws of physics; we can create exciting virtual worlds with behaviours that could never exist in the real world. Programming doesn't require great physical skill or coordination, like ballet or basketball. All programming requires is a creative mind and the ability to organize your thoughts. If you can visualize a system, you can probably implement it in a computer program.

The greatest limitation in writing software is our ability to understand the systems we are creating.

There are two general approaches to fighting complexity:

1. Making code simpler and more obvious
   - _e.g._ eliminating special cases or using identifiers in a consistent fashion
2. Encapsulating complexity, so that programmers can work on a system without being exposed to all of its complexity at once.

This second approach is called a *__modular design__*, where a software system is divided up into _modules_, such as classes in an object-oriented language. The modules are designed to be relatively independent of each other, so that a programmer can work on one module without having to understand the details of other modules.

Software design is a continuous process that spans the entire lifecycle of a software system.
Software should not be designed like a physical system (_e.g._ buildings, ships, bridges).

### The Waterfall Method

A horrible way to design software is the _waterfall model_:

- project divided into discrete phases
  - requirements definition
  - design
  - coding
  - testing
  - maintenance
- each phase completes before the next starts
- usually different people are responsible for each phase
- entire system designed at once, during the design phase (frozen at the end of the phase for implementation phase)

The initial design will have many problems, and problems do not become apparent until implementation is underway. The waterfall method cannot also not accommodate for major design changes, so developers try to patch around problems without changing the overall design. This results in an explosion of complexity.

### Agile Development

Agile development is referred to an incremental alternative to the waterfall method:

- the initial design focuses on a small subset of the overall functionality
- this subset is designed, implemented, and then evaluated
- each iteration exposes problems with the existing design, which are fixed before the next set of features is designed

By following the agile development method, problems with the initial design can be fixed while the system is still small. Later features benefit from experience gained during the implementation of earlier features, so they have fewer problems.

An incremental approach works for software, but it also means that software design is never done. Incremental development also means continuous redesign.

> The initial design for a system or a component is almost never the best one; experience inevitably shows better ways to do things.

One of the best ways to improve your design skills is to learn to recognize red flags: signs that a piece of code is probably more complicated than it needs to be.

> If you take any design idea to its extreme, you will probably end up in a bad place. Beautiful designs reflect a balance between competing ideas and approaches.

## Chapter 2: The Nature of Complexity

Recognizing complexity allows you to identify problems before you invest a lot of effort in them, and it allows you to make good choices among alternatives.

> **Complexity is anything related to the structure of a software system that makes it hard to understand and modify the system.**

Complexity can take many forms:

- it might be hard to understand how a piece of code works
- it might take a lot of effort to implement a small improvement
- it might not be clear which parts of the system must be modified to make the improvement
- it might be difficult to fix one bug without introducing another

If a software system is hard to understand and modify, then it is complicated.
if a software system is easy to understand and modify, then it is simple.
