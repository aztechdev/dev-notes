# Nodejs.dev Learn Notes

Notes are created based off of the [Node.js learning site](https://nodejs.dev/learn).

## Introduction to Node.js

Q: What is Node?

A: Node.js is an open-source and cross-platform JavaScript runtime environment.

Q: What makes Node important?

A: We can write server-side and client-side code without the need to learn a
different language. There are some additional stats:

- Runs the V8 JavaScript engine (Google Chrome), outside of the browser.
- Node is run in a single process, without creating a new thread for every request.
- Provides a set of asynchronous I/O primitives in its standard library that prevent
JavaScript code from blocking the thread. This allows Node.js to handle thousands of
concurrent connections with a single server without introducing the burden of
managing thread concurrency, which could be a significant source of bugs.
