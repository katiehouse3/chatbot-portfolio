# AI Chatbot Protfolio 🤖   
Portfolio chatbot


### Building backend locally
Building the docker container:
```zsh
docker build -t backend  -f Dockerfile.backend .
```
Running the docker container locally:
```zsh
docker run -p 8000:8000 backend 
```

### Building the frontend locally
Building the docker container:
```zsh
docker build -t frontend  -f Dockerfile.frontend .
```
Running the docker container locally:
```zsh
docker run -p 1234:1234 frontend 
```

Or simply:
```zsh
docker compose up
```