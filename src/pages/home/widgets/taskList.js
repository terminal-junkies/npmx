'use strict';

const blessed = require('@terminal-junkies/neo-blessed');
const getTheme = require('utils/getTheme');
const runCommand = require('utils/runCommand');

module.exports = function (screen) {
  const theme = getTheme();

  const taskList = blessed.list({
    parent: screen,
    top: '30%+1',
    left: 0,
    width: '35%',
    height: '30%',
    label: 'Project Tasks',
    keys: true,
    vi: true,
    style: theme.taskList.style,
    border: theme.taskList.border,
  });

  const pkg = require('@root/package.json');
  taskList.setItems(Object.keys(pkg.scripts));

  taskList.on('select', (node) => {
    const { content } = node;
    const cmd = `npm run ${content}`;
    runCommand(screen, cmd);
  });

  return taskList;
};
