const Jimp = require("jimp");
const fs = require("fs");
const path = require("path");
const cliProgress = require("cli-progress");
const { PromisePool } = require("@supercharge/promise-pool");
const [_1, _2, configFile, inputFolder, outputFolder] = process.argv;
const config = JSON.parse(fs.readFileSync(configFile, "utf-8"));

let files = fs
  .readdirSync(inputFolder)
  .filter(
    (f) =>
      f.endsWith(config.inputExtension) &&
      (config.overwrite ||
        !fs.existsSync(
          path.join(
            outputFolder,
            `${path.basename(f, path.extname(f))}${config.outputExtension}`
          )
        ))
  );
if (config.samples) {
  files = files.slice(0, config.samples);
}
const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

(async function () {
  bar.start(files.length, 0);
  await PromisePool.withConcurrency(config.concurrence)
    .for(files)
    .handleError(console.error)
    .process(async (f) => {
      const file = await Jimp.read(path.join(inputFolder, f));
      const output = path.join(
        outputFolder,
        `${path.basename(f, path.extname(f))}${config.outputExtension}`
      );
      await file
        .quality(config.quality) // set JPEG quality
        .writeAsync(output); // save
      bar.increment();
    });
  bar.stop();
})();
