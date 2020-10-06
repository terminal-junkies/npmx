'use strict';

module.exports = function (screen, pkg) {
  const readme = require('./widgets/readme')(screen, pkg);
  const sidebar = require('./widgets/sidebar')(screen, pkg);
  const footer = require('./widgets/footer')(screen, pkg);
  const description = require('./widgets/description')(screen, pkg);

  function hide() {
    sidebar.detach();
    readme.detach();
    footer.detach();
    description.detach();
  }

  function show() {
    screen.append(sidebar);
    screen.append(readme);
    screen.append(footer);
    screen.append(description);
    screen.render();
  }

  return { hide, show };
};
