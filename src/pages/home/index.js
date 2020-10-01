'use strict';

const blessed = require('@terminal-junkies/neo-blessed');


module.exports = function(screen) {


const taskList = require('./widgets/taskList')(screen);
const footer = require('./widgets/footer')(screen);

  function hide() {
    taskList.detach();
    footer.detach();
    screen.render();
  }

  function show() {
    screen.append(taskList);
    screen.append(footer);
    taskList.focus();
    screen.render();
  }

  return { hide, show };

};
