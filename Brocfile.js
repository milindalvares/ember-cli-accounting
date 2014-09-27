var makeModules = require('broccoli-dist-es6-module');
var moveFile    = require('broccoli-file-mover');


var accounting = makeModules('src', {
  global: 'accounting',
  packageName: 'accounting',
  main: 'accounting'
});

accounting = moveFile(accounting, {
  files: {
    '/globals/main.js': '/globals/accounting.js',
    '/named-amd/main.js': '/named-amd/accounting.js',
  }
});

module.exports = accounting;
