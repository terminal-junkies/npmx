'use strict';

const blessed = require('@blessed/neo-blessed');
const getTheme = require('@utils/getTheme');

module.exports = function (screen, pkg) {
  const theme = getTheme();

  const {
    normal: { red, blue },
  } = theme.colors;

  const sidebar = blessed.box({
    parent: screen,
    top: '20%+1',
    left: '70%+1',
    width: '30%',
    height: '75%-1',
    label: 'Sidebar',
    border: theme.box.border,
    style: theme.box.style,
    tags: true,
  });

  const _content = `
  {${red}-fg}{bold}> Press "i" to install this package{/}\n
  {${blue}-fg}{bold}{underline}Weekly Downloads{/}
  {${blue}-fg}{bold}{underline}Version{/}
  ${pkg.version}
  {${blue}-fg}{bold}{underline}License{/}
  {${blue}-fg}{bold}{underline}Unpacked Size{/}
  {${blue}-fg}{bold}{underline}Total Files{/}
  {${blue}-fg}{bold}{underline}Issues{/}
  {${blue}-fg}{bold}{underline}Pull Requests{/}
  {${blue}-fg}{bold}{underline}Homepage{/}
  ${pkg.links.homepage}
  {${blue}-fg}{bold}{underline}Repository{/}
  ${pkg.links.repository}
  {${blue}-fg}{bold}{underline}Last publish{/}
  ${pkg.date.toString()}
  {${blue}-fg}{bold}{underline}Collaborators{/}
  ${pkg.maintainers.map((m) => m.username).join(',')}
  {${blue}-fg}{bold}{underline}Keywords{/}
  ${pkg.keywords.join('\n  ')}
  `;

  sidebar.setContent(_content);

  return sidebar;
};
