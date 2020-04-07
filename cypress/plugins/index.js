/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const webpack = require('@cypress/webpack-preprocessor')
module.exports = (on, config) => {

  // on('before:browser:launch', (browser = {}, launchOptions) => {

  //   // if (browser.name === 'chrome') {
  //   //   arr = launchOptions.args
  //   //   arr.forEach(function(item, i) { if (item.includes('--remote-debugging-port')) arr[i] = '--remote-debugging-port=61234'; });
  //   //   launchOptions.args = arr
  //   //   console.log(launchOptions.args)

  //   //   // // whatever you return here becomes the new args
  //   //   return launchOptions
  //   // }
 
  // })
  const options = {
    // send in the options from your webpack.config.js, so it works the same
    // as your app's code
    webpackOptions: require('../../webpack.config'),
    watchOptions: {}
  }

  on('file:preprocessor', webpack(options))

  on('before:browser:launch', (browser = {}, launchOptions) => {
    // `args` is an array of all the arguments that will
    // be passed to browsers when it launches

    if (browser.family === 'chromium' && browser.name !== 'electron') {
      // see: https://github.com/cypress-io/cypress/issues/3633
      launchOptions.args.push('--disable-dev-shm-usage');

      // whatever you return here becomes the launchOptions
      return launchOptions;
    }
  });

}




