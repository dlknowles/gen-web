#!/usr/bin/env node

const path = require('path');
const { copyTemplate } = require('../src/copyTemplate');

function run() {
  const args = process.argv.slice(2);

  if (args.includes("--version") || args.includes("-v")) {
    const pkg = require("../package.json");
    console.log(pkg.version);
    return;
  }

  if (args.length === 0) {
    console.error('Usage: gen-web <project-name>');
    process.exit(1);
  }

  const projectName = args[0];
  const targetDir = path.resolve(process.cwd(), projectName);

  copyTemplate({ projectName, targetDir });
}

run();
