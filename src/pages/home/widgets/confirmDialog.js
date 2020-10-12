'use strict';

const blessed = require('@blessed/neo-blessed');
const getTheme = require('../../../utils/getTheme');
module.exports = function (screen) {
  const theme = getTheme();
  const confirmDialog = blessed.question({
    parent: screen,
    top: 'center',
    left: 'center',
    height: 'shrink',
    width: 'shrink',
    border: 'line',
    style: theme.confirmDialog.style,
  });

  return confirmDialog;
};
