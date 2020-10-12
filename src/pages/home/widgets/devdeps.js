'use strict';

const blessed = require('@blessed/neo-blessed');
const getTheme = require('../../../utils/getTheme');
const showDepInfo = require('../../../utils/showDepInfo');
const getManifest = require('../../../utils/getManifest');

module.exports = function (screen) {
  const theme = getTheme();

  const devdeps = blessed.list({
    parent: screen,
    top: '40%+1',
    left: '70%+1',
    width: '30%',
    height: '60%-3',
    label: ' Dev Dependencies ',
    keys: true,
    vi: true,
    style: theme.taskList.style,
    border: theme.taskList.border,
  });

  const pkg = getManifest();

  const items = pkg.devDependencies ? Object.keys(pkg.devDependencies) : [];
  devdeps.setItems(items);
  devdeps.setLabel(` Dev Dependencies (${items.length}) `);

  devdeps.on('select', (node) => {
    const { content } = node;
    showDepInfo(screen, content, pkg, true);
  });

  return devdeps;
};
