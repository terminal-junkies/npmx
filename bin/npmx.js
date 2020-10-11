#!/usr/bin/env node

const moduleAlias = require('module-alias');

moduleAlias.addAliases({
  '@root': __dirname + '/..',
  '@utils': __dirname + '/../src/utils',
});

const app = require('../src/index');

app();
