import path from "node:path";
import { mapChoicesToTemplates } from "./wizard/mapChoicesToTemplates";
import { generateProject } from "./generator/generateProject";
import type { WizardChoices } from "./wizard/types";

async function main() {
  const choices: WizardChoices = {
    projectName: "genweb-smoke",
    framework: "vanilla",
    styling: "vanilla-css",
    router: false,
    linting: "none",
    tests: "none",
    packageManager: "npm",
    pathAlias: false
  };

  const { basePath, patches } = mapChoicesToTemplates(choices);
  const targetDir = path.resolve(process.cwd(), "sandbox-output", choices.projectName);

  await generateProject({ targetDir, basePath, patches, projectName: choices.projectName });
  console.log("Generated:", targetDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
