'use strict';

const blessed = require('@blessed/neo-blessed');
const getTheme = require('@utils/getTheme');
const { Octokit } = require('@octokit/rest');
const octokit = new Octokit();
const filesize = require('filesize');
const { exec } = require('child_process');

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
    scrollable: true,
    keys: true,
    vi: true,
  });

  const regex = /https:\/\/github.com\/(\w+)\/(\w+)/gm;
  let m;

  let owner, repo;
  while ((m = regex.exec(pkg.links.repository)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    owner = m[1];
    repo = m[2];
  }

  octokit.repos
    .get({
      owner,
      repo,
    })
    .then(({ data }) => {
      exec(`npm view ${pkg.name} -json`, (err, stdout) => {
        const info = JSON.parse(stdout);
        const _content = `
  {${red}-fg}{bold}> Press "i" to install this package{/}\n
  {${blue}-fg}{bold}{underline}Weekly Downloads{/}
  {${blue}-fg}{bold}{underline}Version{/}
  ${pkg.version}
  {${blue}-fg}{bold}{underline}License{/}
  ${info.license}
  {${blue}-fg}{bold}{underline}Unpacked Size{/}
  ${filesize(info.dist.unpackedSize)}
  {${blue}-fg}{bold}{underline}Total Files{/}
  ${info.dist.fileCount}
  {${blue}-fg}{bold}{underline}Issues{/}
  ${data.open_issues}
  {${blue}-fg}{bold}{underline}Github Stars{/}
  ${data.stargazers_count}
  {${blue}-fg}{bold}{underline}Pull Requests{/}
  {${blue}-fg}{bold}{underline}Homepage{/}
  ${pkg.links.homepage}
  {${blue}-fg}{bold}{underline}Repository{/}
  ${pkg.links.repository}
  {${blue}-fg}{bold}{underline}Last publish{/}
  ${pkg.date.toString()}
  {${blue}-fg}{bold}{underline}Collaborators{/}
  ${pkg.maintainers.map((m) => m.username).join(',')}
  {${blue}-fg}{bold}{underline}Dependencies{/}
  ${Object.keys(info.dependencies || {}).join('\n  ')}
  {${blue}-fg}{bold}{underline}Dev Dependencies{/}
  ${Object.keys(info.devDependencies || {}).join('\n  ')}
  {${blue}-fg}{bold}{underline}Keywords{/}
  ${pkg.keywords.join('\n  ')}
  `;

        sidebar.setContent(_content);
        screen.render();
      });
    });

  return sidebar;
};
