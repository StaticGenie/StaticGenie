import * as fm from "./framework";
import config = require("./config");

// New StaticGenie instance
new fm.app.App(config).generate();

console.log("=================================");
console.log("=== Generation complete :D")
console.log("=================================");
console.log();