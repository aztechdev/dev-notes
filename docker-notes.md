# Docker Notes

## Table of Contents

- [Getting Started Tutorial](#getting-started-tutorial-notes)
- [Terminology](#terminology)
- [Useful Commands](#useful-commands)

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

### What is a Container

A **container** is another process on your machine that has been isolated from all
other processes on the host machine. That isolation leverages
[kernel namespaces and cgroups](https://medium.com/@saschagrunert/demystifying-containers-part-i-kernel-space-2c53d6979504),
features that have been in Linux for a long time.

[Deep Dive Video - Creating Containers from Scratch](https://youtu.be/8fi7uSYlOdc)

### What is a Container Image

When running a container, it uses an isolated filesystem. This custom filesystem
is provided by a **container image**. Since the image contains the container's
filesystem, it must contain everything needed to run an application - all
dependencies, configuration, scripts, binaries, etc. The image also contains
other configuration for the container, such as environment variables, a default
command to run, and other metadata.

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
