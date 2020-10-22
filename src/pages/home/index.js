'use strict';

const { search } = require('libnpm');
const initPackagePage = require('../package');
const packageKeywords = require('../../utils/packageKeywords');
module.exports = function (screen) {
  const taskList = require('./widgets/taskList')(screen);
  const footer = require('./widgets/footer')(screen);
  const nodeInfo = require('./widgets/nodeInfo')(screen);
  const deps = require('./widgets/deps')(screen);
  const devdeps = require('./widgets/devdeps')(screen);
  const logo = require('./widgets/logo')(screen);
  const discover = require('./widgets/discover')(screen);

  const searchResults = require('../../widgets/searchResults')(screen);
  const loadingWidget = require('../../widgets/loading')(screen);

  function hide() {
    taskList.detach();
    footer.detach();
    nodeInfo.detach();
    deps.detach();
    devdeps.detach();
    logo.detach();
    discover.detach();
    screen.render();
  }

  function show() {
    screen.append(taskList);
    screen.append(footer);
    screen.append(nodeInfo);
    screen.append(deps);
    screen.append(devdeps);
    screen.append(logo);
    screen.append(discover);
    //taskList.focus();
    discover.focus();
    screen.render();
  }

  taskList.key('tab', () => {
    deps.focus();
  });

  deps.key('tab', () => {
    devdeps.focus();
  });

  devdeps.key('tab', () => {
    discover.focus();
  });

  discover.key('tab', () => {
    taskList.focus();
  });

  let packages = [];

  discover.on('select', (node) => {
    const { content } = node;
    const keyword = packageKeywords[content];

    screen.append(loadingWidget);
    loadingWidget.load('Searching packages, please wait...');
    search('keywords:' + keyword).then((results) => {
      packages = results;
      const temp = results.map((r) => r.name);
      loadingWidget.stop();
      screen.append(searchResults);
      searchResults.hidden = false;
      searchResults.setItems(temp);
      searchResults.focus();
      screen.render();
    });
  });

  searchResults.on('select', (node) => {
    let idx = searchResults.getItemIndex(node);
    const pkg = packages[idx];
    searchResults.detach();

    const packagePage = initPackagePage(screen, pkg);
    hide();
    packagePage.show();
  });

  return { hide, show };
};
