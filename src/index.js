'use strict';

const blessed = require('@blessed/neo-blessed');
const { search } = require('libnpm');
const screen = blessed.screen({
  fullUnicode: true,
});

const { stripIndents } = require('common-tags');
const expansions = require('npm-expansions');

const getTheme = require('./utils/getTheme');
const getManifest = require('./utils/getManifest');
const runCommand = require('./utils/runCommand');
const theme = getTheme();

const initHomePage = require('./pages/home');
const initPackagePage = require('./pages/package');

module.exports = function () {
  const program = blessed.program();
  program.bg(theme.program.bg);
  program.fg(theme.program.fg);

  const pkg = require('../package.json');
  const logo = blessed.box({
    parent: screen,
    top: 0,
    left: 0,
    width: '35%',
    height: '10%',
    border: theme.logo.border,
    style: theme.logo.style,
    tags: true,
  });

  function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(expansions.length));
  }
  const logoContent = stripIndents`{bold}npmx ${pkg.version}{/}
  {red-fg}❤{/} ${expansions[getRandomInt()]}
  `;

  logo.setContent(logoContent);

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
    // show loading

    loadingWidget.load('Searching packages, please wait...');
    if (data) {
      search(data).then((results) => {
        packages = results;
        const temp = results.map((r) => r.name);
        loadingWidget.stop();
        screen.append(searchResults);
        searchResults.hidden = false;
        searchResults.setItems(temp);
        searchResults.focus();
        screen.render();
      });
      text.clearValue();
    }
  });

  const loadingWidget = blessed.loading({
    parent: screen,
    top: 'center',
    left: 'center',
    height: 'shrink',
    width: 'shrink',
    border: 'line',
    hidden: true,
  });

  const searchResults = blessed.list({
    parent: screen,
    top: 'center',
    left: 'center',
    width: '50%',
    height: '50%',
    label: 'Search Results',
    keys: true,
    vi: true,
    style: theme.searchResults.style,
    border: theme.searchResults.border,
    hidden: true,
  });

  searchResults.on('select', (node) => {
    let idx = searchResults.getItemIndex(node);
    const pkg = packages[idx];
    searchResults.detach();

    const packagePage = initPackagePage(screen, pkg);
    homePage.hide();
    packagePage.show();
  });

  screen.key('q', () => {
    return process.exit(0); // eslint-disable-line
  });

  screen.key(['/'], () => {
    text.focus();
  });

  screen.append(logo);
  screen.append(searchBox);

  const homePage = initHomePage(screen);
  homePage.show();
  screen.append(loadingWidget);

  const manifest = getManifest();
  if (!manifest.name) {
    const confirmDialog = require('./pages/home/widgets/confirmDialog')(screen);
    screen.append(confirmDialog);
    screen.render();
    confirmDialog.ask(
      'Looks like you are not inside an npm project. Do you want to create one?',
      (err, value) => {
        if (value) {
          runCommand(screen, 'npm init');
        }
      }
    );
  }

  screen.render();
};
