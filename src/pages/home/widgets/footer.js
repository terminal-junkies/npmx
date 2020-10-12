'use strict';

const blessed = require('@blessed/neo-blessed');
const getTheme = require('../../../utils/getTheme');
const runCommand = require('../../../utils/runCommand');

module.exports = function (screen) {
  const theme = getTheme();
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
      //init: {
      //keys: ['n'],
      //callback: function () {
      //runCommand(screen, 'npm init');
      //},
      //},
      install: {
        keys: ['i'],
        callback: function () {
          const prompt = require('./prompt')(screen);
          screen.append(prompt);
          prompt.input('Enter package name: ', '', (err, value) => {
            if (value) {
              runCommand(screen, `npm install --save ${value}`);
            }
          });
        },
      },
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
      audit: {
        keys: ['a'],
        callback: function () {
          runCommand(screen, 'npm audit');
        },
      },
      outdated: {
        keys: ['o'],
        callback: function () {
          runCommand(screen, 'npm outdated');
        },
      },
      publish: {
        keys: ['p'],
        callback: function () {
          runCommand(screen, 'npm publish');
        },
      },
      version: {
        keys: ['v'],
        callback: function () {
          const versions = blessed.list({
            items: ['patch', 'minor', 'major'],
            top: 'center',
            left: 'center',
            width: '25%',
            height: '25%',
            label: ' Versions ',
            border: theme.taskList.border,
            style: theme.taskList.style,
            keys: true,
            vi: true,
          });
          screen.append(versions);
          versions.focus();
          versions.on('select', (node) => {
            const { content } = node;
            versions.detach();
            runCommand(screen, `npm version ${content}`);
          });
          screen.render();
        },
      },
    },
  });

  return footer;
};
