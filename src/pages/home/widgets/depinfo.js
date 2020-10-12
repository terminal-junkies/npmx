'use strict';

const blessed = require('@blessed/neo-blessed');

module.exports = function (screen) {
  const message = blessed.message({
    parent: screen,
    border: 'line',
    height: 'shrink',
    width: 'half',
    top: 'center',
    left: 'center',
    label: ' {blue-fg}Package Info{/blue-fg} ',
    tags: true,
    keys: true,
    hidden: true,
    vi: true,
  });

  return message;
};
