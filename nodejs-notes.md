# Node.js

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
- [Using Command Line Arguments](#using-command-line-arguments)
- [Making the Command Line Interactive](#making-the-command-line-interactive)
- [Output to the Command Line](#output-to-the-command-line)
  - [Formatting](#formatting)
  - [Debugging](#debugging)
  - [Other Uses](#other-uses)
- [CommonJS Modules](#commonjs-modules)
  - [ECMAScript Modules](#ecmascript-modules)
- [npm](#npm)
- [The Event Loop](#the-event-loop)

Useful Links | Description
--- | ---
[Node.js API Documentation](https://nodejs.org/api/) | Index of Node.js API docs
[Node.js Globals](https://nodejs.org/api/globals.html) | Always available to Node.js applications without using `require()`
[JS Global Objects - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) | Standard built-in objects in the global scope
[Concurrency model and the event loop - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop) | An explanation of JavaScript's concurrency model (which is based off an event loop)
[Web APIs - MDN](https://developer.mozilla.org/en-US/docs/Web/API) | List of Web APIs (_e.g._ DOM, History API, Storage, WebGL)
[HTTP Response Code - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) | Docs on status codes on MDN
[httpstatuses.com](https://httpstatuses.com/) | Another response code index
[HTTP Headers - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) | Reference list of HTTP headers
[MIME/Media Types - IANA][mime-types] | List of valid media types for a resource
[ECMAScript Modules - Node](https://nodejs.org/api/esm.html) | Docs on ESM
[ECMA-262 standard](https://www.ecma-international.org/publications/standards/Ecma-262.htm) | ECMAScript Language Specification
[nvm](https://github.com/nvm-sh/nvm) | Node Version Manager
[CLI Commands - NPM][npm-cli] | A list of CLI commands for `npm`
[`package.json` - NPM][package-json] | Specifics of `npm`'s `package.json`
[Semantic Versioning Syntax - NPM](https://docs.npmjs.com/misc/semver) | Making sense of semver syntax with package version numbers
[npm semver calculator](https://semver.npmjs.com/) | A useful tool for precisely specifying versions
[npx](https://www.npmjs.com/package/npx) | `npx` lets you execute npm package binaries

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
is to use the [dotenv](https://github.com/motdotla/dotenv) package. After installing the module, this is included using:

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

You can pass arguments on the command line by adding them after the script:

```zsh
node app.js one two three four
```

The [`process` core module](https://nodejs.org/api/process.html) has the
[`argv` property](https://nodejs.org/api/process.html#process_process_argv),
which is an array of command line arguments.

The first element will be [process.execPath](https://nodejs.org/api/process.html#process_process_execpath).
The second element will be the path to the JavaScript file being executed.
The remaining elements will be any additional command line arguments.

You can print all of your command line arguments with:

```js
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
// You could get only the additional arguments with the following:
const args = process.argv.slice(2);
```

## Making the Command Line Interactive

The [`readline` module](https://nodejs.org/api/readline.html) provides an interface
for reading data from a [Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams)
(_e.g._ `process.stdin`) one line at a time:

```js
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you think of Node.js? ', (answer) => {
  // Do something with the answer
  console.log(`Thank you for your valuable feedback: ${answer}`);
  rl.close();
});
```

> There are 3rd party packages that provide some additional functionality, like
> [readline-sync](https://github.com/anseki/readline-sync) and [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)

## Output to the Command Line

Node has a [global `console`](https://nodejs.org/api/console.html) instance that
is similar to the [JavaScript console](https://developer.mozilla.org/en-US/docs/Web/API/Console)
mechanism provided by web browsers.

> Note: The global console object's methods are neither consistently synchronous
> like the browser APIs they resemble, nor are they consistently asynchronous
> like all other Node.js streams. See the [note on process I/O](https://nodejs.org/api/process.html#process_a_note_on_process_i_o)
> for more information.

### Formatting

Like many programming languages, we can format our print statements:

```js
console.log('My name is %s, I was born in the %ds. Here\'s an object: %o', 'Andrew', 90, {hello: 'there'});
```

Flag | What it does
--- | ---
`%s` | format a variable as a string
`%d` | format a variable as a number
`%i` | format a variable as its integer part only
`%o` | format a variable as an object

It's also possible to colour the output by using [ANSI escape sequences](https://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html):

```js
console.log('\x1b[33m%s\x1b[0m', 'hi!');
// prints 'hi' in yellow
console.log('\u001b[31m%s', 'hi!');
// prints 'hi' in red
```

> Note: a faster/easier way to do this is to use the [chalk](https://github.com/chalk/chalk) library

### Debugging

An important use of the `console` module is to print out the stack trace using
`console.trace()`. If you're ever confused about how a function is called,
putting `console.trace()` in the function can help by showing a trace of what
lead to calling the function.

Another important use of `console` is to time functions for performance analysis:

```js
const doSomething = () => console.log('test');
const measureDoingSomething = () => {
  console.time('doSomething()');
  doSomething();
  console.timeEnd('doSomething()');
};
measureDoingSomething();
// doSomething(): 1.813ms
```

If you want to print an error, by using `console.error()`, information will be
printed to `stderr` instead of `stdout`.

### Other Uses

There's an interesting method called `console.count(label)` that maintains a
counter for how many times the same string has been printed with `.count()`:

```js
console.count('How many times?');
// How many times?: 1
console.count('How many times?');
// How many times?: 2
console.count('How many times?');
// How many times?: 3
```

## CommonJS Modules

Node.js prefers to use [CommonJS](https://en.wikipedia.org/wiki/CommonJS) modules.
Each file is treated as a separate module. For example, to import a module:

```js
const moduleFromOtherFile = require('./fileWithStuff'); // imports from fileWithStuff.js
console.log('Here is some stuff below:');
console.log(moduleFromOtherFile.lotsOfStuff);
```

In order to be able to import `moduleFromOtherFile`, we need to expose it:

```js
// fileWithStuff.js
const privateString = 'I am a "private" string';

exports.lotsOfStuff = {
  stuff1: 'stuff',
  stuff2: 'more stuff',
  privateStuff: privateString
};
```

The module `moduleFromOtherFile` has exported the object `lotsOfStuff`. Object and
functions are added to the root of a module by specifying additional properties
on the special `exports` object.

Variables local to the module will be private (_e.g._ `privateString`) because
the module is [wrapped in a function](https://nodejs.org/api/modules.html#modules_the_module_wrapper)
by Node.js.

Another way of exporting modules is to assign the `module.exports` property a new value:

```js
// otherFileWithStuff.js
const objectWithStuffInside = {
  thing: 'stuff',
  otherThing: 'fib'
};

module.exports = objectWithStuffInside; // exposes the object, thingFromOtherFile
// or
module.exports = {
  thing: 'stuff',
  otherThing: 'fib'
};
```

Then when want to use the module from `otherFileWithStuff.js`:

```js
const stuff = require('./temp2');
console.log(stuff);
// { thing: 'stuff', otherThing: 'fib' }
```

### ECMAScript Modules

With Node.js and CommonJS, we are used to using `require()` to include modules.
ECMAScript modules are the official standard format to package JavaScript code
for reuse. In this system, modules are defined using `import` and `export` statements:

```js
// addTwo.mjs
function addTwo(num) {
  return num + 2;
}

export { addTwo };
```

```js
// app.mjs
import { addTwo } from './addTwo.mjs';

// Prints: 6
console.log(addTwo(4));
```

> Read more about [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) on MDN

## npm

`npm` stands for "Node Package Manager", and is the default package manager for Node.js.
This package manager lets you install other developers' modules as dependencies
in your project. This is a double-edged sword because although installing a package
can help avoid "reinventing the wheel", your code is beholden to another author's
security vulnerabilities and code cleanliness.

The `npm` website has a [list of CLI commands][npm-cli]
that are available, as well as a reference for [the `package.json`][package-json].
The `package.json` file describes the Node.js project and which packages are
needed as dependencies.

<!-- Links -->
[npm-cli]: https://docs.npmjs.com/cli-documentation/cli-commands
[package-json]: https://docs.npmjs.com/files/package.json

## The Event Loop

JavaScript's [concurrency model](https://en.wikipedia.org/wiki/Concurrency_(computer_science))
is based off an event loop. Understanding this helps us see how Node.js can be
asynchronous and have non-blocking I/O.

The Event Loop can be thought of simply in pseudocode:

```js
while (queue.waitForMessage()) {
  queue.processNextMessage()
}
```

### Runtime Concepts

There are three data structures that are used to understand how JavaScript runs:

- **Stack:** function calls form a _stack_ of frames. A frame contains the function's
arguments and local variables. For example, `methodA()` (where `methodA` calls `methodB`)
the first frame contains `methodA`'s args and variables, the second frame is `methodB`
its args/vars. When `methodB` returns/evaluates, it's popped off the stack, leaving
`methodA` left on the stack. When `methodA` returns, the stack is empty.
- **Heap:** objects are allocated in _heap_, a region of memory.
- **Queue:** a _queue_ contains messages, each message having an associated function
which is called in order to "handle" the message. Calling a new function creates
a new stack frame for that function's use. **Once the stack is empty, the next
message in the queue is processed.**

Each message is processed completely before another message is processed (_i.e._ "run-to-completion").

A downside of this model is that if a message takes too long to complete,
the web application is unable to process user interactions like click or scroll.
The browser mitigates this with the _"a script is taking too long to run"_ dialog.
A good practice to follow is to make message processing short and if possible
cut down one message into several messages.

It can be possible to have multiple runtimes communicating with each other. A
[web worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
or a cross-origin iframe has its own stack, heap, and message queue.
Two distinct runtimes can only communicate through sending messages via the
[`window.postMessage` method](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).
This method adds a message to the other runtime if the latter listens to message events.

### `process.nextTick`

Every time the event loop "completes", we call it a tick. "Completion" of the event
loop would indicate the message queue is empty, because the call stack is empty
and all messages have been processed to completion.

The `.nextTick()` method on the [`process` core module](https://nodejs.org/api/process.html)
is outside of the ordinary cycle of the event loop. `process.nextTick(callback)`
adds a provided callback function to be invoked before the next _tick_.

Further information:

- [The Node.js Event Loop, Timers, and process.nextTick()](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

### The Illusion of `setTimeout`

Messages are added to the queue anytime an event occurs with an event listener
attached to it. If there is no listener, the event is lost. For example, a click
on an element with a click event handler will add a message to the queue.

`setTimeout` is called with 2 arguments: a message to add to the queue, and a
time value. The time value represents the (minimum) delay before the message is
added to the queue. If there is no other message in the queue, and the stack is
empty, the message is processed right after the delay.

However, if there _are_ messages, the `setTimeout` message will have to wait for
other messages to be processed. For this reason, the second argument indicates
a minimum time, not a guaranteed time.
