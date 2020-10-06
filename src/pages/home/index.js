'use strict';

module.exports = function (screen) {
  const taskList = require('./widgets/taskList')(screen);
  const footer = require('./widgets/footer')(screen);
  const nodeInfo = require('./widgets/nodeInfo')(screen);

  function hide() {
    taskList.detach();
    footer.detach();
    nodeInfo.detach();
    screen.render();
  }

  function show() {
    screen.append(taskList);
    screen.append(footer);
    screen.append(nodeInfo);
    taskList.focus();
    screen.render();
  }

  return { hide, show };
};
