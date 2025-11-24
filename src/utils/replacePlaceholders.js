const fs = require('fs');

function replacePlaceholdersInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');

  for (const [key, value] of Object.entries(replacements)) {
    const pattern = new RegExp(`{{${key}}}`, 'g');
    content = content.replace(pattern, value);
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

module.exports = { replacePlaceholdersInFile };
