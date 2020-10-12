'use strict';

const blessed = require('@blessed/neo-blessed');
const getTheme = require('../../../utils/getTheme');

module.exports = function (screen) {
  const theme = getTheme();

  const bigtext = blessed.bigtext({
    parent: screen,
    content: 'npmx',
    top: '10%+1',
    left: '35%+1',
    width: '65%',
    height: '30%',
    border: theme.bigtext.border,
    style: theme.bigtext.style,
  });

  return bigtext;
};
