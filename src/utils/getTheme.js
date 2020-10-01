'use strict';

const options = require('minimist')(process.argv.slice(2));

module.exports = function () {
  const scheme = options.theme || 'Dracula';
  const colors = require(`blessed-themes/themes/${scheme}`);
  const theme = require('../styles')(colors.colors);
  return theme;
};
