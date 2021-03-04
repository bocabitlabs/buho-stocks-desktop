const log = require("electron-log");
const logFormat = "{y}-{m}-{d} {h}:{i}:{s}:{ms} | {level} | {text}";

log.transports.ipc.level = false;
log.transports.remote.level = false;

if (process.env.IS_DEV === "true") {
  log.transports.file.level = false;
  log.transports.console.level = "debug";
  log.transports.console.format = logFormat;
} else {
  log.transports.console.level = false;
  log.transports.file.level = "info";
  log.transports.file.format = logFormat;
}

module.exports = { log };
