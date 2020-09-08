# Nodejs.dev Learn Notes

Notes are created based off of the [Node.js learning site](https://nodejs.dev/learn).

Node.js is supported by the [OpenJS Foundation](https://openjsf.org/).

Useful Links | Description
--- | ---
[Node.js API Documentation](https://nodejs.org/api/) | Index of Node.js API docs
[HTTP Response Code - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) | Docs on status codes on MDN
[httpstatuses.com](https://httpstatuses.com/) | Another response code index
[HTTP Headers - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) | Reference list of HTTP headers
[MIME/Media Types - IANA][mime-types] | List of valid media types for a resource
[EcmaScript Modules - Node](https://nodejs.org/api/esm.html) | Docs on ESM
[nvm](https://github.com/nvm-sh/nvm) | Node Version Manager

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
