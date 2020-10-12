'use strict';

const blessed = require('@blessed/neo-blessed');
const getTheme = require('../../../utils/getTheme');

module.exports = function (screen) {
  const theme = getTheme();
  const message = blessed.message({
    parent: screen,
    height: 'shrink',
    width: 'half',
    top: 'center',
    left: 'center',
    label: ' {blue-fg}Package Info{/blue-fg} ',
    tags: true,
    keys: true,
    hidden: true,
    vi: true,
    border: theme.message.border,
    style: theme.message.style,
  });

  return message;
};
