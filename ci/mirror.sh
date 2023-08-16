#!/bin/bash

REPO_PATH="${PROJECT_HOME}/uprodit_challenge/"

cd "${REPO_PATH}" && git pull origin master || :
git reset --hard origin/master
git push -f gitlab master
exit 0
