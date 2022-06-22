const Jimp = require("jimp");
const fs = require("fs");
const path = require("path");
const [_1, _2, inputFolder, outputFolder] = process.argv;
const files = fs.readdirSync(inputFolder);

files.forEach((f) =>
  Jimp.read(path.join(inputFolder, f), (err, file) => {
    if (err) throw err;
    const output = path.join(
      outputFolder,
      `${path.basename(f, path.extname(f))}.jpg`
    );
    file
      .quality(90) // set JPEG quality
      .write(output); // save
  })
);
