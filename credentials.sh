echo "https://$GIT_USERNAME:$GIT_TOKEN@$GIT_SOURCE" > ~/.git-credentials
cd /repository && git config credential.helper store
