// src/copyTemplate.js
const path = require("path");
const fs = require("fs");
const { replacePlaceholdersInFile } = require("./utils/replacePlaceholders");

const TEXT_EXTENSIONS = new Set([
  ".js",
  ".cjs",
  ".mjs",
  ".ts",
  ".tsx",
  ".jsx",
  ".json",
  ".html",
  ".md",
  ".css",
  ".scss",
  ".sass",
  ".txt",
]);

function copyTemplate({ projectName, targetDir, force = false }) {
  const templateDir = path.resolve(__dirname, "..", "template");

  // 1. Basic validations
  if (!projectName || typeof projectName !== "string") {
    console.error("Error: projectName is required.");
    process.exit(1);
  }

  if (!fs.existsSync(templateDir)) {
    console.error("Error: template directory not found at:", templateDir);
    console.error("Try reinstalling gen-web.");
    process.exit(1);
  }

  if (fs.existsSync(targetDir)) {
    const files = fs.readdirSync(targetDir);

    if (files.length > 0 && !force) {
      console.error(
        `Error: target directory "${targetDir}" already exists and is not empty.`
      );
      console.error('Run with "--force" to overwrite it:');
      console.error("");
      console.error(`  gen-web ${path.basename(targetDir)} --force`);
      process.exit(1);
    }

    if (files.length > 0 && force) {
      fs.rmSync(targetDir, { recursive: true, force: true });
      fs.mkdirSync(targetDir, { recursive: true });
    }
  } else {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // 2. Copy template recursively
  copyDirRecursive(templateDir, targetDir);

  // 3. Replace placeholders in text files
  const replacements = {
    projectName,
  };

  replacePlaceholdersRecursive(targetDir, replacements);

  // 4. Print next steps
  printNextSteps(projectName);
}

function copyDirRecursive(srcDir, destDir) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath);
      }
      copyDirRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function replacePlaceholdersRecursive(dir, replacements) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      replacePlaceholdersRecursive(fullPath, replacements);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (TEXT_EXTENSIONS.has(ext) || entry.name === "tailwind.config.cjs" || entry.name === "postcss.config.cjs") {
        replacePlaceholdersInFile(fullPath, replacements);
      }
    }
  }
}

function printNextSteps(projectName) {
  const lines = [
    "",
    `Project "${projectName}" created successfully.`,
    "",
    "Next steps:",
    `  cd ${projectName}`,
    "  npm install",
    "  npm run dev",
    "",
  ];

  console.log(lines.join("\n"));
}

module.exports = { copyTemplate };
