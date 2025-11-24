const path = require('path');
const fs = require('fs');
const { replacePlaceholdersInFile } = require('./utils/replacePlaceholders');

function copyTemplate({ projectName, targetDir }) {
  const templateDir = path.resolve(__dirname, '..', 'template');

  // TODO: implement:
  // 1. Create targetDir
  // 2. Copy templateDir -> targetDir (recursive)
  // 3. Replace {{projectName}} in relevant files
  // 4. Print next steps to console

  console.log('copyTemplate not implemented yet.', {
    projectName,
    targetDir,
    templateDir,
  });
}

module.exports = { copyTemplate };
