# react-universal-boilerplate

## Requirements
- [NodeJS](https://nodejs.org/) ^6.4.0
- [RethinkDB](https://www.rethinkdb.com/) ^2.3.4

## Features

### Environment
[X] [Yarn](https://yarnpkg.com/) as package manager
[x] [Webpack 2](https://webpack.github.io/) as module bundler for client & server
[x] [Babel](https://babeljs.io/) for transpiling ES2016 and some proposed ESNext features
[x] [PM2](http://pm2.keymetrics.io/) for daemonizing in production
[x] [Typescript](http://www.typescriptlang.org)
[ ] Replace Nodemon with PM2 (for launching the dev server)
[ ] no longer use npm directly (blocked by run scripts not being fully supported by Yarn yet)

### Client side
[x] [React](https://facebook.github.io/react/)
[x] [React Router](https://github.com/ReactTraining/react-router) for universal routing
[x] [Redux](http://redux.js.org/) for managing application state
[x] [immutable](https://facebook.github.io/immutable-js/)
[ ] [ReactIntl](https://github.com/yahoo/react-intl) for i18n?

### Styling
[x] [PostCSS](http://postcss.org/) for advanced CSS features
[x] [CSS Modules](https://github.com/css-modules/css-modules) for styling React components
[x] [PreCSS](https://jonathantneal.github.io/precss/) for Sass-like CSS

### Server side
[x] [Koa@2](https://github.com/koajs/koa/tree/v2.x)
[x] [KoaRouter](https://github.com/alexmingoia/koa-router) for server side routing
[x] [RethinkDB](https://www.rethinkdb.com/) as realtime backend
[ ] Replace RethinkDB with
[x] React server-side renderer
[ ] [deepstream.io](deepstream.io) as realtime backend?

### Connectivity
[x] [Socket.io](http://socket.io/) for client/server connectivity

### Development
[ ] Docker dev environment
[x] [custom Webpack development server with hot reloading](https://github.com/cl1ck/webpack-hot-socket-server)
[x] [Depcheck](https://github.com/depcheck/depcheck) for dependency checking
[ ] npm-check-updates
[ ] Webpack DLL plugin

### Testing
[x] [Enzyme](http://airbnb.io/enzyme/) for component testing
[ ] Mocha
[ ] Chai
[ ] Sinon
[ ] WebdriverIO
[ ] Cucumber
[ ] Istanbul

### Code quality
[x] [ESLint](http://eslint.org/) for javascript linting
[ ] Stylelint
[ ] Husky
[ ] semver

## Setup
```
npm i -g yarn
NODE_ENV=development yarn install
yarn global add rethink-migrate pm2 nodemon node-inspector
```

## Production
To start the app in production run:
```
npm start
```

To use `pm2` to run and automatically restart the server, edit process.json and run:
```
pm2 start process.json
```

And to stop the daemonized server
```
pm2 stop rrr
```

## Development Workflow

Run the development toolset:
```
npm run dev
```
### The services are running at these ports by default
BrowserSync:              3030
Browsersync UI:           3031
Webpack dev server:       3000
Server:                   3001
Server Debugger:          5859
Node inspector:           8008

Open `http://localhost:3030` to start developing.

## Optional Development Tools
Install [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) and [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) extensions for Chrome.

## Dependency checking
To check your dependencies run
`npm run depcheck`

## Testing

### Unit and integration testing
This project uses mocha, chai, sinon, jsdom and enzyme for unit / integration testing.
Single test run:
`npm run test:unit`

Watch mode:
`npm run test:unit:watch`

### Acceptance testing:
For acceptance testing

If you get a timeout while running acceptance tests, it might be an issue with electron.
Try to run `DEBUG=nightmare npm run test:acceptance` or `node_modules/electron/dist/electron` for further analysis.

#### Acceptance testing on CI server:
To run electron on a headless CI server, Xvfb is required.
e.g. for [https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin](Jenkins)

## ESDoc
To generate documentation run
`npm run esdoc`
