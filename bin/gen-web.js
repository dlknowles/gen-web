#!/usr/bin/env node

const path = require("path");
const { copyTemplate } = require("../src/copyTemplate");
const pkg = require("../package.json");

function printHelp() {
  console.log(`
gen-web - Zero-bloat React + TypeScript + Tailwind starter generator

Usage:
  gen-web <project-name> [--force]

Options:
  -h, --help      Show this help message
  -v, --version   Show the CLI version
      --force     Overwrite a non-empty target directory

Notes:
  - The project name will be normalized to a valid npm package name:
    * lowercased
    * spaces/underscores -> hyphens
    * invalid characters removed/replaced
`);
}

function normalizeProjectName(input) {
  let name = input.trim().toLowerCase();
  name = name.replace(/[\s_]+/g, "-");
  name = name.replace(/[^a-z0-9\-~.]+/g, "-");
  name = name.replace(/-+/g, "-");
  name = name.replace(/^-+/, "").replace(/-+$/, "");

  return name;
}

function validateProjectName(rawName, normalizedName) {
  if (!normalizedName) {
    console.error(`Error: project name "${rawName}" is not valid after normalization.`);
    process.exit(1);
  }

  if (/^[._]/.test(normalizedName)) {
    console.error(
      `Error: project name "${normalizedName}" is invalid. ` +
        "Names cannot start with '.' or '_'."
    );
    process.exit(1);
  }

  if (normalizedName.length > 214) {
    console.error(
      `Error: project name "${normalizedName}" is too long (max 214 characters).`
    );
    process.exit(1);
  }
}

function run() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    printHelp();
    return;
  }

  if (args.includes("--version") || args.includes("-v")) {
    console.log(pkg.version);
    return;
  }

  if (args.length === 0) {
    console.error("Usage: gen-web <project-name> [--force]");
    console.error("       gen-web --help");
    process.exit(1);
  }

  const rawName = args[0];

  if (rawName.startsWith("-")) {
    console.error("Error: project name is required.");
    console.error("Run: gen-web --help");
    process.exit(1);
  }

  const force = args.includes("--force");

  const normalizedName = normalizeProjectName(rawName);
  validateProjectName(rawName, normalizedName);

  if (normalizedName !== rawName) {
    console.log(
      `Using project name "${normalizedName}" (normalized from "${rawName}").`
    );
  }

  const targetDir = path.resolve(process.cwd(), normalizedName);

  copyTemplate({ projectName: normalizedName, targetDir, force });
}

run();
