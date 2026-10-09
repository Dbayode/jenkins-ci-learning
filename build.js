const fs = require("node:fs");

fs.mkdirSync("dist", { recursive: true });
fs.copyFileSync("src/app.js", "dist/app.js");

console.log("Build complete: dist/app.js");
