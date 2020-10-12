'use strict';

module.exports = function (screen) {
  const taskList = require('./widgets/taskList')(screen);
  const footer = require('./widgets/footer')(screen);
  const nodeInfo = require('./widgets/nodeInfo')(screen);
  const deps = require('./widgets/deps')(screen);
  const devdeps = require('./widgets/devdeps')(screen);
  const logo = require('./widgets/logo')(screen);

  function hide() {
    taskList.detach();
    footer.detach();
    nodeInfo.detach();
    deps.detach();
    devdeps.detach();
    logo.detach();
    screen.render();
  }

  function show() {
    screen.append(taskList);
    screen.append(footer);
    screen.append(nodeInfo);
    screen.append(deps);
    screen.append(devdeps);
    screen.append(logo);
    taskList.focus();
    screen.render();
  }

  taskList.key('tab', () => {
    deps.focus();
  });

  deps.key('tab', () => {
    devdeps.focus();
  });

  devdeps.key('tab', () => {
    taskList.focus();
  });

  return { hide, show };
};
