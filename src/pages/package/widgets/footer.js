'use strict';

const blessed = require('@blessed/neo-blessed');
const getTheme = require('@utils/getTheme');

module.exports = function (screen, pkg) {
  const packageName = pkg.name;
  const theme = getTheme();

  function runCommand(cmd) {
    const {
      terminal: { border, style },
    } = theme;
    const terminal = blessed.terminal({
      parent: screen,
      top: 'center',
      left: 'center',
      width: '50%',
      height: '50%',
      border,
      style,
      label: cmd,
      fullUnicode: true,
      screenKeys: false,
      cwd: process.env.PWD,
    });
    screen.append(terminal);
    screen.render();
    terminal.focus();

    terminal.key('escape', function () {
      terminal.detach();
    });

    terminal.pty.write(`${cmd}\r\n`);
  }
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
      install: {
        keys: ['i'],
        callback: function () {
          const command = `npm install --save ${packageName}`;
          runCommand(command);
        },
      },
      'install-global': {
        keys: ['l'],
        callback: function () {
          const command = `npm install -g ${packageName}`;
          runCommand(command);
        },
      },
      'install-dev': {
        keys: ['d'],
        callback: function () {
          const command = `npm install --save-dev ${packageName}`;
          runCommand(command);
        },
      },
    },
  });

  return footer;
};
