const path = require("path");
const fs = require("fs");
const cliProgress = require("cli-progress");
const { PromisePool } = require("@supercharge/promise-pool");
const tinify = require("tinify");
const [_1, _2, configFile, assetsFolder, outputFolder] = process.argv;

const config = JSON.parse(fs.readFileSync(configFile, "utf-8"));

tinify.key = config.key;

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

let files = fs
  .readdirSync(assetsFolder)
  .filter(
    (f) =>
      f.endsWith(config.fileExtension) &&
      (config.overwrite || !fs.existsSync(path.join(outputFolder, f)))
  );
if (config.samples) {
  files = files.slice(0, config.samples);
}

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

(async function () {
  bar.start(files.length, 0);
  await PromisePool.withConcurrency(10)
    .for(files)
    .handleError(console.error)
    .process(async (file) => {
      let source = tinify.fromFile(path.join(assetsFolder, file));

      if (config.resize) {
        source = source.resize(config.resize);
      }

      await source.toFile(path.join(outputFolder, file));
      bar.increment();
    });
  bar.stop();
})();
