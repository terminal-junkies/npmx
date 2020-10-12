'use strict';

module.exports = function () {
  let pkg = {
    scripts: {},
    devDependencies: {},
    dependencies: {},
  };

  try {
    pkg = require(process.cwd() + '/package.json');
  } catch (e) {
    // throw error
  }

  return pkg;
};
