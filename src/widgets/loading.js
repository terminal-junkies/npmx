'use strict';

const blessed = require('@blessed/neo-blessed');

module.exports = function (screen) {
  const loader = blessed.loading({
    parent: screen,
    border: 'line',
    height: 'shrink',
    width: 'half',
    top: 'center',
    left: 'center',
    tags: true,
    keys: true,
    hidden: true,
    vi: true,
  });

  return loader;
};
