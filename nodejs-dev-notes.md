# Nodejs.dev Learn Notes

Notes are created based off of the [Node.js learning site](https://nodejs.dev/learn).

Node.js is supported by the [OpenJS Foundation](https://openjsf.org/).

## Introduction to Node.js

**Q: What is Node?**

A: Node.js is an open-source and cross-platform JavaScript runtime environment.

**Q: What makes Node important?**

A: We can write server-side and client-side code without the need to learn a
different language. There are some additional stats:

- Runs the [V8 JavaScript engine](https://v8.dev/) (Google Chrome), outside of the browser.
- Node is run in a single process, without creating a new thread for every request.
- Provides a set of asynchronous I/O primitives in its standard library that prevent
JavaScript code from blocking the thread. This allows Node.js to handle thousands of
concurrent connections with a single server without introducing the burden of
managing thread concurrency.
- [Article: How to write asynchronous code](https://nodejs.org/en/knowledge/getting-started/control-flow/how-to-write-asynchronous-code/)

> Note: there is more information on asynchronous code in the [Modern Asynchronous JavaScript with Async and Await](https://nodejs.dev/learn/modern-asynchronous-javascript-with-async-and-await) section.

### An Example Node.js Application

Here's a simple web server [[example-server.js](./example-server.js)]:

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = process.env.PORT || 1234;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

> Note: If you want to set the `PORT`, run the server with

```zsh
PORT=2020 node example-server.js
```

The code above includes the [http module](https://nodejs.org/api/http.html),
which is used to create an HTTP server using `http.createServer(requestListener)`
(where `requestListener` is a function). The server listens on a specified
hostname and port. When the server is ready, the `requestListener` callback
function is called.
