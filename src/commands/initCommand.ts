import inquirer from "inquirer";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

export async function initCommand(): Promise<void> {
  const { template } = await inquirer.prompt<{ template: string }>([
    {
      type: "list",
      name: "template",
      message: "Choose a template to initialize:",
      choices: [
        { name: "PWA", value: "pwa" },
        { name: "Raw", value: "raw" },
        { name: "Supabase", value: "supabase" },
      ],
    },
  ]);

  let repoUrl: string;
  switch (template) {
    case "pwa":
      repoUrl = "https://github.com/templatable/pwa.git";
      break;
    case "raw":
      repoUrl = "https://github.com/templatable/raw.git";
      break;
    case "supabase":
      repoUrl = "https://github.com/templatable/supabase.git";
      break;
    default:
      console.error("❌ Unknown template selected");
      process.exit(1);
  }

  // Get project name
  const { projectName } = await inquirer.prompt<{ projectName: string }>([
    {
      type: "input",
      name: "projectName",
      message: "Enter project name:",
      default: `${template}-project`,
      validate: (input: string) => {
        if (!input.trim()) {
          return "Project name cannot be empty";
        }
        if (fs.existsSync(path.resolve(process.cwd(), input))) {
          return "A directory with this name already exists";
        }
        return true;
      },
    },
  ]);

  console.log(
    `Cloning the ${template} template from ${repoUrl} into folder '${projectName}'...`
  );

  exec(`git clone ${repoUrl} ${projectName}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error cloning repository: ${error.message}`);
      return;
    }
    console.log(`✅ Template cloned successfully into '${projectName}'`);
    console.log(`\nNext steps:`);
    console.log(`  1. cd ${projectName}`);
    console.log(`  2. bun install`);
    console.log(
      `  3. bun run dev (or follow the template's README for instructions)`
    );
  });
}
