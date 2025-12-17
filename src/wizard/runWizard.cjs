const { input, select, confirm, checkbox } = require("@inquirer/prompts");

async function runWizard(defaultProjectName = "") {
  const projectName = await input({
    message: "Project name:",
    default: defaultProjectName || "my-app",
    validate: (v) => (v && v.trim().length > 0 ? true : "Project name is required.")
  });

  const framework = await select({
    message: "Choose a framework:",
    choices: [
      { name: "None (vanilla)", value: "vanilla" },
      { name: "React", value: "react" },
      { name: "Angular", value: "angular" },
      { name: "Vue", value: "vue" }
    ],
    default: "vanilla"
  });

  const styling = await select({
    message: "Choose a styling option:",
    choices: [
      { name: "Vanilla CSS", value: "vanilla-css" },
      { name: "Tailwind CSS", value: "tailwind" }
    ],
    default: "vanilla-css"
  });

  let router = false;
  if (framework !== "vanilla") {
    router = await confirm({
      message: "Add a router?",
      default: false
    });
  }

  const linting = await select({
    message: "Add linting?",
    choices: [
      { name: "No", value: "none" },
      { name: "ESLint", value: "eslint" }
    ],
    default: "none"
  });

  const tests = await confirm({
    message: "Add automated tests?",
    default: false
  });

  const packageManager = await select({
    message: "Choose a package manager:",
    choices: [
      { name: "npm", value: "npm" },
      { name: "pnpm", value: "pnpm" },
      { name: "yarn", value: "yarn" }
    ],
    default: "npm"
  });

  const advanced = await checkbox({
    message: "Advanced options (select any):",
    choices: [{ name: "Path aliases (@/ → src/)", value: "path-alias" }]
  });

  return {
    projectName: projectName.trim(),
    framework,
    styling,
    router,
    linting,
    tests: tests ? "basic" : "none",
    packageManager,
    pathAlias: advanced.includes("path-alias")
  };
}

module.exports = { runWizard };
