# Simple Webhook

## Description
Just a docker image to make your project update automaticly when you push to your repository on git

## Usage
To use this image, first you should pull to your machine and run with some environment variables
```
docker pull miqdadyyy/simple_webhook
docker container run -d -p 8080:7777 -v /path/to/your/repository/:/repository/ -e GIT_USERNAME=yourgithubusername -e GIT_TOKEN=yourgithubtoken -e GIT_SOURCE=github.com --name project_git_webhook miqdadyyy/simple_webhook
```

## Environments
- HANDLER_PATH: path to your github webhook, default: /webhook
- HANDLER_SECRET: secret your github webhook, default: secret
- GIT_USERNAME: your github username if your repository private, default: git_username
- GIT_TOKEN: your git password or you can generate token in here ![https://github.com/settings/tokens], default: git_token
- GIT_SOURCE: your git management, ie: github.com, gitlab.com, etc. default: github.com
- GIT_REPOSITORY_REF: your repository ref for trigger to pull update, default: refs/heads/master
- GIT_REPOSITORY_REMOTE: your repository remote to update, default: origin
- GIT_REPOSITORY_BRANCH: repository branch to update, default: master
