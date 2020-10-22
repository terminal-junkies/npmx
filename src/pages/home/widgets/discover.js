'use strict';

const blessed = require('@blessed/neo-blessed');
const getTheme = require('../../../utils/getTheme');
const packageKeywords = require('../../../utils/packageKeywords');

module.exports = function (screen) {
  const theme = getTheme();

  const discover = blessed.list({
    parent: screen,
    top: '10%+1',
    left: '70%+1',
    width: '30%',
    height: '30%',
    label: ' Discover Packages',
    keys: true,
    vi: true,
    border: theme.taskList.border,
    style: theme.taskList.style,
  });

  discover.setItems(Object.keys(packageKeywords));
  return discover;
};
