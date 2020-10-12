'use strict';

const path = require('path');
const fs = require('fs');

module.exports = function () {
  // .npmx.json config file
  const configPath =
    process.env.OS === 'Windows_NT'
      ? path.resolve(process.env.APPDATA, '.npmx.json')
      : path.resolve(process.env.HOME, '.config/.npmx.json');

  let config = { theme: 'Dracula' };
  try {
    config = require(configPath);
  } catch (e) {
    // Write config file
    fs.writeFile(configPath, JSON.stringify(config, null, 2), (err) => {
      if (err) throw err;
    });
  }

  const colors = require(`blessed-themes/themes/${config.theme}`);
  const theme = require('../styles')(colors.colors);
  return theme;
};
