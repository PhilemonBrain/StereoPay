## Description

A simple REST api using NestJs.

Note Please: Because of the issues encountered while setting up MySQL on my local dev and the time limitatio, i decided to use PostgesSQL instead. Please i sincerely apologize for the inconvenience.

## Installation

```bash
$ npm install
or
$ yarn install
```

## DB Setup

There is an .env.example in the root folder of this folder with the env variables needed to run this project.

## Running the app

The app will run on your localhost and port value in the env file or port 3000 by default.

```bash
# development
$ npm run start
or
$ yarn start

# watch mode
$ npm run start:dev
or
$ yarn start:dev

# production mode
$ npm run start:prod
of
$ yarn start:prod
```

## Documentation

This application is documented with swagger and the docs can viewed on http://localhost:{NODE_PORT}/api-doc
You can make requests from the swagger docs page or via postman.

Sorry for submitting this about a day late. I had an emergency that took a bit of my time.

Thanks
