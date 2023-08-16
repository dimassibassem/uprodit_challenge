#!/bin/bash

GITLAB_REMOTE_NAME="gitlab"
BRANCH_NAME="master"

cd $GITHUB_WORKSPACE
git pull origin $BRANCH_NAME
git reset --hard origin/$BRANCH_NAME
git push -f $GITLAB_REMOTE_NAME $BRANCH_NAME
exit 0