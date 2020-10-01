'use strict';

const { manifest } = require('libnpm');
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

  manifest(pkg.name).then((data) => {
    console.log(Object.keys(data));
  });

  return { hide, show };
};
