'use strict';

const blessed = require('@terminal-junkies/neo-blessed');
const getTheme = require('utils/getTheme');

module.exports = function(screen, pkg) {

  const theme = getTheme();

  const sidebar = blessed.box({
    parent: screen,
    top: '30%+1',
    left: '70%+1',
    width: '30%',
    height: '65%-1',
    label: 'Sidebar',
    border: theme.box.border,
    style: theme.box.style
  });

  const _content = `
  > Press "i" to install this package
  Weekly Downloads
  ----------------
  Version
  ${pkg.version}
  -------
  License
  -------
  Unpacked Size
  -------------
  Total Files
  -----------
  Issues
  ------
  Pull Requests
  -------------
  Homepage
  --------
  Repository
  ----------
  Last publish
  ------------
  ${pkg.date.toString()}
  Collaborators
  -------------
  ${pkg.maintainers.map(m => m.username).join(',')}

  `;

  sidebar.setContent(_content);

  return sidebar;
}
