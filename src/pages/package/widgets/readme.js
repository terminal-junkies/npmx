'use strict';

const contrib = require('@blessed/blessed-contrib');
const getTheme = require('@utils/getTheme');
const githubReadme = require('github-readme');

module.exports = function (screen, pkg) {
  //console.log(pkg.links);
  const theme = getTheme();
  const { border, style } = theme.box;
  const readme = contrib.markdown({
    parent: screen,
    label: ' README ',
    top: '20%+1',
    left: '0',
    width: '70%',
    height: '65%',
    border,
    style,
    keys: true,
    vi: true,
    scrollable: true,
    alwaysScroll: true,
    tags: true,
  });

  const regex = /https:\/\/github.com\/(\w+)\/(\w+)/gm;
  let m;

  while ((m = regex.exec(pkg.links.repository)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    const [, user, repo] = m;

    githubReadme(user, repo, (err, md) => {
      if (err) {
        readme.setMarkdown('Some error occurred in fetching README');
      } else {
        readme.setMarkdown(md);
      }
      readme.focus();
      screen.render();
    });
  }

  readme.setMarkdown(`${pkg.description}`);

  return readme;
};
