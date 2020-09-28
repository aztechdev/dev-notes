# Go

Go is a statically typed, compiled programming language. The language is
syntactically similar to C, but with memory safety, garbage collection,
structural typing, and [[CSP-style] concurrency](https://en.wikipedia.org/wiki/Communicating_sequential_processes).

The designers of Go where motivated by their dislike of C++, and wanted Go to
have the following characteristics:

- Static typing and run-time efficiency (like C++)
- Readability and usability (like Python or JavaScript)
- High-performance networking and multiprocessing

Therefore, they wanted simplicity, concurrency, and automatic memory management.

## Table of Contents

- [What Makes Go Different?](#what-makes-go-different)
- [Getting Started](#getting-started)
- [Useful Commands](#useful-commands)

Useful Links | Description
--- | ---
[Go Standard Library Packages](https://golang.org/pkg/) | List of packages installed with Go
[`go` Commands](https://golang.org/cmd/go/) | List of Go commands that can be run on the command line
[pkg.go.dev](https://pkg.go.dev/) | Site to search for community Go packages
[Go Playground](https://play.golang.org/) | Browser-based space to runs Go code
[A Tour of Go](http://tour.golang.org/) | Interactive website for learning Go

---

## What Makes Go Different?

- Built-in concurrency primitives: light-weight processes (goroutines),
channels, and the `select` statement
- An interface system in place of virtual inheritance, and type embedding
instead of non-virtual inheritance
- A toolchain that, by default, produces statically linked native binaries
without external dependencies
- A syntax and environment adopting patterns more common in dynamic languages
- Optional concise variable declaration and initialization through type inference
(`x := 0` instead of `int x = 0;` or `var x = 0;`)
- Fast compilation
- Remote package management (`go get`) and online package documentation
- [Deliberate omissions](https://en.wikipedia.org/wiki/Go_(programming_language)#Omissions)

Further information:

- [_The Go Language: What Makes it Different?_ - Jay McGavren](https://youtu.be/FEFXjRoac_U)

### Advantages

If you know C, then the syntax of Go is easy to understand. The standard library
that comes with Go provides a lot of functionality.

Go has a limited feature set, which keeps the language simple. It has only 25 keywords,
which is quite small. Go only has functions and types, no classes, no type inheritance.

Like JavaScript, functions are [first-class citizens](https://en.wikipedia.org/wiki/First-class_citizen),
meaning that they can be passed around and manipulated like strings and integers.

Go is very fast, and part of that is supporting concurrency by default. The built-in
garbage collection also gives it more reliability. Go is also a cross-platform
language, it can be compiled on your machine and run anywhere by generating binaries.

Go is a very robust language because it does not update very often, and the community
tries to keep the feature set from bloating. So far there are no breaking changes,
meaning backwards compatibility is possible.

Go has a built in package manager, testing framework, and concurrency model. It is
also maintained/backed by Google, which makes it a mature and viable option for
use.

### Disadvantages

There is typically one way to do something, which can be seen as a downside,
despite supporting simplicity.

Since Go is quite new, there are a lot of 3rd party modules that you may be used
to that may be missing.

Some would find the deviation from traditional C-based languages as a downside.
Oftentimes you have to shift your thinking to the "Go way" of doing things. Some
may find it harder to read than other languages like Python.

This has been resolved in recent releases, but an older complaint was Go's error
handling and lack of generics.

## Concurrency in Go

Go is built with concurrency in mind, and this is leveraged using Goroutines and
channels (which are primitives in the language).

> Making progress on more than one task simultaneously is known as concurrency.

A goroutine is a function that is capable of running concurrently with other functions.

Channels provide a way for two goroutines to communicate with one another and synchronize their execution.

Further information:

- [_Concurrency is not Parallelism_ - Rob Pike](https://youtu.be/oV9rvDllKEg)
- [_Goroutines & Channels_ - Caleb Doxsey](https://www.golang-book.com/books/intro/10)
- [Concurrency vs. Parallelism](https://youtu.be/FChZP09Ba4E)

## Getting Started

This is paraphrased from the [tutorial on golang.org](https://golang.org/doc/tutorial/getting-started).

```golang
// hello.go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

In this code we declare a package called `main`. A package is a way to group
functions. Then, we import the [`fmt` package](https://golang.org/pkg/fmt/),
which has functions for formatting text and printing to the console. We declare
the `main` function using the `func` keyword, and inside we use `fmt.Println` to
print a message to the console.

If we want to use code from an external package, we can look one up on [pkg.go.dev](https://pkg.go.dev/)
and copy the path name:

```golang
package main

import (
    "fmt"
    "rsc.io/quote"
)

func main() {
    fmt.Println("Hello, World!")
    fmt.Println(quote.Go())
}
```

In order to use/install this module, we need to make a `go.mod` file. This file
lists the specific modules and versions for the packages you want to use. We can
create this file using the `go mod init` command, and using `hello` as the module
name:

```zsh
$ go mod init hello
go: creating new go.mod: module hello
```

The inside of the `go.mod` file looks something like this:

```fundamental
module hello

go 1.15

require rsc.io/quote v1.5.2
```

If we wanted to add more packages later on, to update our `go.mod` file we run
`go mod tidy` to match the source code and remove an unused modules.

## Useful Commands

Command | Description
--- | ---
`go help` | Prints many of the commands below to the terminal
`go version` | Prints the version of Go to the terminal
`go run hello.go` | Runs the `hello.go` file
`go build` | Compiles the packages named by the import paths, along with their dependencies, but it does not install the results. Can use this to make an executable
`go install` | Compiles and installs the packages named by the import paths
`go get` | Resolves and adds dependencies to the current development module and then builds and installs them
`go fmt` | Formats files and prints out which files were modified

<!-- Learn Go in 12 Minutes: https://youtu.be/C8LgvuEBraI -->
<!-- Concurrency in Go: https://youtu.be/LvgVSSpwND8 -->