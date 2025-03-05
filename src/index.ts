#!/usr/bin/env node

import { initCommand } from "./commands/initCommand.js";

const args = process.argv.slice(2);
const command = args[0];

async function main() {
  try {
    switch (command) {
      case "init":
        await initCommand();
        break;
      case "help":
      case "--help":
      case "-h":
        showHelp();
        break;
      case "version":
      case "--version":
      case "-v":
        await showVersion();
        break;
      default:
        if (!command) {
          showHelp();
        } else {
          console.error(`❌ Unknown command: ${command}`);
          console.log('Run "templatable help" for available commands');
          process.exit(1);
        }
    }
  } catch (error) {
    console.error(
      "❌ Error:",
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
Templatable - A CLI tool for initializing projects from templates

Usage:
  templatable <command> [options]

Commands:
  init      Initialize a new project from a template
  help      Show this help message
  version   Show version information

Examples:
  templatable init     Choose a template and initialize a new project
  `);
}

async function showVersion() {
  const packageJson = await import("../package.json", {
    assert: { type: "json" },
  });
  console.log(`Templatable v${packageJson.default.version}`);
}

main().catch((err) => {
  console.error("❌ Unhandled error:", err);
  process.exit(1);
});
