# Asynchronous JavaScript

JavaScript is a single-threaded programming language, however most operations we perform on the web are blocking or time consuming.

Topics to cover:

- The Event Loop
- Prerequisite: Closures
- Asynchronous programming and callbacks
- Timers
- Promises
- Async and Await

- [Asynchronous JavaScript](#asynchronous-javascript)
  - [The Event Loop](#the-event-loop)
  - [Callbacks](#callbacks)
  - [Async and Await](#async-and-await)
  - [Glossary](#glossary)
    - [Syntactic sugar](#syntactic-sugar)
  - [Unsorted Dump](#unsorted-dump)

## The Event Loop

There is an excellent video by Jake Archibald (_In The Loop_) on the JavaScript event loop:

[Jake Archibald: In The Loop - JSConf.Asia](./documents/InTheLoop_JakeArchibald.mp4)

Both the browser and Node.js are running a single-threaded event loop to run your code. On the first run, it will run all synchronous code, and is able to queue up asynchronous events to be called back later.

This asynchronous event sometimes takes the form of a function to be called later, this is called a **_callback_** function.

---

https://nodejs.dev/learn/the-nodejs-event-loop

## Callbacks

[Intro to Async Web Dev - Part 1: Callbacks](https://www.youtube.com/watch?v=ueOG5uk7zo8) by Demos with Angular

## Async and Await

`async` and `await` are [syntactic sugar](#syntactic-sugar) for existing async operations.

## Glossary

### Syntactic sugar

Syntax within a programming language that is designed to make things easier to read or to express. It makes the language "sweeter" for human use: things can be expressed more clearly, more concisely, or in an alternative style that some may prefer.

## Unsorted Dump

- [The Async Await Episode I Promised - Fireship.io](https://www.youtube.com/watch?v=vn3tm0quoqE)

[WTF is a closure?](https://whatthefuck.is/closure)

Promises and the ES6 Job Queue: https://careersjs.com/magazine/javascript-job-queue-microtask/
https://flaviocopes.com/javascript-event-loop/
https://medium.com/@Rahulx1/understanding-event-loop-call-stack-event-job-queue-in-javascript-63dcd2c71ecd
