# AzureSQLChatGPTDemo

This is a demo application base on https://github.com/bytebase/sqlchat

What is modified:
* Modified original connector to process SSL connect
* Translate most of the page to Chinese
* Add a sample mysql database (Azure MySQL flexible server) connection
* Some sample data
* Connect to Azure OpenAI instead of OpenAI

## How to run on your local server

### Prepare dependencies

Install pnpm:

**On Windows:**
```powershell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

**On Linux:**
```bash
# bash
wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
# sh
wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -
# dash
wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.dashrc" SHELL="$(which dash)" dash -
```

Run ```pnpm dev``` to start development server

## Run in docker container

Run
```bash
docker build -t azure-sql-chat-demo:v1.0 -f ./Dockerfile
docker run -p 127.0.0.1:3001:3000/tcp azure-sql-chat-demo:v1.0 --env <see .env.example file for environment variables> 
```

## How to run in Azure App Service

1. Create Azure App Service with Linux container, choose Azure Container Registry or Docker Hub as the container source.
2. Push the image to ACR/Docker Hub
3. Configure application environment variables in App Service configuration page.