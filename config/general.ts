import path = require("path")
import fs = require("fs")

const pathDirectoryLog = path.join(__dirname,"../","logs");
fs.existsSync(pathDirectoryLog) || fs.mkdirSync(pathDirectoryLog);

export { pathDirectoryLog }