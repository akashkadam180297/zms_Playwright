#!/usr/bin/env node

const fs = require("fs");
const { spawn } = require("child_process");
const path = require("path");

const args = process.argv.slice(2);
let environment = process.env.test_env || "ENV_UAT";
const forwardedArgs = [];

for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];

  if (arg === "--env" || arg === "--environment") {
    environment = args[index + 1];
    index += 1;
    continue;
  }

  const envMatch = arg.match(/^--env(?:ironment)?=(.+)$/);
  if (envMatch) {
    environment = envMatch[1];
    continue;
  }

  forwardedArgs.push(arg);
}

if (!environment) {
  environment = "ENV_UAT";
}

const env = { ...process.env, test_env: environment };

const binDir = path.resolve(__dirname, "..", "node_modules", ".bin");
const binName = process.platform === "win32" ? "playwright.cmd" : "playwright";
const localExecutable = path.join(binDir, binName);

let command = localExecutable;
let commandArgs = ["test", ...forwardedArgs];

if (!fs.existsSync(localExecutable)) {
  let resolvedCli;
  try {
    resolvedCli = require.resolve("@playwright/test/cli", {
      paths: [path.resolve(__dirname, "..")],
    });
  } catch (error) {
    resolvedCli = undefined;
  }

  if (resolvedCli) {
    command = process.execPath;
    commandArgs = [resolvedCli, ...forwardedArgs];
  } else {
    command = process.platform === "win32" ? "npx.cmd" : "npx";
    commandArgs = ["playwright", "test", ...forwardedArgs];
  }
}

const child = spawn(command, commandArgs, {
  stdio: "inherit",
  cwd: path.resolve(__dirname, ".."),
  env,
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
