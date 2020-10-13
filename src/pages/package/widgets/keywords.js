'use strict';

const blessed = require('@blessed/neo-blessed');
const getTheme = require('@utils/getTheme');

module.exports = function (screen, pkg) {
  const theme = getTheme();

  const { border, style } = theme.box;
  const box = blessed.box({
    parent: screen,
    top: '85%+1',
    left: 0,
    width: '70%',
    height: '10%-1',
    label: ' Keywords ',
    border,
    style,
  });

  box.setContent(pkg.keywords.join(',  '));

  return box;
};
