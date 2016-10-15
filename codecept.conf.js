// https://dahianlamindakide.ayriyazilir.com/

'use strict';

exports.config = {
  tests: './tests/*.test.js',
  timeout: 10000,
  output: './output',
  helpers: {
    WebDriverIO: {
      url: 'http://127.0.0.1:6869',
      browser: process.profile || 'chrome',
      window_size: '1920x1080',
      logLevel: 'silent',
      coloredLogs: true
    }
  },
  include: {
    I: './tests/steps_file.js'
  },
  bootstrap: './tests/bootstrap.js',
  teardown: false,
  mocha: {
    reporterOptions: {
        reportDir: 'output'
    }
  },
  name: 'dahianlamindakide'
};
