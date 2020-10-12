'use strict';

const blessed = require('@blessed/neo-blessed');
const getTheme = require('../../../utils/getTheme');
const showDepInfo = require('../../../utils/showDepInfo');
const getManifest = require('../../../utils/getManifest');

module.exports = function (screen) {
  const theme = getTheme();

  const deps = blessed.list({
    parent: screen,
    top: '40%+1',
    left: '35%+1',
    width: '35%',
    height: '60%-3',
    label: ' Dependencies ',
    keys: true,
    vi: true,
    style: theme.taskList.style,
    border: theme.taskList.border,
  });

  const pkg = getManifest();
  const items = pkg.dependencies ? Object.keys(pkg.dependencies) : [];
  deps.setItems(items);
  deps.setLabel(` Dependencies (${items.length}) `);

  deps.on('select', (node) => {
    const { content } = node;
    showDepInfo(screen, content, pkg);
  });

  return deps;
};
