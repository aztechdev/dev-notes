# Go

Go is a statically typed, compiled programming language. The language is
syntactically similar to C, but with memory safety, garbage collection,
structural typing, and [[CSP-style] concurrency](https://en.wikipedia.org/wiki/Communicating_sequential_processes).

The designers of Go where motivated by their dislike of C++, and wanted Go to
have the following characteristics:

- Static typing and run-time efficiency (like C++)
- Readability and usability (like Python or JavaScript)
- High-performance networking and multiprocessing

## What Makes Go Different?

- Built-in concurrency primitives: light-weight processes (goroutines),
channels, and the `select` statement
- An interface system in place of virtual inheritance, and type embedding
instead of non-virtual inheritance
- A toolchain that, by default, produces statically linked native binaries
without external dependencies

A syntax and environment adopting patterns more common in dynamic languages

- Optional concise variable declaration and initialization through type inference
(`x := 0` instead of `int x = 0;` or `var x = 0;`)
- Fast compilation
- Remote package management (`go get`) and online package documentation

[Deliberate omissions](https://en.wikipedia.org/wiki/Go_(programming_language)#Omissions)

## Useful Commands

```zsh
go version
```

```zsh
go get
```

## Useful Links

- [Go - Wikipedia](https://en.wikipedia.org/wiki/Go_(programming_language)#Omissions)