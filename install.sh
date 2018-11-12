#!/bin/bash

Init() {
    sudo npm i -g create-react-app

    create-react-app client
    cd 'client'
    npm i -S axios

    rm \
        'src/App.css' \
        'src/App.test.js' \
        'src/index.css' \
        'src/logo.svg'
}

Init
