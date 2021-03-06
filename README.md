# react-universal-boilerplate

## Requirements
- [NodeJS](https://nodejs.org/) ^6.4.0
- [RethinkDB](https://www.rethinkdb.com/) ^2.3.4

## Features

### Environment
[X] [pnpm](https://pnpm.js.org/) as package manager
[x] [Webpack 2](https://webpack.github.io/) as module bundler for client & server
[x] [Babel](https://babeljs.io/) for transpiling ES2016 and some proposed ESNext features
[x] [PM2](http://pm2.keymetrics.io/) for daemonizing in production
[x] [Typescript](http://www.typescriptlang.org)

### Client side
[x] [React](https://facebook.github.io/react/)
[x] [React Router](https://github.com/ReactTraining/react-router) for universal routing
[x] [Redux](http://redux.js.org/) for managing application state
[x] [immutable](https://facebook.github.io/immutable-js/)

### i18n
[x] [ReactIntl](https://github.com/yahoo/react-intl) for i18n

### Styling
[x] [PostCSS](http://postcss.org/) for advanced CSS features
[x] [CSS Modules](https://github.com/css-modules/css-modules) for styling React components
[x] [PreCSS](https://jonathantneal.github.io/precss/) for Sass-like CSS

### Server side
[x] [Koa@2](https://github.com/koajs/koa/tree/v2.x)
[x] [KoaRouter](https://github.com/alexmingoia/koa-router) for server side routing
[x] [RethinkDB](https://www.rethinkdb.com/) as realtime backend
[x] React server-side renderer

### Connectivity
[x] [Socket.io](http://socket.io/) for client/server connectivity

### Development
[ ] Docker dev environment
[x] [custom Webpack development server with hot reloading](https://github.com/cl1ck/webpack-hot-socket-server)
[x] [Depcheck](https://github.com/depcheck/depcheck) for dependency checking
[x] npm-check-updates
[ ] Webpack DLL plugin

### Testing
[x] [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/), [Sinon](http://sinonjs.org/) for unit testing
[x] [Enzyme](http://airbnb.io/enzyme/) and [Chai Jest Snapshot](https://github.com/suchipi/chai-jest-snapshot) for snapshot testing react components
[x] [Nightmare JS](http://www.nightmarejs.org/) for acceptance testing
[x] [Istanbul](https://istanbul.js.org/) for coverage reporting

### Code quality
[x] [ESLint](http://eslint.org/) for javascript linting
[x] [Stylelint](https://stylelint.io/) for PostCSS linting
[x] [Husky](https://github.com/typicode/husky) for enforcing code quality on commit
[ ] semver

## Setup
```
npm i -g pnpm
NODE_ENV=development pnpm install
pnpm install -g rethink-migrate pm2 node-inspector
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

## Development workflow

Run the development toolset:
```
pnpm run dev
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
`pnpm run depcheck`

## Testing

### Unit and integration testing
This project uses mocha, chai, sinon, jsdom and enzyme for unit / integration testing.
Single test run:
`pnpm run test:unit`

Watch mode:
`pnpm run test:unit:watch`

### Acceptance testing:
For acceptance testing

If you get a timeout while running acceptance tests, it might be an issue with electron.
Try to run `DEBUG=nightmare pnpm run test:acceptance` or `node_modules/electron/dist/electron` for further analysis.

#### Acceptance testing on CI server:
To run electron on a headless CI server, Xvfb is required.
e.g. for [https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin](Jenkins)

Make sure you export the `DISPLAY` to use.

## Linting
`npm run lint` will run prettier-eslint and then check the output with eslint

## ESDoc
To generate documentation run
`pnpm run esdoc`

## i18n
Configure your languages in `src/client/i18n`
Extract messages from your react components: `pnpm run translate`
This will generate JSON files in `src/translations` for each language.
After translating all messages, don't forget to rebuild the bundle.