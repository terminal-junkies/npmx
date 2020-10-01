'use strict';

const blessed = require('blessed');
const getTheme = require('utils/getTheme');
const runCommand = require('utils/runCommand');
module.exports = function(screen) {
  const theme = getTheme();
  const footer = blessed.listbar({
    parent: screen,
    bottom: 0,
    left: 0,
    right: 0,
    height: 'shrink',
    mouse: true,
    keys: true,
    border: 'line',
    vi: true,
    style: theme.footer.style,
    commands: {
      search: {
        keys: ['/'],
        callback: function () {
          screen.render();
        },
      },
      quit: {
        keys: ['q'],
        callback: function () {},
      },
      audit: {
        keys: ['a'],
        callback: function () {
          runCommand(screen, 'npm audit');
        },
      },
      outdated: {
        keys: ['o'],
        callback: function () {
          runCommand(screen, 'npm outdated');
        },
      },
    },
  });

  return footer;
};
