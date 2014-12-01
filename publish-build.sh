#!/usr/bin/env bash

echo "Building standalone library..."
cd standalone
rm -rf dist
../node_modules/.bin/broccoli build dist

git config --global user.email "dray@envylabs.com"
git config --global user.name "Dray Lacy"

# The repository we are going to work with.
COMPONENTS_REPO_SLUG="IvyApp/components-ivy-codemirror"

# The user who is associated with GH_TOKEN.
USER="omghax"

echo -e "COMPONENTS_REPO_SLUG: ${COMPONENTS_REPO_SLUG}\n"
echo -e "CURRENT_BRANCH: ${TRAVIS_BRANCH}\n"

# Set channel to publish to. If no suitable branch is found exit successfully.
case $TRAVIS_BRANCH in
  "master" )
    CHANNEL="canary" ;;
  "beta" )
    CHANNEL="beta" ;;
  "stable" )
    CHANNEL="release" ;;
  "release" )
    CHANNEL="release" ;;
  * )
    echo "Not a bower release branch. Exiting!"
    exit 0 ;;
esac
echo -e "CHANNEL: ${CHANNEL}\n"

# Sending output to /dev/null to prevent GH_TOKEN leak on error.
git clone --branch ${CHANNEL} https://${USER}:${GH_TOKEN}@github.com/${COMPONENTS_REPO_SLUG}.git bower_ivy_tabs &> /dev/null
rm -rf bower_ivy_tabs/*
cp -R dist/* bower_ivy_tabs/
cd bower_ivy_tabs
git remote rm origin

# Sending output to /dev/null to prevent GH_TOKEN leak on error.
git remote add origin https://${USER}:${GH_TOKEN}@github.com/${COMPONENTS_REPO_SLUG}.git &> /dev/null
git add -A
git commit -m "Bower auto-build for https://github.com/IvyApp/ivy-codemirror/commits/${TRAVIS_COMMIT}."

# Sending output to /dev/null to prevent GH_TOKEN leak on error.
git push -fq origin ${CHANNEL} &> /dev/null
echo -e "Done\n"
