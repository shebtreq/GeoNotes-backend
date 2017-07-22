#!/usr/bin/env bash

#check and install homebrew
which -s brew
if [ ! -f "`which brew`" ] ; then
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
else
    brew update
fi

#install node
brew install node

#install npm packages
npm install

#install mongodb
brew update
brew install mongodb
mkdir -p data/db
