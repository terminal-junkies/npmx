'use strict';


const blessed = require('@terminal-junkies/neo-blessed');
const search = require('libnpmsearch');
const minimist = require('minimist')
const screen = blessed.screen({ fullUnicode: true });

const options = minimist(process.argv.slice(2));
const scheme = options.theme || 'Dracula';
const colors = require(`blessed-themes/themes/${scheme}`);
const theme = require('./styles')(colors.colors);

const initHomePage = require('./pages/home');
const initPackagePage = require('./pages/package');



module.exports = function() {
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



const searchBox = blessed.form({
  parent: screen,
  top: 0,
  left: '35%+1',
  width: '65%',
  height: '10%',
  border: theme.searchBox.border,
  style: theme.searchBox.style,
  content: ' Search packages (Press Enter to search): ',
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

let packages = [];
text.on('submit', (data) => {
  if (data) {
    search(data).then(results => {
      packages = results;
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



searchResults.on('select', node => {
  let idx = searchResults.getItemIndex(node);
  const pkg = packages[idx];
  const { content } = node;
  searchResults.detach();

  const packagePage = initPackagePage(screen, pkg);
  homePage.hide();
  packagePage.show();

});



screen.key('q', () => {
  return process.exit(0);
});

screen.key(['/'], () => {
  text.focus();
});

screen.append(logo);
screen.append(searchBox);


screen.append(searchResults);

const homePage = initHomePage(screen);
homePage.show();

screen.render();
};

