'use strict';

const blessed = require('@blessed/neo-blessed');
const getTheme = require('@utils/getTheme');
const { Octokit } = require('@octokit/rest');
const octokit = new Octokit();
const filesize = require('filesize');
const { exec } = require('child_process');
const { stripIndents } = require('common-tags');

module.exports = function (screen, pkg) {
  const theme = getTheme();

  const {
    normal: { red, blue },
  } = theme.colors;

  const sidebar = blessed.box({
    parent: screen,
    top: '10%+1',
    left: '70%+1',
    width: '30%',
    height: '40%',
    border: theme.box.border,
    style: theme.box.style,
    tags: true,
    scrollable: true,
    keys: true,
    vi: true,
  });

  const github = blessed.box({
    parent: screen,
    top: '80%+1',
    left: '70%+1',
    width: '30%',
    height: '15%-1',
    label: ' Github ',
    border: theme.box.border,
    style: theme.box.style,
    tags: true,
    scrollable: true,
    keys: true,
    vi: true,
  });

  const dependencies = blessed.box({
    parent: screen,
    top: '50%+1',
    left: '70%+1',
    width: '30%',
    height: '30%',
    label: ' Dependencies ',
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

  exec(`npm view ${pkg.name} -json`, (err, stdout) => {
    const info = JSON.parse(stdout);
    const _content = stripIndents`{${red}-fg}{bold}> Press "i" to install {/}\n
  {${blue}-fg}{bold}{underline}Weekly Downloads{/}
  {${blue}-fg}{bold}Version{/}: ${pkg.version}
  {${blue}-fg}{bold}License{/}: ${info.license}
  {${blue}-fg}{bold}Unpacked Size{/}: ${filesize(info.dist.unpackedSize || 0)}
  {${blue}-fg}{bold}Total Files{/}: ${info.dist.fileCount}
  {${blue}-fg}{bold}Homepage{/}:
  ${pkg.links.homepage}
  {${blue}-fg}{bold}Repository{/}:
  ${pkg.links.repository}
  {${blue}-fg}{bold}Last publish{/}:
  ${pkg.date.toString()}
  {${blue}-fg}{bold}Collaborators{/}:
  ${pkg.maintainers.map((m) => m.username).join(',')}
  {${blue}-fg}{bold}Dev Dependencies{/}:
  ${Object.keys(info.devDependencies || {}).join('\n  ')}
  `;

    const deps = Object.keys(info.dependencies || {}).join('\n  ');

    dependencies.setContent(deps);

    sidebar.setContent(_content);
    screen.render();
  });

  octokit.repos
    .get({
      owner,
      repo,
    })
    .then(({ data }) => {
      const githubstats = stripIndents`{${blue}-fg}{bold}⚠️ Issues{/}: ${data.open_issues}
  {${blue}-fg}{bold}★ Stars{/}: ${data.stargazers_count}
  {${blue}-fg}{bold}Pull Requests{/}: `;

      github.setContent(githubstats);
      screen.render();
    });
  return sidebar;
};
