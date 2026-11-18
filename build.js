// Minimal "build" step so the workflow Pages model has something to build.
// It generates a static site into ./dist from ./site, standing in for a real
// static-site generator or bundler. Run with: npm run build
const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "dist");
fs.mkdirSync(outDir, { recursive: true });

const template = fs.readFileSync(path.join(__dirname, "site", "index.html"), "utf8");
const version = require("./package.json").version;
const html = template.replace("{{VERSION}}", version);

fs.writeFileSync(path.join(outDir, "index.html"), html);
console.log(`Built dist/index.html (version ${version})`);
