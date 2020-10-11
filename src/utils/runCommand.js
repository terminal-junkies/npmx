'use strict';

const neoblessed = require('@blessed/neo-blessed');
const getTheme = require('./getTheme');

module.exports = function runCommand(screen, cmd) {
  const theme = getTheme();
  const {
    terminal: { border, style },
  } = theme;
  const terminal = neoblessed.terminal({
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
};
