'use strict';

module.exports = function (screen, pkg) {
  const readme = require('./widgets/readme')(screen, pkg);
  const sidebar = require('./widgets/sidebar')(screen, pkg);
  const footer = require('./widgets/footer')(screen, pkg);
  const description = require('./widgets/description')(screen, pkg);
  const keywords = require('./widgets/keywords')(screen, pkg);

  function hide() {
    sidebar.detach();
    readme.detach();
    footer.detach();
    keywords.detach();
    description.detach();
  }

  function show() {
    screen.append(sidebar);
    screen.append(readme);
    screen.append(footer);
    screen.append(description);
    screen.append(keywords);
    screen.render();
  }

  readme.key('tab', () => {
    sidebar.focus();
  });

  sidebar.key('tab', () => {
    readme.focus();
  });
  return { hide, show };
};
