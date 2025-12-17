const path = require("node:path");

const TEMPLATES_ROOT = path.resolve(process.cwd(), "templates");

function mapChoicesToTemplates(choices) {
  const basePath = path.join(TEMPLATES_ROOT, "bases", choices.framework);
  const patches = [];

  // fixed order: styling → router → lint → tests → advanced
  patches.push(path.join(TEMPLATES_ROOT, "patches", "styling", choices.styling));

  if (choices.framework !== "vanilla" && choices.router) {
    const routerPatch =
      choices.framework === "react" ? "react-router" :
      choices.framework === "vue" ? "vue-router" :
      "angular-router";

    patches.push(path.join(TEMPLATES_ROOT, "patches", "router", routerPatch));
  }

  if (choices.linting && choices.linting !== "none") {
    patches.push(path.join(TEMPLATES_ROOT, "patches", "lint", choices.linting));
  }

  if (choices.tests && choices.tests !== "none") {
    patches.push(path.join(TEMPLATES_ROOT, "patches", "tests", choices.tests));
  }

  if (choices.pathAlias) {
    patches.push(path.join(TEMPLATES_ROOT, "patches", "advanced", "path-alias"));
  }

  return { basePath, patches };
}

module.exports = { mapChoicesToTemplates };
