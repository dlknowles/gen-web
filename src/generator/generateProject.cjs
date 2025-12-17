const fs = require("node:fs/promises");
const { copyDir } = require("./copyDir.cjs");
const { applyPatch } = require("./applyPatch.cjs");
const { replaceTokensInDir } = require("./replaceTokens.cjs");

async function generateProject(input) {
  // Safety: targetDir must not exist or must be empty
  try {
    const entries = await fs.readdir(input.targetDir);
    if (entries.length > 0) {
      throw new Error(`Target directory is not empty: ${input.targetDir}`);
    }
  } catch (e) {
    if (e && e.code !== "ENOENT") throw e;
    await fs.mkdir(input.targetDir, { recursive: true });
  }

  // 1) copy base
  await copyDir(input.basePath, input.targetDir);

  // 2) apply patches in order
  for (const patchDir of input.patches) {
    await applyPatch(patchDir, input.targetDir);
  }

  // 3) replace tokens
  await replaceTokensInDir(input.targetDir, {
    "__PROJECT_NAME__": input.projectName
  });
}

module.exports = { generateProject };
