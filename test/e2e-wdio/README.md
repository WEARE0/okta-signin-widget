# Manually running E2E tests

**Note:** Before the repos is transformed into a yarn workspace, the test should be run in the root directory of the repo.

// TODO: https://oktainc.atlassian.net/browse/OKTA-437720

## Define environment variables

See `test/e2e-wdio/env.defaults.js` for a list of all environment variables used by E2E tests. You can define variables in the shell (using `export VAR=value` in `~/.bash_profile` or similar) or place values in a `testenv` file at the root of this project. [dotenv docs](https://github.com/motdotla/dotenv#dotenv)

For all E2E tests to pass locally, you will need to define these values. You will need a test org and a FB user.

The test org should have a configured SPA app with following login redirect callbacks:

```sh
http://localhost:3000/done
```

Each of this origins must be added as 'Trusted Origins'.  

The test org should have at least one 'basic' user available for testing.

## Run tests with runner script

The runner script (./runner.js) starts the test app then runs specs against the test app.

```sh
yarn test:e2e:wdio
```

## Run test app and specs separately

### Start test server

```sh
yarn start:test:app
```

### Run specs against the test server

```sh
npx wdio ./test/e2e-wdio/wdio.conf.js
```

## Debugging

**Note:** If you are using vscode, pick `Debug with WebdriverIO` for debugging. You may want to change the specs filter in wdio.conf.js to limit the debugging scope.

For more debugging information, check out [WebdriverIO debugging](https://webdriver.io/docs/debugging/).
