const path = require("path");
const fs = require("fs");
const { replacePlaceholdersInFile } = require("./utils/replacePlaceholders");
const cliPkg = require("../package.json");

function copyTemplate({ projectName, targetDir, force = false }) {
  const templateDir = path.resolve(__dirname, "..", "template");

  if (!projectName || typeof projectName !== "string") {
    throw new Error("projectName is required.");
  }

  if (!fs.existsSync(templateDir)) {
    throw new Error(`template directory not found at: ${templateDir}\nTry reinstalling gen-web.`);
  }

  if (fs.existsSync(targetDir)) {
    const files = fs.readdirSync(targetDir);

    if (files.length > 0 && !force) {
      const msgLines = [
        `target directory "${targetDir}" already exists and is not empty.`,
        'Run with "--force" to overwrite it:',
        "",
        `  gen-web ${path.basename(targetDir)} --force`,
      ];
      throw new Error(msgLines.join("\n"));
    }

    if (files.length > 0 && force) {
      fs.rmSync(targetDir, { recursive: true, force: true });
      fs.mkdirSync(targetDir, { recursive: true });
    }
    // If exists but empty, reuse it as-is.
  } else {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  copyDirRecursive(templateDir, targetDir);

  const replacements = {
    projectName,
    genWebVersion: cliPkg.version,
  };

  replacePlaceholdersRecursive(targetDir, replacements);
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
