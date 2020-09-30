'use strict';

const blessed = require('@terminal-junkies/neo-blessed');
const screen = blessed.screen({ fullUnicode: true });

const options = require('minimist')(process.argv.slice(2));
const scheme = options.theme || 'Dracula';
const colors = require(`blessed-themes/themes/${scheme}`);
const theme = require('./src/styles')(colors.colors);
const search = require('libnpmsearch');

const program = blessed.program();
program.bg(theme.program.bg);
program.fg(theme.program.fg);

const logo = blessed.bigtext({
  parent: screen,
  border: 'line',
  content: 'npmx',
  top: 0,
  left: 0,
  width: '35%',
  height: '30%',
  border: theme.logo.border,
  style: theme.logo.style,
});


const taskList = blessed.list({
  parent: screen,
  top: '30%+1',
  left: 0,
  width: '35%',
  height: '30%',
  border: 'line',
  label: 'Project Tasks',
  keys: true,
  vi: true,
  style: theme.taskList.style,
  border: theme.taskList.border,
});

const searchBox = blessed.form({
  parent: screen,
  top: 0,
  left: '35%+1',
  width: '65%',
  height: '10%',
  border: theme.searchBox.border,
  style: theme.searchBox.style,
  content: 'Search packages',
  keys: true,
});

const text = blessed.textbox({
  parent: searchBox,
  mouse: true,
  keys: true,
  fg: theme.text.fg,
  bg: theme.text.bg,
  border: theme.text.border,
  height: 3,
  width: 80,
  left: 1,
  top: 1,
  name: 'text',
  inputOnFocus: true,
});

text.on('submit', (data) => {
  if (data) {
    search(data).then(results => {
      const temp = results.map(r => r.name);
      searchResults.setItems(temp);
      searchResults.focus();
      screen.render();
    });
    text.clearValue();
  }
});

const searchResults = blessed.list({
  parent: screen,
  top: '10%+1',
  left: '35%+1',
  width: '65%',
  height: '90%-3',
  border: 'line',
  label: 'Search Results',
  keys: true,
  vi: true,
  style: theme.searchResults.style,
  border: theme.searchResults.border,
});

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
  },
});

const pkg = require('./package.json');
taskList.setItems(Object.keys(pkg.scripts));

screen.key('q', () => {
  return process.exit(0);
});

screen.key(['/'], () => {
  text.focus();
});

screen.append(logo);
screen.append(searchBox);
screen.append(taskList);
screen.append(searchResults);
screen.append(footer);

taskList.focus();

screen.render();
