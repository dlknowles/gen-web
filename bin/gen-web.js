#!/usr/bin/env node

const path = require("path");
const { copyTemplate } = require("../src/copyTemplate");
const pkg = require("../package.json");

function printHelp() {
  console.log(`
gen-web - Zero-bloat React + TypeScript + Tailwind starter generator

Usage:
  gen-web <project-name>

Options:
  -h, --help      Show this help message
  -v, --version   Show the CLI version
`);
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
    console.error("Usage: gen-web <project-name>");
    console.error("       gen-web --help");
    process.exit(1);
  }

  const projectName = args[0];

  // Handle cases like: gen-web --foo
  if (projectName.startsWith("-")) {
    console.error("Error: project name is required.");
    console.error("Run: gen-web --help");
    process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), projectName);

  copyTemplate({ projectName, targetDir });
}

run();
