#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const directories = ["allure-results"];

directories.forEach((directory) => {
  const targetPath = path.resolve(__dirname, "..", directory);

  try {
    fs.rmSync(targetPath, { recursive: true, force: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Failed to remove ${targetPath}: ${message}`);
  }
});
