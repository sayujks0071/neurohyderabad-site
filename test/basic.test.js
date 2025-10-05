import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

test("index.html exists and contains React entry point", () => {
  const indexPath = path.join(process.cwd(), "index.html");
  assert.ok(fs.existsSync(indexPath), "index.html should exist");

  const content = fs.readFileSync(indexPath, "utf-8");
  assert.ok(
    content.includes("main.jsx"),
    "index.html should reference main.jsx",
  );
  assert.ok(content.includes('id="root"'), "index.html should have root div");
});

test("package.json exists and has required scripts", () => {
  const packagePath = path.join(process.cwd(), "package.json");
  assert.ok(fs.existsSync(packagePath), "package.json should exist");

  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf-8"));
  assert.ok(packageJson.scripts["dev-react"], "Should have dev-react script");
  assert.ok(
    packageJson.scripts["build-react"],
    "Should have build-react script",
  );
  assert.ok(packageJson.scripts["start"], "Should have start script");
});

test("React components exist", () => {
  const appPath = path.join(process.cwd(), "App.jsx");
  const mainPath = path.join(process.cwd(), "main.jsx");

  assert.ok(fs.existsSync(appPath), "App.jsx should exist");
  assert.ok(fs.existsSync(mainPath), "main.jsx should exist");

  const appContent = fs.readFileSync(appPath, "utf-8");
  assert.ok(
    appContent.includes("Neuro Hyderabad"),
    "App.jsx should contain site title",
  );
});

test("server.js exists and is valid", () => {
  const serverPath = path.join(process.cwd(), "server.js");
  assert.ok(fs.existsSync(serverPath), "server.js should exist");

  const content = fs.readFileSync(serverPath, "utf-8");
  assert.ok(content.includes("express"), "server.js should use express");
  assert.ok(
    content.includes("/health"),
    "server.js should have health endpoint",
  );
});
