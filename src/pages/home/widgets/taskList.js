'use strict';

const blessed = require('@blessed/neo-blessed');
const getTheme = require('@utils/getTheme');
const runCommand = require('@utils/runCommand');
const getManifest = require('@utils/getManifest');

module.exports = function (screen) {
  const theme = getTheme();

  const taskList = blessed.list({
    parent: screen,
    top: '40%+1',
    left: 0,
    width: '35%',
    height: '60%-3',
    label: 'Project Tasks',
    keys: true,
    vi: true,
    style: theme.taskList.style,
    border: theme.taskList.border,
  });

  const pkg = getManifest();

  taskList.setItems(Object.keys(pkg.scripts));

  taskList.on('select', (node) => {
    const { content } = node;
    const cmd = `npm run ${content}`;
    runCommand(screen, cmd);
  });

  return taskList;
};
