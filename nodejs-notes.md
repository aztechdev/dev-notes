# Nodejs.dev Learn Notes

Most of these notes came about after reading through the [Node.js learning site](https://nodejs.dev/learn).

Node.js is supported by the [OpenJS Foundation](https://openjsf.org/).

## Table of Contents

- [Introduction to Node.js](#introduction-to-nodejs)
  - [Differences Between the Browser and Node.js](#differences-between-the-browser-and-nodejs)
  - [An Example Node.js Application](#an-example-nodejs-application)
- [How to Exit From a Node.js Program Programmatically](#how-to-exit-from-a-nodejs-program-programmatically)
- [How to Read Environment Variables From Node.js](#how-to-read-environment-variables-from-nodejs)
  - [NODE_ENV](#node_env)
- [The Node.js REPL](#the-nodejs-repl)

Useful Links | Description
--- | ---
[Node.js API Documentation](https://nodejs.org/api/) | Index of Node.js API docs
[Node.js Globals](https://nodejs.org/api/globals.html) | Always available to Node.js applications without using `require()`
[JS Global Objects - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) | Standard built-in objects in the global scope
[HTTP Response Code - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) | Docs on status codes on MDN
[httpstatuses.com](https://httpstatuses.com/) | Another response code index
[HTTP Headers - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) | Reference list of HTTP headers
[MIME/Media Types - IANA][mime-types] | List of valid media types for a resource
[ECMAScript Modules - Node](https://nodejs.org/api/esm.html) | Docs on ESM
[nvm](https://github.com/nvm-sh/nvm) | Node Version Manager
[ECMA-262 standard](https://www.ecma-international.org/publications/standards/Ecma-262.htm) | ECMAScript Language Specification

---

## Introduction to Node.js

**Q: What is Node?**

A: Node.js is an open-source and cross-platform JavaScript runtime environment.

**Q: What makes Node important?**

A: We can write server-side and client-side code without the need to learn a
different language. There are some additional stats:

- Runs the [V8 JavaScript engine](https://v8.dev/) (Google Chrome), outside of the browser.
  - JavaScript is internally compiled by V8 with [just-in-time (JIT) compilation](https://en.wikipedia.org/wiki/Just-in-time_compilation) to speed up the execution.
- Node is run in a single process, without creating a new thread for every request.
- Provides a set of asynchronous I/O primitives in its standard library that prevent
JavaScript code from blocking the thread. This allows Node.js to handle thousands of
concurrent connections with a single server without introducing the burden of
managing thread concurrency.
- [Article: How to write asynchronous code](https://nodejs.org/en/knowledge/getting-started/control-flow/how-to-write-asynchronous-code/)

> Note: there is more information on asynchronous code in the [Modern Asynchronous JavaScript with Async and Await](https://nodejs.dev/learn/modern-asynchronous-javascript-with-async-and-await) section.

### Differences Between the Browser and Node.js

Browser | Node.js
--- | ---
Interacting with the DOM, `document`, `window`, Cookies, using Babel to transpile client code to be ES5-compatible, ES modules standard being adopted (`import`). | Node.js modules, control over the environment (any ES version), uses CommonJS module system (`require`).

### An Example Node.js Application

Here's a simple web server [[example-server.js](./code-samples/example-server.js)]:

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
which is used to create an HTTP server [using `http.createServer(requestListener)`](https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener)
(where `requestListener` is a function).

> Note: the `requestListener` is a function which is automatically added to [the `request` event][request-event].

By [calling `server.listen(port, host, callback)`](https://nodejs.org/api/net.html#net_server_listen_port_host_backlog_callback),
the server listens on a specified hostname and port. When the server is ready,
the `callback` function is called.

When a request is received, [the `request` event][request-event] is emitted and provides two objects:

1. a request ([an `http.IncomingMessage` object](https://nodejs.org/api/http.html#http_class_http_incomingmessage))
2. a response ([an `http.ServerResponse` object](https://nodejs.org/api/http.html#http_class_http_serverresponse))

The `request` provides request details, like the request headers and request data.
The `response` is used to return data to the caller. In the example above, we
return status code `200` ("OK"), which means the request has succeeded. The Content-Type
header is used to indicate the media type of the resource. In the example, we are
returning plain text.

The `res.end(data)` method signals to the server that all of the response headers
and body have been sent; that server should consider this message complete.
If data is specified, it is similar in effect to calling `response.write(data, encoding)` followed by `response.end(callback)`.

> Note: The `response.end()` method **MUST** be called on each response.

<!-- Links -->
[request-event]: https://nodejs.org/api/http.html#http_event_request
[mime-types]: https://www.iana.org/assignments/media-types/media-types.xhtml

## How to Exit From a Node.js Program Programmatically

The [`process` core module](https://nodejs.org/api/process.html) provides the `.exit()` method to programmatically exit from a Node.js program:

```js
process.exit(); // by default, the exit code is 0, meaning 'success'
// You can also pass an integer that signals the exit code
process.exit(1); // 1 is the 'failure' exit code
```

You could also explicitly set the exit code using `process.exitCode = 1;`,
but this is overwritten if the `.exit(int exitCode)` method is called with an integer.

When Node.js runs this line, the process is immediately forced to (ungracefully) terminate.

> Note: There are [several error codes](https://nodejs.org/api/process.html#process_process_exit_code) besides 0 and 1

So how do you gracefully exit a Node.js program? We can send a SIGTERM signal event, and handle
it with the [process signal handler](https://nodejs.org/api/process.html#process_signal_events):

```js
process.on('SIGTERM', () => {
  // Finish up with processing in order to gracefully terminate
})
```

It's possible to send this signal from inside the program, or another program
(provided it knows the PID of the process to terminate):

```js
process.kill(process.pid, 'SIGTERM')
```

> Note: for more information on these signals, check out [the Linux manual on signals](https://man7.org/linux/man-pages/man7/signal.7.html)

## How to Read Environment Variables From Node.js

The Node.js global `process` has a [property `env`](https://nodejs.org/api/process.html#process_process_env).
This is an object that contains all environment variables that were set at the moment the process was started.
An example of this object looks like:

```js
{
  HOME: '/Users/username',
  SHELL: '/bin/zsh',
  PATH: '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin',
  LANG: 'en_CA.UTF-8',
  TERM: 'xterm-256color',
  COLORTERM: 'truecolor',
  TERM_PROGRAM: 'Hyper',
  TERM_PROGRAM_VERSION: '3.0.2',
  PWD: '/Users/username/Development/dev-notes',
  OLDPWD: '/Users/username',
}
```

> Note: many of these values come from [`environ` in Linux](https://man7.org/linux/man-pages/man7/environ.7.html)

A common way to manage multiple environment variables (based on different config files)
is to use the [dotenv](https://github.com/motdotla/dotenv) package. This is included using:

```js
require('dotenv').config()
```

Then include a `.env` file in the root directory of the project. Add environment-specific
variables on new lines in the form of `NAME=VALUE`. For example:

```js
HOSTNAME=localhost
PORT=3000
NODE_EN=development
```

### NODE_ENV

`NODE_ENV` is an environment variable made popular by the [Express](https://expressjs.com/) server framework.
This value is used (by convention) to state whether a particular environment is `production` or `development`.
A Node.js application often uses this value to allow different options based on the environment.
For example, we could turn on additional logging in the `development` environment that would otherwise be disabled in production.

## The Node.js REPL

> REPL stands for [Read-eval-print loop](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop), and is sometimes called a _language shell_

The Node.js REPL takes a single expression (read), executes it (eval) and returns the result to the console (print). A simple test is to log something:

```zsh
❯ node
Welcome to Node.js v12.16.1.
Type ".help" for more information.
> console.log('test')
test
undefined
>
```

> Random Note: if you type `_` and hit `enter`, the result of the last operation will be printed

The `undefined` after `test` is the return value of `console.log()`, because the method does not return anything.

It also possible to use `tab` for autocomplete. This is useful for exploring the properties and methods of JavaScript classes (_e.g._ `Array`, type `Array.` then `tab`) and Node.js globals (type `global.` and press `tab`).

**Dot Command** | **Description**
--- | ---
`.help` | gives information on the commands below
`.editor` | enables editor mode, to write multiline JavaScript code with ease. Once you are in this mode, enter ctrl-D to run the code you wrote.
`.break` | when inputting a multi-line expression, entering the .break command will abort further input. Same as pressing ctrl-C.
`.clear` | resets the REPL context to an empty object and clears any multi-line expression currently being input.
`.load` | loads a JavaScript file, relative to the current working directory
`.save` | saves all you entered in the REPL session to a file (specify the filename)
`.exit` | exits the repl (same as pressing ctrl-C two times)

## Using Command Line Arguments
