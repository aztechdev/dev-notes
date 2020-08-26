# Docker Notes

## Gettings Started Tutorial Notes

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

> Running a container launches your application with private resources, securely
> isolated from the rest of your machine.

### Step 4a

Tag the Docker image:

```zsh
docker tag docker101tutorial aztechdev/docker101tutorial
```

### Step 4b

Share the image to Docker Hub:

```zsh
docker push aztechdev/docker101tutorial
```

## Useful Commands

The getting started command:

```zsh
docker run -d -p 4000:80 docker/getting-started
```

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
```

Remove all images:

```zsh
docker rmi $(docker images -a -q)
```
