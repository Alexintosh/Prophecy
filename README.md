<img src="https://github.com/Alexintosh/Ockham/blob/master/logo.jpg?raw=true" alt="Ockham logo">

<div align="center"><strong>Ockham</strong></div>
<br />

<b>Ockham</b> is the open-source mobile app development framework that makes it easy to build top quality native and progressive web apps with web technologies.

<b>Ockham</b> is based on [React](https://facebook.github.io/react/), [Cordova](https://cordova.apache.org/) and Onsenui component library.


## <a name="features"></a>Features

* Webpack setup including dev server and build process
* ES6 support with babel
* Boilerplate Tabbed interface
* <a href="https://facebook.github.io/jest/docs/">Jest testing suite</a>
* JavaScript Standard Style
* Test and Linting check before commit (husky)

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## TODO
- [ ] nvm support
- [ ] Redux
- [ ] Tests
- [ ] JavaScript Style Guide
- [ ] Example pages


## <a name="start"></a> Quick Start

1. Clone this repo using `git clone https://github.com/Alexintosh/Ockham`
2. Move to the appropriate directory: `cd Ockham`.<br />
3. Run `yarn install` in order to install dependencies and clean the git repo.<br />
   *At this point you can run `yarn start` to see the example app at `http://localhost:8080/`.*

## <a name="dev-server"></a>Dev server
The dev server builds your whole project through the webpack build pipeline and keeps the generated artifacts in its memory (bundled files are not saved to your disk). It automatically detects when something in your files has changed, builds the changed code with webpack and automatically reloads the browser window.

You can change the port on which the HTTP server listens and more dev server related options in the `webpack.config.js`.

[More on the webpack dev server](https://webpack.js.org/configuration/dev-server/)

## <a name="npm-commands"></a>NPM commands

* `yarn start`: Runs the dev server and opens the project in your standard browser
* `yarn build`: Builds the whole project and saves the resulting bundles in the `www` directory
* `yarn test`: Run tests using Jest
* `yarn test:watch`: Run tests using Jest in watch mode
* `yarn lint`: Run <a href="https://github.com/standard/standard">standard</a> to check JavaScript Standard Style 
* `yarn lint:fix`: Run <a href="https://github.com/standard/standard">standard</a> to check JavaScript Standard Style and fixes problem automatically
* `yarn validate`: Runs linting and testing in parallel for maximum efficiency (npm-run-all)

### Directory Tree

```
|____src
| |____app.js
| |____components
| | |____Toolbar.js
| |____containers
| | |____App
| | | |____app.js
| | |____ExamplePages
| | | |____TabPage.js
| |____index.html
|____www
|____hooks
|____platforms
|____plugins
|____webpack.config.js
|____config.xml
|____.babelrc
|____.git
|____.gitignore
|____.npmignore
```

<br />
