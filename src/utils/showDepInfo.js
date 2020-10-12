'use strict';

const { exec } = require('child_process');
const { stripIndents } = require('common-tags');

module.exports = function (screen, dependency, manifest, dev = false) {
  const depInfo = require('../pages/home/widgets/depinfo')(screen);
  const loading = require('../pages/home/widgets/loading')(screen);
  screen.append(loading);
  loading.load('Fetching package info');
  screen.append(depInfo);

  exec(`npm view ${dependency}`, (err, stdout) => {
    const _dep = dev
      ? manifest.devDependencies[dependency]
      : manifest.dependencies[dependency];
    const msg = stripIndents`
    ${dependency}: ${_dep}
    ${stdout}
    `;
    loading.stop();
    depInfo.display(msg, 0, () => {});
    screen.render();
  });
};
