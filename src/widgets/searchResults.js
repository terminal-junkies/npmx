'use strict';

const blessed = require('@blessed/neo-blessed');
const getTheme = require('../utils/getTheme');

module.exports = function (screen) {
  const theme = getTheme();
  const searchResults = blessed.list({
    parent: screen,
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    label: ' Search Results ',
    keys: true,
    vi: true,
    style: theme.searchResults.style,
    border: theme.searchResults.border,
    hidden: true,
  });

  return searchResults;
};
