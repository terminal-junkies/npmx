'use strict';

const blessed = require('@terminal-junkies/neo-blessed');
module.exports = function(screen, pkg) {
  const readme = require('./widgets/readme')(screen, pkg);
  const sidebar = require('./widgets/sidebar')(screen, pkg);
  const footer = require('./widgets/footer')(screen, pkg);

  function hide() {
    sidebar.detach();
    readme.detach();
    footer.detach();
  }

  function show() {
    screen.append(sidebar);
    screen.append(readme);
    screen.append(footer);
    screen.render();
  }

  return { hide, show };
};
