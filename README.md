
<h1 align="center">
    Web Portal - Frontend 
</h1>

<p align="center">
  <a href="#about">About</a> •
  <a href="#development">Development</a> 
</p>

## About

This repository contains the source code of the Self-Sovereign Identity for Web Portal Frontend.

The SSI Web Portal Frontend are responsible accessing for organizations. The Web Portal  can be used for managing users, creating digital signature for their organization, the  retreiving 

## Development

### Prerequisites

- For development, the latest version of Node.js is required. The latest version can be downloaded from [here](https://nodejs.org/en/download/).

#### Start Service

    
    # install yarn
    $ npm install --global yarn
    
    # install dependencies
    $ yarn install
    
    # copy env
    $ cp .env.example .env
    
    # serve with hot reload at localhost:8000
    $ yarn dev
    
    # build for production and launch server
    $ yarn build
    $ yarn start
