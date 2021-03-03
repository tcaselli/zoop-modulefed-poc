const fs = require("fs");
if (fs.existsSync("./dist")) {
  console.log("Removing build folder...");
  fs.rmdirSync("./dist", { recursive: true });
  console.log("build folder removed");
}
