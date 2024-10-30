#!/bin/bash

# Variables
SERVER="kenny@162.243.11.209"
SSH_KEY="~/.ssh/pulumi/id_rsa"
LOCAL_PATH="./site/index.html"
REMOTE_PATH="/var/www/html/"

# Deploy function
deploy() {
    echo "🚀 Deploying to server..."
    rsync -avz --delete -e "ssh -i $SSH_KEY" $LOCAL_PATH $SERVER:$REMOTE_PATH

    if [ $? -eq 0 ]; then
        echo "✅ Deployment successful!"
    else
        echo "❌ Deployment failed!"
        exit 1
    fi
}

deploy
