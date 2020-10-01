'use strict';

const blessed = require('@terminal-junkies/neo-blessed');
const getTheme = require('utils/getTheme');

module.exports = function (screen, pkg) {
  const theme = getTheme();

  const { border, style } = theme.box;
  const box = blessed.box({
    top: '10%+1',
    left: 0,
    width: '100%',
    height: '10%',
    label: ` ${pkg.name} `,
    content: ` ${pkg.description} `,
    border,
    style,
  });

  return box;
};
