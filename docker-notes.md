# Docker Notes

## Table of Contents

- [Why Docker?](#why-docker)
- [Getting Started Tutorial](#getting-started-tutorial-notes)
- [Terminology](#terminology)
- [Useful Commands](#useful-commands)

## Why Docker?

Let's say we've built an application using language `x` that runs on an operating
system called `y`. We want to share this app with our friend, but they are running
and entirely different system (hardware and operating system). The problem becomes:

_**How do we replicate the environment our software needs, on any machine?**_

One common way to solve this problem was to package an app with a virtual machine.
in a virtual machine (VM), the hardware is simulated, then installed with the
required operating system and dependencies. This allows us to run multiple apps
on the same infrastructure. However, because each VM is running its own operating
system, they tend to be bulky and slow. This is where Docker comes in.

A [Docker container](#what-is-a-container) is conceptually similar to a VM, with
a key difference. Instead of virtualizing hardware, containers virtualize the
operating system. This means that all containers are run by a single kernel
(_i.e._ multiple apps share a kernel within the container). This is a lot faster
and efficient compared to the VM approach.

## Getting Started Tutorial Notes

### Step 1

First, clone the `getting-started` repository:

```zsh
git clone https://github.com/docker/getting-started.git
```

### Step 2

Build a Docker image:

```zsh
cd getting-started
docker build -t docker101tutorial .
```

The `-t` (or `--tag`) flag here is used to "_Name and optionally a tag in the ‘name:tag’ format_".

> Name and optionally a tag in the ‘name:tag’ format
> A Docker image is a private file system just for your container. It provides
> all the files and code your container needs.

### Step 3

Run the container based on the image built in the previous step:

```zsh
docker run -d -p 80:80 --name docker-tutorial docker101tutorial
```

Flags | Meaning
--- | ---
`-d` | Also known as `--detach`, this run the container in the background ("detached mode") and prints the container's ID
`-p` | Also known as `--publish`, this publishes a container's port(s) to the host
`--name` | Assigns a name to the container. In this case, it's "docker-tutorial"
`dockertutorial` | `docker run` creates a writeable container layer over this image

> Running a container launches your application with private resources, securely
> isolated from the rest of your machine.

To list all containers, you can run:

```zsh
docker ps -a
```

### Step 4a

Tag the Docker image:

```zsh
docker tag docker101tutorial aztechdev/docker101tutorial
```

```zsh
docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
```

> Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
> You can group your images together using names and tags, and then upload them
> to [Share images on Docker Hub](https://docs.docker.com/get-started/part3/).

### Step 4b

Share the image to Docker Hub:

```zsh
docker push aztechdev/docker101tutorial
```

```zsh
docker push [OPTIONS] NAME[:TAG]
```

> Push an image or a repository to a registry

## Terminology

### What is a Container?

A **container** is another process on your machine that has been isolated from all
other processes on the host machine. That isolation leverages
[kernel namespaces and cgroups](https://medium.com/@saschagrunert/demystifying-containers-part-i-kernel-space-2c53d6979504),
features that have been in Linux for a long time.

[Deep Dive Video - Creating Containers from Scratch](https://youtu.be/8fi7uSYlOdc)

### What is a Container Image?

When running a container, it uses an isolated filesystem. This custom filesystem
is provided by a **container image**. Since the image contains the container's
filesystem, it must contain everything needed to run an application - all
dependencies, configuration, scripts, binaries, etc. The image also contains
other configuration for the container, such as environment variables, a default
command to run, and other metadata.

The image is a snapshot of your software, along with all of its dependencies
down to the operating system level. The image is **immutable**, and can be used
to set up multiple containers, which is your software running in the real world.

### What is a Dockerfile?

A `Dockerfile` is a text document that contains all the commands a user could
call on the command line to assemble an image. Using `docker build` users can
create an automated build that executes several command-line instructions in
succession.

#### Example Dockerfile

```Dockerfile
FROM ubuntu:20.04

RUN apt-get install sl

ENV PORT=8080

CMD ["echo", "Docker is cool 🐳"]
```

The first line makes use of the `FROM` command to use an existing image template.
In this case, it pulls down an [Ubuntu image](https://hub.docker.com/_/ubuntu)
from Docker Hub.

The `RUN` command runs a terminal command in the container. In this case, it installs
the `sl` command in our Ubuntu environment. We can set environment variables using
the `ENV` command (in this case, `PORT=8080`).

Finally, we use the `CMD` command to run a default command when we start up a
container.

## Useful Commands

The getting started command:

```zsh
docker run -d -p 4000:80 docker/getting-started
```

In this case, port `80` of the container is bound to port `4000` on the host machine.
This means that port `80` in the container can be seen/exposed on `localhost:4000` on
my machine.

Check what is using port 80:

```zsh
netstat | grep 80
```

or

```zsh
sudo lsof -i -P -n | grep 80
```

```zsh
docker images -a
docker image ls
docker container ls
docker ps -a
```

Remove all images:

```zsh
docker rmi $(docker images -a -q)
```
