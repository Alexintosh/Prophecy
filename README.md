<img src="https://github.com/Alexintosh/Prophecy/blob/master/logo.jpg?raw=true" alt="Ockham logo">

<div align="center"><strong> Prophecy </strong></div>
<br />

 The first open-source mobile wallet for the NEO blockchain  .

 Crossplatform both <b>iOs</b> and <b>Android</b> are supported!

<b>Prophecy</b> is based on Ockham a mobile app framework based on [React](https://facebook.github.io/react/), [Cordova](https://cordova.apache.org/) and Onsenui component library.

<img src="https://github.com/Alexintosh/Prophecy/blob/feature/SendAsset/screenshots/ScreenShot2.png?raw=true" alt="Dashboard" width="200"><img src="https://github.com/Alexintosh/Prophecy/blob/feature/SendAsset/screenshots/ScreenShot4.png?raw=true" alt="Ockham logo" width="200"><img src="https://github.com/Alexintosh/Prophecy/blob/feature/SendAsset/screenshots/ScreenShot1.png?raw=true" alt="Ockham logo" width="200"><img src="https://github.com/Alexintosh/Prophecy/blob/feature/SendAsset/screenshots/ScreenShot3.png?raw=true" alt="Ockham logo" width="200">
## <a name="features"></a>Features

- [X] Transaction History
- [X] Claim Gas
- [X] Switch Net
- [X] Send NEO
- [X] Send GAS

## <a name="features"></a>Roadmap v2
- [ ] QRcode
- [ ] Fingerprint
- [ ] Create New Wallet
- [ ] Pin based authentification

#### Dev Features
* Webpack setup including dev server and build process
* ES6 support with babel
* <a href="https://facebook.github.io/jest/docs/">Jest testing suite</a>
* JavaScript Standard Style
* Test and Linting check before commit (husky)
* nvm support
* Redux
* Styled Components

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)


## <a name="start"></a> Quick Start

1. Clone this repo using `git clone https://github.com/Alexintosh/Prophecy`
2. Move to the appropriate directory: `cd Prophecy`.<br />
3. Run `yarn install` in order to install dependencies and clean the git repo.<br />
   *At this point you can run `yarn start` to see the example app at `http://localhost:8080/`.*

## <a name="dev-server"></a>Dev server
The dev server builds your whole project through the webpack build pipeline and keeps the generated artifacts in its memory (bundled files are not saved to your disk). It automatically detects when something in your files has changed, builds the changed code with webpack and automatically reloads the browser window.

You can change the port on which the HTTP server listens and more dev server related options in the `webpack.config.js`.

[More on the webpack dev server](https://webpack.js.org/configuration/dev-server/)

## <a name="npm-commands"></a>NPM commands

* `yarn start`: Runs the dev server and opens the project in your standard browser
* `yarn build`: Builds the whole project and saves the resulting bundles in the `www` directory
* `yarn run-android`: Builds the whole project and deploy on device or simulator
* `yarn resources`: Automatically generates splashscreen and icon from `resources`
* `yarn test`: Run tests using Jest
* `yarn test:watch`: Run tests using Jest in watch mode
* `yarn lint`: Run <a href="https://github.com/standard/standard">standard</a> to check JavaScript Standard Style 
* `yarn lint:fix`: Run <a href="https://github.com/standard/standard">standard</a> to check JavaScript Standard Style and fixes problem automatically
* `yarn validate`: Runs linting and testing in parallel for maximum efficiency (npm-run-all)


## How can I support the developer?
- Star the GitHub repo :star:
- Create pull requests, submit bugs, suggest new features or documentation updates :wrench:
- Follow me on [Twitter](https://twitter.com/alexintosh) :feet:
- Donate NEO/GAS at `ARTPi8cJaBQbLxJPTa5wn5RrVZFhC7BwsM` 

## Can I hire you?
Yes!  Ping me on [Twitter](https://twitter.com/alexintosh) or get in touch by [mail](mailto:alessio.d@gmail.com)
I will be happy to work with you!

### Directory Tree

```
|____app.js
|____components
| |____.DS_Store
| |____AccountInfo.js
| |____Balance.js
| |____BalanceChart.js
| |____If.js
| |____Loading.js
| |____PublicKeyList.js
| |____PublicKeyListItem.js
| |____Separator.js
| |____Toolbar.js
| |____TransactionItem.js
| |____TransactionList.js
|____containers
| |____.DS_Store
| |____App
| | |____actions.js
| | |____app.js
| | |____constants.js
| | |____reducer.js
| |____Login
| | |____actions.js
| | |____constants.js
| | |____Login.js
| | |____reducer.js
| |____Wallet
| | |____actions.js
| | |____constants.js
| | |____MainTab.js
| | |____reducer.js
| | |____SendTab.js
| | |____TabsContainer.js
| | |____TransactionTab.js
|____env
|____globalStyles.js
|____index.html
|____reducers.js
|____store.js
|____theme.css
|____utils
| |____CryptoCompareApi.js
| |____LocalStorage.js
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
